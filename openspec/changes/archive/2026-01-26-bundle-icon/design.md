## Context

The application currently uses two icon approaches:
1. **Material Symbols font from Google CDN** (~200KB) - loaded in `index.html` and used via `<span className="material-symbols-outlined">icon_name</span>` in 30+ instances
2. **@iconify/react** - already installed but only used once in ExerciseSection.tsx

This dual approach creates:
- External CDN dependency that breaks offline functionality
- Larger payload (200KB font vs ~15KB for bundled SVGs)
- Inconsistent icon APIs across components
- Potential FOUC (flash of unstyled content) during font loading

The `@iconify/react` package is already in dependencies, so we can leverage it for all icons without adding new dependencies.

## Goals / Non-Goals

**Goals:**
- Eliminate Google Fonts CDN dependency from `index.html`
- Convert all 30+ material symbols icon instances to `@iconify/react`
- Reduce icon-related payload by ~185KB (92% reduction)
- Enable offline icon rendering
- Unify icon API across all components

**Non-Goals:**
- Changing icon designs or visual appearance
- Switching to different icon libraries (staying with Material Symbols)
- Modifying component behavior or props
- Optimizing icon bundle size beyond what @iconify provides automatically

## Decisions

### Decision 1: Use @iconify/react for all icons

**Rationale:**
- Already installed as a dependency (no new package needed)
- Automatically bundles only used icons as inline SVG
- Supports Material Symbols icon set via `material-symbols:` prefix
- Type-safe with TypeScript
- Consistent API: `<Icon icon="material-symbols:name" />`

**Alternatives considered:**
- Keep Google Fonts CDN: Rejected due to 200KB payload, offline issues, and external dependency
- react-icons: Would require additional dependency and doesn't have Material Symbols
- Manual SVG imports: Too manual, harder to maintain

### Decision 2: Icon naming convention

**Pattern:** `material-symbols:{icon-name-in-kebab-case}`

**Rationale:**
- Iconify requires hyphen-separated names (not underscores)
- Namespace prefix `material-symbols:` makes icon set explicit
- Matches Iconify's standard naming convention

**Conversion examples:**
- `calendar_today` → `material-symbols:calendar-today`
- `add_circle` → `material-symbols:add-circle`
- `edit_note` → `material-symbols:edit-note`

### Decision 3: Component-level imports

Add `import { Icon } from '@iconify/react'` to each component that uses icons.

**Rationale:**
- Standard React import pattern
- Tree-shaking works optimally
- Clear dependency at component level
- No global icon registration needed

**Alternatives considered:**
- Global Icon component wrapper: Adds unnecessary indirection
- Re-export from common file: Breaks tree-shaking benefits

### Decision 4: Preserve styling via className

Keep using `className` prop on `<Icon>` component for styling (size, color).

**Rationale:**
- Tailwind classes work directly on Icon component
- Maintains existing styling without CSS changes
- `@iconify/react` Icon component accepts standard HTML attributes

## Risks / Trade-offs

**[Risk] Bundle size grows if many icons added in future**
→ **Mitigation:** Only icons actually imported are bundled. Each icon ~1KB. Would need 185+ icons to match previous payload.

**[Risk] Icon appearance differences between font vs SVG**
→ **Mitigation:** Both use same Material Symbols design. Visual testing during implementation will catch any discrepancies.

**[Risk] Breaking changes if Icon component API changes**
→ **Mitigation:** @iconify/react is stable (v5.x). Icon names and component props are standardized.

**[Trade-off] Build time slightly increases (bundling SVG)**
→ **Accepted:** Minimal impact (<100ms) for significantly better runtime performance and offline support.

**[Trade-off] Developers must know correct icon names**
→ **Accepted:** Material Symbols names are well-documented. Converting underscore → hyphen is straightforward pattern.
