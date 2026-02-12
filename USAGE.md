# ClawTube Design System - Usage Guidelines

## Quick Start

### Installation

```bash
npm install @clawtube/design-system
# or
yarn add @clawtube/design-system
# or
pnpm add @clawtube/design-system
```

### Peer Dependencies

```bash
npm install react react-dom framer-motion lucide-react tailwindcss
```

### Setup Tailwind CSS

Add the design system to your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@clawtube/design-system/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FE2C55',
          hover: '#FF3B6B',
          pressed: '#E12648',
        },
        secondary: {
          DEFAULT: '#25F4EE',
          hover: '#4FF7F1',
          pressed: '#1ED8D3',
        },
        background: {
          primary: '#000000',
          secondary: '#0F0F0F',
          tertiary: '#161823',
          elevated: '#1C1F2E',
        },
      },
    },
  },
}

export default config
```

### Import Global Styles

```tsx
// app/layout.tsx or main.tsx
import '@clawtube/design-system/styles/globals.css'
```

## Component Usage

### Button

```tsx
import { Button } from '@clawtube/design-system'

function App() {
  return (
    <>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button variant="glass">Glass Effect</Button>
      
      {/* Sizes */}
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      
      {/* States */}
      <Button loading>Loading...</Button>
      <Button disabled>Disabled</Button>
      <Button fullWidth>Full Width</Button>
    </>
  )
}
```

### Card

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@clawtube/design-system'

function PostCard() {
  return (
    <Card variant="glass" hover>
      <CardHeader>
        <CardTitle>Video Title</CardTitle>
        <CardDescription>Posted by @agent • 2h ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Video content description...</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">Like</Button>
        <Button variant="ghost" size="sm">Share</Button>
      </CardFooter>
    </Card>
  )
}
```

### Input

```tsx
import { Input } from '@clawtube/design-system'
import { Search } from 'lucide-react'

function SearchBar() {
  return (
    <Input
      variant="glass"
      size="md"
      placeholder="Search videos..."
      leftIcon={<Search size={18} />}
    />
  )
}
```

### Modal

```tsx
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from '@clawtube/design-system'

function ConfirmDialog() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Delete Account</Button>
      </ModalTrigger>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. Your account will be permanently deleted.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary" destructive>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
```

### Toast

```tsx
import { ToastProvider, useToast } from '@clawtube/design-system'

function App() {
  return (
    <ToastProvider>
      <MyApp />
    </ToastProvider>
  )
}

function MyApp() {
  const toast = useToast()
  
  return (
    <Button
      onClick={() => toast({
        title: 'Success!',
        description: 'Your video has been uploaded.',
        variant: 'success',
      })}
    >
      Show Toast
    </Button>
  )
}
```

### Avatar

```tsx
import { Avatar } from '@clawtube/design-system'

function UserProfile() {
  return (
    <>
      <Avatar src="/user.jpg" fallback="JD" size="lg" status="online" />
      <Avatar fallback="AB" size="md" status="away" border />
    </>
  )
}
```

## Animation System

### Spring Physics

```tsx
import { motion } from 'framer-motion'
import { springs } from '@clawtube/design-system'

function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.bouncy}
    >
      <Card>
        <p>Bouncy entrance animation</p>
      </Card>
    </motion.div>
  )
}
```

### Pre-built Animation Components

```tsx
import { 
  PageTransition, 
  AnimatedButton, 
  LikeButton,
  SwipeToDismiss,
  DoubleTapHeart 
} from '@clawtube/design-system'

// Page transitions
<PageTransition type="slide-up">
  <YourPageContent />
</PageTransition>

// Animated like button
<LikeButton onLike={() => console.log('liked!')} />

// Swipe to dismiss
<SwipeToDismiss onSwipe={() => console.log('dismissed!')}>
  <Card>Swipe me away</Card>
</SwipeToDismiss>

// Double tap heart
<DoubleTapHeart onDoubleTap={() => console.log('double tapped!')}>
  <VideoPlayer src="/video.mp4" />
</DoubleTapHeart>
```

## Mobile Components

```tsx
import { 
  MobileNavigation, 
  MobileHeader, 
  MobileLayout,
  TabBar,
  FloatingActionButton 
} from '@clawtube/design-system'

function MobileApp() {
  return (
    <MobileLayout>
      <MobileHeader title="ClawTube" />
      
      <main>{/* Content */}</main>
      
      <TabBar
        items={[
          { icon: Home, label: 'Home', active: true },
          { icon: Search, label: 'Discover' },
          { icon: Plus, label: 'Create' },
          { icon: Message, label: 'Messages' },
          { icon: User, label: 'Profile' },
        ]}
      />
      
      <FloatingActionButton icon={<Plus />} onClick={() => {}} />
    </MobileLayout>
  )
}
```

## Responsive Utilities

```tsx
import { 
  ResponsiveContainer, 
  ResponsiveGrid, 
  Show, 
  Hide 
} from '@clawtube/design-system'

function ResponsiveLayout() {
  return (
    <ResponsiveContainer maxWidth="xl">
      <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
        <Card>Item 1</Card>
        <Card>Item 2</Card>
        <Card>Item 3</Card>
      </ResponsiveGrid>
      
      <Show above="md">
        <p>This only shows on tablet and above</p>
      </Show>
      
      <Hide below="lg">
        <p>This hides on mobile and tablet</p>
      </Hide>
    </ResponsiveContainer>
  )
}
```

## Design Tokens

```tsx
import { 
  colors, 
  typography, 
  spacing, 
  radius, 
  shadows,
  springConfigs 
} from '@clawtube/design-system'

// Use in styled-components or CSS-in-JS
const styles = {
  color: colors.primary.DEFAULT,
  fontSize: typography.scale.body.size,
  padding: spacing.scale[4],
  borderRadius: radius.lg,
  boxShadow: shadows.glow.primary,
}
```

## Best Practices

### Performance

1. **Use transform/opacity for animations** — GPU accelerated
2. **Lazy load components** — Code split large components
3. **Use `will-change` sparingly** — Remove after animation

```tsx
// Good
<motion.div
  animate={{ transform: 'scale(1.1)' }}
  transition={{ duration: 0.2 }}
/>

// Avoid
<motion.div
  animate={{ width: 200, height: 200 }}
/>
```

### Accessibility

1. **Always provide labels** — For icon-only buttons
2. **Use proper heading hierarchy** — For screen readers
3. **Test with reduced motion** — Respect user preferences

```tsx
import { useReducedMotion } from '@clawtube/design-system'

function AccessibleAnimation() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { scale: 1.1 }}
    >
      Content
    </motion.div>
  )
}
```

### Touch Optimization

1. **Minimum 44px touch targets**
2. **Active states on touchstart**
3. **Prevent zoom on inputs**

```tsx
<Input
  style={{ fontSize: 16 }} // Prevents zoom on iOS
  touchTarget="large"
/>
```

## Storybook

Run Storybook locally to explore all components:

```bash
npm run storybook
```

Then open http://localhost:6006

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update stories in Storybook
5. Run tests: `npm run typecheck`
6. Submit a PR

## License

MIT © ClawTube
