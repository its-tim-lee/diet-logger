## ADDED Requirements

### Requirement: Icons render as bundled SVG components

The system SHALL render all Material Symbols icons using the @iconify/react Icon component, bundling only the icons actually used in the application as inline SVG elements.

#### Scenario: Icon component renders SVG
- **WHEN** a component uses `<Icon icon="material-symbols:icon-name" />`
- **THEN** the icon renders as an inline SVG element (not a web font character)

#### Scenario: Only used icons are bundled
- **WHEN** the application builds for production
- **THEN** only the Material Symbols icons referenced in the codebase are included in the bundle

#### Scenario: Icons work offline
- **WHEN** the application runs without network connectivity
- **THEN** all icons render correctly without requiring external CDN resources

### Requirement: All components use Icon component for icons

The system SHALL use `<Icon icon="material-symbols:name" />` for all icon rendering throughout the codebase, replacing the previous `<span className="material-symbols-outlined">` pattern.

#### Scenario: Component imports Icon from @iconify/react
- **WHEN** a component needs to display an icon
- **THEN** it imports Icon via `import { Icon } from '@iconify/react'`

#### Scenario: Icon names use kebab-case with namespace
- **WHEN** specifying an icon in the Icon component
- **THEN** the icon prop uses format `material-symbols:{icon-name}` with hyphen-separated names (e.g., `material-symbols:calendar-today`, not `calendar_today`)

#### Scenario: Icon styling via className prop
- **WHEN** an icon needs custom styling (size, color, etc.)
- **THEN** Tailwind utility classes are applied via the className prop on the Icon component

### Requirement: No external CDN dependencies for icons

The system SHALL NOT load icon fonts or icon resources from external CDNs, ensuring all icons are self-contained within the application bundle.

#### Scenario: index.html has no Google Fonts link
- **WHEN** index.html is loaded
- **THEN** there is no `<link>` tag loading Material Symbols from Google Fonts CDN

#### Scenario: Application bundle is self-contained
- **WHEN** the application is deployed
- **THEN** all icon resources are included in the bundle and no runtime external icon requests are made

### Requirement: Icon visual appearance is preserved

The system SHALL maintain the same visual appearance for all icons after migration from font-based to SVG-based rendering.

#### Scenario: Icon design matches previous font version
- **WHEN** an icon is rendered using the Icon component
- **THEN** it displays the same Material Symbols design as the previous font-based implementation

#### Scenario: Icon size and color respond to CSS
- **WHEN** className props specify size or color utilities
- **THEN** the SVG icon scales and colors appropriately (matching previous font behavior)
