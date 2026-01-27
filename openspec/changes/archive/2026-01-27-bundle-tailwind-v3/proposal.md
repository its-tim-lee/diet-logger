## Why

The application currently loads Tailwind CSS (~400KB) from a CDN at runtime with inline configuration. This introduces external dependencies, slower initial page loads, and prevents CSS optimization. Bundling Tailwind v3 via PostCSS will reduce bundle size by ~90% through unused style purging, eliminate external CDN requests, enable offline functionality, and align with modern build best practices.

## What Changes

- Remove Tailwind CDN script tag from `index.html`
- Install Tailwind CSS v3 as a dev dependency via npm
- Create `tailwind.config.js` with content paths for purging
- Create `postcss.config.js` to wire up Tailwind processing
- Create `src/index.css` with Tailwind directives and custom styles
- Move inline Tailwind configuration from HTML `<script>` to config file
- Move custom CSS from inline `<style>` tag to `src/index.css`
- Import bundled CSS in application entry point (`index.tsx`)
- Vite automatically processes CSS through PostCSS during build

## Capabilities

### New Capabilities
- `bundled-tailwind-css`: Build-time CSS bundling with Tailwind v3, PostCSS, and Autoprefixer, generating optimized CSS purged of unused styles

### Modified Capabilities
<!-- No existing capabilities are having their requirements changed -->

## Impact

**Files Modified:**
- `index.html` - Remove CDN script, remove inline config, remove inline styles
- `package.json` - Add tailwindcss@^3, postcss, autoprefixer as devDependencies

**Files Created:**
- `tailwind.config.js` - Tailwind configuration (theme, plugins, content paths)
- `postcss.config.js` - PostCSS pipeline configuration
- `src/index.css` - CSS entry point with Tailwind directives and custom styles
- `index.tsx` - Add import for `./index.css`

**Build Process:**
- Vite build time increases by ~2-3 seconds for initial Tailwind purge
- Development HMR remains instant with Vite's fast refresh
- Production bundle reduces from ~400KB (CDN) to ~12KB (purged CSS)

**No Breaking Changes:**
- Visual output remains identical
- All existing Tailwind classes continue to work
- No changes required to component code
