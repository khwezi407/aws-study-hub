# Design – AWS CLF-C02 Exam Mastery System

## Architecture
```
AWS Study Hub/
├── index.html            # UI, logic and the base stylesheet
├── theme-v3.css          # "Studio" layer: depth, light, 3D icon tiles
├── premium.js            # Mission timeline, command palette, focus mode, cram sheet
├── questions.js          # Authored question bank (window.QUESTIONS)
├── external-questions.js # Additional bank, merged at load
├── flashcards.js         # window.FLASHCARD_DECKS
├── studyplan.js          # window.STUDY_PLAN (9-day exam sprint)
├── requirements.md
├── design.md
└── tasks.md
```

`index.html` loads the data files and `theme-v3.css` in `<head>`, then `premium.js` at the end of `<body>`. No bundler, no framework, no build step. Vanilla JS with ES2020 features. Everything runs offline from `file://` or any static server.

## State (localStorage keys)
| Key | Contents |
|---|---|
| `clf_progress` | Per-question: interval, nextDue, correct count, attempt count |
| `clf_history` | Array of session results {date, mode, score, domain_scores} |
| `clf_confusions` | Map of "A→B" pairs to count and lastSeen |
| `clf_diagnostic` | Diagnostic result + date |
| `clf_exam_date` | ISO exam date (default `2026-12-08T07:00:00`) |
| `clf_mastery_v1` | 90-day path: `{start, total, days:{1:[bool×5]}, notes:{day:text}}` |
| `clf_xp`, `clf_streak`, `clf_missions` | Gamification state |
| `clf_username`, `clf_avatar` | Profile |
| `clf_home_layout`, `clf_theme` | UI preferences |

## UI Sections (tabs, in sidebar order)
1. **Study Roadmap** – 9-day exam sprint, phases, exam-day tips.
2. **Mastery Path** – 90-day curriculum (5 × 25-min blocks/day); compresses to the days remaining.
3. **Home** – Days-to-exam counter, mission timeline, due count, today's mission, mastery strip.
4. **Learn / Cram Sheet / Week Flashcards / Terminology Gym / Architecture Lab** – study material.
5. **Practice / Review Queue / Exam Mode / Diagnostic Scan / Games Arena** – active practice.
6. **Progress / Achievements / Study Method** – measurement and method.
7. **Settings** – exam date, profile, theme, reset.

## Color scheme
- Background: `#0f172a` (slate-900)
- Surface: `#1e293b` (slate-800)
- Accent: `#f59e0b` (amber-500) — AWS orange-ish
- Correct: `#22c55e` (green-500)
- Wrong: `#ef4444` (red-500)
- Flagged: `#a78bfa` (violet-400)
- Text primary: `#f1f5f9`
- Text secondary: `#94a3b8`

Fonts: system-ui stack. No external font CDN needed.

## Spaced repetition algorithm
```
intervals = [1, 2, 4, 7]  // days
on correct:
  intervalIndex = min(current + 1, 3)
  nextDue = now + intervals[intervalIndex] days
on incorrect:
  intervalIndex = 0
  nextDue = now + 1 day
retired when intervalIndex == 3 AND correct on that attempt
```

## Question bank structure
```js
{
  id: "sec-001",
  domain: "Security and Compliance",    // exact domain name
  type: "single",                        // "single" | "multi"
  stem: "Which AWS service...",
  options: ["A. IAM", "B. KMS", "C. Shield", "D. GuardDuty"],
  correct: ["B"],                        // array for multi
  rationale: "KMS manages encryption keys...",
  wrongRationale: {
    "A": "IAM manages identities, not keys.",
    "C": "Shield protects against DDoS.",
    "D": "GuardDuty is a threat detector."
  },
  tags: ["KMS", "encryption"],
  verified: false                        // true once checked against AWS docs
}
```

## Mock exam flow
1. User clicks "Start Mock Exam".
2. System draws 65 questions: domain-weighted, random, preferring unmastered items.
3. 90-minute countdown starts. Displays MM:SS.
4. Each question: stem, options, flag button, next/prev navigation.
5. At 15 min remaining: amber warning banner.
6. Submit (or timer expires): review screen with full explanations.
7. Results saved to history.

## Responsive layout
- Mobile: single column, bottom nav bar (5 icons).
- Tablet+: sidebar nav + content area.
- CSS Grid. No JS layout logic.
