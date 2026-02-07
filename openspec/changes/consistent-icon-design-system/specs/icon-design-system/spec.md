## ADDED Requirements

### Requirement: Icon size scale
The system SHALL define a five-tier icon size scale using standard Tailwind text utility classes. All icons MUST use one of the defined size classes and SHALL NOT use arbitrary pixel values.

#### Scenario: Section identity icon sizing
- **WHEN** rendering a section header identity icon (bedtime, fitness-center, speed, edit-note, medication, restaurant, menu-book)
- **THEN** the icon SHALL use text-2xl class (24px)

#### Scenario: Navigation toggle icon sizing
- **WHEN** rendering a section collapse/expand chevron icon
- **THEN** the icon SHALL use text-2xl class (24px)

#### Scenario: Modal navigation icon sizing
- **WHEN** rendering modal navigation controls (chevron-left, chevron-right, close)
- **THEN** the icon SHALL use text-xl class (20px)

#### Scenario: Primary action button icon sizing
- **WHEN** rendering a primary action button icon (add, delete, add-a-photo in main action buttons)
- **THEN** the icon SHALL use text-xl class (20px)

#### Scenario: Secondary action button icon sizing
- **WHEN** rendering a secondary or inline action button icon (quick add, add to meal)
- **THEN** the icon SHALL use text-lg class (18px)

#### Scenario: Delete button icon sizing
- **WHEN** rendering a delete action icon
- **THEN** the icon SHALL use text-lg class (18px)

#### Scenario: List item action icon sizing
- **WHEN** rendering action icons within list items (add-circle in search results)
- **THEN** the icon SHALL use text-xl class (20px)

#### Scenario: State indicator icon sizing
- **WHEN** rendering state indicator icons (check, check-circle)
- **THEN** the icon SHALL use text-lg class for checkmarks or text-xl class for status indicators (18-20px)

#### Scenario: Input helper icon sizing
- **WHEN** rendering input helper icons (search, schedule, mic)
- **THEN** the icon SHALL use text-xl class (20px)

#### Scenario: Rating star icon sizing
- **WHEN** rendering rating star icons (star, star-outline)
- **THEN** the icon SHALL use text-3xl class (30px) for emphasis

#### Scenario: Arbitrary pixel values forbidden
- **WHEN** implementing any icon
- **THEN** the icon SHALL NOT use arbitrary pixel values like text-[20px] or text-[28px]

### Requirement: Icon variant selection
The system SHALL use appropriate material-symbols icon variants based on semantic context. Icon variant selection MUST follow semantic patterns to maintain visual consistency.

#### Scenario: Plain variant for primary actions
- **WHEN** implementing a primary action button (add supplement, delete item)
- **THEN** the icon SHALL use the plain variant (add, delete) without suffixes

#### Scenario: Circle variant for list item actions
- **WHEN** implementing an action within a list or search result
- **THEN** the icon SHALL use the -circle variant (add-circle)

#### Scenario: Outline variant for empty states
- **WHEN** implementing a toggle icon in the unselected or empty state
- **THEN** the icon SHALL use the -outline variant (star-outline)

#### Scenario: Semantic variant for context-specific actions
- **WHEN** implementing a photo-related action
- **THEN** the icon SHALL use the semantic variant (add-a-photo) instead of generic add

### Requirement: Section header icon consistency
All section header identity icons SHALL be visually consistent in size and styling. Section identity icons represent the purpose of each collapsible section.

#### Scenario: Section header icon structure
- **WHEN** rendering a section header
- **THEN** the identity icon SHALL be wrapped in a div with classes "p-2 rounded-full bg-primary/20 text-primary" and the icon SHALL use text-2xl class

#### Scenario: All seven section icons standardized
- **WHEN** rendering any of the seven section components (Sleep, Exercise, Pressure, DailyNotes, Supplements, FoodPhotos, FoodDetails)
- **THEN** each section's identity icon SHALL follow the same size and container pattern

### Requirement: Navigation toggle behavior
Navigation toggle icons (chevrons) SHALL have consistent animation behavior when toggling between expanded and collapsed states.

#### Scenario: Chevron rotation animation
- **WHEN** a section is collapsed
- **THEN** the expand-more chevron SHALL rotate -90 degrees with transition-transform duration-200

#### Scenario: Chevron size consistency
- **WHEN** rendering any section toggle chevron
- **THEN** the chevron SHALL use text-2xl class and transition-transform duration-200

