## Why

The application currently loads Plus Jakarta Sans font (~120KB for 5 weights) from Google Fonts CDN at runtime. This creates an external dependency, increases initial page load time due to DNS lookup and CDN request, and breaks offline functionality. Bundling the font as a local asset will eliminate the CDN dependency, enable offline use, reduce initial render blocking, and provide full control over font loading strategy for better performance.

## What Changes

- Remove Google Fonts Plus Jakarta Sans CDN link from `index.html`
- Download Plus Jakarta Sans font files (woff2 format) for weights 400, 500, 600, 700, 800
- Create `src/fonts/` directory to store font assets
- Add `@font-face` declarations to `src/index.css` for each font weight
- Configure font-display strategy for optimal loading (swap)
- Keep existing `fontFamily` configuration in Tailwind config pointing to "Plus Jakarta Sans"

## Capabilities

### New Capabilities

- `bundled-font-assets`: Local font file hosting with @font-face declarations, bundling Plus Jakarta Sans in woff2 format with optimized loading strategy

### Modified Capabilities

<!-- No existing capabilities are having their requirements changed -->

## Impact

**Files Modified:**

- `index.html` - Remove Google Fonts CDN link (line 9) and preconnect hints (lines 7-8)
- `src/index.css` - Add @font-face declarations for Plus Jakarta Sans weights

**Files Created:**

- `src/fonts/PlusJakartaSans-Regular.woff2` (weight 400)
- `src/fonts/PlusJakartaSans-Medium.woff2` (weight 500)
- `src/fonts/PlusJakartaSans-SemiBold.woff2` (weight 600)
- `src/fonts/PlusJakartaSans-Bold.woff2` (weight 700)
- `src/fonts/PlusJakartaSans-ExtraBold.woff2` (weight 800)

**Bundle Size:**

- Google Fonts CDN request: ~120KB external dependency removed
- Bundled font files: ~100KB added to bundle (woff2 compressed, ~20KB per weight × 5 weights)
- Net savings: Eliminates 1 external CDN request, ~2 DNS lookups (googleapis.com + gstatic.com)
- Performance: Reduces render-blocking time by ~200-400ms (typical CDN roundtrip)

**Font Loading Strategy:**

- Using `font-display: swap` for immediate text rendering with fallback font
- Fallback chain: Plus Jakarta Sans → system sans-serif
- No FOUT (Flash of Unstyled Text) impact due to similar metrics between font and fallback

**Dependencies:**

- No new npm dependencies required
- Font files sourced from Google Fonts (OFL license, free for commercial use)

**No Breaking Changes:**

- Visual output identical (same font family)
- All existing font-weight utilities (font-medium, font-semibold, etc.) continue to work
- No changes required to component code
- Tailwind config fontFamily remains unchanged
