# AWS Cloud Practitioner Study Hub

A free, offline, single-page study app to pass the **AWS Certified Cloud Practitioner (CLF-C02)** exam. Built for people who are short on time, forget concepts easily, or learn better by listening than reading.

Open `index.html` in any modern browser and study immediately. No account, no build step, no server required.

---

## Purpose

- **Pass CLF-C02 with 90%+** using proven learning methods (spaced repetition, active recall, elaboration, dual coding).
- **Go at your own pace** - set your exam date in **Settings** and the mission clock and study plan adapt automatically. A short 10-day push works if you are behind, but it is not required.
- **Be shareable** with classmates (AWS re/Start cohort) - it is a static site with all progress stored locally in each person's browser.
- **Zero cost and offline** - no paid APIs, no tracking, no login.

## Inspired by AWS re/Start (Praesignis)

This hub was built by a graduate of the **3-month AWS re/Start program run by Praesignis**. The program's learn-by-doing philosophy shaped how this app teaches:

- **Learn by doing, not just watching** - every concept is tied to practice questions and drills, not passive notes.
- **Spaced, repeated exposure** - core services resurface over days (spaced repetition) until they stick, instead of one-and-done reading.
- **Explain it simply** - real-world analogies and stories turn abstract services into something you can actually remember.
- **Consistency beats cramming** - short daily reps (the 10-Minute Win) outperform one long session.
- **Learn together** - built to be shared with the whole cohort so everyone can get certified faster.

The aim is to pass on what worked during the program and help the next person walk into the exam confident.

---

## Features

### Study
- **Learn Hub** - domain-by-domain notes.
- **Cram Sheet** - one-page triggers, numbers, and classic trap pairs.
- **Weekly Flashcards** - 10 decks with story hooks.
- **Terminology Gym** - keyword-to-service drills with subtle glow.
- **Architecture Lab** - visual service map.
- **Audio Academy** - 8 two-host podcast episodes that teach with stories and analogies, with built-in recall pauses. Hands-free autoplay, eyes-free mode, and domain sectors. Works offline.

### Practice
- **Practice** - by domain, due items, weak areas, mock exams.
- **Review Queue** - spaced-repetition due items and "leeches".
- **Exam Mode** - full 65-question, 90-minute mock with review.
- **Diagnostic Scan** - baseline per-domain accuracy.
- **Games Arena** - light gamified drills.

### Track
- **Progress**, **Achievements** (XP, streaks), **Study Method**.

### Premium UX
- Six themes (Space Blue, Midnight Blue, Midnight Green, Deep Purple, Sunset Ember, Graphite).
- Smooth, blur-free tab transitions.
- Back / Forward navigation buttons (work on desktop and mobile).
- Guided **10-Minute Win** for low-motivation days.
- Read-aloud on any page.
- Mobile-first responsive layout.

---

## How to run

**Option A - just open it**
Double-click `index.html`. Everything runs from `file://`.

**Option B - local server (recommended for audio + fonts)**
```bash
node _serve.js
# then open http://127.0.0.1:8766
```

**Deploy for free:** upload the folder to GitHub Pages, Netlify Drop, or Cloudflare Pages. It is fully static.

---

## How to use

1. **First run:** set your name in the profile modal.
2. **Set your exam date** in **Settings** (top of the page). The mission clock, countdown, and study plan adapt to whatever date you pick - change it anytime you reschedule.
3. **Take the Diagnostic Scan** to get a baseline (or skip and start practising).
4. **Daily loop (10 minutes is enough):**
   - Tap **10-Minute Win** on the Home mission card (or `Ctrl+K` -> "Start the 10-minute win").
   - Or: clear the **Review Queue** (due items) -> do one weak-area set -> listen to one **Audio Academy** episode.
5. **Listen while you do chores:** open **Audio Academy**, press Play, tap **Eyes-free**, and walk away. Episodes end with recall pauses - answer out loud.
6. **Before the exam:** re-read the **Cram Sheet** and take a full **Exam Mode** mock.

Keyboard: `Ctrl/⌘+K` command palette, `/` search, `F` focus timer, `Alt+L` read-aloud.

---

## The learning method (why it sticks)

- **Spaced repetition** - due items resurface at 1, 2, 4, 7 days.
- **Active recall** - you answer before you see the solution (recall pauses in audio, practice questions).
- **Elaboration** - every concept is taught as a story or analogy.
- **Dual coding** - the same content as text and audio.
- **Feynman teach-back** - per-day notes to explain in your own words.
- **Low friction** - the 10-Minute Win removes the "I don't feel like studying" barrier.

---

## Project structure

```
index.html            # UI, logic, base styles
theme-v3.css          # "Studio" depth layer
saas-polish.css       # premium Saas-UI polish, themes, transitions
premium.js            # mission timeline, command palette, focus, cram sheet
audio-learn.js        # floating read-aloud pill
podcast.js            # Audio Academy player
podcast-timing.js     # transcript sync (generated)
podcast-data.json     # episode scripts (source)
podcast-audio/ep*.mp3 # 8 episode tracks
gen_podcast.py        # regenerates audio + timing (needs edge-tts)
coach.js              # guided 10-Minute Win
questions.js / external-questions.js  # question bank
flashcards.js / studyplan.js          # decks + study plan
_serve.js             # tiny local static server
```

All progress is stored in `localStorage` (keys prefixed `clf_`). Nothing leaves the browser.

---

## Regenerate the podcast audio

The committed `ep0.mp3`..`ep7.mp3` are ready to use. To change voices or scripts:

```bash
python -m pip install edge-tts imageio-ffmpeg
python gen_podcast.py
```

This rewrites `podcast-audio/ep*.mp3` and `podcast-timing.js`.

---

## Exam facts (CLF-C02)

| Domain | Weight |
|---|---|
| Cloud Concepts | 24% |
| Security and Compliance | 30% |
| Cloud Technology and Services | 34% |
| Billing, Pricing and Support | 12% |

65 questions, 90 minutes, pass ~700/1000.

---

## License

Free to use and share with your cohort.