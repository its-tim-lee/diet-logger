## Why

Users can currently add and edit food items, but have no way to remove incorrectly added or unwanted items. This creates a frustrating experience where the food log becomes cluttered with items that can't be removed, forcing users to either ignore them or manually work around them.

## What Changes

- Add delete functionality to food items in the daily check-in form
- Add a delete button to each food item card with appropriate visual feedback
- Implement state management for removing items from the food list

## Capabilities

### New Capabilities
- `delete-food-item`: Users can remove individual food items from their daily log by clicking a delete button on each food item card

### Modified Capabilities
<!-- No existing capabilities are being modified -->

## Impact

- `App.tsx`: Add `deleteFoodItem` handler function and pass it as a prop to FoodDetailsSection
- `components/FoodDetailsSection.tsx`: Add delete button UI to each food item card and wire up the delete handler
