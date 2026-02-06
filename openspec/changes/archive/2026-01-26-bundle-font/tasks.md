## 1. Download and Prepare Font Assets

- [x] 1.1 Visit fonts.google.com/specimen/Plus+Jakarta+Sans and download woff2 files for weights 400, 500, 600, 700, 800
- [x] 1.2 Create `src/fonts/` directory in project root
- [x] 1.3 Rename downloaded font files to follow convention: PlusJakartaSans-Regular.woff2 (400), PlusJakartaSans-Medium.woff2 (500), PlusJakartaSans-SemiBold.woff2 (600), PlusJakartaSans-Bold.woff2 (700), PlusJakartaSans-ExtraBold.woff2 (800)
- [x] 1.4 Copy 5 woff2 files into `src/fonts/` directory
- [x] 1.5 Verify `.gitignore` does not exclude `src/fonts/` directory

## 2. Add Font Face Declarations

- [x] 2.1 Open `src/index.css` and locate position after Tailwind directives
- [x] 2.2 Add @font-face declaration for weight 400 with font-display: swap and src: url('./fonts/PlusJakartaSans-Regular.woff2') format('woff2')
- [x] 2.3 Add @font-face declaration for weight 500 with font-display: swap and src: url('./fonts/PlusJakartaSans-Medium.woff2') format('woff2')
- [x] 2.4 Add @font-face declaration for weight 600 with font-display: swap and src: url('./fonts/PlusJakartaSans-SemiBold.woff2') format('woff2')
- [x] 2.5 Add @font-face declaration for weight 700 with font-display: swap and src: url('./fonts/PlusJakartaSans-Bold.woff2') format('woff2')
- [x] 2.6 Add @font-face declaration for weight 800 with font-display: swap and src: url('./fonts/PlusJakartaSans-ExtraBold.woff2') format('woff2')

## 3. Remove CDN Dependencies

- [x] 3.1 Open `index.html` and locate Google Fonts preconnect links (lines 7-8)
- [x] 3.2 Remove `<link rel="preconnect" href="https://fonts.googleapis.com">` from index.html
- [x] 3.3 Remove `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` from index.html
- [x] 3.4 Remove Google Fonts stylesheet link `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans..." rel="stylesheet">` from index.html (line 9)

## 4. Verify Development Build

- [x] 4.1 Run `npm run dev` to start development server
- [x] 4.2 Open browser DevTools Network tab and verify no requests to googleapis.com or gstatic.com
- [x] 4.3 Verify 5 woff2 font files load from local `/src/fonts/` directory
- [x] 4.4 Open DevTools Elements tab and inspect computed font-family for text elements - confirm "Plus Jakarta Sans" is applied
- [x] 4.5 Visually verify text rendering matches previous CDN version across all font weights (font-medium, font-semibold, font-bold)

## 5. Verify Production Build

- [x] 5.1 Run `npm run build` to generate production bundle
- [x] 5.2 Inspect `dist/assets/` directory and verify 5 font files exist with content-hashed filenames (e.g., PlusJakartaSans-Regular-a1b2c3d4.woff2)
- [x] 5.3 Inspect generated CSS in `dist/assets/` and verify @font-face src URLs include content hash
- [x] 5.4 Run `npm run preview` to test production build locally
- [x] 5.5 Open browser DevTools Network tab and verify fonts load from bundled assets with cache headers

## 6. Commit Changes

- [x] 6.1 Stage font files: `git add src/fonts/*.woff2`
- [x] 6.2 Stage CSS changes: `git add src/index.css`
- [x] 6.3 Stage HTML changes: `git add index.html`
- [x] 6.4 Commit with message: "Bundle Plus Jakarta Sans font locally to eliminate CDN dependency"
