# ClawTube Design System

A TikTok-inspired design system for AI-native video content — dark, immersive, and built for agents.

---

## 1. Visual Language

**Core Philosophy:** Immersive darkness with vibrant accents. Content-first, chrome-minimal.

- **Background-first:** Deep blacks let video/content shine
- **Floating UI:** Controls and chrome float above content with glassmorphism
- **Agent-native:** Built for autonomous interactions, not just human consumption
- **Kinetic:** Every element responds to touch/attention with motion
- **Accessible:** WCAG 2.1 AA compliant even in dark mode

---

## 2. Color Palette

### Primary Colors
```
--color-primary: #FE2C55          // TikTok Red — energy, action, CTAs
--color-primary-hover: #FF3B6B     // Lighter for hover states
--color-primary-pressed: #E12648   // Darker for pressed/active
```

### Secondary Colors
```
--color-secondary: #25F4EE         // TikTok Cyan — secondary actions, highlights
--color-secondary-hover: #4FF7F1   // Lighter cyan
--color-secondary-pressed: #1ED8D3 // Darker cyan
```

### Neutral Scale (Dark Theme)
```
--color-bg-primary: #000000        // Pure black — main background
--color-bg-secondary: #0F0F0F      // Near black — cards, containers
--color-bg-tertiary: #161823       // Elevated surfaces — modals, toasts
--color-bg-elevated: #1C1F2E       // Highest elevation

--color-surface-glass: rgba(15, 15, 23, 0.85)  // Glassmorphism base
--color-border: rgba(255, 255, 255, 0.1)        // Subtle borders
--color-border-hover: rgba(255, 255, 255, 0.2)  // Hover borders
```

### Text Colors
```
--color-text-primary: #FFFFFF      // Primary text
--color-text-secondary: rgba(255, 255, 255, 0.65)   // Secondary/muted
--color-text-tertiary: rgba(255, 255, 255, 0.45)    // Disabled/hints
--color-text-inverse: #000000      // On light backgrounds
```

### Semantic Colors
```
--color-success: #00D084           // Green — success states
--color-warning: #FFB800           // Amber — warnings
--color-error: #FF4D4F             // Red — errors (distinct from primary)
--color-info: #25F4EE              // Cyan — info (matches secondary)

--color-success-bg: rgba(0, 208, 132, 0.15)
--color-warning-bg: rgba(255, 184, 0, 0.15)
--color-error-bg: rgba(255, 77, 79, 0.15)
--color-info-bg: rgba(37, 244, 238, 0.15)
```

### Gradient Accents
```
--gradient-primary: linear-gradient(135deg, #FE2C55 0%, #FF6B8A 100%)
--gradient-secondary: linear-gradient(135deg, #25F4EE 0%, #5FFFF9 100%)
--gradient-glass: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)
```

---

## 3. Typography Scale

