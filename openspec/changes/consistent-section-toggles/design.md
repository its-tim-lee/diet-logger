## Context

The Daily Wellness Log app currently has 7 sections (Sleep, Exercise, Pressure, Daily Notes, Supplements, Food Photos, Food Details). Only ExerciseSection and DailyNotesSection have toggle functionality using a local `enabled` prop pattern. The other 5 sections are always expanded, creating an inconsistent and cluttered UX.

Users need to focus on different sections depending on their workflow. A consistent toggle system with state persistence will improve the daily check-in experience.

**Current Implementation:**
- ExerciseSection and DailyNotesSection accept `enabled: boolean` and `setEnabled` props from App.tsx
- No visual consistency between how these sections handle collapsed state
- No persistence - toggle state resets on page refresh
- Other sections have no collapse capability at all

**Constraints:**
- Must work within existing React 19 + TypeScript + Tailwind stack
- Cannot introduce new dependencies
- Must maintain backwards compatibility with existing section props

## Goals / Non-Goals

**Goals:**
- Unified toggle mechanism for all 7 sections
- Persistent toggle state across browser sessions via localStorage
- Consistent collapsed visual state (grayed-out header, hidden content)
- Smooth expand/collapse animations
- Accessible toggle controls

**Non-Goals:**
- Multi-device sync (localStorage is browser-specific only)
- Global "collapse all" / "expand all" buttons (can be added later)
- Customizable default states per section (all sections default to expanded)
- Analytics tracking of toggle usage

## Decisions

### Decision 1: Custom Hook Pattern

**Choice:** Create `useToggleState` hook that encapsulates localStorage logic.

**Rationale:**
- Separates concerns: hook handles persistence, components handle rendering
- Reusable across all 7 sections with consistent behavior
- Easy to test in isolation
- Makes components cleaner by removing localStorage boilerplate

**Alternatives Considered:**
- Context API: Overkill for simple boolean state, adds unnecessary complexity
- Props drilling: Would require changing App.tsx significantly, harder to maintain
- Local state only: Loses persistence, poor UX

**Implementation:**
```typescript
// hooks/useToggleState.ts
function useToggleState(sectionName: string, defaultExpanded: boolean = true): [boolean, () => void]
```

Returns `[isExpanded, toggle]` tuple. Reads from localStorage on mount, writes on every toggle.

### Decision 2: Deprecate `enabled` Props Pattern

**Choice:** Migrate ExerciseSection and DailyNotesSection away from `enabled` props to use the new hook internally.

**Rationale:**
- Removes the need for App.tsx to manage 7 separate boolean states
- Sections become self-contained with their own toggle logic
- Cleaner App.tsx with less prop drilling
- Consistent pattern across all sections

**Migration Path:**
1. Add hook to ExerciseSection and DailyNotesSection
2. Keep `enabled` props for backwards compatibility but mark as optional
3. Use hook value if props not provided, otherwise use props (transition period)
4. Remove props from App.tsx in a separate commit

**Alternatives Considered:**
- Keep dual system: Adds complexity, defeats the purpose of standardization
- Break props immediately: Too risky, harder to review/test incrementally

### Decision 3: Visual Collapsed State

**Choice:** Collapsed sections show grayed-out header (opacity-50) with hidden content.

**Rationale:**
- Matches the user requirement from brainstorming session
- Provides clear visual feedback about collapsed state
- Maintains spatial awareness of section presence
- Consistent with common UI patterns

**CSS Approach:**
- Use Tailwind's `opacity-50` for grayed-out effect
- Use `max-h-0 overflow-hidden` for content hiding (enables animation)
- Rotate chevron icon (transition: transform 200ms)

**Alternatives Considered:**
- Complete removal: Confusing, user loses track of sections
- Blur effect: Performance overhead, accessibility concerns
- Border-only: Too subtle, not enough visual feedback

### Decision 4: Animation Strategy

**Choice:** CSS transitions on `max-height` with fixed breakpoints.

**Rationale:**
- Native CSS performance (GPU-accelerated)
- No JavaScript animation library needed (meets no-dependency goal)
- Smooth enough for good UX

**Implementation:**
```css
.section-content {
  transition: max-height 300ms ease-in-out, opacity 200ms ease-in-out;
  max-height: 1000px; /* expanded */
}
.section-content.collapsed {
  max-height: 0;
  opacity: 0;
}
```

**Alternatives Considered:**
- Auto-height calculation: Complex, requires measuring DOM, slower
- Framer Motion: Violates no-dependency constraint
- No animation: Poor UX, jarring transitions

### Decision 5: LocalStorage Key Pattern

**Choice:** Use `wellness-section-${sectionName}` pattern, store boolean as string.

**Rationale:**
- Namespaced to avoid conflicts with other apps
- Section name in key makes debugging easier
- String storage is localStorage standard, simple to parse

**Example Keys:**
- `wellness-section-sleep`
- `wellness-section-exercise`
- `wellness-section-pressure`
- `wellness-section-daily-notes`
- `wellness-section-supplements`
- `wellness-section-food-photos`
- `wellness-section-food-details`

**Alternatives Considered:**
- Single JSON object: One localStorage read/write but harder to manage partial updates
- No prefix: Risk of key collisions
- Using enums: Over-engineered for simple string keys

## Risks / Trade-offs

**[Risk]** LocalStorage quota exceeded on some browsers
**→ Mitigation:** Boolean values are tiny (~5 bytes × 7 sections = 35 bytes), negligible risk. Add try-catch in hook to gracefully handle quota errors.

**[Risk]** Animations may be janky on low-end devices
**→ Mitigation:** Use CSS transitions (GPU-accelerated), not JavaScript. Test on slower devices. Can disable animations with `prefers-reduced-motion` media query.

**[Risk]** Users might accidentally collapse sections and forget to expand
**→ Mitigation:** Default all sections to expanded. Only collapse if user explicitly toggles. Visual indicator (chevron) makes state obvious.

**[Risk]** Breaking existing ExerciseSection/DailyNotesSection props interface
**→ Mitigation:** Incremental migration with backwards compatibility. Keep props optional during transition.

**[Trade-off]** Fixed max-height approach requires choosing a value large enough for all content
**→ Acceptable:** 1000px is safe for all sections. Slight overhead but negligible vs complexity of auto-calculation.

**[Trade-off]** No multi-device sync means toggle states don't follow user across browsers
**→ Acceptable:** Marked as non-goal. LocalStorage is simpler and meets requirements. Cloud sync can be added later if needed.
