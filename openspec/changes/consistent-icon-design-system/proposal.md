## Why

The application currently uses icons inconsistently across all components. Icon sizes vary arbitrarily (text-xl, text-lg, text-sm, text-[20px], text-[28px], or no class at all), creating a fragmented visual hierarchy. The same semantic actions use different icon variants (add vs add-circle used interchangeably), and there's no clear system for when icons should have specific behaviors. This inconsistency makes the UI feel unpolished, creates maintenance challenges, and makes it difficult for developers to know which icon size or variant to use when adding new features.

## What Changes

- Establish a five-tier icon size scale using standard Tailwind classes (text-base through text-3xl) and eliminate all arbitrary pixel values
- Define semantic icon usage patterns: when to use plain variants vs circle variants vs outlined variants
- Standardize icon sizes across all 30+ icon instances in 13 component files
- Implement special visual treatment for AI-powered action icons (subtle glow/pulse animation)
- Create comprehensive icon design system documentation with size scale reference, category-specific patterns, and implementation examples
- Add custom Tailwind animation utilities for AI icon effects

## Capabilities

### New Capabilities
- `icon-design-system`: Standard patterns for icon sizing, variant selection, and behavior across all UI components including size scale (xs through xl), semantic variant rules, interaction patterns, and special treatment for AI features

### Modified Capabilities
<!-- No existing specs are being modified - this establishes a new foundational design system -->

## Impact

**Components Affected** (13 files):
- `components/SleepSection.tsx` - Section icon size, star rating size standardization
- `components/ExerciseSection.tsx` - Schedule icon size
- `components/PressureSection.tsx` - Section icon size
- `components/DailyNotesSection.tsx` - Mic icon size standardization
- `components/SupplementsSection.tsx` - Section icon, delete icon sizes
- `components/FoodPhotosSection.tsx` - Section icon, check icon, AI icon with glow effect
- `components/FoodDetailsSection.tsx` - Section icon, check icon, meal add icon, AI icon with glow effect
- `components/ImageViewerModal.tsx` - Close icon size
- `components/DatePickerModal.tsx` - Navigation chevron sizes
- `components/FoodSearchModal.tsx` - Search and add icon sizes
- `components/SupplementModal.tsx` - Search and add icon sizes
- `components/Toast.tsx` - Success icon size

**Configuration Changes**:
- `tailwind.config.js` - Add custom animation for AI icons (pulse-slow, drop-shadow utilities)

**Documentation**:
- New `docs/icon-system.md` - Comprehensive icon design system reference

**User Experience**:
- More consistent and professional visual hierarchy
- Clear distinction between different action types through consistent icon sizing
- AI features are visually distinguished with subtle ambient effects
- Improved developer experience with clear guidelines for icon usage

**Maintenance**:
- Single source of truth for icon sizing decisions
- Easier onboarding for new developers
- Consistent patterns make code reviews more straightforward
- Future icon additions follow established system
