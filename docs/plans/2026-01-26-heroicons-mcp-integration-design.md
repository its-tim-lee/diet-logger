# Heroicons MCP Integration Design

**Date:** 2026-01-26
**Goal:** Integrate heroicons-mcp server with Claude Code and migrate project to use Heroicons as the long-term icon solution for AI-assisted development.

## Overview

This design establishes Heroicons as the standard icon library for the diet-logger app, replacing Google Material Symbols. The heroicons-mcp server will enable Claude Code to search and query icons during development.

## MCP Server Configuration

Configure heroicons-mcp globally in Claude Code's MCP settings:

**Location:** `~/.claude/config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "heroicons": {
      "command": "npx",
      "args": ["-y", "@seeyangzhi/heroicons-mcp"]
    }
  }
}
```

**Setup:**
- Uses npx for automatic package resolution
- No manual installation required
- Global configuration makes it available to all projects
- Requires Claude Code restart to load

## React App Integration

**Package Installation:**
```bash
npm install @heroicons/react
```

**Benefits:**
- Official React components from Heroicons team
- Tree-shakeable imports
- TypeScript support included
- Two variants: outline (24x24) and solid (20x20)

## Proof-of-Concept Migration

**Target:** "medication" icon in SupplementsSection component

**Current Implementation:**
```tsx
<span className="material-symbols-outlined">medication</span>
```

**New Implementation:**
```tsx
import { BeakerIcon } from '@heroicons/react/24/outline'
// ...
<BeakerIcon className="w-6 h-6" />
```

**Icon Selection Process:**
1. Use heroicons-mcp to search for medication/supplement-related icons
2. Select the most appropriate match (likely BeakerIcon or similar)
3. Use outline variant for consistency with Material Symbols style

**Styling Approach:**
- Heroicons use Tailwind classes for sizing
- Maintain `w-6 h-6` (24px) to match Material Symbols size
- Preserve existing wrapper styling: `bg-primary/20 text-primary`
- Keep color inheritance via `text-primary` class

## Verification Steps

1. Configure MCP server and restart Claude Code
2. Verify MCP server is accessible using ListMcpResourcesTool
3. Install @heroicons/react package
4. Query heroicons-mcp for medication icon alternatives
5. Update SupplementsSection.tsx with selected icon
6. Test visual rendering and styling
7. Verify icon displays correctly in both light and dark modes

## Future Work

After verification:
- Migrate remaining Material Symbols icons to Heroicons
- Remove material-symbols dependency
- Document icon usage patterns for the team
- Create guidelines for AI-assisted icon selection using MCP

## Technical Notes

- Material Symbols uses font-based icons; Heroicons uses SVG components
- Heroicons provide better tree-shaking and bundle size optimization
- MCP server enables semantic icon search during development
- All future icon additions should use heroicons-mcp for discovery
