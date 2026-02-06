## Context

The application currently loads Plus Jakarta Sans font from Google Fonts CDN (line 9 in `index.html`), with preconnect hints to `fonts.googleapis.com` and `fonts.gstatic.com` (lines 7-8). The font is referenced in the Tailwind config as `fontFamily: { display: ["Plus Jakarta Sans", "sans-serif"] }` and used throughout the application via `font-display` utility classes.

Current setup loads 5 font weights (400, 500, 600, 700, 800) totaling ~120KB from external CDN on every page load. This introduces DNS lookup overhead (~50-100ms), CDN roundtrip time (~150-300ms), and prevents offline functionality. The external dependency also means the font is not version-controlled or guaranteed to remain unchanged.

The project uses Vite as the build tool, which automatically handles font file imports and generates optimized asset URLs with content hashing for cache busting.

## Goals / Non-Goals

**Goals:**

- Bundle Plus Jakarta Sans font locally to eliminate CDN dependency
- Preserve exact visual appearance (same font family, same weights)
- Reduce initial page load time by eliminating DNS lookups and CDN requests
- Enable offline functionality for font rendering
- Maintain version control over font files
- Use modern woff2 format for optimal compression

**Non-Goals:**

- Changing font family or design system
- Optimizing to fewer font weights (all 5 weights are actively used)
- Loading fonts via JavaScript (prefer CSS @font-face for browser optimization)
- Preloading fonts (browser will load them as needed, no FOUT concerns)

## Decisions

### Decision 1: Use woff2 format exclusively

**Rationale:** woff2 provides best compression (~20KB per weight) and has universal browser support (96%+ global coverage, all modern browsers since 2016). No need for woff/ttf fallbacks given target browser support.

**Alternatives considered:**

- **woff + woff2**: Adds ~40% file size for <1% browser coverage gain
- **Variable font**: Plus Jakarta Sans variable font is ~80KB (larger than 5 static files combined)
- **ttf/otf**: Uncompressed formats, 3-4x larger than woff2

### Decision 2: Source fonts from Google Fonts download

**Font source:** Download from `fonts.google.com/specimen/Plus+Jakarta+Sans`

**License:** Open Font License (OFL) - free for commercial use, allows bundling and redistribution

**Rationale:** Official source ensures font quality and proper licensing. Google Fonts provides optimized woff2 files with manual hinting for better rendering.

**Implementation approach:**

- Single variable font file: `PlusJakartaSans.woff2` (~48KB)
- Contains all weights 400-800 in one file
- Uses CSS `font-weight: 400 800` range syntax in @font-face declaration
- Simpler than multiple files while maintaining all required weights

**Note:** While the original plan was 5 separate files, Google Fonts API provides a single optimized woff2 file that covers all weights efficiently. This approach reduces complexity while maintaining the same functionality.

### Decision 3: Store fonts in `fonts/` directory at project root

**Rationale:**

- Project structure doesn't use `src/` directory - files are at root level
- Vite automatically optimizes imported assets from root-level directories (content hashing, URLs)
- Maintains logical separation from components and styles
- Simple, clear location for font assets

**Alternatives considered:**

- `public/fonts/`: Bypasses Vite optimization, no content hashing
- `src/fonts/`: Not applicable - project doesn't have `src/` directory structure

### Decision 4: Define @font-face in `index.css`

Add a single `@font-face` declaration in `index.css` (at project root):

```css
@font-face {
  font-family: "Plus Jakarta Sans";
  font-weight: 400 800;
  font-style: normal;
  font-display: swap;
  src: url("./fonts/PlusJakartaSans.woff2") format("woff2");
}
```

**Rationale:**

- Single declaration with weight range (`400 800`) covers all required weights efficiently
- Centralizes font declarations with other global styles
- `font-display: swap` ensures text renders immediately with fallback font, then swaps when custom font loads
- Relative URLs work seamlessly with Vite's asset resolution
- Browser caches font files per deployment (content hash in URL)
- Simpler than multiple @font-face declarations while maintaining full functionality

**Alternatives considered:**

- 5 separate @font-face declarations: More verbose, no functional benefit
- Separate `fonts.css` file: Adds extra HTTP request, no benefit
- Inline in components: Duplicates declarations, breaks browser caching

