## ADDED Requirements

### Requirement: Font files SHALL be stored locally

The application SHALL host Plus Jakarta Sans font files locally in the source tree rather than loading from external CDN.

#### Scenario: Font file exists in source

- **WHEN** developer inspects the `fonts/` directory
- **THEN** directory contains a woff2 font file (`PlusJakartaSans.woff2`) that supports weights 400, 500, 600, 700, 800

#### Scenario: Font file is version controlled

- **WHEN** developer clones the repository
- **THEN** font file is included in Git and available without additional download

### Requirement: Font weights SHALL be declared via @font-face

The application SHALL declare Plus Jakarta Sans font weights using CSS @font-face declarations.

#### Scenario: All font weights are declared

- **WHEN** application CSS is parsed
- **THEN** @font-face declaration exists with `font-weight: 400 800` covering weights 400, 500, 600, 700, 800

#### Scenario: Font declaration uses correct format

- **WHEN** @font-face rule is inspected
- **THEN** declaration specifies font-family "Plus Jakarta Sans", font-weight range (400 800), font-style normal, font-display swap, and src pointing to local woff2 file

### Requirement: Fonts SHALL use swap display strategy

The application SHALL configure fonts with font-display: swap to prevent invisible text during font loading.

#### Scenario: Font display strategy is swap

- **WHEN** @font-face declaration is inspected
- **THEN** declaration includes "font-display: swap" property

#### Scenario: Text renders immediately with fallback

- **WHEN** page loads before custom font is available
- **THEN** text renders immediately using system sans-serif fallback

#### Scenario: Text swaps to custom font when loaded

- **WHEN** Plus Jakarta Sans font finishes loading
- **THEN** text automatically swaps from fallback to custom font

### Requirement: Font files SHALL use woff2 format

The application SHALL use exclusively woff2 format for font files for optimal compression and modern browser support.

#### Scenario: Font files are woff2 format

- **WHEN** font file extensions are checked
- **THEN** all files have .woff2 extension

#### Scenario: Font declaration references woff2

- **WHEN** @font-face src attribute is inspected
- **THEN** src specifies format("woff2")

### Requirement: Application SHALL NOT load fonts from CDN

The application SHALL NOT include Google Fonts CDN links or preconnect hints for font services.

#### Scenario: No Google Fonts CDN link in HTML

- **WHEN** index.html is inspected
- **THEN** no link elements with href containing "fonts.googleapis.com" exist

#### Scenario: No font CDN preconnect hints

- **WHEN** index.html head is inspected
- **THEN** no link[rel="preconnect"] elements for fonts.googleapis.com or fonts.gstatic.com exist

#### Scenario: Fonts load from bundled assets

- **WHEN** browser DevTools Network tab is inspected during page load
- **THEN** no network requests to googleapis.com or gstatic.com domains occur

### Requirement: Build system SHALL bundle fonts with content hashing

The application build SHALL process font files through Vite asset pipeline for optimized delivery.

#### Scenario: Font URLs include content hash

- **WHEN** production build is generated
- **THEN** font file URLs in generated CSS include content hash for cache busting

#### Scenario: Font files are bundled in assets directory

- **WHEN** dist/ folder is inspected after build
- **THEN** font files exist in assets/ subdirectory with hashed filenames

### Requirement: Existing font utilities SHALL continue working

The application SHALL preserve all existing font-weight Tailwind utilities without requiring code changes.

#### Scenario: Font-weight classes work unchanged

- **WHEN** components use font-medium, font-semibold, font-bold classes
- **THEN** text renders with correct font weights (500, 600, 700) using bundled fonts

#### Scenario: Visual output is identical

- **WHEN** page is rendered with bundled fonts
- **THEN** visual appearance matches previous CDN-loaded font rendering exactly
