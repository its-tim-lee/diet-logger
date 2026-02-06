## Why

Currently, only ExerciseSection and DailyNotesSection have toggle functionality, creating an inconsistent user experience. Users need a consistent way to collapse/expand all sections to focus on what matters for their daily check-in workflow.

## What Changes

- Add toggle functionality to all sections that currently lack it (Sleep, Pressure, Supplements, Food Photos, Food Details)
- Standardize toggle behavior across all sections with consistent visual feedback
- Implement localStorage persistence so each section remembers its expanded/collapsed state across sessions
- Apply consistent collapsed state styling (grayed-out header, hidden content)
- Migrate existing ExerciseSection and DailyNotesSection toggles to use the new standardized system

## Capabilities

### New Capabilities
- `section-toggle-hook`: Custom React hook for managing section toggle state with localStorage persistence
- `section-collapse-animation`: Consistent visual transitions for expanding/collapsing sections

### Modified Capabilities

None - this enhances the UI but doesn't change existing capability requirements.

## Impact

**Affected Components:**
- `App.tsx` - Update state management to use new toggle hook
- `components/SleepSection.tsx` - Add toggle functionality
- `components/ExerciseSection.tsx` - Migrate to standardized toggle system
- `components/PressureSection.tsx` - Add toggle functionality
- `components/DailyNotesSection.tsx` - Migrate to standardized toggle system
- `components/SupplementsSection.tsx` - Add toggle functionality
- `components/FoodPhotosSection.tsx` - Add toggle functionality
- `components/FoodDetailsSection.tsx` - Add toggle functionality

**New Files:**
- `hooks/useToggleState.ts` - Shared toggle state management hook

**Dependencies:**
- No new dependencies required (uses existing React hooks and localStorage API)

**User Data:**
- localStorage keys: `wellness-section-{sectionName}` for each section's toggle state
