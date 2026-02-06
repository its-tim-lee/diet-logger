## Context

The diet-logger app has 7 collapsible section components that evolved independently, resulting in 3 different toggle patterns, inconsistent styling, and varying levels of accessibility support. A recent commit (dd86960) attempted to add togglers to all sections, but this exposed the underlying inconsistencies rather than establishing a unified pattern.

**Current State:**
- **Pattern A** (SleepSection, PressureSection): Entire header is clickable, comprehensive keyboard support, direct Icon rendering
- **Pattern B** (ExerciseSection, DailyNotesSection): Button-only toggle, conditional rendering, backwards compatibility props
- **Pattern C** (SupplementsSection, FoodPhotosSection, FoodDetailsSection): Button-only toggle, smaller chevrons, action buttons visible when collapsed (violates design spec)

**Constraints:**
- Must preserve existing component APIs (props interface)
- Cannot break existing functionality (sleep tracking, exercise logging, etc.)
- Should maintain React 18+ patterns (hooks, TypeScript)
- Must work with existing Tailwind CSS setup and iconify icons

## Goals / Non-Goals

**Goals:**
- Establish single source of truth for section collapse pattern
- Fix all 10 categories of inconsistencies identified in audit
- Ensure collapsed sections show only: icon, title, toggler (no action buttons or badges)
- Implement consistent keyboard accessibility (Enter/Space to toggle)
- Make future section additions trivial (copy-paste pattern)

**Non-Goals:**
- Refactoring internal section content (food logging logic, sleep tracking, etc.)
- Creating a shared base component or abstraction (would require API changes)
- Changing section-specific functionality or business logic
- Modifying the overall page layout or section ordering

## Decisions

### Decision 1: Toggle Interaction Pattern

**Choice:** Button-only toggle (Pattern B/C) with separate button element

**Rationale:**
- Better accessibility semantics (explicit button role)
- Separates concerns (header for display, button for interaction)
- Allows action buttons in header without conflicting click handlers
- More predictable behavior for users (visible clickable target)

**Alternatives Considered:**
- **Clickable header (Pattern A)**: Rejected because it causes issues when sections have action buttons in the header - need to prevent event bubbling, harder to reason about which element is clickable
- **Hybrid approach**: Too complex, doesn't solve core consistency issue

### Decision 2: Collapsed State Visibility

**Choice:** Strictly enforce 3-element rule using `isExpanded` conditional

**Rationale:**
- Matches design specification
- Cleaner visual hierarchy
- Prevents visual clutter in collapsed state
- Makes expand/collapse more meaningful

**Implementation:**
```tsx
{/* Action buttons - only visible when expanded */}
{isExpanded && (
  <button onClick={handleAction}>...</button>
)}
```

**Alternatives Considered:**
- **Always show action buttons**: Rejected - violates spec, creates clutter
- **Opacity-based hiding**: Rejected - buttons still take space and are keyboard-accessible

### Decision 3: Chevron Icon Specification

**Choice:**
- Size: `text-2xl`
- Rotation: `-rotate-90` when collapsed (counter-clockwise)
- Icon: `mdi:chevron-down` (existing choice)
- Transition: `transition-transform duration-200`

**Rationale:**
- `text-2xl` is used by 4/7 sections (majority)
- Counter-clockwise rotation is used by 5/7 sections (majority)
- Provides clear visual feedback

### Decision 4: Toggle Button Styling

**Choice:** Unified button style combining best aspects of Pattern B and C

```tsx
<button
  onClick={handleToggle}
  onKeyDown={handleKeyDown}
  className="flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-700/50 transition-colors"
  aria-label={isExpanded ? "Collapse section" : "Expand section"}
>
  <Icon
    icon="mdi:chevron-down"
    className={`text-2xl transition-transform duration-200 ${
      isExpanded ? "" : "-rotate-90"
    }`}
  />
</button>
```

**Rationale:**
- `h-8 w-8`: Sufficient touch target (32px × 32px)
- `rounded-lg`: Softer than `rounded-full`, consistent with app design
- `hover:bg-gray-700/50`: Subtle feedback matching existing patterns
- `aria-label`: Provides context for screen readers

**Alternatives Considered:**
- `rounded-full`: Too prominent, doesn't match app aesthetic
- `p-2` without fixed size: Inconsistent button dimensions

### Decision 5: Keyboard Accessibility

**Choice:** Inline `onKeyDown` handler checking for Enter and Space

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    handleToggle();
  }
};
```

**Rationale:**
- Buttons get keyboard support natively, but explicit handler ensures consistency
- `e.preventDefault()` prevents page scroll on Space
- Simple, inline pattern (no need for separate function)

### Decision 6: Section Spacing Standardization

**Choice:** Use `space-y-4` for all sections

**Rationale:**
- Used by 5/7 sections (majority)
- Provides balanced spacing without excessive whitespace
- Consistent with overall app spacing

### Decision 7: Header Icon Size

**Choice:** All section header icons use `text-2xl`

**Rationale:**
- Matches chevron size (visual balance)
- Provides sufficient prominence for section identification
- Currently used by ExerciseSection and DailyNotesSection successfully

### Decision 8: Implementation Approach

**Choice:** In-place updates to each component (no shared abstraction)

**Rationale:**
- Preserves component APIs (no breaking changes)
- Allows section-specific customization while maintaining pattern consistency
- Lower risk than creating shared base component
- Can refactor to shared component later if needed

**Alternatives Considered:**
- **Create `<CollapsibleSection>` wrapper component**: Rejected for now - would require refactoring all 7 components, higher risk, can do later
- **Custom hook `useCollapsible`**: Doesn't help with JSX consistency, minimal benefit

## Risks / Trade-offs

### Risk 1: Breaking Section-Specific Functionality
**Mitigation:** Test each section's specific features (add supplement, photo upload, etc.) after changes

### Risk 2: Hiding Action Buttons Reduces Discoverability
**Trade-off:** Cleaner UI vs. one extra click to access actions
**Mitigation:** Users learn quickly that sections must be expanded; matches common accordion patterns

### Risk 3: CSS Class Name Typos
**Mitigation:** Copy-paste from reference implementation; verify in browser

### Risk 4: Icon Import Changes
**Trade-off:** Some sections may need `Icon` import added
**Mitigation:** Simple import addition, TypeScript will catch missing imports

## Migration Plan

### Phase 1: Update Components (Sequential)
1. Choose reference implementation (ExerciseSection - already close to target)
2. Update each component following the standard pattern:
   - Fix toggle button structure and styling
   - Add `isExpanded` conditionals for action buttons
   - Standardize chevron size and rotation
   - Fix spacing values
   - Add keyboard handler
   - Remove backwards compatibility props (Exercise, DailyNotes only)
3. Test each component individually after update

### Phase 2: Verification
1. Visual QA: Check collapsed/expanded states for all sections
2. Keyboard test: Tab through all toggles, use Enter/Space
3. Functional test: Verify section-specific actions still work
4. Responsive test: Check mobile viewport behavior

### Rollback Strategy
- Git revert to previous commit if critical issues found
- Components are independent - can revert individual files if needed

## Open Questions

None - pattern is well-defined from audit findings.
