## 1. Pattern Reference and Preparation

- [ ] 1.1 Review ExerciseSection as reference implementation (closest to target pattern)
- [ ] 1.2 Document the standard toggle button JSX structure to copy-paste across components
- [ ] 1.3 Verify Icon component is imported in all 7 section files

## 2. Fix SleepSection (Pattern A → Standard)

- [ ] 2.1 Remove `onClick={handleToggle}`, `cursor-pointer`, `role="button"`, `tabIndex={0}` from header div
- [ ] 2.2 Replace chevron with standard toggle button structure (h-8 w-8, rounded-lg, hover:bg-gray-700/50)
- [ ] 2.3 Update chevron rotation from `rotate-[-90deg]` to `-rotate-90`
- [ ] 2.4 Add inline `handleKeyDown` function with Enter/Space support
- [ ] 2.5 Add `aria-label` to toggle button (dynamic based on isExpanded)
- [ ] 2.6 Add `text-2xl` class to section header icon (sleep icon)
- [ ] 2.7 Verify section uses `space-y-4` (currently uses `space-y-6` - update if needed)

## 3. Fix PressureSection (Pattern A → Standard)

- [ ] 3.1 Remove `onClick={handleToggle}`, `cursor-pointer`, `role="button"`, `tabIndex={0}` from header div
- [ ] 3.2 Replace chevron with standard toggle button structure (h-8 w-8, rounded-lg, hover:bg-gray-700/50)
- [ ] 3.3 Update chevron rotation from `rotate-[-90deg]` to `-rotate-90`
- [ ] 3.4 Add inline `handleKeyDown` function with Enter/Space support
- [ ] 3.5 Add `aria-label` to toggle button (dynamic based on isExpanded)
- [ ] 3.6 Add `text-2xl` class to section header icon (pressure icon)
- [ ] 3.7 Verify section uses `space-y-4` (currently uses - check and update if needed)

## 4. Fix ExerciseSection (Pattern B → Standard)

- [ ] 4.1 Update toggle button: change `p-2 hover:bg-gray-700/50 rounded-lg` to `h-8 w-8 hover:bg-gray-700/50 rounded-lg`
- [ ] 4.2 Add inline `handleKeyDown` function with Enter/Space support
- [ ] 4.3 Add `aria-label` to toggle button (dynamic based on expanded state)
- [ ] 4.4 Remove backwards compatibility props: `enabled?: boolean` and `setEnabled?: (val: boolean) => void`
- [ ] 4.5 Verify chevron is `text-2xl` with `-rotate-90` when collapsed (already correct)
- [ ] 4.6 Verify section header icon has `text-2xl` class (already correct)
- [ ] 4.7 Verify section uses `space-y-4` (currently uses `space-y-6` - update if needed)

## 5. Fix DailyNotesSection (Pattern B → Standard)

- [ ] 5.1 Update toggle button: change `p-2 hover:bg-gray-700/50 rounded-lg` to `h-8 w-8 hover:bg-gray-700/50 rounded-lg`
- [ ] 5.2 Add inline `handleKeyDown` function with Enter/Space support
- [ ] 5.3 Add `aria-label` to toggle button (dynamic based on expanded state)
- [ ] 5.4 Remove backwards compatibility props: `enabled?: boolean` and `setEnabled?: (val: boolean) => void`
- [ ] 5.5 Verify chevron is `text-2xl` with `-rotate-90` when collapsed (already correct)
- [ ] 5.6 Verify section header icon has `text-2xl` class (already correct)
- [ ] 5.7 Verify section uses `space-y-4` (already correct)

## 6. Fix SupplementsSection (Pattern C → Standard)

