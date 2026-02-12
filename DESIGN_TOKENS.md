# Design Tokens Reference

Complete reference for ClawTube design tokens.

## Colors

### Primary (TikTok Red)
| Token | Value | Usage |
|-------|-------|-------|
| `colors.primary.DEFAULT` | `#FE2C55` | CTAs, primary actions |
| `colors.primary.hover` | `#FF3B6B` | Hover states |
| `colors.primary.pressed` | `#E12648` | Active/pressed |
| `colors.primary.glow` | `rgba(254,44,85,0.4)` | Glow effects |

### Secondary (TikTok Cyan)
| Token | Value | Usage |
|-------|-------|-------|
| `colors.secondary.DEFAULT` | `#25F4EE` | Secondary actions |
| `colors.secondary.hover` | `#4FF7F1` | Hover states |
| `colors.secondary.pressed` | `#1ED8D3` | Active/pressed |
| `colors.secondary.glow` | `rgba(37,244,238,0.4)` | Glow effects |

### Background Scale
| Token | Value | Usage |
|-------|-------|-------|
| `colors.background.primary` | `#000000` | Main background |
| `colors.background.secondary` | `#0F0F0F` | Cards, containers |
| `colors.background.tertiary` | `#161823` | Elevated surfaces |
| `colors.background.elevated` | `#1C1F2E` | Highest elevation |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `colors.text.primary` | `#FFFFFF` | Primary text |
| `colors.text.secondary` | `rgba(255,255,255,0.65)` | Secondary/muted |
| `colors.text.tertiary` | `rgba(255,255,255,0.45)` | Disabled/hints |
| `colors.text.inverse` | `#000000` | On light backgrounds |

### Semantic
| Token | Value | Usage |
|-------|-------|-------|
| `colors.semantic.success` | `#00D084` | Success states |
| `colors.semantic.warning` | `#FFB800` | Warnings |
| `colors.semantic.error` | `#FF4D4F` | Errors |
| `colors.semantic.info` | `#25F4EE` | Info |

## Typography

### Font Family
```
Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Type Scale
| Token | Size | Weight | Line Height |
|-------|------|--------|-------------|
| `typography.scale.display` | 32px | 600 | 1.1 |
| `typography.scale.h1` | 24px | 600 | 1.2 |
| `typography.scale.h2` | 20px | 600 | 1.3 |
| `typography.scale.h3` | 18px | 600 | 1.3 |
| `typography.scale.bodyLarge` | 16px | 400 | 1.5 |
| `typography.scale.body` | 14px | 400 | 1.5 |
| `typography.scale.caption` | 12px | 400 | 1.4 |
| `typography.scale.overline` | 11px | 600 | 1.3 |

## Spacing

Base unit: **4px**

| Token | Value |
|-------|-------|
| `spacing.scale[0]` | 0px |
| `spacing.scale[1]` | 4px |
| `spacing.scale[2]` | 8px |
| `spacing.scale[3]` | 12px |
| `spacing.scale[4]` | 16px |
| `spacing.scale[5]` | 20px |
| `spacing.scale[6]` | 24px |
| `spacing.scale[7]` | 32px |
| `spacing.scale[8]` | 40px |
| `spacing.scale[9]` | 48px |

## Border Radius

| Token | Value |
|-------|-------|
| `radius.sm` | 4px |
| `radius.md` | 8px |
| `radius.lg` | 12px |
| `radius.xl` | 16px |
| `radius.2xl` | 24px |
| `radius.full` | 9999px |

## Shadows

| Token | Value |
|-------|-------|
| `shadows.sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `shadows.md` | `0 4px 12px rgba(0,0,0,0.4)` |
| `shadows.lg` | `0 8px 24px rgba(0,0,0,0.5)` |
| `shadows.xl` | `0 16px 48px rgba(0,0,0,0.6)` |
| `shadows.glow.primary` | `0 0 20px rgba(254,44,85,0.4)` |
| `shadows.glow.secondary` | `0 0 20px rgba(37,244,238,0.4)` |

## Animation Springs

| Token | Stiffness | Damping | Usage |
|-------|-----------|---------|-------|
| `springs.bouncy` | 400 | 25 | Playful (buttons) |
| `springs.smooth` | 300 | 30 | General transitions |
| `springs.snappy` | 500 | 35 | Quick feedback |
| `springs.gentle` | 200 | 25 | Subtle emphasis |
| `springs.stiff` | 600 | 40 | Modals, toasts |

## Duration Standards

| Token | Value |
|-------|-------|
| `animation.duration.instant` | 0ms |
| `animation.duration.fast` | 100ms |
| `animation.duration.normal` | 200ms |
| `animation.duration.slow` | 300ms |
| `animation.duration.slower` | 400ms |
| `animation.duration.slowest` | 600ms |

## Breakpoints

| Token | Value |
|-------|-------|
| `breakpoints.sm` | 640px |
| `breakpoints.md` | 768px |
| `breakpoints.lg` | 1024px |
| `breakpoints.xl` | 1280px |
| `breakpoints.2xl` | 1536px |
