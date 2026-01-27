## Codebase Audit: diet-logger

### Legend

| Tag | Meaning |
|---|---|
| `BUILT` | Feature is implemented and functional |
| `STUB` | Feature exists but is simulated/hardcoded (not real) |
| `DEAD` | Code exists but is unused / unreachable |
| `ISSUE` | Something is wrong or inappropriate |
| `MISSING` | Feature expected but not built |
| `MIGRATION` | Relevant to React Native migration |

---

### A. Architecture & Tooling

| # | Item | Status | Details |
|---|---|---|---|
| A1 | **React web app (Vite + React 19 + Tailwind CDN)** | `MIGRATION` | Entire app is a web SPA. Uses `react-dom`, `<div>`, HTML `<input>`, CSS classes, etc. None of these exist in React Native. This is the fundamental migration scope. |
| A2 | **Tailwind via CDN script tag** | `ISSUE` `MIGRATION` | Tailwind is loaded via `<script src="https://cdn.tailwindcss.com">` in `index.html`. Not a build-time integration. This means: (1) no tree-shaking, (2) no offline support, (3) runtime overhead, (4) not usable in React Native at all. RN would use NativeWind or StyleSheet. |
| A3 | **Google Material Symbols via CDN** | `MIGRATION` | Icons loaded via Google Fonts CDN (`material-symbols-outlined`). Used extensively across all components as `<span className="material-symbols-outlined">icon_name</span>`. RN has no `<span>` and would need a library like `@expo/vector-icons` or `react-native-vector-icons`. |
| A4 | **Plus Jakarta Sans font via Google Fonts CDN** | `MIGRATION` | Custom font loaded via CDN link. In RN, fonts must be bundled and loaded via `expo-font` or similar. |
| A5 | **Import map for React (esm.sh)** | `ISSUE` | `index.html` has an import map pointing to `esm.sh` for React/React-DOM. This conflicts with the `node_modules` setup from `package.json`. Likely a leftover from AI Studio (the app was originally "Copy of Daily Wellness Log" generated from Google AI Studio). |
| A6 | **Vite config defines `process.env.GEMINI_API_KEY`** | `STUB` | The Gemini API key is wired up in vite.config.ts but **no code actually uses it**. No fetch calls, no API integrations exist anywhere in the codebase. This is a leftover from the AI Studio template. |
| A7 | **No CSS file exists** | `ISSUE` | `index.html` references `<link rel="stylesheet" href="/index.css">` but no `index.css` file exists in the project. Styles are all inline via Tailwind classes + the `<style>` block in HTML. This is a silent 404. |
| A8 | **package.json name mismatch** | `ISSUE` | `package.json` has `"name": "copy-of-daily-wellness-log"` — a leftover from the AI Studio template. Not "diet-logger". |
| A9 | **No data persistence layer** | `MISSING` | No localStorage, sessionStorage, IndexedDB, or any backend/API calls. All state is in-memory `useState`. Closing the app loses everything. |
| A10 | **No routing** | `MISSING` | Single-screen app. The "Proceed to Review" button does `alert("Review Screen")` — no actual navigation to a review screen. In RN, you'd need React Navigation or Expo Router. |
| A11 | **All state lives in App.tsx** | `ISSUE` `MIGRATION` | Every piece of state (sleep, exercise, pressure, notes, supplements, food) is declared at the top of `App.tsx` and passed down as props. No state management library. For RN migration, should consider Zustand or similar. |
| A12 | **No testing** | `MISSING` | Zero test files. No test framework configured (no jest, vitest, etc. in devDependencies). |
| A13 | **No linting/formatting** | `MISSING` | No ESLint, Prettier, or other code quality tools configured. |

---

### B. Features & Components

