# PRD: Consistent Section Toggling Behavior and Outlook

## 1. Executive Summary

Standardize the collapsible section behavior and visual appearance across all 7 sections (Sleep, Exercise, Pressure, Daily Notes, Supplements, Food Photos, Food Details) in the diet-logger app. Currently, sections use inconsistent icon libraries, button styles, header patterns, and accessibility implementations, creating a fragmented user experience. This project will establish a single, unified pattern for all collapsible sections.

## 2. Goals & Success Criteria

- [ ] All 7 sections use the same icon library (material-symbols) for chevron icons
- [ ] All toggle buttons have consistent size (h-8 w-8) and styling
- [ ] Icon rotation direction and syntax is uniform across all sections
- [ ] All collapsed section headers show opacity-50
- [ ] All sections use the same accessibility pattern (actual button elements, not divs)
- [ ] All collapsed content has pointer-events-none class
- [ ] Visual inspection confirms all sections look and behave identically
- [ ] No TypeScript errors after changes
- [ ] App runs and all sections toggle correctly

## 3. Technical Requirements

### Files to Modify

1. **components/SleepSection.tsx**
   - Replace mdi icon with material-symbols
   - Convert header click pattern to dedicated button
   - Change rotation syntax from `rotate-[-90deg]` to `-rotate-90`
   - Update button styling to h-8 w-8 rounded circle
   - Replace div role="button" with actual button element

2. **components/PressureSection.tsx**
   - Replace mdi icon with material-symbols
   - Convert header click pattern to dedicated button
   - Change rotation syntax from `rotate-[-90deg]` to `-rotate-90`
   - Update button styling to h-8 w-8 rounded circle
   - Replace div role="button" with actual button element

3. **components/ExerciseSection.tsx**
   - Replace mdi icon with material-symbols
   - Change button size from text-2xl p-2 to h-8 w-8
   - Update rotation from `rotate-0/-rotate-90` to `-rotate-90`
   - Add opacity-50 to header when collapsed
   - Ensure rounded circle styling

4. **components/DailyNotesSection.tsx**
   - Replace mdi icon with material-symbols
   - Change button size from text-2xl p-2 to h-8 w-8
   - Update rotation from `rotate-0/-rotate-90` to `-rotate-90`
   - Add opacity-50 to header when collapsed
   - Ensure rounded circle styling

5. **components/SupplementsSection.tsx**
   - Add pointer-events-none to collapsed content
   - Verify icon rotation matches new standard
   - Ensure opacity-50 on collapsed header (already present)

6. **components/FoodPhotosSection.tsx**
   - Add pointer-events-none to collapsed content
   - Verify icon rotation matches new standard
   - Ensure opacity-50 on collapsed header (already present)

7. **components/FoodDetailsSection.tsx**
   - Add pointer-events-none to collapsed content
   - Verify icon rotation matches new standard
   - Ensure opacity-50 on collapsed header (already present)

### Design Standards (All Sections)

**Icon Standard:**
- Library: `material-symbols` (imported as `MaterialSymbol`)
- Icon name: `expand_more` (chevron pointing down)
- Rotation: `-rotate-90` when collapsed

**Button Standard:**
```tsx
<button
  onClick={toggle}
  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  aria-label={isExpanded ? "Collapse section" : "Expand section"}
  aria-expanded={isExpanded}
>
  <MaterialSymbol
    icon="expand_more"
    className={`text-2xl transition-transform ${isExpanded ? "" : "-rotate-90"}`}
  />
</button>
```

**Header Standard:**
```tsx
<div className={`flex items-center justify-between mb-4 ${!isExpanded ? "opacity-50" : ""}`}>
  {/* Icon and Title */}
  <div className="flex items-center gap-2">
    {/* Section Icon */}
    <h2>Section Title</h2>
  </div>
  {/* Toggle Button */}
  {toggleButton}
</div>
```

**Content Standard:**
```tsx
<div
  className={`transition-all duration-300 ease-in-out overflow-hidden ${
    isExpanded
      ? "max-h-[1000px] opacity-100"
      : "max-h-0 opacity-0 pointer-events-none"
  }`}
>
  {/* Content */}
</div>
```

