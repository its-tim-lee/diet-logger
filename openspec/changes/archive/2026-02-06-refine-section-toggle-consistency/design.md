## Context

The section toggle system was recently standardized (commit e7cf745) with the `useToggleState` hook and consistent behavior across all 7 sections. However, the implementation has remaining inconsistencies:

**Current State:**
- 4 sections (Sleep, Exercise, Pressure, DailyNotes) use `material-symbols:expand-more`
- 3 sections (Supplements, FoodPhotos, FoodDetails) use `material-symbols:chevron-down`
- All sections use fixed `p-5` padding regardless of expanded/collapsed state
- ExerciseSection and DailyNotesSection retain `enabled`/`setEnabled` props for backwards compatibility, but App.tsx no longer passes these props

**Constraints:**
- Must maintain existing React 19 + TypeScript + Tailwind stack
- Must preserve localStorage persistence behavior
- Must maintain accessibility (ARIA labels, keyboard support)
- Must respect `prefers-reduced-motion`
- No new dependencies

## Goals / Non-Goals

**Goals:**
- Perfect visual consistency: all sections use identical icon, styling, and spacing patterns
- Compact collapsed state: reduce vertical space when sections are collapsed
- Clean codebase: remove unused backwards compatibility code
- Smooth UX: animate padding transitions for polished feel

**Non-Goals:**
- Changing localStorage key structure or persistence logic
- Modifying the useToggleState hook implementation
- Adding new toggle features (global collapse/expand, custom defaults per section)
- Changing the core animation timing (300ms height, 200ms opacity remains)

## Decisions

### Decision 1: Standardize on `expand-more` Icon

**Choice:** Use `material-symbols:expand-more` for all 7 sections.

**Rationale:**
- Already used by majority of sections (4 out of 7)
- Semantic clarity: name "expand-more" directly describes the action
- Visually softer, rounded appearance fits the overall design language
- Single icon type eliminates confusion

**Alternatives Considered:**
- `chevron-down`: More precise/sharp, but minority usage in codebase
- Keep mixed: Rejected - defeats purpose of consistency work

**Implementation:**
Change icon in SupplementsSection, FoodPhotosSection, FoodDetailsSection from:
```tsx
icon="material-symbols:chevron-down"
```
to:
```tsx
icon="material-symbols:expand-more"
```

### Decision 2: Dynamic Padding with `py-3 px-5` for Collapsed State

**Choice:** Collapsed sections use `py-3 px-5` (12px vertical, 20px horizontal), expanded use `p-5` (20px all).

**Rationale:**
- Maintains consistent horizontal alignment (no shift when toggling)
- 12px vertical padding provides comfortable breathing room without bulk
- Clear visual distinction between collapsed and expanded states
- Horizontal consistency prevents jarring layout shifts

**Alternatives Considered:**
- `p-3` (12px all): Would cause horizontal shift, rejected
- `py-2 px-5` (8px vertical): Too cramped, lacks visual comfort
- Keep `p-5` always: Rejected - collapsed sections look too bulky

**Implementation:**
```tsx
<section className={`
  bg-white dark:bg-card-dark rounded-xl shadow-sm
  transition-all duration-200 motion-reduce:transition-none
  ${isExpanded ? 'p-5 space-y-6' : 'py-3 px-5'}
`}>
```

**Transition Timing:**
- 200ms for padding transition (matches header opacity transition timing)
- Uses CSS `transition-all` for smooth animation
- Respects `motion-reduce:transition-none` for accessibility

### Decision 3: Remove Backwards Compatibility Props

**Choice:** Remove `enabled?: boolean` and `setEnabled?: (val: boolean) => void` props from ExerciseSection and DailyNotesSection.

**Rationale:**
- App.tsx no longer passes these props (verified via grep)
- Backwards compatibility served its purpose during migration
- Cleanup reduces code complexity and potential confusion
- All sections now follow identical pattern (self-contained toggle state)

**Alternatives Considered:**
- Keep for safety: Rejected - adds unnecessary complexity with no benefit
- Mark deprecated first: Overkill for internal components with no external consumers

**Migration Impact:**
- No migration needed - props already unused
- Components use `useToggleState` hook exclusively

### Decision 4: Section-Level Padding Transition

**Choice:** Apply padding transition at the `<section>` element level using `transition-all`.

**Rationale:**
- Simple, declarative approach with Tailwind classes
- Consistent with existing transition patterns in the codebase
- GPU-accelerated CSS transitions (performant)
- Automatically respects `prefers-reduced-motion`

**Alternatives Considered:**
- JavaScript-based animation: Overkill, adds complexity, worse performance
- Separate transition for each padding axis: Unnecessary granularity
- No transition: Poor UX, jarring visual jump

## Risks / Trade-offs

**[Risk]** Using `transition-all` could animate unintended properties if new styles are added
**→ Mitigation:** Acceptable - sections have stable styling, and any unintended animation would be caught in manual testing

**[Risk]** 200ms padding transition might feel slow on some devices
**→ Mitigation:** 200ms matches existing header opacity timing for consistency. Can adjust if user feedback indicates issue.

**[Trade-off]** Fixed vertical padding values require choosing one size for all sections
**→ Acceptable:** `py-3` provides good balance across all section types. Content height variation is already handled by max-h animations.

**[Trade-off]** Icon change is subtle - users won't notice the visual improvement
**→ Acceptable:** Consistency is for long-term maintainability, not flashy user-facing changes. The padding change provides the noticeable UX improvement.

## Open Questions

None - all decisions finalized during exploration phase.
