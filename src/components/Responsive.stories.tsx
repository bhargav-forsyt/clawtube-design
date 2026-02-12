import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveStack,
  Show,
  Hide,
  Device,
  AspectRatio,
  SafeArea,
  ScrollContainer,
  HorizontalScroll,
} from './Responsive'

const meta: Meta = {
  title: 'Mobile/Responsive',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

// ============================================================================
// RESPONSIVE CONTAINER
// ============================================================================

export const Container: Story = {
  render: () => (
    <div className="bg-bg-primary min-h-screen">
      <ResponsiveContainer maxWidth="md" padding="md" className="py-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Responsive Container</h2>
          <p className="text-text-secondary">
            This container centers content and adds responsive padding.
            Resize the viewport to see how padding adjusts.
          </p>
          <div className="h-32 bg-bg-secondary rounded-lg" />
        </div>
      </ResponsiveContainer>
    </div>
  ),
}

// ============================================================================
// RESPONSIVE GRID
// ============================================================================

export const Grid: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Responsive Grid</h2>
      <p className="text-text-secondary mb-4">
        1 col (mobile) → 2 cols (sm) → 3 cols (md) → 4 cols (lg)
      </p>
      <ResponsiveGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="md">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-24 bg-bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">Item {i}</span>
          </div>
        ))}
      </ResponsiveGrid>
    </div>
  ),
}

// ============================================================================
// RESPONSIVE STACK
// ============================================================================

export const Stack: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Responsive Stack</h2>
      <p className="text-text-secondary mb-4">
        Column on mobile → Row on md screens and up
      </p>
      <ResponsiveStack direction={{ default: 'col', md: 'row' }} gap="md">
        <div className="h-24 flex-1 bg-bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-text-secondary">Item 1</span>
        </div>
        <div className="h-24 flex-1 bg-bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-text-secondary">Item 2</span>
        </div>
        <div className="h-24 flex-1 bg-bg-secondary rounded-lg flex items-center justify-center">
          <span className="text-text-secondary">Item 3</span>
        </div>
      </ResponsiveStack>
    </div>
  ),
}

// ============================================================================
// SHOW/HIDE
// ============================================================================

export const ShowHide: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">Show/Hide by Breakpoint</h2>
      
      <Show above="md">
        <div className="p-4 bg-green-500/20 rounded-lg">
          <p className="text-green-400">Visible on MD and above (tablets, desktops)</p>
        </div>
      </Show>
      
      <Hide above="md">
        <div className="p-4 bg-blue-500/20 rounded-lg">
          <p className="text-blue-400">Hidden on MD and above (mobile only)</p>
        </div>
      </Hide>
      
      <Show below="lg">
        <div className="p-4 bg-purple-500/20 rounded-lg">
          <p className="text-purple-400">Visible below LG (mobile and tablets)</p>
        </div>
      </Show>
      
      <Show at="md">
        <div className="p-4 bg-orange-500/20 rounded-lg">
          <p className="text-orange-400">Visible only at MD breakpoint</p>
        </div>
      </Show>
    </div>
  ),
}

// ============================================================================
// DEVICE
// ============================================================================

export const DeviceComponent: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen space-y-4">
      <h2 className="text-xl font-semibold text-text-primary">Device-Specific Content</h2>
      
      <Device
        mobile={<div className="p-4 bg-red-500/20 rounded-lg text-red-400">Mobile View</div>}
        tablet={<div className="p-4 bg-yellow-500/20 rounded-lg text-yellow-400">Tablet View</div>}
        desktop={<div className="p-4 bg-green-500/20 rounded-lg text-green-400">Desktop View</div>}
      />
      
      <Device
        touch={
          <div className="p-4 bg-blue-500/20 rounded-lg">
            <p className="text-blue-400">Touch-optimized controls shown</p>
            <p className="text-sm text-text-secondary mt-2">Swipe gestures enabled</p>
          </div>
        }
      />
    </div>
  ),
}

// ============================================================================
// ASPECT RATIO
// ============================================================================

export const AspectRatios: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen space-y-6">
      <h2 className="text-xl font-semibold text-text-primary">Aspect Ratios</h2>
      
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">Video (16:9)</p>
        <AspectRatio ratio="video" className="max-w-md">
          <div className="w-full h-full bg-bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">16:9</span>
          </div>
        </AspectRatio>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">Square (1:1)</p>
        <AspectRatio ratio="square" className="max-w-md">
          <div className="w-full h-full bg-bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">1:1</span>
          </div>
        </AspectRatio>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm text-text-secondary">Portrait (9:16) - TikTok Style</p>
        <AspectRatio ratio="portrait" className="max-w-xs">
          <div className="w-full h-full bg-bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-text-secondary">9:16</span>
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
}

