## Codebase Audit: diet-logger (Web App Focus)

### Legend

| Tag       | Meaning                                              |
| --------- | ---------------------------------------------------- |
| `BUILT`   | Feature is implemented and functional                |
| `STUB`    | Feature exists but is simulated/hardcoded (not real) |
| `DEAD`    | Code exists but is unused / unreachable              |
| `ISSUE`   | Something is wrong or inappropriate                  |
| `MISSING` | Feature expected but not built                       |

---

### A. Architecture & Tooling

| #   | Item                                                         | Status    | Details                                                                                                                                                                                 |
| --- | ------------------------------------------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1  | **React web app (Vite + React 19 + Tailwind)**               | `BUILT`   | SPA built with Vite + React 19. Tailwind is configured via PostCSS + `index.css`.                                                                                                       |
| A2  | **Icon system via @iconify/react (Material Symbols set)**    | `BUILT`   | Icons are rendered with `@iconify/react` and `material-symbols:` ids, bundling only used SVGs.                                                                                          |
| A3  | **Plus Jakarta Sans bundled locally**                        | `BUILT`   | Font is loaded via `@font-face` from `./fonts/PlusJakartaSans.woff2`.                                                                                                                   |
| A4  | **Import map for React (esm.sh)**                            | `ISSUE`   | `index.html` still includes an import map for React/ReactDOM via `esm.sh`, which conflicts with Vite’s `node_modules` bundling. This should be removed to avoid duplicate React copies. |
| A5  | **Vite config defines \*\***`process.env.GEMINI_API_KEY`\*\* | `STUB`    | The key is wired in `vite.config.ts` but no code uses it. Likely leftover template wiring.                                                                                              |
| A6  | **package.json name mismatch**                               | `ISSUE`   | Package name is still `copy-of-daily-wellness-log`, not `diet-logger`.                                                                                                                  |
| A7  | **No data persistence layer**                                | `MISSING` | No localStorage/IndexedDB or backend. All state is in-memory `useState`.                                                                                                                |
| A8  | **No routing**                                               | `MISSING` | Single-screen app. “Proceed to Review” is an alert, not navigation.                                                                                                                     |
| A9  | **All state lives in App.tsx**                               | `ISSUE`   | Every feature’s state is declared in `App.tsx` and passed as props, creating heavy re-renders and prop drilling.                                                                        |
| A10 | **No testing**                                               | `MISSING` | No test framework or tests (no Vitest/Jest/Cypress).                                                                                                                                    |
| A11 | **No linting/formatting**                                    | `MISSING` | No ESLint/Prettier configuration.                                                                                                                                                       |

---

### B. Features & Components

| #   | Component                         | Status                 | Details                                                                                                                                             |
| --- | --------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| B1  | **Date header + DatePickerModal** | `BUILT`                | Displays current date, tappable calendar icon opens a bottom-sheet date picker. Custom-built calendar grid.                                         |
| B2  | **SleepSection**                  | `BUILT`                | Star rating (1-5), bed time, wake time, notes textarea. Uses `navigator.vibrate()`; support is limited to certain browsers/devices.                 |
| B3  | **TimePickerModal**               | `BUILT` `ISSUE`        | Custom scroll-based time picker (hours 0-23, minutes 0-59). Scroll snapping is inconsistent across browsers and screen sizes.                       |
| B4  | **ExerciseSection**               | `BUILT` `ISSUE`        | Toggle enable/disable, type selector, duration slider, start time picker. The range input styling is WebKit-only and can look wrong in Firefox.     |
| B5  | **PressureSection**               | `BUILT`                | 5-level emoji-based stress selector (Low → High). Clean implementation.                                                                             |
| B6  | **DailyNotesSection**             | `BUILT` `STUB`         | Textarea with toggle + voice recording button. Voice recording is fake: it inserts a hardcoded sentence after a timer.                              |
| B7  | **VoiceWaveform**                 | `BUILT`                | Purely visual — 4 animated bars. No audio processing.                                                                                               |
| B8  | **SupplementsSection**            | `BUILT` `ISSUE`        | List of supplement pills with inline name/qty editing and delete. Includes dead/unfinished edit-mode code (`editId`) and related comments.          |
| B9  | **SupplementModal**               | `BUILT`                | Bottom-sheet search modal with hardcoded `COMMON_SUPPLEMENTS` list. Can add custom supplement.                                                      |
| B10 | **FoodPhotosSection**             | `BUILT` `STUB` `ISSUE` | Shows 3 hardcoded photos. “Re-enhance” is a fake shimmer + toast. `capture="environment"` on file input is only honored by some mobile browsers.    |
| B11 | **ImageViewerModal**              | `DEAD`                 | Fullscreen image viewer modal is implemented but never imported or used.                                                                            |
| B12 | **FoodDetailsSection**            | `BUILT` `STUB`         | “AI Suggestions based on photo” chips are hardcoded strings, not generated.                                                                         |
| B13 | **FoodSearchModal**               | `BUILT`                | Bottom-sheet search with hardcoded `COMMON_FOODS` list. Can add custom item.                                                                        |
| B14 | **Toast**                         | `BUILT`                | Generic toast notification. Auto-dismisses after 3 seconds.                                                                                         |
| B15 | **Background glow effect**        | `BUILT`                | Radial gradient follows touch/mouse position for ambient glow.                                                                                      |
| B16 | **"Proceed to Review" button**    | `STUB`                 | Fixed bottom button. Validation: requires `sleepQuality > 0` AND `supplements.length > 0`. Click triggers animation + alert. No real review screen. |
| B17 | **Submit animation**              | `BUILT`                | CSS transition (`-translate-x-full opacity-0`) on submit. Decorative only — leads to an alert.                                                      |

