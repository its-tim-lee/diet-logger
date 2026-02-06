## Why

The application currently has 7 section components (SleepSection, ExerciseSection, PressureSection, DailyNotesSection, SupplementsSection, FoodPhotosSection, FoodDetailsSection) that implement collapsible functionality with significant UI/UX inconsistencies. These inconsistencies create a fragmented user experience, accessibility issues, and maintenance challenges. Users encounter different interaction patterns, visual styles, and behaviors across sections that should be uniform, making the interface feel unpolished and harder to learn.

## What Changes

- Standardize toggle interaction pattern across all sections (consistent clickable area and keyboard handling)
- Fix collapsed sections to show only 3 elements (icon, title, toggler) - currently some sections show action buttons and badges when collapsed
- Unify chevron icon size to `text-2xl` across all sections (3 sections currently use `text-xl`)
- Standardize chevron rotation direction (consistent counter-clockwise rotation)
- Implement consistent toggle button styling (single pattern for all sections)
- Standardize section spacing values (remove unique `space-y-5` value)
- Ensure all section header icons use consistent size classes
- Implement uniform keyboard accessibility pattern across all sections
- Standardize action button icon sizes
- Remove backwards compatibility props from ExerciseSection and DailyNotesSection

## Capabilities

### New Capabilities
- `section-collapse-pattern`: Standard pattern for collapsible sections including toggle interaction, collapsed state rendering, animations, and keyboard accessibility

### Modified Capabilities
<!-- No existing specs are being modified - this is establishing a new standard pattern -->

## Impact

**Components Affected** (7 files):
- `components/SleepSection.tsx`
- `components/ExerciseSection.tsx`
- `components/PressureSection.tsx`
- `components/DailyNotesSection.tsx`
- `components/SupplementsSection.tsx`
- `components/FoodPhotosSection.tsx`
- `components/FoodDetailsSection.tsx`

**User Experience**:
- Improved consistency and learnability
- Better keyboard navigation across all sections
- Cleaner collapsed states (no action buttons visible when collapsed)

**Maintenance**:
- Single source of truth for section collapse patterns
- Easier to add new sections in the future
- Reduced code duplication
