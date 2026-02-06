## ADDED Requirements

### Requirement: All sections use expand-more icon
All sections SHALL use the `material-symbols:expand-more` icon for toggle controls.

#### Scenario: Sleep section uses expand-more
- **WHEN** rendering SleepSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Exercise section uses expand-more
- **WHEN** rendering ExerciseSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Pressure section uses expand-more
- **WHEN** rendering PressureSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Daily Notes section uses expand-more
- **WHEN** rendering DailyNotesSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Supplements section uses expand-more
- **WHEN** rendering SupplementsSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Food Photos section uses expand-more
- **WHEN** rendering FoodPhotosSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

#### Scenario: Food Details section uses expand-more
- **WHEN** rendering FoodDetailsSection
- **THEN** the toggle icon SHALL be `material-symbols:expand-more`

### Requirement: Sections use useToggleState hook without props
ExerciseSection and DailyNotesSection SHALL use the useToggleState hook directly without backwards compatibility props.

#### Scenario: ExerciseSection has no enabled prop
- **WHEN** examining ExerciseSection TypeScript interface
- **THEN** the `enabled?: boolean` prop SHALL NOT be present

#### Scenario: ExerciseSection has no setEnabled prop
- **WHEN** examining ExerciseSection TypeScript interface
- **THEN** the `setEnabled?: (val: boolean) => void` prop SHALL NOT be present

#### Scenario: DailyNotesSection has no enabled prop
- **WHEN** examining DailyNotesSection TypeScript interface
- **THEN** the `enabled?: boolean` prop SHALL NOT be present

#### Scenario: DailyNotesSection has no setEnabled prop
- **WHEN** examining DailyNotesSection TypeScript interface
- **THEN** the `setEnabled?: (val: boolean) => void` prop SHALL NOT be present

#### Scenario: ExerciseSection uses toggle function directly
- **WHEN** rendering ExerciseSection toggle button
- **THEN** the onClick handler SHALL call `toggle` from useToggleState hook directly

#### Scenario: DailyNotesSection uses toggle function directly
- **WHEN** rendering DailyNotesSection toggle button
- **THEN** the onClick handler SHALL call `toggle` from useToggleState hook directly
