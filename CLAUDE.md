# Date Difference Calculator

A Nuxt 3 + TypeScript web app that computes the difference between two dates in
days, minutes, and seconds simultaneously, with correct calendar math (leap years
handled correctly).

## Spec

### Inputs
- `first_date` — the earlier datetime. Required, no default.
- `last_date`  — the later datetime. Defaults to "now" in the user's local time.

Both are `datetime-local` inputs (no timezone selection — everything is in the
user's local time).

### Output
Display `last_date - first_date` simultaneously in three units:
- **Days** (decimal, up to 6 places — e.g. `1.5` days)
- **Minutes** (integer)
- **Seconds** (integer)

If `first_date > last_date`, the values become negative; show them in red with
a note "First date is after last date".

### Math correctness
Use native `Date` millisecond subtraction. This naturally handles:
- Leap years — Feb 29 contributes 86,400,000 ms exactly like any other day.
- Variable month lengths — months are not used as a unit, so this is moot.

**DST caveat:** millisecond subtraction returns *elapsed wall-clock time*.
Across a DST transition, two "local" times that look one calendar day apart
can differ by 23 or 25 hours. This is **correct** — it's the actual amount of
time that passed. Do NOT try to "correct" for it.

## Tech stack
- Nuxt 3 (latest)
- TypeScript (strict mode — set `typescript.strict: true` in `nuxt.config.ts`)
- `@nuxtjs/tailwindcss` for styling
- Vitest + `@vue/test-utils` + `happy-dom` for tests
- No date library — native `Date` is sufficient.

## Project structure
```
pages/index.vue              # the calculator UI
composables/useDateDiff.ts   # reactive composable wrapping the math
utils/dateMath.ts            # pure functions: diffMs, formatDays, formatMinutes, formatSeconds
tests/dateMath.test.ts       # Vitest unit tests
```

Pure functions in `utils/dateMath.ts` so they're trivially testable without
mounting Vue components.

## UI requirements
- Two `<input type="datetime-local">` controls labeled **First date** and **Last date**.
- **Last date** pre-filled with the current local datetime *on mount* (use
  `onMounted` to avoid SSR hydration mismatch — see notes below).
- A **Now** button next to "Last date" that resets it to current local time.
- A **Swap** button between the two inputs that exchanges their values.
- Three large result cards beneath the inputs: Days / Minutes / Seconds.
- Responsive: single column on mobile, two-column form on desktop.
- Negative diffs render in red with the note above.

## Implementation notes

### Reading `datetime-local`
The value of `<input type="datetime-local">` is a string like
`"2026-05-09T14:30"`. `new Date(value)` parses it as **local time**, which is
what we want. Bind with `v-model` to a string and convert to `Date` in a
`computed`.

### Avoiding hydration mismatch
Don't compute "now" during SSR. Initialize `last_date` to `null` in setup,
then set it to `new Date()` in `onMounted`. Otherwise the server-rendered
"now" will differ from the client's "now" and Vue will warn.

```ts
const lastDateStr = ref<string>('')
onMounted(() => { lastDateStr.value = toDatetimeLocalString(new Date()) })
```

Where `toDatetimeLocalString` formats a Date as `YYYY-MM-DDTHH:mm` in local time
(NOT UTC — `.toISOString()` would be wrong here).

### Required tests (must all pass)
In `tests/dateMath.test.ts`:
- 1 hour = 3600 seconds = 60 minutes = 1/24 day
- `2024-02-28T00:00` → `2024-03-01T00:00` = 2 days  (leap year)
- `2023-02-28T00:00` → `2023-03-01T00:00` = 1 day   (non-leap)
- `2000-01-01T00:00` → `2024-01-01T00:00` = 8766 days  (6 leap years in 24)
- `1900-01-01T00:00` → `2000-01-01T00:00` = 36524 days  (1900 is NOT a leap year — century rule)
- Negative diffs return negative values, not absolute values.

Use UTC-constructed Dates in tests (`new Date(Date.UTC(...))`) to keep them
DST-independent.

## Commands
- `npm run dev`        — dev server
- `npm run build`      — production build
- `npm test`           — run Vitest
- `npm run typecheck`  — `nuxt typecheck`

## Out of scope (don't build these)
- Authentication, persistence, accounts
- Multiple timezone selection or timezone conversion
- i18n / multi-language
- Backend API — this is a fully client-side calculator; SSR can stay on but
  there's no server logic.
