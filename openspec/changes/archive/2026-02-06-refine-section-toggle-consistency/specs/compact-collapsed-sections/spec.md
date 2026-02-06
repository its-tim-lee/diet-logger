## ADDED Requirements

### Requirement: Collapsed sections use compact padding
When a section is collapsed, it SHALL use reduced vertical padding to minimize vertical space while maintaining horizontal alignment.

#### Scenario: Collapsed section has reduced vertical padding
- **WHEN** a section's `isExpanded` state is false
- **THEN** the section SHALL apply `py-3` (12px vertical padding) instead of `p-5`

#### Scenario: Collapsed section maintains horizontal padding
- **WHEN** a section is collapsed
- **THEN** the section SHALL maintain `px-5` (20px horizontal padding) to prevent horizontal shift

#### Scenario: Expanded section uses full padding
- **WHEN** a section's `isExpanded` state is true
- **THEN** the section SHALL apply `p-5` (20px padding on all sides)

### Requirement: Padding transitions are animated
The system SHALL smoothly animate padding changes when toggling sections.

#### Scenario: Padding animates on toggle
- **WHEN** a section toggles between expanded and collapsed states
- **THEN** the padding SHALL transition smoothly over 200ms using CSS transitions

#### Scenario: Animation respects motion preferences
- **WHEN** the user has `prefers-reduced-motion` enabled
- **THEN** the padding transition SHALL be disabled (instant change)

### Requirement: All sections apply consistent compact styling
All 7 sections SHALL use identical padding patterns when collapsed.

#### Scenario: Every section uses same collapsed padding
- **WHEN** any section is collapsed
- **THEN** it SHALL use exactly `py-3 px-5` (no variation between sections)

#### Scenario: Every section uses same expanded padding
- **WHEN** any section is expanded
- **THEN** it SHALL use exactly `p-5 space-y-6` (no variation between sections)

### Requirement: Compact state applies to section wrapper
The padding SHALL be applied to the outermost section element, not inner containers.

#### Scenario: Section element has dynamic padding classes
- **WHEN** rendering a section component
- **THEN** the `<section>` element SHALL have conditional padding classes based on `isExpanded`

#### Scenario: Section element includes transition classes
- **WHEN** rendering a section component
- **THEN** the `<section>` element SHALL include `transition-all duration-200 motion-reduce:transition-none`