- [ ] 6.1 Update toggle button: change `h-8 w-8 rounded-full hover:bg-input-bg` to `h-8 w-8 rounded-lg hover:bg-gray-700/50`
- [ ] 6.2 Update chevron size from `text-xl` to `text-2xl`
- [ ] 6.3 Simplify inline `onKeyDown` to use `handleKeyDown` function with Enter/Space support
- [ ] 6.4 Add `aria-label` to toggle button (dynamic based on isExpanded)
- [ ] 6.5 Wrap add supplement button in `{isExpanded && (...)}` conditional to hide when collapsed
- [ ] 6.6 Add `text-2xl` class to section header icon (supplements icon)
- [ ] 6.7 Verify section uses `space-y-4` (already correct)

## 7. Fix FoodPhotosSection (Pattern C → Standard)

- [ ] 7.1 Update toggle button: change `h-8 w-8 rounded-full hover:bg-input-bg` to `h-8 w-8 rounded-lg hover:bg-gray-700/50`
- [ ] 7.2 Update chevron size from `text-xl` to `text-2xl`
- [ ] 7.3 Simplify inline `onKeyDown` to use `handleKeyDown` function with Enter/Space support
- [ ] 7.4 Add `aria-label` to toggle button (dynamic based on isExpanded)
- [ ] 7.5 Wrap "X Selected" badge in `{isExpanded && (...)}` conditional to hide when collapsed
- [ ] 7.6 Wrap add photo button in `{isExpanded && (...)}` conditional to hide when collapsed
- [ ] 7.7 Add `text-2xl` class to section header icon (camera/photo icon)
- [ ] 7.8 Verify section uses `space-y-4` (already correct)

## 8. Fix FoodDetailsSection (Pattern C → Standard)

- [ ] 8.1 Update toggle button: change `h-8 w-8 rounded-full hover:bg-input-bg` to `h-8 w-8 rounded-lg hover:bg-gray-700/50`
- [ ] 8.2 Update chevron size from `text-xl` to `text-2xl`
- [ ] 8.3 Simplify inline `onKeyDown` to use `handleKeyDown` function with Enter/Space support
- [ ] 8.4 Add `aria-label` to toggle button (dynamic based on isExpanded)
- [ ] 8.5 Wrap add food button in `{isExpanded && (...)}` conditional to hide when collapsed
- [ ] 8.6 Add `text-2xl` class to section header icon (food/utensils icon)
- [ ] 8.7 Update section spacing from `space-y-5` to `space-y-4`

## 9. Visual and Functional Testing

- [ ] 9.1 Visual QA: Open app and verify all sections in collapsed state show only icon, title, and toggler
- [ ] 9.2 Visual QA: Verify all chevrons are same size and rotate consistently (counter-clockwise to right)
- [ ] 9.3 Visual QA: Verify all toggle buttons have same size and hover effect
- [ ] 9.4 Visual QA: Verify all section header icons are same size
- [ ] 9.5 Keyboard test: Tab through all 7 toggle buttons and verify focus indicators
- [ ] 9.6 Keyboard test: Press Enter on each focused toggle button to verify expand/collapse
- [ ] 9.7 Keyboard test: Press Space on each focused toggle button to verify expand/collapse and no page scroll
- [ ] 9.8 Functional test: SleepSection - verify sleep quality rating works after expansion
- [ ] 9.9 Functional test: ExerciseSection - verify add exercise works after expansion
- [ ] 9.10 Functional test: PressureSection - verify blood pressure input works after expansion
- [ ] 9.11 Functional test: DailyNotesSection - verify note input and voice recording works after expansion
- [ ] 9.12 Functional test: SupplementsSection - verify add supplement modal works after expansion
- [ ] 9.13 Functional test: FoodPhotosSection - verify photo upload works after expansion
- [ ] 9.14 Functional test: FoodDetailsSection - verify food search and add works after expansion

## 10. Documentation and Cleanup

- [ ] 10.1 Add code comments documenting the standard toggle pattern in one reference component
- [ ] 10.2 Verify TypeScript compilation passes with no errors
- [ ] 10.3 Run any existing linting/formatting tools
- [ ] 10.4 Create git commit with clear description of changes
