## 1. Icon Standardization

- [x] 1.1 Change SupplementsSection toggle icon from `chevron-down` to `expand-more`
- [x] 1.2 Change FoodPhotosSection toggle icon from `chevron-down` to `expand-more`
- [x] 1.3 Change FoodDetailsSection toggle icon from `chevron-down` to `expand-more`

## 2. Compact Collapsed State - Add Dynamic Padding

- [x] 2.1 Update SleepSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.2 Update SleepSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.3 Update ExerciseSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.4 Update ExerciseSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.5 Update PressureSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.6 Update PressureSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.7 Update DailyNotesSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.8 Update DailyNotesSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.9 Update SupplementsSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.10 Update SupplementsSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.11 Update FoodPhotosSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.12 Update FoodPhotosSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element
- [x] 2.13 Update FoodDetailsSection: add dynamic padding classes `${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}` to section element
- [x] 2.14 Update FoodDetailsSection: add transition classes `transition-all duration-200 motion-reduce:transition-none` to section element

## 3. Remove Backwards Compatibility Props

- [x] 3.1 Remove `enabled?: boolean` prop from ExerciseSection TypeScript interface
- [x] 3.2 Remove `setEnabled?: (val: boolean) => void` prop from ExerciseSection TypeScript interface
- [x] 3.3 Remove `const expanded = enabled ?? isExpanded` logic from ExerciseSection
- [x] 3.4 Remove `handleToggle` wrapper function from ExerciseSection
- [x] 3.5 Update ExerciseSection toggle button to use `onClick={toggle}` directly
- [x] 3.6 Replace all uses of `expanded` variable with `isExpanded` in ExerciseSection
- [x] 3.7 Remove `enabled?: boolean` prop from DailyNotesSection TypeScript interface
- [x] 3.8 Remove `setEnabled?: (val: boolean) => void` prop from DailyNotesSection TypeScript interface
- [x] 3.9 Remove `const expanded = enabled ?? isExpanded` logic from DailyNotesSection
- [x] 3.10 Remove `handleToggle` wrapper function from DailyNotesSection
- [x] 3.11 Update DailyNotesSection toggle button to use `onClick={toggle}` directly
- [x] 3.12 Replace all uses of `expanded` variable with `isExpanded` in DailyNotesSection

## 4. Verification

- [x] 4.1 Verify all 7 sections use `material-symbols:expand-more` icon
- [x] 4.2 Verify all 7 sections use identical padding pattern (p-5 when expanded, py-3 px-5 when collapsed)
- [x] 4.3 Verify all 7 sections include transition-all duration-200 classes
- [x] 4.4 Verify ExerciseSection and DailyNotesSection no longer have enabled/setEnabled props
- [ ] 4.5 Manual testing: toggle each section and verify smooth padding animation
- [ ] 4.6 Manual testing: verify collapsed sections appear compact and visually consistent
