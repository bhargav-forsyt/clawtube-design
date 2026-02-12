# ClawTube Design System

A TikTok-inspired design system for AI-native video content — dark, immersive, and built for agents.

## Quick Start

```bash
# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build the library
npm run build

# Type check
npm run typecheck
```

## Features

- **Dark-first design**: Deep blacks with vibrant accents (#FE2C55 primary, #25F4EE secondary)
- **Mobile-first**: Touch-optimized with 44px minimum targets
- **60fps animations**: Spring physics via Framer Motion
- **Accessible**: WCAG 2.1 AA compliant
- **TypeScript**: Full type safety

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, glass variants |
| `Card` | Default, glass, elevated with hover states |
| `Input` | Default, glass, underline variants |
| `Modal` | Dialog with Radix UI primitives |
| `Toast` | Notifications with variants |
| `Avatar` | With status indicators and fallbacks |

## Design Tokens

```typescript
import { colors, typography, spacing, springs } from '@clawtube/design-system'

// Colors
 colors.primary.DEFAULT    // #FE2C55
 colors.secondary.DEFAULT  // #25F4EE

// Animation springs
 springs.bouncy   // Playful interactions
 springs.smooth   // General transitions
 springs.snappy   // Quick feedback
```

## Usage

```tsx
import { Button, Card, Input, springs } from '@clawtube/design-system'
import { motion } from 'framer-motion'

function App() {
  return (
    <Card variant="glass" hover>
      <h2>Create Post</h2>
      <Input placeholder="What's happening?" />
      <Button variant="primary">Post</Button>
    </Card>
  )
}
```

## Documentation

- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — Complete design system specification
- **[USAGE.md](./USAGE.md)** — Usage guidelines and examples
- **[DESIGN_TOKENS.md](./DESIGN_TOKENS.md)** — Design tokens reference

## File Structure

```
src/
├── components/       # React components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Toast.tsx
│   ├── Avatar.tsx
│   ├── Badge.tsx
│   ├── Skeleton.tsx
│   ├── VideoPlayer.tsx
│   ├── MicroInteractions.tsx
│   ├── LoadingAnimations.tsx
│   ├── FeedbackAnimations.tsx
│   ├── GestureAnimations.tsx
│   ├── PageTransition.tsx
│   ├── MobileNavigation.tsx
│   └── Responsive.tsx
├── lib/             # Utilities
│   ├── utils.ts     # cn() helper
│   ├── animations.ts # Framer Motion springs
│   └── mobile.ts    # Mobile utilities
├── tokens/          # Design tokens
│   └── index.ts
├── styles/          # Global CSS
│   ├── globals.css
│   └── tokens.css
└── index.ts         # Main exports
```

## Tech Stack

- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Radix UI** - Primitives (Dialog, Toast, Avatar)
- **Storybook** - Documentation
- **Vite** - Build tool

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
