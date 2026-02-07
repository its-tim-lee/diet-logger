# Icon design system

This project uses `@iconify/react` with the `material-symbols` icon family.

## Size scale (Tailwind)

All icons must use one of these Tailwind `text-*` classes. **Do not use arbitrary values** like `text-[20px]`.

| Tier | Tailwind class | Approx px | Use when |
| --- | --- | --- | --- |
| xs | `text-base` | 16px | Inline indicators / tiny affordances |
| sm | `text-lg` | 18px | Delete buttons, checkmarks (state) |
| md | `text-xl` | 20px | Standard action buttons, modal controls, inputs |
| lg | `text-2xl` | 24px | Section identity icons, collapse/expand chevrons |
| xl | `text-3xl` | 30px | Rating stars (emphasis) |

## Section identity icons (headers)

**Pattern:** consistent wrapper + `text-2xl` icon.

```tsx
<div className="p-2 rounded-full bg-primary/20 text-primary">
  <Icon icon="material-symbols:bedtime" className="text-2xl" />
</div>
```

## Navigation / toggles (collapse chevron)

**Pattern:** `text-2xl` + semantic rotation animation.

```tsx
<Icon
  icon="material-symbols:expand-more"
  className={`text-2xl transition-transform duration-200 ${
    isExpanded ? "" : "-rotate-90"
  }`}
/>
```

## Action buttons

### Primary actions (e.g. add)

Use **plain** variants (`add`, `delete`) in primary action buttons.

```tsx
<Icon icon="material-symbols:add" className="text-xl" />
```

### Secondary / inline actions (e.g. add to meal)

Smaller actions use `text-lg`.

```tsx
<Icon icon="material-symbols:add" className="text-lg" />
```

### List item actions (e.g. search results)

Use `add-circle` inside list items; add hover via a `group` parent.

```tsx
<button className="group ...">
  <Icon
    icon="material-symbols:add-circle"
    className="text-xl text-gray-500 group-hover:text-primary transition-colors duration-200"
  />
</button>
```

## State indicators

### Checkmarks

Use `text-lg` for in-row checkmarks.

```tsx
<Icon icon="material-symbols:check" className="text-lg" />
```

### Status indicators

Use `text-xl` for larger status icons like `check-circle`.

```tsx
<Icon icon="material-symbols:check-circle" className="text-xl text-primary" />
```

## Input helper icons

Input helpers should be visually “supporting”, not primary.

```tsx
<Icon icon="material-symbols:search" className="text-xl text-gray-400 mr-2" />
```

## AI actions (special treatment)

AI-powered actions (e.g. `auto-awesome`, `auto-fix-high`) get:
- Gradient background: `from-primary/20 to-primary/10` (hover to `from-primary/30 to-primary/20`)
- Ambient pulse layer: `animate-pulse-slow` (disable with `motion-reduce:animate-none`)
- Icon glow: `drop-shadow-glow-primary`
- Icon size: `text-xl`

### Full implementation example

```tsx
<button className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-colors motion-reduce:transition-none">
  <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 opacity-60 animate-pulse-slow motion-reduce:animate-none" />
  <Icon
    icon="material-symbols:auto-fix-high"
    className="relative text-primary text-xl drop-shadow-glow-primary"
  />
  <span className="relative text-white text-xs font-bold">Re-enhance</span>
</button>
```

## Never do this (anti-patterns)

- Use arbitrary size utilities for icons (forbidden):
  - `text-[20px]`, `text-[28px]`, etc.
- Mix size tiers for the same semantic category (e.g., section icons in `text-xl` in one section and `text-2xl` in another).
- Add icon-level transform micro-interactions on non-toggle icons (prefer container hover states).
