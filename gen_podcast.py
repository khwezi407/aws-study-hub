"""Generate smooth, single-file podcast audio per episode + timing.
Free: Microsoft neural voices via edge-tts. Concatenated with the bundled
ffmpeg (imageio-ffmpeg) so each episode flows as one continuous track.
Outputs: podcast-audio/ep{ep}.mp3  and  podcast-timing.js
Run:  python gen_podcast.py
"""
import asyncio, json, os, re, subprocess
import edge_tts
import imageio_ffmpeg

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "podcast-audio")
LINES = os.path.join(OUT, "_lines")
DATA = os.path.join(ROOT, "podcast-data.json")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

VOICE = {"A": "en-US-AvaNeural", "B": "en-US-AndrewNeural"}  # warm, natural
RATE = "-5%"
PITCH = {"A": "+3Hz", "B": "-3Hz"}
GAP_MS = 180  # natural breath between spoken lines

def dur_of(path):
    p = subprocess.run([FFMPEG, "-i", path], capture_output=True, text=True)
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", p.stderr)
    if not m: return 0.0
    h, mnt, s = m.groups()
    return int(h) * 3600 + int(mnt) * 60 + float(s)

def make_silence(ms, path):
    subprocess.run([FFMPEG, "-y", "-f", "lavfi", "-i",
                    "anullsrc=r=24000:cl=mono", "-t", f"{ms/1000:.3f}",
                    "-ar", "24000", "-ac", "1", "-b:a", "48k", path],
                   capture_output=True)

async def synth_line(text, voice, pitch, path):
    c = edge_tts.Communicate(text, voice, rate=RATE, pitch=pitch)
    await c.save(path)

def fwd(p): return p.replace("\\", "/")

async def main():
    os.makedirs(LINES, exist_ok=True)
    eps = json.load(open(DATA, encoding="utf-8"))
    timing = {}
    gap_path = os.path.join(LINES, "gap.mp3")
    make_silence(GAP_MS, gap_path)

    for ei, ep in enumerate(eps):
        seg_files = []      # ordered concat inputs
        starts = []         # start time per line (seconds)
        t = 0.0
        lines = ep["lines"]
        for li, ln in enumerate(lines):
            nxt_is_pause = (li + 1 < len(lines) and lines[li+1]["w"] == "pause")
            if ln["w"] == "pause":
                ms = ln.get("ms", 3500)
                sil = os.path.join(LINES, f"sil_{ms}.mp3")
                if not os.path.exists(sil): make_silence(ms, sil)
                starts.append(round(t, 2))
                seg_files.append(sil)
                t += ms / 1000.0
            else:
                path = os.path.join(LINES, f"ep{ei}_{li}.mp3")
                if not (os.path.exists(path) and os.path.getsize(path) > 0):
                    await synth_line(ln["t"], VOICE[ln["w"]], PITCH[ln["w"]], path)
                starts.append(round(t, 2))
                seg_files.append(path)
                d = dur_of(path)
                t += d
                # add a breath gap only between two spoken lines
                if li < len(lines) - 1 and not nxt_is_pause:
                    seg_files.append(gap_path)
                    t += GAP_MS / 1000.0
        # concat (re-encode for uniform codec) -> one smooth episode file
        out_mp3 = os.path.join(OUT, f"ep{ei}.mp3")
        if not (os.path.exists(out_mp3) and os.path.getsize(out_mp3) > 0):
            listfile = os.path.join(LINES, f"list{ei}.txt")
            with open(listfile, "w", encoding="utf-8") as f:
                for sf in seg_files:
                    f.write("file '" + fwd(sf) + "'\n")
            subprocess.run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", listfile,
                            "-ar", "24000", "-ac", "1", "-b:a", "48k", out_mp3],
                           capture_output=True)
        timing[str(ei)] = starts
        print(f"ep{ei}: {len(lines)} lines -> {os.path.basename(out_mp3)}  ({t:.1f}s)")

    with open(os.path.join(ROOT, "podcast-timing.js"), "w", encoding="utf-8") as f:
        f.write("window.PODCAST_TIMING = " + json.dumps(timing) + ";\n")
    print("DONE. Wrote podcast-timing.js and", len(eps), "episode files.")

if __name__ == "__main__":
    asyncio.run(main())