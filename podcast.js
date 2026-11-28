/* ═══════════════════════════════════════════════════════════════
   podcast.js — AWS Audio Academy (smooth single-track player)
   One continuous neural-voice MP3 per episode (see gen_podcast.py),
   transcript synced via window.PODCAST_TIMING. Hands-free autoplay,
   domain sectors, eyes-free mode, and built-in recall pauses.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var HOSTS = {
    A: { name: 'Sam', ico: '🧑‍🎓', color: '#3BA8FF' },
    B: { name: 'Coach K', ico: '🧑‍🏫', color: '#E9A92F' }
  };

  var EPISODES = [
    { t: 'What Even Is the Cloud?', tag: 'Cloud Concepts', domain: 'Cloud Concepts', ico: '☁️', color: '#3BA8FF',
      hook: 'Cloud = electricity for computing. CapEx to OpEx.',
      lines: [
        { w:'A', t:"Coach, everyone says the cloud, but what is it actually?" },
        { w:'B', t:"Picture electricity. You don't build a power plant at home. You plug in and pay for what you use. The cloud is that, for computing." },
        { w:'A', t:"So instead of buying my own servers, I rent them?" },
        { w:'B', t:"By the second. That's the big shift. From CapEx, buying equipment upfront, to OpEx, a monthly bill." },
        { w:'A', t:"What's the payoff for a business?" },
        { w:'B', t:"Six advantages. Agility. Elasticity, scale up on Black Friday and down after. Global reach in minutes. And you stop guessing capacity." },
        { w:'A', t:"Stop guessing capacity. I've seen that exact phrase in practice questions." },
        { w:'B', t:"Because it's the signature line of cloud economics. If a question says stop guessing capacity, or pay as you go, the answer is the cloud, not on-premises." },
        { w:'A', t:"So the one thing to remember is..." },
        { w:'B', t:"Cloud is electricity for computing. You flip a switch and pay the meter. CapEx becomes OpEx." },
        { w:'B', t:"Before we go, quick recall. Don't peek. What's the cloud, in one line?" },
        { w:'pause', ms:4000, prompt:"What is the cloud, in one line?" },
        { w:'A', t:"Electricity for computing. You flip a switch and pay the meter. CapEx becomes OpEx." },
        { w:'B', t:"And the phrase that signals a cloud economics answer?" },
        { w:'pause', ms:3500, prompt:"Which phrase signals cloud economics?" },
        { w:'A', t:"Stop guessing capacity. Pay as you go." }
      ] },
    { t: 'IAM: The Bouncer and the Backstage Pass', tag: 'Security & Compliance', domain: 'Security & Compliance', ico: '🛡️', color: '#FFB020',
      hook: 'User = person. Role = temp pass for services. Policy = the rules.',
      lines: [
        { w:'A', t:"IAM confuses everyone. Users, roles, policies. Break it down." },
        { w:'B', t:"Think of a concert venue. A User is a person with a long-term ID badge. A Role is a temporary backstage pass you hand to a service." },
        { w:'A', t:"So a role is for machines, not people?" },
        { w:'B', t:"Exactly. An EC2 or a Lambda assumes a role to get temporary credentials. No passwords stored anywhere. That's least privilege in action." },
        { w:'A', t:"And policies?" },
        { w:'B', t:"The rules printed on the pass. Which doors you can open. The golden rule is give the minimum, nothing more." },
        { w:'A', t:"What's the exam trap?" },
        { w:'B', t:"If a question says no long-term credentials, or temporary access for a service, the answer is a Role, not a User." },
        { w:'A', t:"Memory hook?" },
        { w:'B', t:"User is a person. Role is a temp pass for services. Policy is the rules on the pass." },
        { w:'B', t:"Recall time. A service needs temporary access with no stored passwords. User or Role?" },
        { w:'pause', ms:4000, prompt:"Temporary access, no passwords: User or Role?" },
        { w:'A', t:"Role. A temporary backstage pass for services." },
        { w:'B', t:"And the golden rule of policies?" },
        { w:'pause', ms:3500, prompt:"The golden rule of policies?" },
        { w:'A', t:"Least privilege. Give the minimum, nothing more." }
      ] },
    { t: 'S3 vs EBS vs EFS: Warehouse, Locker, Shared Drive', tag: 'Cloud Technology', domain: 'Cloud Technology and Services', ico: '📦', color: '#22C55E',
      hook: 'S3 object. EBS one server. EFS many servers.',
      lines: [
        { w:'A', t:"Three storage services, one blurry mess. S3, EBS, EFS." },
        { w:'B', t:"S3 is a giant warehouse. Objects, accessed over the internet, basically unlimited, eleven nines of durability. Photos, backups, static websites." },
        { w:'A', t:"And EBS?" },
        { w:'B', t:"A locker that plugs into one server in one data center. Fast block storage. It's your database's hard drive." },
        { w:'A', t:"EFS?" },
        { w:'B', t:"A shared network drive that many servers mount at the same time. Perfect for lifting an old file share into the cloud." },
        { w:'A', t:"How do I never mix them up again?" },
        { w:'B', t:"Say it as a story. Object storage is the warehouse, S3. One server is the locker, EBS. Many servers sharing files is the shared drive, EFS." },
        { w:'A', t:"So if the question says shared file system across instances..." },
        { w:'B', t:"EFS. If it says object or static website, S3. If it says a single instance's volume, EBS." },
        { w:'B', t:"Recall. Many servers sharing the same files?" },
        { w:'pause', ms:4000, prompt:"Many servers sharing files?" },
        { w:'A', t:"EFS, the shared drive." },
        { w:'B', t:"Object storage for a static website?" },
        { w:'pause', ms:3500, prompt:"Object storage for a static website?" },
        { w:'A', t:"S3, the warehouse." }
      ] },
    { t: 'CloudTrail vs CloudWatch vs Config', tag: 'Security & Compliance', domain: 'Security & Compliance', ico: '🔍', color: '#FFB020',
      hook: 'CloudTrail who. CloudWatch how. Config what-state.',
      lines: [
        { w:'A', t:"These three sound identical. CloudTrail, CloudWatch, Config." },
        { w:'B', t:"CloudTrail is CCTV. Who did what, and when. An API audit. Who deleted the bucket? CloudTrail." },
        { w:'A', t:"CloudWatch?" },
        { w:'B', t:"The dashboard. Metrics and alarms. How is it performing? CPU spiking at 3am? That's CloudWatch." },
        { w:'A', t:"And Config?" },
        { w:'B', t:"The inspector. What does my resource state look like, and did it drift from the rules? Compliance over time." },
        { w:'A', t:"Give me the memory trick." },
        { w:'B', t:"Trail is who. Watch is how. Config is what state. CCTV, dashboard, inspector." },
        { w:'A', t:"So if the exam asks who made an API call..." },
        { w:'B', t:"CloudTrail. If it asks for a metric alarm, CloudWatch. If it asks about compliance drift, Config." },
        { w:'B', t:"Recall. Who deleted the bucket? Which service?" },
        { w:'pause', ms:4000, prompt:"Who made the API call?" },
        { w:'A', t:"CloudTrail, the CCTV." },
        { w:'B', t:"CPU spiking at 3am, which service?" },
        { w:'pause', ms:3500, prompt:"Metric alarm at 3am?" },
        { w:'A', t:"CloudWatch, the dashboard." }
      ] },
    { t: 'EC2 Pricing: Taxi, Season Pass, Carpool', tag: 'Billing & Pricing', domain: 'Billing, Pricing and Support', ico: '🚕', color: '#FF9900',
      hook: 'Taxi, season pass, carpool, prepaid card.',
      lines: [
        { w:'A', t:"On-Demand, Reserved, Spot, Savings Plans. Help me keep them straight." },
        { w:'B', t:"On-Demand is a taxi. Pay per ride, no commitment. Reserved is a season pass. Commit one or three years, save up to seventy two percent." },
        { w:'A', t:"Spot?" },
        { w:'B', t:"Carpool with strangers. Spare capacity, up to ninety percent off, but AWS can pull you over anytime. Great for fault-tolerant jobs." },
        { w:'A', t:"And Savings Plans?" },
        { w:'B', t:"A prepaid transit card. You commit dollars per hour, but keep flexibility across instance families." },
        { w:'A', t:"Exam keyword?" },
        { w:'B', t:"Most cost-effective and fault-tolerant, that's Spot. Steady, predictable, long term, that's Reserved or Savings Plans." },
        { w:'A', t:"So four stories." },
        { w:'B', t:"Taxi, season pass, carpool, prepaid card. Never mix them up again." },
        { w:'B', t:"Recall. Cheapest, interruptible, fault-tolerant?" },
        { w:'pause', ms:4000, prompt:"Cheapest and interruptible?" },
        { w:'A', t:"Spot, the carpool, up to ninety percent off." },
        { w:'B', t:"Steady long-term commitment, biggest discount?" },
        { w:'pause', ms:3500, prompt:"Long-term steady commitment?" },
        { w:'A', t:"Reserved or Savings Plans, the season pass." }
      ] },
    { t: 'VPC & Security Groups vs NACLs: The Gated Community', tag: 'Cloud Technology', domain: 'Cloud Technology and Services', ico: '🏘️', color: '#22C55E',
      hook: 'SG = per-house guard, stateful. NACL = community gate, stateless.',
      lines: [
        { w:'A', t:"VPC and all these acronyms. Where do I start?" },
        { w:'B', t:"A VPC is your gated community in the AWS neighborhood. You lay out the streets and decide who gets in." },
        { w:'A', t:"Security Groups versus NACLs?" },
        { w:'B', t:"A Security Group is the guard at each house. Stateful, allow-only, and it follows the instance. A NACL is the community gate. Stateless, checks every car both directions, and it can allow or deny." },
        { w:'A', t:"Stateful versus stateless, in plain words?" },
        { w:'B', t:"Stateful remembers the conversation, so reply traffic is auto-allowed. Stateless checks each direction separately." },
        { w:'A', t:"Exam tell?" },
        { w:'B', t:"Instance-level and allow only, that's a Security Group. Subnet-level and can deny, that's a NACL." },
        { w:'A', t:"Got it. Guard versus gate." },
        { w:'B', t:"Guard versus gate. Say it once and it sticks." },
        { w:'B', t:"Recall. Instance-level, allow only, stateful?" },
        { w:'pause', ms:4000, prompt:"Instance-level and stateful?" },
        { w:'A', t:"Security Group, the per-house guard." },
        { w:'B', t:"Subnet-level, can deny, stateless?" },
        { w:'pause', ms:3500, prompt:"Subnet-level and can deny?" },
        { w:'A', t:"NACL, the community gate." }
      ] },
    { t: 'Serverless & Containers: Food Truck vs Restaurant', tag: 'Cloud Technology', domain: 'Cloud Technology and Services', ico: '🍔', color: '#22C55E',
      hook: 'Lambda = food truck. Fargate = staffless restaurant.',
      lines: [
        { w:'A', t:"Lambda, Fargate, ECS, EKS. Too many kitchens." },
        { w:'B', t:"Lambda is a food truck. You bring the code, it appears when an event rings the bell, runs up to fifteen minutes, then vanishes. No servers." },
        { w:'A', t:"Fargate?" },
        { w:'B', t:"A restaurant where you don't manage the kitchen staff. You bring containers, AWS runs them. No servers to patch." },
        { w:'A', t:"ECS versus EKS?" },
        { w:'B', t:"ECS is AWS's own restaurant brand. EKS is Kubernetes, the industry standard kitchen. Both can use Fargate to skip server management." },
        { w:'A', t:"Least operational effort?" },
        { w:'B', t:"Lambda for short bursts. Fargate for containers. The phrase to circle is no server management." },
        { w:'A', t:"Food truck and staffless restaurant." },
        { w:'B', t:"That's the whole compute story in one line." },
        { w:'B', t:"Recall. Short event-driven burst, no servers, max fifteen minutes?" },
        { w:'pause', ms:4000, prompt:"Short burst, no servers?" },
        { w:'A', t:"Lambda, the food truck." },
        { w:'B', t:"Containers, no server management?" },
        { w:'pause', ms:3500, prompt:"Containers, no servers?" },
        { w:'A', t:"Fargate, the staffless restaurant." }
      ] },
    { t: 'Well-Architected & Shared Responsibility', tag: 'Cloud Concepts', domain: 'Cloud Concepts', ico: '🏛️', color: '#8055F5',
      hook: 'AWS: security OF the cloud. You: security IN the cloud.',
      lines: [
        { w:'A', t:"The two big frameworks people fear. Well-Architected and Shared Responsibility." },
        { w:'B', t:"Well-Architected is a health inspection with six pillars. Operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability." },
        { w:'A', t:"And Shared Responsibility?" },
        { w:'B', t:"Picture a restaurant. AWS owns the building, the ovens, the electricity. That's security of the cloud. You own the recipe, the ingredients, and your customers' safety. That's security in the cloud." },
        { w:'A', t:"So who patches the operating system on EC2?" },
        { w:'B', t:"You do. That's your kitchen. But S3, RDS, Lambda, AWS handles the underlying infrastructure." },
        { w:'A', t:"Exam line?" },
        { w:'B', t:"Physical or AWS-managed infrastructure, that's AWS. Data, IAM, configuration, that's you. That split is two or three free marks." },
        { w:'A', t:"Security of versus security in." },
        { w:'B', t:"Of the cloud is AWS. In the cloud is you. Nail that and you've nailed a whole domain." },
        { w:'B', t:"Recall. Who patches the operating system on EC2?" },
        { w:'pause', ms:4000, prompt:"Who patches the EC2 operating system?" },
        { w:'A', t:"You do. That's security in the cloud." },
        { w:'B', t:"Who owns the physical data centers?" },
        { w:'pause', ms:3500, prompt:"Who owns the physical infrastructure?" },
        { w:'A', t:"AWS. Security of the cloud." }
      ] }
  ];

  var DOMAINS = ['Cloud Concepts', 'Security & Compliance', 'Cloud Technology and Services', 'Billing, Pricing and Support'];
  var RATES = [1, 1.15, 1.3, 0.9];
  var rateIdx = 0, cur = 0, curLine = 0, playing = false, autoplayNext = true, filter = 'All';
  var player = null, raf = null;

  function $(id) { return document.getElementById(id); }
  function timing() { return (window.PODCAST_TIMING) || {}; }
  function startsFor(ep) { var t = timing()[ep]; return (t && t.length) ? t : (EPISODES[ep].lines.map(function (_, i) { return i * 4; })); }
  function getPlayer() { if (!player) { player = new Audio(); player.preload = 'auto'; } return player; }
  function state() { try { return JSON.parse(localStorage.getItem('clf_podcast') || '{}'); } catch (e) { return {}; } }
  function saveState(p) { try { var s = state(); for (var k in p) s[k] = p[k]; localStorage.setItem('clf_podcast', JSON.stringify(s)); } catch (e) { } }
  function fmtDur(ep) { var s = Math.round((startsFor(ep).pop() || 60)); return '~' + Math.max(1, Math.round(s / 60)) + ' min'; }

  window.renderPodcast = function () {
    var s = state();
    if (typeof s.ep === 'number' && s.ep >= 0 && s.ep < EPISODES.length) cur = s.ep;
    curLine = 0;

    var hero =
      '<div class="pod-hero animate-in">' +
      '<div class="pod-hero-eyebrow">🎙️ Audio Academy · Learn by listening</div>' +
      '<h1 class="pod-hero-title">Stories that make AWS <em>stick.</em></h1>' +
      '<p class="pod-hero-sub">Two hosts. Real analogies. Zero reading required. Press play, put your headphones on, and learn while you clean, commute, or rest. Each episode ends with a quick recall pause — answer out loud to lock it in.</p>' +
      '<div class="pod-hero-pills">' +
      '<span class="pod-pill">🧠 Story + analogy</span>' +
      '<span class="pod-pill">✏️ Recall pauses</span>' +
      '<span class="pod-pill">🔊 Hands-free autoplay</span>' +
      '<span class="pod-pill">📴 Works offline</span>' +
      '</div></div>';

    var np =
      '<div class="pod-player" id="pod-player">' +
      '<div class="pod-np-top">' +
      '<div class="pod-np-hosts">' +
      '<span class="pod-host" style="--hc:#3BA8FF"><span class="pod-host-ico">🧑‍🎓</span>Sam</span>' +
      '<span class="pod-host" style="--hc:#E9A92F"><span class="pod-host-ico">🧑‍🏫</span>Coach K</span>' +
      '</div>' +
      '<div class="pod-np-title" id="pod-np-title"></div>' +
      '</div>' +
      '<div class="pod-np-line" id="pod-np-line"></div>' +
      '<div class="pod-np-progress"><div class="pod-np-bar" id="pod-np-bar"></div></div>' +
      '<div class="pod-np-meta"><span id="pod-np-count"></span><span id="pod-np-hook"></span></div>' +
      '<div class="pod-controls">' +
      '<button class="pod-ctl" id="pod-prev" title="Previous line">⏮</button>' +
      '<button class="pod-ctl pod-ctl-main" id="pod-play" title="Play / pause">▶ Play</button>' +
      '<button class="pod-ctl" id="pod-next" title="Next line">⏭</button>' +
      '<button class="pod-ctl" id="pod-stop" title="Stop">⏹</button>' +
      '<button class="pod-ctl pod-ctl-rate" id="pod-rate" title="Speed">1×</button>' +
      '<button class="pod-ctl pod-ctl-auto" id="pod-auto" title="Auto-play next episode">🔁 Auto</button>' +
      '<button class="pod-ctl pod-ctl-eyes" id="pod-eyes" title="Eyes-free mode">🎧 Eyes-free</button>' +
      '</div></div>';

    var chips = ['All'].concat(DOMAINS).map(function (d) {
      return '<button class="pod-chip' + (d === filter ? ' active' : '') + '" data-f="' + d + '">' + (d === 'All' ? 'All' : d) + '</button>';
    }).join('');

    var sections = DOMAINS.map(function (dom) {
      var eps = EPISODES.map(function (ep, i) { return { ep: ep, i: i }; }).filter(function (x) { return x.ep.domain === dom; });
      if (!eps.length) return '';
      if (filter !== 'All' && filter !== dom) return '';
      var cards = eps.map(function (x) {
        var ep = x.ep, i = x.i, done = (state().done || [])[i];
        return '<button class="pod-card' + (i === cur ? ' active' : '') + '" data-ep="' + i + '" style="--ec:' + ep.color + '">' +
          '<div class="pod-card-top"><span class="pod-card-ico">' + ep.ico + '</span>' + (done ? '<span class="pod-card-done">✓</span>' : '') + '</div>' +
          '<div class="pod-card-title">' + ep.t + '</div>' +
          '<div class="pod-card-foot"><span class="pod-card-dur">' + fmtDur(i) + '</span><span class="pod-card-play">▶ Play</span></div>' +
          '</button>';
      }).join('');
      return '<div class="pod-section-label">' + dom + '</div><div class="pod-grid">' + cards + '</div>';
    }).join('');

    var transcript = EPISODES[cur].lines.map(function (l, i) {
      if (l.w === 'pause') {
        return '<div class="pod-line pod-line-pause' + (i === curLine ? ' current' : '') + '" data-line="' + i + '">' +
          '<span class="pod-line-who" style="--hc:#ec4899">✏️ Your turn</span>' +
          '<span class="pod-line-text">' + l.prompt + ' <em>(say it out loud)</em></span></div>';
      }
      var h = HOSTS[l.w];
      return '<div class="pod-line' + (i === curLine ? ' current' : '') + '" data-line="' + i + '">' +
        '<span class="pod-line-who" style="--hc:' + h.color + '">' + h.ico + ' ' + h.name + '</span>' +
        '<span class="pod-line-text">' + l.t + '</span></div>';
    }).join('');

    var html =
      '<div id="pod-root">' + hero + np +
      '<div class="pod-chips">' + chips + '</div>' +
      '<div id="pod-sections">' + sections + '</div>' +
      '<div class="pod-section-label" id="pod-transcript-label">📜 Transcript · tap any line to jump</div>' +
      '<div class="pod-transcript" id="pod-transcript">' + transcript + '</div>' +
      '</div>';

    setTimeout(function () { wire(); renderTranscript(); updateUI(); }, 0);
    return html;
  };

  function renderTranscript() {
    var t = $('pod-transcript'); if (!t) return;
    t.innerHTML = EPISODES[cur].lines.map(function (l, i) {
      if (l.w === 'pause') {
        return '<div class="pod-line pod-line-pause' + (i === curLine ? ' current' : '') + '" data-line="' + i + '"><span class="pod-line-who" style="--hc:#ec4899">✏️ Your turn</span><span class="pod-line-text">' + l.prompt + ' <em>(say it out loud)</em></span></div>';
      }
      var h = HOSTS[l.w];
      return '<div class="pod-line' + (i === curLine ? ' current' : '') + '" data-line="' + i + '"><span class="pod-line-who" style="--hc:' + h.color + '">' + h.ico + ' ' + h.name + '</span><span class="pod-line-text">' + l.t + '</span></div>';
    }).join('');
    Array.prototype.forEach.call(t.querySelectorAll('.pod-line'), function (ln) {
      ln.addEventListener('click', function () { goto(+ln.dataset.line); });
    });
  }

  function wire() {
    var play = $('pod-play'), prev = $('pod-prev'), next = $('pod-next'), stop = $('pod-stop'), rate = $('pod-rate'), auto = $('pod-auto'), eyes = $('pod-eyes');
    if (!play) return;
    play.addEventListener('click', toggle);
    prev.addEventListener('click', function () { goto(curLine - 1); });
    next.addEventListener('click', function () { goto(curLine + 1); });
    stop.addEventListener('click', stopAll);
    rate.addEventListener('click', function () { rateIdx = (rateIdx + 1) % RATES.length; rate.textContent = RATES[rateIdx] + '×'; if (player) player.playbackRate = RATES[rateIdx]; });
    auto.addEventListener('click', function () { autoplayNext = !autoplayNext; auto.classList.toggle('on', autoplayNext); });
    auto.classList.toggle('on', autoplayNext);
    eyes.addEventListener('click', function () { var r = $('pod-root'); if (r) r.classList.toggle('pod-eyesfree'); eyes.classList.toggle('on', r && r.classList.contains('pod-eyesfree')); });
    Array.prototype.forEach.call(document.querySelectorAll('.pod-card'), function (c) {
      c.addEventListener('click', function () { loadEp(+c.dataset.ep, true); });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.pod-chip'), function (c) {
      c.addEventListener('click', function () {
        filter = c.dataset.f;
        Array.prototype.forEach.call(document.querySelectorAll('.pod-chip'), function (x) { x.classList.toggle('active', x === c); });
        Array.prototype.forEach.call(document.querySelectorAll('#pod-sections .pod-section-label'), function (lab, idx) {});
        // re-render sections
        var wrap = $('pod-sections');
        wrap.innerHTML = DOMAINS.map(function (dom) {
          if (filter !== 'All' && filter !== dom) return '';
          var eps = EPISODES.map(function (ep, i) { return { ep: ep, i: i }; }).filter(function (x) { return x.ep.domain === dom; });
          if (!eps.length) return '';
          var cards = eps.map(function (x) {
            var ep = x.ep, i = x.i, done = (state().done || [])[i];
            return '<button class="pod-card' + (i === cur ? ' active' : '') + '" data-ep="' + i + '" style="--ec:' + ep.color + '"><div class="pod-card-top"><span class="pod-card-ico">' + ep.ico + '</span>' + (done ? '<span class="pod-card-done">✓</span>' : '') + '</div><div class="pod-card-title">' + ep.t + '</div><div class="pod-card-foot"><span class="pod-card-dur">' + fmtDur(i) + '</span><span class="pod-card-play">▶ Play</span></div></button>';
          }).join('');
          return '<div class="pod-section-label">' + dom + '</div><div class="pod-grid">' + cards + '</div>';
        }).join('');
        Array.prototype.forEach.call(document.querySelectorAll('.pod-card'), function (c2) { c2.addEventListener('click', function () { loadEp(+c2.dataset.ep, true); }); });
      });
    });

    var p = getPlayer();
    p.addEventListener('timeupdate', onTime);
    p.addEventListener('ended', onEnded);
    p.addEventListener('play', function () { playing = true; updateUI(); });
    p.addEventListener('pause', function () { playing = false; updateUI(); });
    p.src = 'podcast-audio/ep' + cur + '.mp3';
    p.playbackRate = RATES[rateIdx];
  }

  function onTime() {
    if (!player) return;
    var st = startsFor(cur), t = player.currentTime, idx = 0;
    for (var i = 0; i < st.length; i++) { if (t + 0.05 >= st[i]) idx = i; else break; }
    if (idx !== curLine) { curLine = idx; updateUI(); highlight(); }
    var bar = $('pod-np-bar');
    if (bar && player.duration) bar.style.width = (player.currentTime / player.duration * 100) + '%';
  }

  function highlight() {
    Array.prototype.forEach.call(document.querySelectorAll('.pod-line'), function (n) {
      n.classList.toggle('current', +n.dataset.line === curLine);
    });
  }

  function onEnded() {
    if (autoplayNext && cur < EPISODES.length - 1) { loadEp(cur + 1, true); return; }
    playing = false; markDone(); updateUI();
    try { toast('Episode complete — nice work 🎧'); } catch (e) { }
  }

  function updateUI() {
    var ep = EPISODES[cur], l = ep.lines[curLine];
    var title = $('pod-np-title'), lineEl = $('pod-np-line'), count = $('pod-np-count'), hook = $('pod-np-hook'), play = $('pod-play');
    if (!title) return;
    title.textContent = ep.ico + ' ' + ep.t;
    if (l.w === 'pause') {
      lineEl.innerHTML = '<span class="pod-np-who" style="color:#ec4899">✏️ Your turn</span>' + l.prompt + ' <span class="pod-np-say">(say it out loud)</span>';
    } else {
      lineEl.innerHTML = '<span class="pod-np-who" style="color:' + HOSTS[l.w].color + '">' + HOSTS[l.w].ico + ' ' + HOSTS[l.w].name + '</span>' + l.t;
    }
    count.textContent = 'Line ' + (curLine + 1) + ' of ' + ep.lines.length;
    hook.textContent = '💡 ' + ep.hook;
    play.textContent = playing ? '⏸ Pause' : '▶ Play';
    highlight();
  }

  function toggle() {
    var p = getPlayer();
    if (!p.src) p.src = 'podcast-audio/ep' + cur + '.mp3';
    if (playing) { p.pause(); }
    else { var pr = p.play(); if (pr && pr.catch) pr.catch(function () { try { toast('Audio could not start — is podcast-audio present?'); } catch (e) { } }); }
  }
  function goto(i) {
    var ep = EPISODES[cur], st = startsFor(cur);
    if (i < 0) i = 0; if (i > ep.lines.length - 1) i = ep.lines.length - 1;
    curLine = i; var p = getPlayer();
    try { p.currentTime = st[i] || 0; } catch (e) { }
    saveState({ ep: cur, line: i }); updateUI();
    if (playing) p.play();
  }
  function stopAll() { var p = getPlayer(); p.pause(); try { p.currentTime = 0; } catch (e) { } curLine = 0; updateUI(); saveState({ ep: cur, line: 0 }); }
  function loadEp(i, autoplay) {
    if (i < 0 || i >= EPISODES.length) return;
    var p = getPlayer(); p.pause();
    cur = i; curLine = 0; saveState({ ep: cur, line: 0 });
    p.src = 'podcast-audio/ep' + cur + '.mp3'; p.playbackRate = RATES[rateIdx];
    renderTranscript(); updateUI();
    Array.prototype.forEach.call(document.querySelectorAll('.pod-card'), function (c) { c.classList.toggle('active', +c.dataset.ep === cur); });
    var pl = $('pod-player'); if (pl && pl.scrollIntoView) pl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (autoplay) p.play();
  }
  function markDone() {
    var s = state(), done = s.done || []; done[cur] = true; saveState({ done: done });
    try { addXP(10); } catch (e) { }
  }

  if (typeof window.navigate === 'function') {
    var orig = window.navigate;
    window.navigate = function () { if (player) player.pause(); return orig.apply(this, arguments); };
  }
})();