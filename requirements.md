# AWS CLF-C02 Exam Mastery System – Requirements

## Primary objective
Pass the AWS Certified Cloud Practitioner (CLF-C02) examination on **14 December 2026**.

## Hard constraints
- Zero cost: runs locally, offline, no paid APIs, no npm, no build step.
- All state in `localStorage`. No server, no database.
- Single HTML file + one JS data file. Open in any browser and study immediately.
- Mobile-first. Respects `prefers-reduced-motion`.

## Exam facts (CLF-C02)
| Domain | Weight | Questions (of 65) |
|---|---:|---:|
| Cloud Concepts | 24% | ~16 |
| Security and Compliance | 30% | ~20 |
| Cloud Technology and Services | 34% | ~22 |
| Billing, Pricing and Support | 12% | ~7 |

Question types: single-answer multiple choice and multiple-response (choose 2 or 3).
Duration: 90 minutes. Pass mark: approximately 700/1000.

## Features (in build order)

### 1. Question bank (`questions.js`)
- Each item: id, domain, type (single|multi), stem, options[], correct[], rationale, wrongRationale{}, tags[].
- Minimum 120 items across all 4 domains, domain-weighted.
- Items written from AWS documentation. All AI-written items flagged `"verified": false`.

### 2. Diagnostic exam
- 40 questions: 10 Cloud Concepts, 12 Security, 14 Technology, 4 Billing.
- Timed (60 minutes, soft — warns but doesn't cut off).
- Result: accuracy per domain, accuracy per service tag, top 5 confused pairs.
- Writes baseline to `localStorage` and locks (can retake after 7 days).

### 3. Weakness detector
- Logs every (chosen, correct) pair on every question attempt.
- Computes confusion frequency per pair.
- Dashboard card: "Top 5 confusions" with count and last seen date.
- For each confusion pair: a side-by-side comparison card and a 5-question targeted drill.

### 4. Spaced repetition
- Every question has a `nextDue` timestamp and an `interval` (days: 1 → 2 → 4 → 7 → retired).
- Miss → reset to 1-day interval.
- Correct → advance to next interval.
- "Due today" queue shown on the home dashboard.

### 5. Mock exam (65 questions, 90 minutes)
- Domain-weighted random selection from verified questions.
- Countdown timer visible at all times. Warning at 15 minutes remaining.
- Flag-for-review button per question.
- Review screen: score, domain breakdown, every question with chosen answer, correct answer, rationale, wrong-option rationale.
- Results saved to `localStorage` history.

### 6. Daily study plan
- Calculates days remaining until 14 December 2026.
- If diagnostic complete: orders domains by weakest first.
- If not: prompts diagnostic.
- Suggests a session structure (review due items → study domain → exam questions → weakness drill) with a hard-stop time estimate.

## Out of scope (for now)
- Voice recognition / text-to-speech.
- Animated architecture diagrams (React Flow).
- Interview simulator.
- Any AWS API calls.