### Decision 5: Use font-display: swap strategy

**Rationale:**

- **Prevents FOIT** (Flash of Invisible Text) - text renders immediately with fallback
- **Minimal FOUT** (Flash of Unstyled Text) impact - Plus Jakarta Sans has similar metrics to system sans-serif fallback
- **Best for UX** - content readable immediately, custom font enhances once loaded
- Aligns with modern web performance best practices

**Alternatives considered:**

- `font-display: block`: Creates 3-second invisible text period (bad UX)
- `font-display: optional`: Browser may not swap font if slow connection (inconsistent experience)
- `font-display: auto`: Browser default (usually block), suboptimal

### Decision 6: Keep Tailwind fontFamily config unchanged

Existing config in `tailwind.config.js`:

```js
fontFamily: {
  display: ["Plus Jakarta Sans", "sans-serif"];
}
```

**Rationale:** No changes needed. CSS `@font-face` makes font available, Tailwind config references it by name. All existing `font-display` utility classes continue to work.

## Risks / Trade-offs

**[Risk] Font files increase app bundle size by ~48KB**
→ **Mitigation:** Acceptable trade-off. Single variable font file (~48KB) is smaller than originally estimated 5 separate files (~100KB). Eliminates external CDN dependency (reliability), DNS lookups (performance), and enables offline use (resilience). Bundled fonts are cached per deployment with content hashing.

**[Risk] Font loading depends on bundle download**
→ **Mitigation:** Using `font-display: swap` ensures text renders immediately with fallback. Custom font enhances experience once loaded. Browser font cache means subsequent visits have instant font availability.

**[Risk] Font files may not be committed to Git (gitignore)**
→ **Mitigation:** Verify `.gitignore` doesn't exclude `fonts/`. Font files must be version-controlled for reproducible builds.

**[Risk] Manual font updates required if Google updates font**
→ **Accepted:** Fonts rarely change. Bundled fonts provide version stability (no unexpected design changes from CDN updates). Manual update is straightforward (download new file, replace `fonts/PlusJakartaSans.woff2`).

**[Trade-off] Developer must run npm install for fonts to work**
→ **Analysis:** Not applicable - fonts are committed to Git, not in node_modules. All developers get fonts via Git clone/pull.

**[Trade-off] Cannot leverage Google Fonts CDN caching across sites**
→ **Analysis:** Minimal impact. Modern browsers isolate cache per-origin (no cross-site cache sharing). Bundled fonts with content hashing provide better cache control.

## Migration Plan

1. **Download font file**

   - Visit `fonts.google.com/specimen/Plus+Jakarta+Sans`
   - Download single woff2 file covering weights 400-800
   - Verify file integrity and licensing

2. **Create fonts directory and add file**

   - Create `fonts/` directory at project root
   - Copy `PlusJakartaSans.woff2` file
   - Verify `.gitignore` doesn't exclude `fonts/`

3. **Add @font-face declaration**

   - Open `index.css` (create if it doesn't exist)
   - Add single `@font-face` block with `font-weight: 400 800` range
   - Use relative URL: `url('./fonts/PlusJakartaSans.woff2')`
   - Set `font-display: swap`

4. **Remove Google Fonts CDN from HTML**

   - Open `index.html`
   - Remove lines 7-8 (preconnect hints)
   - Remove line 9 (Google Fonts stylesheet link)

5. **Verify build and visual output**

   - Run `npm run dev` - confirm fonts load in DevTools Network tab
   - Check browser DevTools Elements - verify `Plus Jakarta Sans` is computed font
   - Run `npm run build` - confirm fonts are bundled with content hash in filenames
   - Visual regression test - verify all text renders identically to CDN version

6. **Commit changes**
   - Git add `fonts/PlusJakartaSans.woff2`, `index.css`, `index.html`
   - Commit with message describing font bundling change

**Rollback strategy:**

If issues arise, revert by:

1. Remove `@font-face` declaration from `index.css`
2. Restore Google Fonts CDN link and preconnect hints to `index.html`
3. Delete `fonts/` directory (or keep for future use)
4. Clear browser cache to remove bundled font files

Changes are isolated to font loading mechanism - no component code affected, making rollback safe.

## Open Questions

None - implementation path is straightforward given Vite's built-in font asset handling and standard @font-face CSS approach.