### Dependencies

No new packages required. All sections already import necessary icons.

## 4. Worker Task Breakdown

### Worker 1: header-clickable-sections
- **Task**: Convert Sleep and Pressure sections from header-clickable pattern to dedicated toggle buttons. Update icons from mdi to material-symbols. Standardize button styling and rotation syntax.
- **Owns**:
  - components/SleepSection.tsx
  - components/PressureSection.tsx
- **Off-limits**: All other component files, hooks, App.tsx
- **Depends on**: none

### Worker 2: button-style-sections
- **Task**: Update Exercise and DailyNotes sections to use consistent button sizing (h-8 w-8), material-symbols icons, and add opacity-50 to collapsed headers. Standardize icon rotation syntax.
- **Owns**:
  - components/ExerciseSection.tsx
  - components/DailyNotesSection.tsx
- **Off-limits**: All other component files, hooks, App.tsx
- **Depends on**: none

### Worker 3: pointer-events-sections
- **Task**: Add pointer-events-none class to collapsed content in FoodDetails, FoodPhotos, and Supplements sections. Verify icon rotation and opacity standards are met.
- **Owns**:
  - components/FoodDetailsSection.tsx
  - components/FoodPhotosSection.tsx
  - components/SupplementsSection.tsx
- **Off-limits**: All other component files, hooks, App.tsx
- **Depends on**: none

## 5. Verification Plan

Manual testing for each section:
- [ ] Click toggle button - section expands/collapses smoothly
- [ ] Collapsed section header has reduced opacity (opacity-50)
- [ ] Chevron icon rotates consistently (points right when collapsed)
- [ ] All chevron icons look identical (same icon library)
- [ ] Toggle buttons are the same size across all sections
- [ ] Collapsed content is not interactive (pointer-events-none)
- [ ] Keyboard navigation works (Tab to button, Enter/Space to toggle)
- [ ] Screen reader announces expand/collapse state correctly

Automated checks:
- [ ] `npm run build` passes
- [ ] `npm run type-check` passes (if available)
- [ ] No console errors when toggling sections
- [ ] localStorage persists section states across page reloads

## 6. Execution Status

> **READ THIS FIRST AFTER CONTEXT COMPACTION**
> This section is the source of truth for project progress.

### Current State
- **Phase**: WORKERS_ACTIVE
- **Iteration**: 1 of 3
- **Started**: 2026-02-06T18:31:50Z
- **Last Updated**: 2026-02-06T18:35:00Z

### Phase Checklist
- [x] Phase 1: PRD Generation
- [x] Phase 2: Workers Spawned
- [x] Phase 3: Workers Active
- [ ] Phase 4: All Workers Merged
- [ ] Phase 5: Review Complete
- [ ] Phase 6: Quality Gates Passed
- [ ] Phase 7: Deliverables Generated
- [ ] Phase 8: Project Complete

### Worker Status
| Worker | Branch | Status | PR | Notes |
|--------|--------|--------|-----|-------|
| header-clickable-sections | feature/header-clickable-sections | working | - | Sleep + Pressure refactor |
| button-style-sections | feature/button-style-sections | working | - | Exercise + DailyNotes standardization |
| pointer-events-sections | feature/pointer-events-sections | working | - | FoodDetails/Photos/Supplements polish |

### Blockers & Issues
- None yet

### Quality Gate Results
- [ ] `/review`: pending
- [ ] `/qcode`: pending
- [ ] Security scan: N/A (UI-only changes)
- [ ] Critical issues fixed: N/A

### Log
- 2026-02-06T18:31:50Z Project created
- 2026-02-06T18:32:00Z Codebase exploration complete
- 2026-02-06T18:33:00Z PRD written
- 2026-02-06T18:34:00Z Worker 1 (header-clickable-sections) spawned
- 2026-02-06T18:34:30Z Worker 2 (button-style-sections) spawned
- 2026-02-06T18:35:00Z Worker 3 (pointer-events-sections) spawned
- 2026-02-06T18:35:00Z All 3 workers active
