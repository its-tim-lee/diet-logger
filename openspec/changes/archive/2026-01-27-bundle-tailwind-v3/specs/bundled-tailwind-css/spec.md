## ADDED Requirements

### Requirement: Bundle Tailwind CSS v3 at build time

The system SHALL bundle Tailwind CSS v3 as a development dependency and process it through PostCSS during the build process, eliminating runtime CDN dependencies.

#### Scenario: Tailwind CSS is installed as dev dependency

- **WHEN** the project dependencies are installed
- **THEN** Tailwind CSS v3 is available as a devDependency in package.json

#### Scenario: PostCSS processes Tailwind during build

- **WHEN** the build command is executed
- **THEN** PostCSS processes CSS files through the Tailwind plugin
- **THEN** the output includes compiled Tailwind styles in the bundle

#### Scenario: No CDN script tag in HTML

- **WHEN** the index.html file is loaded
- **THEN** no Tailwind CDN script tag is present
- **THEN** no external Tailwind CSS requests are made

### Requirement: Purge unused CSS classes

The system SHALL scan content files for used Tailwind classes and remove unused styles from the production bundle, reducing CSS size by approximately 90%.

#### Scenario: Content paths are configured for purging

- **WHEN** the Tailwind configuration is loaded
- **THEN** content paths include all HTML, TSX, JSX, TS, and JS files that contain Tailwind classes

#### Scenario: Production build purges unused styles

- **WHEN** the production build is executed
- **THEN** only Tailwind classes actually used in the codebase are included in the output CSS
- **THEN** the final CSS bundle is approximately 12KB or less (down from 400KB CDN version)

#### Scenario: Used classes are preserved

- **WHEN** the purging process runs
- **THEN** all Tailwind classes referenced in the codebase remain in the output CSS
- **THEN** no visual regressions occur due to missing styles

### Requirement: Apply vendor prefixes automatically

The system SHALL process CSS through Autoprefixer to add vendor-specific prefixes for cross-browser compatibility.

#### Scenario: Autoprefixer is configured in PostCSS

- **WHEN** PostCSS configuration is loaded
- **THEN** Autoprefixer plugin is included in the plugins array

#### Scenario: CSS includes vendor prefixes

- **WHEN** the build outputs CSS
- **THEN** CSS properties include appropriate vendor prefixes for browser compatibility

### Requirement: Preserve existing visual appearance

The system SHALL maintain identical visual output with no breaking changes to component styles or user-facing appearance.

#### Scenario: Custom colors are preserved

- **WHEN** the Tailwind configuration is loaded
- **THEN** custom color definitions (primary, background-light, background-dark, card-dark, card-dark-hover, input-bg, pill-bg) are present in the theme

#### Scenario: Custom animations are preserved

- **WHEN** the Tailwind configuration is loaded
- **THEN** custom animations (pulse-glow, shimmer, fade-out, wave, fadeIn) are present in the theme

#### Scenario: Dark mode strategy is preserved

- **WHEN** the Tailwind configuration is loaded
- **THEN** dark mode is configured with "class" strategy

#### Scenario: Custom font is preserved

- **WHEN** the Tailwind configuration is loaded
- **THEN** the "display" font family maps to "Plus Jakarta Sans"

#### Scenario: Tailwind plugins are preserved

- **WHEN** the Tailwind configuration is loaded
- **THEN** forms plugin is included
- **THEN** container-queries plugin is included

### Requirement: Import CSS in application entry point

The system SHALL import the compiled CSS file in the application entry point to ensure styles are loaded with the application bundle.

#### Scenario: CSS is imported in index.tsx

- **WHEN** index.tsx is loaded
- **THEN** it imports the CSS entry point file
- **THEN** styles are available when the application renders

#### Scenario: CSS import happens before React render

- **WHEN** the application initializes
- **THEN** CSS is loaded before React mounts to the DOM
- **THEN** no flash of unstyled content occurs

### Requirement: Consolidate custom CSS in entry point

The system SHALL move all custom CSS from inline style tags to a dedicated CSS entry point file alongside Tailwind directives.

#### Scenario: Tailwind directives are in index.css

- **WHEN** the CSS entry point is loaded
- **THEN** it includes @tailwind base, @tailwind components, and @tailwind utilities directives

#### Scenario: Custom scrollbar styles are in index.css

- **WHEN** the CSS entry point is loaded
- **THEN** webkit scrollbar hiding styles are present

#### Scenario: Custom input styles are in index.css

- **WHEN** the CSS entry point is loaded
- **THEN** range input styling is present
- **THEN** time input calendar picker styling is present

#### Scenario: Custom body styles are in index.css

- **WHEN** the CSS entry point is loaded
- **THEN** body styles (min-height, overscroll behavior) are present

#### Scenario: No inline styles in index.html

- **WHEN** the index.html file is loaded
- **THEN** no inline style tag is present

### Requirement: Support offline functionality

The system SHALL enable the application to function completely offline by eliminating external CDN dependencies for CSS.

#### Scenario: Application loads without network

- **WHEN** the application is loaded with network connectivity disabled
- **THEN** all Tailwind styles render correctly
- **THEN** no CSS loading errors occur

#### Scenario: No external CSS requests

- **WHEN** the application loads
- **THEN** no HTTP requests are made to CDN domains for CSS files

### Requirement: Maintain fast development experience

The system SHALL preserve fast hot module replacement (HMR) in development mode while processing CSS through PostCSS.

#### Scenario: HMR updates CSS changes instantly

- **WHEN** a CSS file is modified in development mode
- **THEN** the browser updates styles without full page reload
- **THEN** style changes appear within 100ms

#### Scenario: HMR updates component styles instantly

- **WHEN** Tailwind classes are modified in a component file
- **THEN** the browser updates styles without full page reload
- **THEN** style changes appear within 100ms

### Requirement: Configure Tailwind with content paths

The system SHALL configure Tailwind to scan all relevant files for class names to enable accurate purging and JIT compilation.

#### Scenario: Configuration includes HTML files

- **WHEN** the Tailwind configuration is loaded
- **THEN** content paths include "./index.html"

#### Scenario: Configuration includes source files

- **WHEN** the Tailwind configuration is loaded
- **THEN** content paths include "./src/\*_/_.{js,ts,jsx,tsx}"

#### Scenario: Configuration includes component files

- **WHEN** the Tailwind configuration is loaded
- **THEN** content paths include "./components/\*_/_.{js,ts,jsx,tsx}"