// ============================================================================
// SAFE AREA
// ============================================================================

export const SafeAreaDemo: Story = {
  render: () => (
    <div className="bg-bg-primary min-h-screen">
      <SafeArea edges={['top', 'bottom', 'left', 'right']} minPadding={24}>
        <div className="bg-bg-secondary rounded-2xl p-6 m-4">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Safe Area Padding</h2>
          <p className="text-text-secondary">
            This content respects safe areas for notched devices.
            On iPhone X+, it adds padding around the notch and home indicator.
          </p>
        </div>
      </SafeArea>
    </div>
  ),
}

// ============================================================================
// SCROLL CONTAINER
// ============================================================================

export const ScrollContainerDemo: Story = {
  render: () => (
    <div className="p-4 bg-bg-primary min-h-screen">
      <h2 className="text-xl font-semibold text-text-primary mb-4">Scroll Container</h2>
      <ScrollContainer className="h-64 bg-bg-secondary rounded-lg" momentum snap="y">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snap-start p-4 border-b border-border">
            <p className="text-text-primary">Scroll item {i + 1}</p>
          </div>
        ))}
      </ScrollContainer>
    </div>
  ),
}

export const HorizontalScrollDemo: Story = {
  render: () => (
    <div className="py-4 bg-bg-primary min-h-screen">
      <h2 className="text-xl font-semibold text-text-primary mb-4 px-4">Horizontal Scroll</h2>
      <p className="text-text-secondary mb-4 px-4">
        Swipe horizontally to see more cards. Snaps to each card.
      </p>
      <HorizontalScroll itemWidth="280px" gap="md" snap padding="md">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-video bg-bg-secondary rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Card {i}</h3>
              <p className="text-sm text-text-secondary mt-1">Swipe to see more</p>
            </div>
            <div className="h-2 w-16 bg-primary/50 rounded-full" />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  ),
}

// ============================================================================
// BREAKPOINT TESTER
// ============================================================================

export const BreakpointTester: Story = {
  render: () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
    }
    
    const getBreakpoint = (w: number) => {
      if (w >= 1536) return '2xl'
      if (w >= 1280) return 'xl'
      if (w >= 1024) return 'lg'
      if (w >= 768) return 'md'
      if (w >= 640) return 'sm'
      return 'xs'
    }
    
    const bp = getBreakpoint(width)
    
    return (
      <div className="p-4 bg-bg-primary min-h-screen">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Current Breakpoint</h2>
        
        <div className="bg-bg-secondary rounded-xl p-6 text-center">
          <div className="text-5xl font-bold text-primary mb-2">{bp}</div>
          <div className="text-text-secondary">{width}px</div>
        </div>
        
        <div className="mt-6 space-y-2">
          {[
            { name: 'xs', width: '< 640', active: bp === 'xs' },
            { name: 'sm', width: '640px', active: bp === 'sm' },
            { name: 'md', width: '768px', active: bp === 'md' },
            { name: 'lg', width: '1024px', active: bp === 'lg' },
            { name: 'xl', width: '1280px', active: bp === 'xl' },
            { name: '2xl', width: '1536px+', active: bp === '2xl' },
          ].map((item) => (
            <div
              key={item.name}
              className={`flex justify-between p-3 rounded-lg ${
                item.active ? 'bg-primary/20 text-primary' : 'bg-bg-tertiary text-text-secondary'
              }`}
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-sm">{item.width}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

// ============================================================================
// COMPLETE MOBILE LAYOUT
// ============================================================================

export const CompleteMobileLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className="bg-bg-primary min-h-[600px]">
      {/* Header area */}
      <div className="sticky top-0 z-10 bg-surface-glass/95 backdrop-blur-xl border-b border-border p-4">
        <h1 className="text-lg font-semibold text-text-primary">Discover</h1>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Featured horizontal scroll */}
        <div>
          <h2 className="text-sm font-medium text-text-secondary mb-3">Featured</h2>
          <HorizontalScroll itemWidth="200px" gap="sm" snap padding="none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-[9/16] bg-gradient-to-b from-primary/30 to-bg-secondary rounded-xl"
              >
                <div className="p-3">
                  <div className="w-8 h-8 rounded-full bg-white/20" />
                </div>
              </div>
            ))}
          </HorizontalScroll>
        </div>
        
        {/* Grid section */}
        <div>
          <h2 className="text-sm font-medium text-text-secondary mb-3">Trending</h2>
          <ResponsiveGrid columns={{ xs: 2, sm: 3 }} gap="sm">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-bg-secondary rounded-lg" />
            ))}
          </ResponsiveGrid>
        </div>
      </div>
    </div>
  ),
}
