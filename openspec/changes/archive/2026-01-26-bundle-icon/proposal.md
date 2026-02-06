## Why

The application currently loads Material Symbols icon font (~200KB) from Google Fonts CDN at runtime, while also having @iconify/react installed but barely used (only 1 usage vs 30+ font-based icons). This creates external dependency, increases bundle size, breaks offline functionality, and maintains inconsistent icon APIs across the codebase. Bundling icons via @iconify/react will reduce icon payload by ~92%, eliminate CDN dependency, enable offline use, and unify icon usage with a single consistent API.

## What Changes

- Remove Google Fonts Material Symbols CDN link from `index.html`
- Replace all `<span className="material-symbols-outlined">` instances with `<Icon icon="material-symbols:name" />`
- Add `import { Icon } from '@iconify/react'` to components currently missing it
- Convert icon names from underscore format to hyphen format (e.g., `calendar_today` → `material-symbols:calendar-today`)
- Standardize on @iconify/react for all icon usage throughout codebase

## Capabilities

### New Capabilities

- `bundled-icon-components`: SVG-based icon rendering via @iconify/react with Material Symbols icon set, bundling only used icons as inline SVG components

### Modified Capabilities

<!-- No existing capabilities are having their requirements changed -->

## Impact

**Files Modified (13 components):**

- `App.tsx` - Convert 1 remaining `<span>` icon, already has Icon import
- `components/SleepSection.tsx` - Add Icon import, convert `bedtime` icon
- `components/ExerciseSection.tsx` - Add Icon import, convert `ic:baseline-fitness-center` (already using Icon) and 2 span icons (`add`, `schedule`)
- `components/PressureSection.tsx` - Add Icon import, convert `speed` icon
- `components/DailyNotesSection.tsx` - Add Icon import, convert `edit_note` and `mic` icons
- `components/SupplementsSection.tsx` - Add Icon import, convert `medication`, `add`, `delete` icons
- `components/FoodPhotosSection.tsx` - Add Icon import, convert `restaurant`, `add_a_photo`, `check`, `add`, `auto_fix_high` icons
- `components/FoodDetailsSection.tsx` - Add Icon import, convert `menu_book`, `add`, `edit`/`check`, `delete`, `auto_awesome`, `add` icons
- `components/DatePickerModal.tsx` - Add Icon import, convert `chevron_left`, `chevron_right` icons
- `components/FoodSearchModal.tsx` - Add Icon import, convert `search`, `add_circle`, `add` icons
- `components/SupplementModal.tsx` - Add Icon import, convert `search`, `add_circle`, `add` icons
- `components/ImageViewerModal.tsx` - Add Icon import, convert `close` icon
- `components/Toast.tsx` - Add Icon import, convert `check_circle` icon
- `index.html` - Remove Material Symbols font CDN link (line 10)

**Icon Name Conversions:**

- Underscore → hyphen format (e.g., `add_circle` → `add-circle`)
- Prefix with `material-symbols:` namespace
- Total unique icons: ~20 different Material Symbols icons

**Bundle Size:**

- Material Symbols font CDN: ~200KB removed
- Bundled SVG icons: ~15KB added (~1KB per icon × 15 average)
- Net reduction: ~185KB (92% savings)

**Dependencies:**

- `@iconify/react` already installed in package.json (no new dependencies)

**No Breaking Changes:**

- Visual output identical (same Material Symbols icons)
- Icon appearance preserved (size, color via className props)
- No changes to component props or behavior
