## ADDED Requirements

### Requirement: Toggle button interaction
All collapsible sections MUST provide a toggle button that expands or collapses the section content. The toggle button SHALL be the only interactive element that controls the collapse state.

#### Scenario: User clicks toggle button to expand
- **WHEN** user clicks the toggle button on a collapsed section
- **THEN** the section expands to show all content

#### Scenario: User clicks toggle button to collapse
- **WHEN** user clicks the toggle button on an expanded section
- **THEN** the section collapses to show only icon, title, and toggle button

#### Scenario: User clicks header area outside toggle button
- **WHEN** user clicks on the section header outside the toggle button
- **THEN** the section collapse state does NOT change

### Requirement: Keyboard accessibility
The toggle button MUST be keyboard accessible and support standard keyboard interactions.

#### Scenario: User presses Enter key on focused toggle button
- **WHEN** user focuses the toggle button and presses Enter
- **THEN** the section toggles its collapse state

#### Scenario: User presses Space key on focused toggle button
- **WHEN** user focuses the toggle button and presses Space
- **THEN** the section toggles its collapse state
- **AND** the page does NOT scroll

#### Scenario: User tabs to toggle button
- **WHEN** user presses Tab to navigate through interactive elements
- **THEN** the toggle button receives focus with visible focus indicator

### Requirement: Toggle button visual design
The toggle button MUST have consistent visual styling across all sections.

#### Scenario: Toggle button has correct dimensions
- **WHEN** section is rendered
- **THEN** toggle button has 32px × 32px clickable area (h-8 w-8)

#### Scenario: Toggle button has hover state
- **WHEN** user hovers over the toggle button
- **THEN** background color changes to `bg-gray-700/50`

#### Scenario: Toggle button has rounded corners
- **WHEN** section is rendered
- **THEN** toggle button has `rounded-lg` border radius

### Requirement: Chevron icon specification
The toggle button MUST display a chevron icon with consistent size, rotation, and animation.

#### Scenario: Chevron size is consistent
- **WHEN** section is rendered
- **THEN** chevron icon has `text-2xl` size class

#### Scenario: Chevron rotation when expanded
- **WHEN** section is in expanded state
- **THEN** chevron icon points down (0deg rotation)

#### Scenario: Chevron rotation when collapsed
- **WHEN** section is in collapsed state
- **THEN** chevron icon points right (-90deg counter-clockwise rotation)

#### Scenario: Chevron rotation is animated
- **WHEN** section toggles between expanded and collapsed
- **THEN** chevron icon rotates smoothly with 200ms duration

### Requirement: Collapsed state rendering
When a section is collapsed, it MUST show exactly 3 elements: section icon, section title, and toggle button. All other elements MUST be hidden.

#### Scenario: Action buttons hidden when collapsed
- **WHEN** section is collapsed and has action buttons (add, delete, etc.)
- **THEN** action buttons are NOT rendered in the DOM

#### Scenario: Badges hidden when collapsed
- **WHEN** section is collapsed and has badges (e.g., "X Selected")
- **THEN** badges are NOT rendered in the DOM

#### Scenario: Content area hidden when collapsed
- **WHEN** section is collapsed
- **THEN** the main content area (forms, lists, etc.) is NOT visible

### Requirement: Expanded state rendering
When a section is expanded, it MUST show all section content including action buttons, forms, and data displays.

#### Scenario: Action buttons visible when expanded
- **WHEN** section is expanded and has action buttons
- **THEN** action buttons are rendered and clickable

#### Scenario: Content area visible when expanded
- **WHEN** section is expanded
- **THEN** the main content area is fully visible and interactive

### Requirement: Section header icon size
Section header icons (representing the section type) MUST have consistent sizing.

#### Scenario: Header icon has correct size
- **WHEN** section is rendered
- **THEN** header icon has `text-2xl` size class

### Requirement: Section spacing consistency
All sections MUST use consistent vertical spacing between elements.

#### Scenario: Section uses standard spacing
- **WHEN** section is rendered
- **THEN** the section container uses `space-y-4` for vertical element spacing

### Requirement: Opacity indication for collapsed state
Collapsed sections MUST visually indicate their collapsed state through reduced opacity.

#### Scenario: Collapsed section has reduced opacity
- **WHEN** section is in collapsed state
- **THEN** the section header (icon + title + toggle) has `opacity-50`

#### Scenario: Expanded section has full opacity
- **WHEN** section is in expanded state
- **THEN** the section header has full opacity (opacity-100 or default)

### Requirement: ARIA labels for accessibility
Toggle buttons MUST provide descriptive ARIA labels for screen reader users.

#### Scenario: Collapsed section has expand label
- **WHEN** section is collapsed
- **THEN** toggle button has `aria-label="Expand section"`

#### Scenario: Expanded section has collapse label
- **WHEN** section is expanded
- **THEN** toggle button has `aria-label="Collapse section"`

### Requirement: Visual feedback on interaction
The toggle button MUST provide immediate visual feedback on hover and focus states.

#### Scenario: Hover state provides background color change
- **WHEN** user hovers over toggle button
- **THEN** background transitions to `bg-gray-700/50` with smooth transition

#### Scenario: Focus state is visibly distinct
- **WHEN** toggle button receives keyboard focus
- **THEN** a visible focus ring appears around the button
