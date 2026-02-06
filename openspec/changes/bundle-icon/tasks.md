## 1. Remove CDN Dependency

- [x] 1.1 Remove Material Symbols font CDN link from `index.html` (line 10)

## 2. Convert App.tsx

- [x] 2.1 Convert remaining `<span>` icon in App.tsx to `<Icon icon="material-symbols:..." />`

## 3. Convert Section Components

- [x] 3.1 Add Icon import to `components/SleepSection.tsx` and convert `bedtime` icon
- [x] 3.2 Update `components/ExerciseSection.tsx` - add Icon import, convert `ic:baseline-fitness-center` to Material Symbols equivalent, convert `add` and `schedule` icons
- [x] 3.3 Add Icon import to `components/PressureSection.tsx` and convert `speed` icon
- [x] 3.4 Add Icon import to `components/DailyNotesSection.tsx` and convert `edit_note` and `mic` icons
- [x] 3.5 Add Icon import to `components/SupplementsSection.tsx` and convert `medication`, `add`, `delete` icons
- [x] 3.6 Add Icon import to `components/FoodPhotosSection.tsx` and convert `restaurant`, `add_a_photo`, `check`, `add`, `auto_fix_high` icons
- [x] 3.7 Add Icon import to `components/FoodDetailsSection.tsx` and convert `menu_book`, `add`, `edit`, `check`, `delete`, `auto_awesome` icons

## 4. Convert Modal Components

- [x] 4.1 Add Icon import to `components/DatePickerModal.tsx` and convert `chevron_left`, `chevron_right` icons
- [x] 4.2 Add Icon import to `components/FoodSearchModal.tsx` and convert `search`, `add_circle`, `add` icons
- [x] 4.3 Add Icon import to `components/SupplementModal.tsx` and convert `search`, `add_circle`, `add` icons
- [x] 4.4 Add Icon import to `components/ImageViewerModal.tsx` and convert `close` icon

## 5. Convert Toast Component

- [x] 5.1 Add Icon import to `components/Toast.tsx` and convert `check_circle` icon

## 6. Verification

- [x] 6.1 Build application and verify bundle size reduction (~185KB savings)
- [ ] 6.2 Visual test all components to ensure icon appearance is preserved
- [ ] 6.3 Test application offline to verify icons render without CDN
- [x] 6.4 Search codebase for any remaining `material-symbols-outlined` class usage
- [ ] 6.5 Verify no external icon requests in browser network tab
