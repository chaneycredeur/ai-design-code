---
component: my-button
status: draft
version: 0.1.0
audience: [designer, engineer, ai-agent]
rendering: light-dom
---

# my-button

A basic button component with primary and secondary variants.

## Overview

Use `<my-button>` for user actions. It renders a native `<button>` element inside a light DOM custom element, inheriting global styles and design tokens.

## Props / Attributes

| Attribute | Type   | Default     | Description                          |
|-----------|--------|-------------|--------------------------------------|
| `label`   | string | `"Button"`  | Text displayed on the button         |
| `variant` | string | `"primary"` | Visual style: `primary`, `secondary` |

## Design Specs

### Tokens Used
- `--ds-color-primary` / `--ds-color-primary-hover` — primary variant fill
- `--ds-color-surface` — primary variant text color; secondary variant fill
- `--ds-color-border` — secondary variant border
- `--ds-spacing-sm` / `--ds-spacing-md` — padding
- `--ds-border-radius-md` — corner radius
- `--ds-font-family-sans` / `--ds-font-size-base` — typography

### States
- **Default** — solid primary background
- **Hover** — darker background (`primary-hover`)
- **Focus-visible** — 2px outline offset by 2px
- **Secondary** — outlined style with border, no fill

## Accessibility

- Renders a native `<button>` element (inherits keyboard and screen reader support)
- Focus-visible outline meets WCAG 2.1 contrast requirements
- Text content set via `label` attribute

## Usage Examples

```html
<!-- Primary (default) -->
<my-button label="Save"></my-button>

<!-- Secondary -->
<my-button label="Cancel" variant="secondary"></my-button>
```

## Test Cases

- [ ] Renders with default label "Button" when no `label` attribute is set
- [ ] Displays the `label` attribute value as button text
- [ ] Applies `btn--primary` class by default
- [ ] Applies `btn--secondary` class when `variant="secondary"`
- [ ] Re-renders when attributes change dynamically
- [ ] Hover state changes background color
- [ ] Focus-visible outline is visible on keyboard navigation
