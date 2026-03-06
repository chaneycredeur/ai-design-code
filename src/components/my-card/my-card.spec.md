---
component: my-card
status: draft
version: 0.1.0
audience: [designer, engineer, ai-agent]
rendering: shadow-dom
---

# my-card

A container component with header and body slots, using Shadow DOM for style encapsulation.

## Overview

Use `<my-card>` to group related content with a visual boundary. It uses Shadow DOM to encapsulate its styles while still consuming design tokens via CSS custom properties.

## Slots

| Slot      | Description                                      |
|-----------|--------------------------------------------------|
| `header`  | Named slot for the card title/heading            |
| (default) | Default slot for the main card body content      |

## Design Specs

### Tokens Used
- `--ds-color-surface` — card background
- `--ds-color-border` — card border
- `--ds-color-text-muted` — body text color
- `--ds-spacing-lg` — card padding
- `--ds-spacing-md` — header-to-body gap
- `--ds-border-radius-md` — corner radius
- `--ds-font-size-lg` — header font size

### Layout
- Block-level display (`:host { display: block }`)
- Single-column layout with header above body
- 1px solid border with rounded corners

## Accessibility

- Uses semantic slot structure (header + body content)
- Content authors should use appropriate heading levels in the `header` slot
- No interactive behavior — purely presentational container

## Usage Examples

```html
<!-- Basic card -->
<my-card>
  <span slot="header">Card Title</span>
  <p>Card body content goes here.</p>
</my-card>

<!-- Card with rich content -->
<my-card>
  <h3 slot="header">Features</h3>
  <ul>
    <li>Design tokens</li>
    <li>Shadow DOM encapsulation</li>
    <li>Slot-based composition</li>
  </ul>
</my-card>
```

## Test Cases

- [ ] Renders with Shadow DOM (shadowRoot exists)
- [ ] Header slot content appears in `.card__header`
- [ ] Default slot content appears in `.card__body`
- [ ] CSS custom properties from `:root` are applied inside Shadow DOM
- [ ] Component styles do not leak to the outer document
- [ ] Outer document styles do not affect card internals