| # | Component | Status | Details |
|---|---|---|---|
| B1 | **Date header + DatePickerModal** | `BUILT` | Displays current date, tappable calendar icon opens a bottom-sheet date picker. Custom-built calendar grid. Works. **Migration note**: Would need `react-native-calendars` or a custom RN implementation. The bottom-sheet modal pattern translates well to RN (`@gorhom/bottom-sheet`). |
| B2 | **SleepSection** | `BUILT` | Star rating (1-5), bed time, wake time, notes textarea. Uses `navigator.vibrate()` for haptic feedback (web API — works on Android Chrome, not iOS Safari). **Migration note**: RN has `expo-haptics` for proper cross-platform haptics. |
| B3 | **TimePickerModal** | `BUILT` `ISSUE` | Custom scroll-based time picker (hours 0-23, minutes 0-59). Renders all 24 hours and all 60 minutes as scrollable divs. **Issue**: This is a poor UX choice — scroll-snapping doesn't work reliably on mobile web. Would be replaced by native time pickers in RN (`@react-native-community/datetimepicker`). |
| B4 | **ExerciseSection** | `BUILT` | Toggle enable/disable, type selector (Cardio/Workout/Yoga + custom), duration slider (0-120 min), start time picker. **Issue**: `<input type="range">` has custom CSS for webkit only — may not render properly on non-webkit browsers. **Migration**: RN slider → `@react-native-community/slider`. |
| B5 | **PressureSection** | `BUILT` | 5-level emoji-based stress selector (Low → High). Clean implementation. Uses Material Symbols for sentiment faces. Includes haptic feedback. |
| B6 | **DailyNotesSection** | `BUILT` `STUB` | Textarea with toggle + voice recording button. **The voice recording is entirely fake**: pressing the mic button starts a "recording" animation, then after 3 seconds (or on stop) it appends the hardcoded string `"Had a really productive day today. Felt energized after the workout."`. No actual speech-to-text. |
| B7 | **VoiceWaveform** | `BUILT` | Purely visual — 4 animated bars. No audio processing. Part of the stub voice recording. |
| B8 | **SupplementsSection** | `BUILT` | List of supplement pills with inline name/qty editing and delete. Add via SupplementModal search. Works. **Issue**: There's dead code referencing an `editId` state and conditional disabled logic on supplement name inputs (lines 64), with a large comment about "Pencil transforms" spec — but the feature is half-implemented. Supplements are always editable via the input, and there's no pencil icon toggle. |
| B9 | **SupplementModal** | `BUILT` | Bottom-sheet search modal with hardcoded `COMMON_SUPPLEMENTS` list. Can add custom supplement by typing a name not in the list. Works. |
| B10 | **FoodPhotosSection** | `BUILT` `STUB` | Shows 3 hardcoded Unsplash photos. Can toggle selection, upload new photo via file input. **"Re-enhance" button is a stub** — it plays a shimmer animation for 2 seconds and fires a toast "Photo Enhanced Successfully". No actual image processing. **Issue**: Uses `capture="environment"` on file input (rear camera hint) which is web-only and ignored in RN. |
| B11 | **ImageViewerModal** | `DEAD` | Fully implemented modal for viewing images fullscreen. **Never imported or used anywhere**. Dead code. |
| B12 | **FoodDetailsSection** | `BUILT` | List of food items with edit/delete, "AI Suggestions" chips (hardcoded: "Lemon Dressing", "Feta Cheese", "Avocado"). Chips animate out on add. **Issue**: The "AI Suggestions based on photo" label implies AI analysis of food photos, but it's just hardcoded strings. |
| B13 | **FoodSearchModal** | `BUILT` | Bottom-sheet search with hardcoded `COMMON_FOODS` list. Can add custom item. Works. |
| B14 | **Toast** | `BUILT` | Generic toast notification. Auto-dismisses after 3 seconds. Works. |
| B15 | **Background glow effect** | `BUILT` `ISSUE` | Radial gradient follows touch/mouse position. Listens to both `touchmove` and `mousemove` on `window`. **Issue for RN**: This is a purely DOM-based effect with no RN equivalent. Would need `react-native-reanimated` + gesture handler for something similar, or just drop it. |
| B16 | **"Proceed to Review" button** | `STUB` | Fixed bottom button. Validation: requires `sleepQuality > 0` AND `supplements.length > 0`. On click, does a slide-left animation and then `alert("Review Screen (Transition Complete)")`. No actual review screen exists. |
| B17 | **Submit animation** | `BUILT` | CSS transition (`-translate-x-full opacity-0`) on submit. Decorative only — leads to an alert. |

---

### C. Data Model Issues