---

### C. Data Model Issues

| #   | Item                                         | Status    | Details                                                                                                                                                                |
| --- | -------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C1  | **Food items are hardcoded defaults**        | `STUB`    | App starts with 2 hardcoded food items. No persistence.                                                                                                                |
| C2  | **Supplements are hardcoded defaults**       | `STUB`    | App starts with 3 hardcoded supplements. No persistence.                                                                                                               |
| C3  | **Food photos are hardcoded and not synced** | `ISSUE`   | `foodPhotos` state in `App.tsx` is never updated. `FoodPhotosSection` manages its own `localPhotos`, so the parent never knows about selection changes or new uploads. |
| C4  | **No date-based data separation**            | `MISSING` | Changing the date only updates the header text; no data is loaded/saved per day.                                                                                       |
| C5  | **FoodItem type lacks nutrition data**       | `MISSING` | `FoodItem` has `id, name, amount, meal, time` but no calories/macros.                                                                                                  |

---

### D. UX / Visual Issues

| #   | Item                                            | Status    | Details                                                                                                      |
| --- | ----------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| D1  | **Dark mode only**                              | `ISSUE`   | HTML has `class="dark"` hardcoded. Light theme colors exist but there is no toggle or runtime switch.        |
| D2  | **DatePicker weekday header has duplicate key** | `ISSUE`   | `['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>...)` — duplicate keys for 'T' and 'S'.           |
| D3  | **No loading states**                           | `MISSING` | No skeletons/spinners/loading indicators (currently no async data).                                          |
| D4  | **No error handling**                           | `MISSING` | No error boundaries or user-facing error states.                                                             |
| D5  | **Pressure level intermediate labels are "."**  | `ISSUE`   | Middle 3 pressure levels use `label: '.'` and `text-transparent` to maintain spacing. This is a layout hack. |

---

### E. Code Quality

| #   | Item                                                      | Details                                                                                          |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| E1  | **No code splitting**                                     | Everything ships in one bundle; no lazy loading.                                                 |
| E2  | **Prop drilling depth 1-2**                               | Not terrible yet, but all state in `App.tsx` means every section re-renders on any state change. |
| E3  | **Inconsistent formatting**                               | Mix of 2-space and 4-space indentation. Some files use trailing semicolons inconsistently.       |
| E4  | **Dead \*\***`editId`\***\* state in SupplementsSection** | `editId` is declared but never set to anything meaningful — inputs are always editable.          |
| E5  | **Unsplash URLs are hardcoded**                           | External image URLs can break anytime. Better to use local assets or a proper image service.     |

---

### Summary Counts

| Category                   | Count                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Fully built features       | 12                                                                                                                       |
| Stub/fake features         | 7 (Gemini API wiring, voice recording, AI suggestions, photo enhance, review screen, default foods, default supplements) |
| Dead code                  | 2 (ImageViewerModal, `editId` in supplements)                                                                            |
| Issues found               | 12                                                                                                                       |
| Missing features (web app) | 8                                                                                                                        |

This is a **UI-forward web prototype** with solid component structure but limited real data flows. To make it a great web app, the biggest wins are persistence, real review/navigation, and replacing stubs with real implementations.
