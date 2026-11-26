# Design – AWS CLF-C02 Exam Mastery System

## Architecture
```
AWS Study Hub/
├── index.html          # Everything: UI, logic, styles (single file, ~1500 lines)
├── questions.js        # Question bank (window.QUESTIONS array)
├── requirements.md
├── design.md
└── tasks.md
```

`index.html` loads `questions.js` via a `<script src="questions.js">` tag.
No bundler, no framework. Vanilla JS with ES2020 features.

## State (localStorage keys)
| Key | Contents |
|---|---|
| `clf_progress` | Per-question: interval, nextDue, correct count, attempt count |
| `clf_history` | Array of session results {date, mode, score, domain_scores} |
| `clf_confusions` | Map of "A→B" pairs to count and lastSeen |
| `clf_diagnostic` | Diagnostic result + date |
| `clf_settings` | examDate override, colorScheme |

## UI Sections (tabs)
1. **Home** – Days-to-exam counter, daily plan, due-item count, quick links.
2. **Diagnostic** – 40-question baseline. Locked if completed within 7 days.
3. **Study** – Browse by domain → service cards with explanation, analogy, comparison.
4. **Practice** – Filtered quiz: by domain, by tag, by due date, or weakness drill.
5. **Mock Exam** – Full 65-question timed exam.
6. **Progress** – Domain accuracy bars, confusion pairs, spaced-rep heat map, mock history.

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