| # | Item | Status | Details |
|---|---|---|---|
| C1 | **Food items are hardcoded defaults** | `STUB` | App starts with 2 hardcoded food items ("Grilled Chicken Breast", "Quinoa Salad"). No persistence. |
| C2 | **Supplements are hardcoded defaults** | `STUB` | App starts with 3 hardcoded supplements ("Omega-3 Fish Oil", "Vitamin D3", "Multivitamin"). No persistence. |
| C3 | **Food photos are hardcoded and not synced** | `ISSUE` | `foodPhotos` state in `App.tsx` is never updated (no setter exposed — `const [foodPhotos] = useState<FoodPhoto[]>([...])`). But `FoodPhotosSection` creates its own `localPhotos` state from the props and manages it independently. The parent never knows about selection changes or new uploads. |
| C4 | **No date-based data separation** | `MISSING` | Changing the date via DatePickerModal updates the header text but doesn't load/save any data for that date. Every date shows the same in-memory data. |
| C5 | **FoodItem type lacks nutrition data** | `MISSING` | `FoodItem` has `id, name, amount, meal, time` but no calories, macros, or any nutritional info — which you'd expect for a "diet logger". |

---

### D. UX / Visual Issues

| # | Item | Status | Details |
|---|---|---|---|
| D1 | **Dark mode only** | `ISSUE` | HTML has `class="dark"` hardcoded. Light mode colors are defined (`background-light`) but the toggle mechanism to switch doesn't exist. All component styles assume dark theme. |
| D2 | **DatePicker weekday header has duplicate key** | `ISSUE` | `['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d}>...)` — 'T' and 'S' appear twice, causing React duplicate key warnings. |
| D3 | **No loading states** | `MISSING` | No skeleton screens, spinners, or loading indicators anywhere (though currently there's no async data to load). |
| D4 | **No error handling** | `MISSING` | No error boundaries, no try-catch around any operations, no user-facing error messages. |
| D5 | **Pressure level intermediate labels are "."** | `ISSUE` | The middle 3 pressure levels have `label: '.'` and are rendered as transparent text (`text-transparent`). This is a hack to maintain spacing. A proper implementation would just not render the label for those items. |

---

### E. React Native Migration Analysis

| # | Area | Scope | Details |
|---|---|---|---|
| E1 | **All HTML elements → RN components** | `HIGH` | Every `<div>`, `<button>`, `<input>`, `<textarea>`, `<img>`, `<span>`, `<section>`, `<label>`, `<form>` must become `<View>`, `<TouchableOpacity>`/`<Pressable>`, `<TextInput>`, `<Image>`, `<Text>`, etc. This affects every single file. |
| E2 | **All Tailwind classes → StyleSheet or NativeWind** | `HIGH` | Two options: (1) Use [NativeWind](https://www.nativewind.dev/) which brings Tailwind-like classes to RN, or (2) rewrite all styles as `StyleSheet.create()`. NativeWind would minimize rewrite scope but adds a dependency. |
| E3 | **CSS animations → Reanimated** | `MEDIUM` | `animate-fadeIn`, `animate-pulse-glow`, `animate-shimmer`, `animate-wave`, `animate-fade-out` — all pure CSS. Would need `react-native-reanimated` or `Animated` API. |
| E4 | **Bottom-sheet modals** | `MEDIUM` | 4 bottom-sheet modals (DatePicker, TimePicker, FoodSearch, SupplementModal) use CSS `translate-y` animation. RN equivalent: `@gorhom/bottom-sheet`. |
| E5 | **File input / Camera** | `MEDIUM` | `<input type="file" accept="image/*" capture="environment">` → `expo-image-picker` or `expo-camera`. |
| E6 | **Haptics** | `LOW` | `navigator.vibrate()` → `expo-haptics` (straightforward swap). |
| E7 | **Scroll containers** | `MEDIUM` | Horizontal scrolls (food photos, exercise types, suggestions) use `overflow-x-auto`. RN needs `<ScrollView horizontal>` or `<FlatList>`. |
| E8 | **Custom range slider** | `LOW` | `<input type="range">` → `@react-native-community/slider`. |
| E9 | **Time picker scroll** | `MEDIUM` | Custom scroll-based time picker with snap → Should be replaced with native date/time picker or a proper wheel picker component in RN. |
| E10 | **No `react-dom`** | `HIGH` | Entry point uses `ReactDOM.createRoot`. RN uses `AppRegistry.registerComponent` or Expo's entry system. |
| E11 | **Recommended RN stack (2026)** | — | Based on current best practices: **Expo SDK 54+** (managed workflow), **Expo Router** or **React Navigation** for navigation, **Zustand** for client state, **TanStack Query** for server state (when backend is added), **NativeWind** for styling, **expo-haptics** for haptics, **react-native-reanimated** for animations, **EAS** for builds. |

---

### F. Missing Features for a Viable Mobile App

| # | Feature | Priority | Details |
|---|---|---|---|
| F1 | **Data persistence** | `CRITICAL` | Need a local database (SQLite via `expo-sqlite`, or AsyncStorage for simpler data). Currently everything is lost on refresh. |
| F2 | **User authentication** | `HIGH` | No login/signup. If multi-device sync is desired, need auth. Even for single-device, useful for cloud backup. |
| F3 | **Review screen** | `HIGH` | The "Proceed to Review" button goes nowhere. Need an actual review/summary screen. |
| F4 | **Navigation / multi-screen** | `HIGH` | Currently single-page. A mobile app needs at minimum: daily log screen, review/summary screen, history/calendar view. |
| F5 | **History / data over time** | `HIGH` | No way to view past entries. A diet logger's value comes from tracking trends. |
| F6 | **Real voice-to-text** | `MEDIUM` | Current stub. RN has `expo-speech` for TTS, and various STT libraries. |
| F7 | **Real AI food photo analysis** | `MEDIUM` | The Gemini API key is already wired up but unused. This was presumably the intended feature. |
| F8 | **Nutrition data / calorie tracking** | `MEDIUM` | FoodItem type has no nutrition info. A "diet logger" should probably log calories/macros. |
| F9 | **Notifications / reminders** | `LOW` | Mobile apps benefit from push notifications to remind users to log. `expo-notifications`. |
| F10 | **Export / sharing** | `LOW` | No way to export or share logged data. |
| F11 | **Settings screen** | `LOW` | No user preferences (units, reminder times, default supplements, etc.). |
| F12 | **Onboarding flow** | `LOW` | No first-run experience. |

---

### G. Code Quality

| # | Item | Details |
|---|---|---|
| G1 | **No code splitting** | Everything is in one bundle. No lazy loading. |
| G2 | **Prop drilling depth 1-2** | Not terrible yet, but all state in App.tsx means every section re-renders on any state change. |
| G3 | **Inconsistent formatting** | Mix of 2-space and 4-space indentation across files. Some files use trailing semicolons inconsistently. |
| G4 | **Dead `editId` state in SupplementsSection** | `editId` is declared but never set to anything meaningful — inputs are always editable. |
| G5 | **Unsplash URLs are hardcoded** | External image URLs that could break anytime. Should use local assets or a proper image service. |

---

### Summary Counts

| Category | Count |
|---|---|
| Fully built features | 11 |
| Stub/fake features | 5 (voice recording, AI suggestions, photo enhance, review screen, Gemini API) |
| Dead code | 2 (ImageViewerModal, editId in supplements) |
| Issues found | 10 |
| Missing features for mobile | 12 |
| Files affected by RN migration | All 16 source files (100%) |

This is essentially a **UI prototype / proof-of-concept** built as a web app, likely generated from Google AI Studio and then manually enhanced. To become a real mobile app, it needs: (1) full rewrite to React Native / Expo, (2) data persistence, (3) navigation, (4) replacing all stubs with real implementations, and (5) removing dead code and template leftovers.

---

### Sources for RN migration research:
- [React Native + Expo vs Bare Workflow (DEV Community)](https://dev.to/lucas_wade_0596/react-native-expo-vs-bare-workflow-which-should-you-choose-47lo)
- [Expo 2026 Overview](https://metadesignsolutions.com/expo-2026-the-best-way-to-build-cross-platform-apps/)
- [React Native in 2026 (Nucamp)](https://www.nucamp.co/blog/react-native-in-2026-build-ios-and-android-apps-with-javascript)
- [State Management in 2026 (Nucamp)](https://www.nucamp.co/blog/state-management-in-2026-redux-context-api-and-modern-patterns)
- [React Navigation Native Stack](https://reactnavigation.org/docs/native-stack-navigator/)
- [Expo Bare Workflow Overview](https://docs.expo.dev/bare/overview/)
