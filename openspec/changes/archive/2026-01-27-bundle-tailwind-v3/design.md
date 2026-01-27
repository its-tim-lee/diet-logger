## Context

The application currently uses Tailwind CSS via CDN (line 11 in `index.html`), loaded at runtime with configuration embedded in a `<script>` tag. Custom styles (scrollbar hiding, range inputs, time inputs, animations) are defined in an inline `<style>` tag. The project uses Vite as the build tool with React plugin already configured.

Current setup loads ~400KB of Tailwind CSS on every page load, with no tree-shaking or optimization. The inline configuration prevents proper IDE support and breaks offline functionality.

## Goals / Non-Goals

**Goals:**
- Bundle Tailwind v3 with PostCSS to enable build-time optimization
- Preserve exact visual appearance (no breaking changes)
- Reduce CSS bundle size by ~90% through unused class purging
- Enable offline development and production use
- Maintain fast development HMR with Vite

**Non-Goals:**
- Upgrading Tailwind beyond v3 (specifically requested v3)
- Migrating icons (handled separately)
- Changing Tailwind configuration (colors, theme, plugins)
- Refactoring component styles or class names

## Decisions

### Decision 1: Use Tailwind v3 with PostCSS + Autoprefixer

**Rationale:** Standard best practice for Vite projects. Vite has built-in PostCSS support that automatically processes imported CSS files. This approach provides:
- Automatic CSS purging based on content scanning
- Vendor prefixing for browser compatibility
- Source maps for debugging
- Fast HMR in development

**Alternative considered:** Tailwind v4 (just-in-time engine)
- Rejected because user explicitly requested v3

### Decision 2: Place configuration files at project root

**File locations:**
- `tailwind.config.js` - Root directory (standard convention)
- `postcss.config.js` - Root directory (required by Vite)
- `src/index.css` - Follows Vite convention for CSS entry points

**Rationale:** Matches Vite and Tailwind ecosystem conventions. Tools expect configs at root for auto-discovery.

### Decision 3: Preserve existing Tailwind configuration exactly

The current inline config defines:
- Dark mode: `"class"` strategy
- Custom colors: `primary`, `background-light`, `background-dark`, `card-dark`, `card-dark-hover`, `input-bg`, `pill-bg`
- Custom font: `display` → "Plus Jakarta Sans"
- Custom border radius values
- Custom animations: `pulse-glow`, `shimmer`, `fade-out`, `wave`, `fadeIn`
- Plugins: `forms`, `container-queries`

**Rationale:** Copy configuration verbatim to `tailwind.config.js` to ensure zero visual changes. All existing component class names continue to work.

### Decision 4: Move custom CSS to `src/index.css`

Custom CSS currently in `<style>` tag:
- Webkit scrollbar hiding
- Range input styling
- Time input calendar picker styling
- Body styles (min-height, overscroll behavior)
- Shimmer effect class

**Rationale:** Bundling custom CSS with Tailwind directives in a single entry point:
- Enables HMR for custom styles
- Allows importing in component tree
- Follows Vite conventions
- Maintains proper CSS cascade order (base → components → utilities)

### Decision 5: Content paths for purging

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}"
]
```

**Rationale:** Scans all files that might contain Tailwind classes. Includes both `src/` and `components/` directories based on current project structure. Catches classes in TSX/JSX and HTML.

## Risks / Trade-offs

**[Risk] Build time increases by 2-3 seconds**
→ Acceptable trade-off for 90% bundle size reduction. Development HMR remains instant due to Vite's optimization.

**[Risk] Missing content path could purge used classes**
→ Mitigation: Include comprehensive glob patterns. Vite dev server shows missing styles immediately, easy to catch before production.

**[Risk] Custom animation keyframes might conflict with Tailwind utilities**
→ Mitigation: Keep existing keyframe names (`pulse-glow`, `shimmer`, etc.) exactly as-is. No naming conflicts observed.

**[Risk] Developers might not know CSS is now bundled**
→ Mitigation: Import happens once in `index.tsx` entry point. Standard Vite pattern, follows React conventions.

**[Trade-off] Bundle size counted in app bundle, not external**
→ Analysis: Still net positive. 400KB CDN → 12KB bundled CSS = 388KB savings. Bundled CSS is also cacheable per deployment.

**[Trade-off] IDE support requires Node modules installed**
→ Analysis: Already using Vite, so `npm install` is mandatory. No additional developer friction.

## Migration Plan

1. **Install dependencies** - Add Tailwind v3, PostCSS, Autoprefixer to `package.json` devDependencies
2. **Create config files** - Extract inline config to `tailwind.config.js`, create `postcss.config.js`
3. **Create CSS entry point** - Create `src/index.css` with Tailwind directives + custom styles
4. **Update index.html** - Remove CDN `<script>`, remove inline `<script>` config, remove `<style>` tag
5. **Import CSS** - Add `import './index.css'` to `index.tsx`
6. **Verify build** - Run `npm run build` to confirm Tailwind processes correctly
7. **Visual regression test** - Load app in dev mode, verify all styles render identically

**Rollback strategy:**
If issues arise, revert by:
1. Remove `import './index.css'` from `index.tsx`
2. Restore CDN `<script>` tag to `index.html`
3. Restore inline `<script>` config and `<style>` tag
4. Remove added config files

Changes are isolated to build pipeline - component code unchanged, making rollback safe.

## Open Questions

None - implementation path is straightforward given Vite's built-in PostCSS support.
