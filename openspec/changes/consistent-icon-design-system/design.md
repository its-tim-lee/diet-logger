## Context

The application uses `@iconify/react` with `material-symbols` icons across 13 component files, totaling approximately 35 icon instances. Current usage shows significant inconsistencies:

- **Size inconsistency**: Icons use text-xl, text-lg, text-sm, text-2xl, text-[20px], text-[28px], or no size class at all
- **Variant inconsistency**: Same actions use different icon variants (add, add-circle used interchangeably without clear semantic distinction)
- **Arbitrary values**: Custom pixel values like text-[20px] and text-[28px] break responsive design and design system consistency
- **No behavior patterns**: No documented approach for icon interactions, hover states, or transitions

The exploration phase identified seven semantic categories of icons: section identity, navigation/toggles, add actions, delete actions, state indicators, input helpers, and AI/magic actions. Each category needs distinct sizing and behavior patterns.

**Current state**: All icons use material-symbols family (consistent), but size and behavior are ad-hoc per component.

**Constraints**:
- Must maintain existing icon library (@iconify/react) and family (material-symbols)
- Must use Tailwind utility classes only (no custom CSS classes like .icon-md)
- Changes should not alter functional behavior, only visual consistency
- AI icons require special treatment to distinguish them from standard actions

## Goals / Non-Goals

**Goals:**
- Eliminate all arbitrary pixel values in icon sizing (text-[20px], text-[28px])
- Establish clear five-tier size scale using standard Tailwind classes (text-base through text-3xl)
- Define semantic rules for when to use each icon size based on visual hierarchy
- Standardize icon variant selection (plain vs -circle vs -outline) based on context
- Implement subtle ambient animation for AI-powered action icons
- Document the complete icon design system for future development

**Non-Goals:**
- Not changing the icon library or family (staying with @iconify/react and material-symbols)
- Not creating custom CSS classes or component abstractions for icons
- Not changing functional behavior of any icons (only visual consistency)
- Not adding micro-interactions to non-AI icons (keeping hover states on button containers)
- Not addressing icon content/selection (which icons to use) - only sizing and behavior

## Decisions

### Decision 1: Use Tailwind size scale instead of custom values

**Choice**: Map icon sizes to Tailwind text utilities (text-base, text-lg, text-xl, text-2xl, text-3xl)

**Rationale**:
- Maintains consistency with existing design system
- Supports responsive design out of the box
- No custom CSS to maintain
- Clear semantic meaning (xl = extra large, not "20 pixels")

**Alternatives considered**:
- Custom CSS classes (.icon-sm, .icon-md): Rejected because requirement specifies Tailwind utilities only
- Keep arbitrary pixel values: Rejected because they break responsive scaling and design system consistency
- Use all text-xl for uniformity: Rejected because it ignores visual hierarchy needs

### Decision 2: Five-tier size scale

**Choice**:
- icon-xs → text-base (16px) - Inline indicators, badges
- icon-sm → text-lg (18px) - Delete buttons, checkmarks
- icon-md → text-xl (20px) - Standard action buttons, inputs
- icon-lg → text-2xl (24px) - Section headers, navigation toggles
- icon-xl → text-3xl (30px) - Rating stars (emphasis)

**Rationale**: Five tiers provide enough granularity for visual hierarchy without overwhelming choice. Mapping follows semantic meaning: smaller supporting icons (delete, check) use smaller sizes, primary actions use medium, prominent features use large sizes.

**Alternatives considered**:
- Three tiers (sm/md/lg): Not enough granularity to distinguish inline indicators from action buttons
- Seven tiers: Too many choices, harder to maintain consistency

### Decision 3: Semantic variant rules

**Choice**:
- Plain variants (add, delete) for primary action buttons
- Circle variants (add-circle) for list item actions
- Outline variants (star-outline) for empty/unselected states
- Semantic variants (add-a-photo) for context-specific actions

**Rationale**: Existing usage already shows this pattern emerging organically. Codifying it provides clarity for future development. Circle variants feel less prominent (appropriate for list items), while plain variants feel more direct (appropriate for primary actions).

### Decision 4: Interaction philosophy - keep it simple

**Choice**: Icons inherit hover states from button containers, no icon-level micro-interactions (except AI icons)

**Rationale**:
- Simpler implementation and maintenance
- Button-level hover is sufficient for affordance
- Reduces animation complexity
- Aligns with user preference to "keep it simple"
- Only exception: chevron rotation for semantic state change, AI icons for differentiation

**Alternatives considered**:
- Icon-level hover effects (scale, color): Rejected as over-engineered for this UI
- All icons animate on interaction: Rejected, only semantic state changes warrant animation

### Decision 5: AI icon special treatment - subtle ambient glow

**Choice**: AI action icons (auto-awesome, auto-fix-high) get:
- Gradient background (primary/20 to primary/10)
- Slow continuous pulse animation (3s cycle)
- Drop shadow glow on the icon (rgba(91,236,19,0.4))
- Slightly more prominent border (primary/30)

**Rationale**: Distinguishes AI-powered features visually as "magical" capabilities. Subtle enough not to be distracting, but noticeable enough to signal "this is different." Pulse animation creates ambient movement that draws attention without requiring user interaction.

**Alternatives considered**:
- No special treatment: Rejected, AI features should be visually distinguished
- Aggressive animation: Rejected, would be distracting in a data-logging UI
- Different icon family: Rejected, breaks family consistency

### Decision 6: Documentation approach

**Choice**: Create docs/icon-system.md with:
- Size scale reference table
- Category-specific patterns with code examples
- AI icon implementation details
- "Never do this" anti-patterns section

**Rationale**: Documentation serves as source of truth for code reviews, onboarding, and future development. Examples provide copy-paste patterns for common scenarios. Anti-patterns section prevents regressions.

**Alternatives considered**:
- Only code comments: Not discoverable enough
- Storybook stories: Good addition but not replacement for written docs
- README section: Would clutter main README

## Risks / Trade-offs

**[Risk]** Star rating icons changing from text-[28px] to text-3xl (30px) is a 2px increase - may feel different to users
→ **Mitigation**: 2px is within acceptable perceptual threshold. If feedback indicates issue, can adjust to exact 28px using text-[1.75rem]

**[Risk]** AI glow animation may cause performance issues on lower-end devices
→ **Mitigation**: Use will-change CSS hint, test on target devices. Animation is purely decorative so can be disabled with motion-reduce if needed

**[Risk]** Developers may not discover documentation and continue using arbitrary sizes
→ **Mitigation**: Include link to docs/icon-system.md in component file comments, mention in onboarding, enforce in code reviews

**[Risk]** Future icon additions may not fit cleanly into five size tiers
→ **Mitigation**: Size scale is extensible (can add text-4xl if needed). Document decision-making process for edge cases

**[Trade-off]** Using Tailwind utilities instead of custom classes means longer className strings
→ **Accepted**: Consistency and maintainability worth the verbosity. Tailwind's approach is already established in codebase

**[Trade-off]** Standardizing sizes may make some icons slightly larger/smaller than designers originally intended
→ **Accepted**: Consistency is more valuable than per-icon optimization. System-level consistency improves overall UX more than pixel-perfect individual icons

## Migration Plan

**Not applicable** - This is purely additive/refinement work with no breaking changes. All changes are in-place className updates that don't affect component APIs or behavior.

## Open Questions

None - exploration phase resolved all major decisions.
