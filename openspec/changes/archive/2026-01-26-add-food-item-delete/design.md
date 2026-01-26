## Context

The diet logger app currently supports adding and editing food items, but lacks delete functionality. The existing food item management follows a unidirectional data flow pattern where App.tsx maintains state and passes handlers to FoodDetailsSection.tsx.

## Goals / Non-Goals

**Goals:**
- Add delete functionality that follows the existing architectural pattern
- Provide clear visual feedback for the delete action
- Maintain consistency with existing UI patterns (edit button style, positioning)

**Non-Goals:**
- Confirmation dialog for deletes (keep it simple and immediate)
- Undo functionality (not in scope for this change)
- Bulk delete operations

## Decisions

### Decision 1: Follow existing handler pattern

**Approach:** Implement `deleteFoodItem` in App.tsx following the same pattern as `updateFoodItem` and `addFoodItem`.

**Rationale:** This maintains architectural consistency. All food item state mutations happen at the App level and are passed down as props. This keeps state management centralized and predictable.

### Decision 2: Delete button placement

**Approach:** Add delete button alongside the existing edit button in each food item card.

**Rationale:** The UI already has an edit button on the right side of each card. Adding a delete button in the same area creates a natural action cluster. We'll use a trash icon to make the action clear.

### Decision 3: Immediate deletion without confirmation

**Approach:** Delete immediately on button click without a confirmation dialog.

**Rationale:** Keeps the interaction simple and fast. The context (a daily food log) means mistakes are low-risk, and users can always re-add items. This matches the simplicity of the existing edit flow.

## Risks / Trade-offs

**Risk:** User accidentally deletes an item
→ **Mitigation:** Use clear iconography (trash icon) and consider adding a subtle hover state to make the action obvious before clicking

**Trade-off:** No undo functionality means users must re-add mistakenly deleted items
→ **Acceptable:** Given the simplicity of re-adding items via the search modal, this trade-off keeps the implementation lean