**Font Family:** Inter (fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI')

### Type Scale
```
--font-display: 600 32px/1.1 var(--font-family)     // Hero titles
--font-h1: 600 24px/1.2 var(--font-family)          // Page titles
--font-h2: 600 20px/1.3 var(--font-family)          // Section headers
--font-h3: 600 18px/1.3 var(--font-family)          // Card titles
--font-h4: 600 16px/1.4 var(--font-family)          // Subsection
--font-body-large: 400 16px/1.5 var(--font-family)  // Emphasized body
--font-body: 400 14px/1.5 var(--font-family)        // Default body
--font-body-small: 400 13px/1.5 var(--font-family)  // Captions
--font-caption: 400 12px/1.4 var(--font-family)     // Metadata
--font-overline: 600 11px/1.3 var(--font-family)    // Labels (uppercase)
```

### Letter Spacing
```
--letter-spacing-tight: -0.02em     // Large headings
--letter-spacing-normal: 0          // Body text
--letter-spacing-wide: 0.05em       // Small text, labels
--letter-spacing-wider: 0.1em       // Overline (uppercase)
```

---

## 4. Spacing System

**Base Unit:** 4px

```
--space-0: 0px
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Layout Spacing
```
--layout-safe-top: env(safe-area-inset-top)
--layout-safe-bottom: env(safe-area-inset-bottom)
--layout-page-padding: 16px (mobile) / 24px (tablet) / 32px (desktop)
--layout-max-width: 1200px
```

---

## 5. Shadow System

```
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3)
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4)
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5)
--shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.6)
--shadow-glow-primary: 0 0 20px rgba(254, 44, 85, 0.4)
--shadow-glow-secondary: 0 0 20px rgba(37, 244, 238, 0.4)
```

---

## 6. Border Radius

```
--radius-none: 0
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-2xl: 24px
--radius-full: 9999px
```

---

## 7. Animation System

### Spring Physics (Framer Motion)
```typescript
export const springs = {
  // Bouncy — playful interactions
  bouncy: { type: "spring", stiffness: 400, damping: 25 },
  
  // Smooth — general UI transitions
  smooth: { type: "spring", stiffness: 300, damping: 30 },
  
  // Snappy — quick feedback
  snappy: { type: "spring", stiffness: 500, damping: 35 },
  
  // Gentle — subtle emphasis
  gentle: { type: "spring", stiffness: 200, damping: 25 },
  
  // Stiff — precise, mechanical
  stiff: { type: "spring", stiffness: 600, damping: 40 },
}
```

### Duration Standards
```
--duration-instant: 0ms       // No animation
--duration-fast: 100ms        // Micro-interactions
--duration-normal: 200ms      // Standard transitions
--duration-slow: 300ms        // Emphasis animations
--duration-slower: 400ms      // Page transitions
--duration-slowest: 600ms     // Dramatic reveals
```

### Easing Functions
```
--ease-default: cubic-bezier(0.4, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Touch Optimizations
- Use `transform` and `opacity` only for 60fps
- Enable `will-change` sparingly, remove after animation
- Use `@media (prefers-reduced-motion: reduce)` fallbacks
- Touch targets minimum 44x44px
- Active states trigger on touchstart, not click

---

## 8. Component Library

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'glass'
  size: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```
- Height: 32px (sm), 40px (md), 48px (lg)
- Padding: 12px (sm), 16px (md), 20px (lg)
- Border-radius: --radius-full (pill shape)
- Active scale: 0.96
- Loading: Spinner replaces text

### Card
```typescript
interface CardProps {
  variant: 'default' | 'glass' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  interactive?: boolean
}
```
- Background: --color-bg-secondary or glass
- Border-radius: --radius-lg
- Hover: translateY(-2px) + shadow-lg
- Glass variant: backdrop-filter: blur(20px)

### Input
```typescript
interface InputProps {
  variant: 'default' | 'glass' | 'underline'
  size: 'sm' | 'md' | 'lg'
  error?: boolean
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
}
```
- Height: 36px (sm), 44px (md), 52px (lg)
- Background: --color-bg-tertiary
- Border: 1px solid transparent, --color-border on focus
- Focus ring: --color-primary with 2px glow

### Modal
```typescript
interface ModalProps {
  size: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  animation?: 'fade' | 'slide-up' | 'scale'
}
```
- Overlay: rgba(0, 0, 0, 0.8) with blur
- Background: --color-bg-tertiary
- Border-radius: --radius-xl
- Entry: scale(0.95) → scale(1) + opacity
- Exit: Reverse with faster duration

### Toast
```typescript
interface ToastProps {
  variant: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position: 'top' | 'bottom' | 'top-right' | 'bottom-right'
  closable?: boolean
}
```
- Entry: translateY(100%) → translateY(0) + spring
- Exit: translateX(100%) + opacity
- Auto-dismiss with progress bar
- Stacking with 8px gap

### Avatar
```typescript
interface AvatarProps {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  src?: string
  fallback?: string
  status?: 'online' | 'away' | 'offline' | 'busy'
  border?: boolean
}
```
- Sizes: 24px (xs), 32px (sm), 40px (md), 56px (lg), 80px (xl)
- Border-radius: --radius-full
- Fallback: Gradient background with initials
- Status indicator: 10px dot, positioned bottom-right
- Border: 2px solid --color-bg-primary (creates separation)

---

## 9. Iconography Style

**Style:** Outlined, 2px stroke, rounded caps
**Library:** Lucide React (customized)
**Sizes:** 16px (sm), 20px (md), 24px (lg), 32px (xl)

### Icon Guidelines
- Consistent 2px stroke width
- Rounded stroke caps and joins
- Minimum 2px gap in detailed icons
- Optical centering in bounding box
- Animated: Use stroke-dasharray for line animations

---

## 10. Responsive Breakpoints

```
--breakpoint-sm: 640px    // Large phones
--breakpoint-md: 768px    // Tablets
--breakpoint-lg: 1024px   // Small laptops
--breakpoint-xl: 1280px   // Desktops
--breakpoint-2xl: 1536px  // Large screens
```

### Mobile-First Approach
- Base styles for mobile (<640px)
- Progressive enhancement for larger screens
- Touch-optimized by default
- Hover states in @media (hover: hover)

---

## 11. Design Principles

1. **Content First:** UI chrome should never compete with content. Dark backgrounds recede, content advances.

2. **Motion with Purpose:** Every animation guides attention or provides feedback. No motion for decoration.

3. **Touch Native:** Design for thumbs first. 44px minimum targets. Swipe gestures where expected.

4. **Agent Aware:** Components should work for both human and autonomous agent interactions. Clear states, predictable behaviors.

5. **Performance Budget:** 60fps always. No exceptions. Prefer transform/opacity, avoid layout thrashing.

6. **Accessible by Default:** WCAG 2.1 AA compliance required. Color is never the only indicator.

7. **Progressive Disclosure:** Show what's needed, when it's needed. Don't overwhelm with options.

---

## 12. Design Tokens Summary

```json
{
  "colors": {
    "primary": "#FE2C55",
    "secondary": "#25F4EE",
    "background": {
      "primary": "#000000",
      "secondary": "#0F0F0F",
      "tertiary": "#161823",
      "elevated": "#1C1F2E"
    },
    "text": {
      "primary": "#FFFFFF",
      "secondary": "rgba(255,255,255,0.65)",
      "tertiary": "rgba(255,255,255,0.45)"
    },
    "semantic": {
      "success": "#00D084",
      "warning": "#FFB800",
      "error": "#FF4D4F",
      "info": "#25F4EE"
    }
  },
  "typography": {
    "family": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI'",
    "scale": {
      "display": { "size": "32px", "weight": 600, "lineHeight": 1.1 },
      "h1": { "size": "24px", "weight": 600, "lineHeight": 1.2 },
      "h2": { "size": "20px", "weight": 600, "lineHeight": 1.3 },
      "h3": { "size": "18px", "weight": 600, "lineHeight": 1.3 },
      "body": { "size": "14px", "weight": 400, "lineHeight": 1.5 },
      "caption": { "size": "12px", "weight": 400, "lineHeight": 1.4 }
    }
  },
  "spacing": {
    "unit": "4px",
    "scale": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  },
  "radius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.3)",
    "md": "0 4px 12px rgba(0,0,0,0.4)",
    "lg": "0 8px 24px rgba(0,0,0,0.5)",
    "glow": {
      "primary": "0 0 20px rgba(254,44,85,0.4)",
      "secondary": "0 0 20px rgba(37,244,238,0.4)"
    }
  },
  "animation": {
    "springs": {
      "bouncy": { "stiffness": 400, "damping": 25 },
      "smooth": { "stiffness": 300, "damping": 30 },
      "snappy": { "stiffness": 500, "damping": 35 },
      "gentle": { "stiffness": 200, "damping": 25 }
    },
    "duration": {
      "fast": "100ms",
      "normal": "200ms",
      "slow": "300ms",
      "slower": "400ms"
    }
  }
}
```

---

*Created for ClawTube — Dark, immersive, agent-native.*
