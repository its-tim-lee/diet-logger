## ADDED Requirements

### Requirement: Hook provides toggle state management
The `useToggleState` hook SHALL manage boolean toggle state with localStorage persistence for any section.

#### Scenario: Hook returns expanded state and toggle function
- **WHEN** a component calls `useToggleState('section-name')`
- **THEN** the hook returns a tuple `[isExpanded: boolean, toggle: () => void]`

#### Scenario: Default state is expanded
- **WHEN** a section uses the hook for the first time with no localStorage value
- **THEN** the hook SHALL return `isExpanded = true` by default

#### Scenario: Custom default can be specified
- **WHEN** a component calls `useToggleState('section-name', false)`
- **THEN** the hook SHALL return `isExpanded = false` for first-time use

### Requirement: Hook persists state to localStorage
The hook SHALL save toggle state to localStorage whenever it changes.

#### Scenario: State is saved on toggle
- **WHEN** the user calls the toggle function
- **THEN** the hook SHALL write the new state to localStorage with key `wellness-section-${sectionName}`

#### Scenario: State is stored as string
- **WHEN** the hook writes to localStorage
- **THEN** the value SHALL be stored as the string `"true"` or `"false"`

### Requirement: Hook reads persisted state on mount
The hook SHALL read the initial state from localStorage when the component mounts.

#### Scenario: Persisted state is loaded
- **WHEN** a component mounts and localStorage contains `wellness-section-${sectionName}`
- **THEN** the hook SHALL return the persisted boolean value as `isExpanded`

#### Scenario: Missing localStorage value uses default
- **WHEN** a component mounts and no localStorage value exists for the section
- **THEN** the hook SHALL return the `defaultExpanded` parameter value (or true if not specified)

#### Scenario: Invalid localStorage value uses default
- **WHEN** localStorage contains an invalid value (not "true" or "false")
- **THEN** the hook SHALL return the `defaultExpanded` parameter value and overwrite the invalid value

### Requirement: Hook handles localStorage errors gracefully
The hook SHALL continue functioning even if localStorage is unavailable or quota is exceeded.

#### Scenario: localStorage is unavailable
- **WHEN** localStorage throws an error (e.g., privacy mode, quota exceeded)
- **THEN** the hook SHALL fallback to in-memory state without crashing

#### Scenario: localStorage quota exceeded
- **WHEN** writing to localStorage fails due to quota exceeded
- **THEN** the hook SHALL continue to work with in-memory state only

### Requirement: Hook uses stable identity for toggle function
The toggle function SHALL maintain stable identity across re-renders to prevent unnecessary re-renders of child components.

#### Scenario: Toggle function identity is stable
- **WHEN** the component re-renders
- **THEN** the toggle function reference SHALL remain the same (use useCallback)