### Requirement: AI action icon special treatment
AI-powered action icons SHALL have distinct visual treatment to indicate their special functionality. The visual treatment MUST be subtle enough to not distract but noticeable enough to distinguish AI features.

#### Scenario: AI icon gradient background
- **WHEN** rendering an AI action button (auto-awesome, auto-fix-high)
- **THEN** the button SHALL use gradient background "from-primary/20 to-primary/10" that intensifies on hover to "from-primary/30 to-primary/20"

#### Scenario: AI icon ambient pulse animation
- **WHEN** rendering an AI action button
- **THEN** the button SHALL include an ambient pulse animation layer with "animate-pulse-slow" class (3 second cycle)

#### Scenario: AI icon glow effect
- **WHEN** rendering an AI action icon
- **THEN** the icon SHALL have a drop shadow glow effect "drop-shadow-[0_0_8px_rgba(91,236,19,0.4)]"

#### Scenario: AI icon border prominence
- **WHEN** rendering an AI action button
- **THEN** the button SHALL use "border border-primary/30" for subtle prominence

#### Scenario: AI icon size consistency
- **WHEN** rendering an AI action icon
- **THEN** the icon SHALL use text-xl class (20px) like other action buttons

### Requirement: Icon interaction patterns
Icon interaction behavior SHALL be consistent and simple. Icons inherit interaction states from their button containers and SHALL NOT have icon-level micro-interactions except for semantic state changes.

#### Scenario: Icons inherit button hover states
- **WHEN** an icon is placed within an interactive button
- **THEN** the icon SHALL NOT have its own hover transformation and SHALL inherit visual feedback from the button's hover state

#### Scenario: List item icon color transitions
- **WHEN** rendering add-circle icons in list items
- **THEN** the icon SHALL have "transition-colors duration-200" and "group-hover:text-primary" with the button using "group" class

#### Scenario: Chevron semantic animation
- **WHEN** a collapsible section toggle is clicked
- **THEN** the chevron icon SHALL rotate to indicate state change with "transition-transform duration-200"

#### Scenario: Star rating color transitions
- **WHEN** rendering star rating icons
- **THEN** the filled/unfilled stars SHALL use "transition-colors duration-200" for smooth color changes

#### Scenario: No icon-level scale or transform micro-interactions
- **WHEN** implementing any non-toggle, non-AI icon
- **THEN** the icon SHALL NOT have scale, transform, or other micro-interaction classes

### Requirement: Input helper icon styling
Input helper icons (search, schedule, mic) SHALL have consistent styling to indicate their role as input affordances rather than primary actions.

#### Scenario: Search icon styling
- **WHEN** rendering a search icon within an input field
- **THEN** the icon SHALL use "text-xl text-gray-400 mr-2" classes

#### Scenario: Input helper icon size
- **WHEN** rendering any input helper icon (schedule, mic)
- **THEN** the icon SHALL use text-xl class (20px)

### Requirement: Tailwind configuration for AI icons
The Tailwind configuration SHALL include custom utilities to support AI icon visual effects.

#### Scenario: Pulse-slow animation utility
- **WHEN** configuring Tailwind theme
- **THEN** the configuration SHALL include animation "pulse-slow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'"

#### Scenario: Glow drop shadow utility
- **WHEN** configuring Tailwind theme
- **THEN** the configuration SHALL include dropShadow "glow-primary: '0 0 8px rgba(91, 236, 19, 0.4)'"

### Requirement: Documentation reference
The icon design system SHALL be fully documented for developer reference and onboarding.

#### Scenario: Icon system documentation exists
- **WHEN** a developer needs icon sizing guidance
- **THEN** comprehensive documentation SHALL exist at docs/icon-system.md with size scale reference, semantic patterns, code examples, and anti-patterns

#### Scenario: Documentation includes all seven categories
- **WHEN** referencing the icon documentation
- **THEN** the documentation SHALL cover all seven semantic categories: section identity, navigation/toggles, add actions, delete actions, state indicators, input helpers, and AI actions

#### Scenario: Documentation includes implementation examples
- **WHEN** a developer needs to implement an icon
- **THEN** the documentation SHALL provide copy-paste code examples for common scenarios

#### Scenario: Documentation includes anti-patterns
- **WHEN** reviewing icon implementation
- **THEN** the documentation SHALL explicitly list forbidden patterns like arbitrary pixel values
