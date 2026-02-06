## Why

The recent section toggle standardization work (commit e7cf745) achieved behavioral consistency but left visual inconsistencies and code cruft. Three sections use `chevron-down` icons while four use `expand-more`, creating a jarring user experience. Additionally, collapsed sections retain full padding, making them appear bulky instead of compact. Finally, backwards compatibility props remain in ExerciseSection and DailyNotesSection despite no longer being used by App.tsx.

## What Changes

- Standardize all 7 sections to use `material-symbols:expand-more` icon (change SupplementsSection, FoodPhotosSection, FoodDetailsSection from `chevron-down`)
- Add dynamic padding: collapsed sections use `py-3 px-5`, expanded sections use `p-5`, with smooth 200ms transition
- Remove unused `enabled`/`setEnabled` props from ExerciseSection and DailyNotesSection
- Ensure all sections follow identical visual patterns for toggling behavior

## Capabilities

### New Capabilities
- `compact-collapsed-sections`: Sections dynamically adjust padding when collapsed to appear compact and clean

### Modified Capabilities
- `section-toggle-hook`: No requirement changes, but usage pattern simplified by removing backwards compatibility
- `section-collapse-animation`: Enhanced to include padding transitions alongside existing height/opacity animations

## Impact

**Affected Components:**
- `components/SupplementsSection.tsx` - Icon change + padding
- `components/FoodPhotosSection.tsx` - Icon change + padding
- `components/FoodDetailsSection.tsx` - Icon change + padding
- `components/SleepSection.tsx` - Padding only
- `components/ExerciseSection.tsx` - Props removal + padding
- `components/PressureSection.tsx` - Padding only
- `components/DailyNotesSection.tsx` - Props removal + padding

**User Experience:**
- More polished, consistent visual appearance across all sections
- Collapsed sections take less vertical space, improving scanability
- Smooth animations make the interface feel more refined

**No Breaking Changes:**
- All changes are internal to components
- No API or prop interface changes (only removals of unused props)
