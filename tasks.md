# Tasks – AWS CLF-C02 Exam Mastery System

Build order is strict. Do not start a task until the one above it is complete and working.

## Task 1 – Question bank (questions.js)
- [x] 1a. Write 30 Cloud Concepts questions (single + multi mix)
- [x] 1b. Write 36 Security and Compliance questions
- [x] 1c. Write 40 Cloud Technology and Services questions
- [x] 1d. Write 14 Billing, Pricing and Support questions
- [x] 1e. All items have: id, domain, type, stem, options, correct, rationale, wrongRationale, tags, verified
- [x] 1f. Load test: `window.QUESTIONS` accessible, no JS errors (120 Qs, no duplicate IDs)

## Task 2 – HTML shell and navigation
- [x] 2a. Single index.html with inline CSS (design system colors, mobile-first grid)
- [x] 2b. Five-tab navigation: Home, Diagnostic, Practice, Mock Exam, Progress
- [x] 2c. Bottom nav on mobile, sidebar on ≥768px
- [x] 2d. Days-to-exam counter on Home tab (hardcoded target: 14 Dec 2026)
- [x] 2e. All localStorage keys initialised on first load

## Task 3 – Diagnostic exam
- [x] 3a. Draw 40 questions weighted by domain (10/12/14/4)
- [x] 3b. Display one question at a time, progress indicator
- [x] 3c. Record answer, move to next
- [x] 3d. On completion: score per domain shown with colour-coded bars
- [x] 3e. Write result to `clf_diagnostic`; show retake button (active after 7 days)
- [x] 3f. Home tab shows "Start Diagnostic →" or recommended focus based on results

## Task 4 – Weakness detector
- [x] 4a. Every question attempt logs (chosen, correct, timestamp) to `clf_confusions`
- [x] 4b. Progress tab: top 5 confusion pairs, count, last-seen date
- [x] 4c. Each confusion pair has a "Drill" button: questions involving those services
- [x] 4d. Each confusion pair has a "Compare" card: side-by-side service description (22 services covered)

## Task 5 – Spaced repetition
- [x] 5a. On correct answer: advance interval index (1→2→4→7 days)
- [x] 5b. On incorrect answer: reset interval to 1 day
- [x] 5c. Home tab: "X items due today" stat + "Review Due Items" button
- [x] 5d. Progress tab: SR status breakdown (new/due/soon/scheduled/mastered)

## Task 6 – Mock exam
- [x] 6a. Draw 65 questions domain-weighted from bank
- [x] 6b. 90-minute countdown timer, always visible with MM:SS
- [x] 6c. Flag-for-review per question; flagged questions highlighted in question grid
- [x] 6d. Prev/Next navigation + jump-to-question grid
- [x] 6e. Submit button (and auto-submit on timer expiry)
- [x] 6f. Review screen: total score, domain breakdown, every question with explanation
- [x] 6g. Save result to `clf_history`; Progress tab shows mock history

## Task 7 – Daily study plan
- [x] 7a. Home tab: today's suggested plan based on days remaining and weak domains
- [x] 7b. Plan includes: due items, weakest domain, practice question target
- [x] 7c. If diagnostic not done: plan says "Take diagnostic first"
- [x] 7d. Hard-stop message shown at bottom of plan

## Completion criteria
- Open index.html in Chrome, Firefox, or Edge — no errors in console.
- All 120+ questions load.
- Diagnostic runs and saves a result.
- Mock exam counts down and shows review screen.
- Weakness pairs appear after incorrect answers.
- Spaced repetition due dates advance correctly.
- Daily plan updates based on days remaining.
