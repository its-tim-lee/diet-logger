## ADDED Requirements

### Requirement: Sections display toggle control
All sections SHALL display a toggle control in the section header.

#### Scenario: Toggle control is visible
- **WHEN** a section is rendered
- **THEN** the section header SHALL include a clickable chevron icon

#### Scenario: Toggle control is positioned consistently
- **WHEN** multiple sections are rendered
- **THEN** all toggle controls SHALL appear in the same position (right side of header)

### Requirement: Toggle control indicates current state
The toggle control SHALL visually indicate whether the section is expanded or collapsed.

#### Scenario: Expanded state shows downward chevron
- **WHEN** a section is expanded
- **THEN** the chevron icon SHALL point downward

#### Scenario: Collapsed state shows rightward chevron
- **WHEN** a section is collapsed
- **THEN** the chevron icon SHALL point to the right

#### Scenario: Chevron rotates during transition
- **WHEN** the user toggles a section
- **THEN** the chevron SHALL smoothly rotate between states over 200ms

### Requirement: Collapsed sections hide content
When a section is collapsed, its content SHALL be hidden.

#### Scenario: Content is hidden when collapsed
- **WHEN** a section's `isExpanded` state is false
- **THEN** all section content below the header SHALL be hidden

#### Scenario: Header remains visible when collapsed
- **WHEN** a section is collapsed
- **THEN** the section header SHALL remain visible

### Requirement: Collapsed sections display grayed-out header
When a section is collapsed, the header SHALL appear grayed out.

#### Scenario: Header opacity is reduced
- **WHEN** a section is collapsed
- **THEN** the section header SHALL have 50% opacity (Tailwind: `opacity-50`)

#### Scenario: Header returns to normal when expanded
- **WHEN** a collapsed section is expanded
- **THEN** the section header SHALL return to 100% opacity

### Requirement: Expand/collapse transitions are smooth
State transitions SHALL be animated smoothly.

#### Scenario: Content height animates
- **WHEN** a section expands or collapses
- **THEN** the content height SHALL transition smoothly over 300ms using ease-in-out timing

#### Scenario: Opacity fades during collapse
- **WHEN** a section collapses
- **THEN** the content opacity SHALL fade from 100% to 0% over 200ms

#### Scenario: Opacity fades during expand
- **WHEN** a section expands
- **THEN** the content opacity SHALL fade from 0% to 100% over 200ms

### Requirement: Animations respect user preferences
The system SHALL respect user accessibility preferences for motion.

#### Scenario: Reduced motion disables animations
- **WHEN** the user has `prefers-reduced-motion` enabled in their OS settings
- **THEN** all expand/collapse animations SHALL be disabled (instant transition)

### Requirement: All sections use consistent styling
All sections SHALL apply the same CSS classes and animation properties for toggle behavior.

#### Scenario: Collapsed state classes are consistent
- **WHEN** any section is collapsed
- **THEN** it SHALL use the same Tailwind classes for grayed-out header and hidden content

#### Scenario: Transition timing is consistent
- **WHEN** any section animates
- **THEN** it SHALL use the same transition durations (300ms for height, 200ms for opacity)

### Requirement: Toggle interaction is immediate
The system SHALL respond immediately to toggle clicks.

#### Scenario: Toggle responds on click
- **WHEN** the user clicks the toggle control
- **THEN** the section SHALL begin transitioning within one frame (16ms)

#### Scenario: Toggle is accessible via keyboard
- **WHEN** the user tabs to the toggle control and presses Enter or Space
- **THEN** the section SHALL toggle its state
