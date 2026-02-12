// Responsive.tsx - Mobile-first responsive layout components
// Viewport-aware containers and grids

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBreakpoint } from '@/lib/mobile'

// ============================================================================
// RESPONSIVE CONTAINER
// ============================================================================

export interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  center?: boolean
}

export function ResponsiveContainer({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  center = true,
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-none',
  }

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-8 lg:px-12',
  }

  return (
    <div
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        center && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// RESPONSIVE GRID
// ============================================================================

export interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function ResponsiveGrid({
  children,
  className,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  gap = 'md',
}: ResponsiveGridProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  // Build grid classes based on columns
  const gridCols = [
    columns.xs && `grid-cols-${columns.xs}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  ].filter(Boolean).join(' ')

  return (
    <div className={cn('grid', gridCols, gapClasses[gap], className)}>
      {children}
    </div>
  )
}

// ============================================================================
// RESPONSIVE STACK
// ============================================================================

export interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  direction?: {
    default?: 'row' | 'col'
    sm?: 'row' | 'col'
    md?: 'row' | 'col'
    lg?: 'row' | 'col'
  }
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
}

export function ResponsiveStack({
  children,
  className,
  direction = { default: 'col', md: 'row' },
  gap = 'md',
  align = 'stretch',
  justify = 'start',
}: ResponsiveStackProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  // Build direction classes
  const dirClasses = [
    direction.default === 'row' ? 'flex-row' : 'flex-col',
    direction.sm && (direction.sm === 'row' ? 'sm:flex-row' : 'sm:flex-col'),
    direction.md && (direction.md === 'row' ? 'md:flex-row' : 'md:flex-col'),
    direction.lg && (direction.lg === 'row' ? 'lg:flex-row' : 'lg:flex-col'),
  ].filter(Boolean).join(' ')

  return (
    <div className={cn('flex', dirClasses, gapClasses[gap], alignClasses[align], justifyClasses[justify], className)}>
      {children}
    </div>
  )
}

// ============================================================================
// SHOW/HIDE BASED ON BREAKPOINT
// ============================================================================

export interface ShowProps {
  children: React.ReactNode
  above?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  below?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  at?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Show({ children, above, below, at }: ShowProps) {
  let className = ''

  if (above) {
    const breakpoints: Record<string, string> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    }
    className = `hidden ${breakpoints[above]}:block`
  }

  if (below) {
    const breakpoints: Record<string, string> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    }
    className = `${breakpoints[below]}:hidden`
  }

  if (at) {
    const breakpoints: Record<string, { min: string; max: string }> = {
      sm: { min: 'sm', max: 'md' },
      md: { min: 'md', max: 'lg' },
      lg: { min: 'lg', max: 'xl' },
      xl: { min: 'xl', max: '2xl' },
      '2xl': { min: '2xl', max: '' },
    }
    const bp = breakpoints[at]
    className = `hidden ${bp.min}:block ${bp.max}:hidden`
  }

  return <div className={className}>{children}</div>
}

export interface HideProps {
  children: React.ReactNode
  above?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  below?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Hide({ children, above, below }: HideProps) {
  let className = ''

  if (above) {
    const breakpoints: Record<string, string> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    }
    className = `${breakpoints[above]}:hidden`
  }

  if (below) {
    const breakpoints: Record<string, string> = {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      '2xl': '2xl',
    }
    className = `hidden ${breakpoints[below]}:block`
  }

  return <div className={className}>{children}</div>
}

// ============================================================================
// DEVICE-SPECIFIC RENDERING
// ============================================================================

export interface DeviceProps {
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop?: React.ReactNode
  touch?: React.ReactNode
  children?: React.ReactNode
}

export function Device({ mobile, tablet, desktop, touch, children }: DeviceProps) {
  const { isMobile, isTablet, isDesktop, isTouch } = useBreakpoint()

  if (isMobile && mobile) return <>{mobile}</>
  if (isTablet && tablet) return <>{tablet}</>
  if (isDesktop && desktop) return <>{desktop}</>
  if (isTouch && touch) return <>{touch}</>
  
  return <>{children}</>
}

// ============================================================================
// ASPECT RATIO CONTAINER
// ============================================================================

export interface AspectRatioProps {
  children: React.ReactNode
  ratio?: 'video' | 'square' | 'portrait' | 'landscape' | number
  className?: string
}

export function AspectRatio({ children, ratio = 'video', className }: AspectRatioProps) {
  const ratioMap: Record<string, string> = {
    video: 'aspect-video',      // 16:9
    square: 'aspect-square',    // 1:1
    portrait: 'aspect-[9/16]',  // 9:16 (TikTok style)
    landscape: 'aspect-[4/3]',  // 4:3
  }

  const ratioClass = typeof ratio === 'number' 
    ? `aspect-[${ratio}]` 
    : ratioMap[ratio] || 'aspect-video'

  return (
    <div className={cn('relative w-full', ratioClass, className)}>
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

// ============================================================================
// SAFE AREA PADDING
// ============================================================================

export interface SafeAreaProps {
  children: React.ReactNode
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>
  className?: string
  minPadding?: number
}

export function SafeArea({ children, edges = ['top', 'bottom'], className, minPadding = 16 }: SafeAreaProps) {
  const edgeClasses = edges.map(edge => {
    switch (edge) {
      case 'top':
        return `pt-[max(env(safe-area-inset-top),${minPadding}px)]`
      case 'bottom':
        return `pb-[max(env(safe-area-inset-bottom),${minPadding}px)]`
      case 'left':
        return `pl-[max(env(safe-area-inset-left),${minPadding}px)]`
      case 'right':
        return `pr-[max(env(safe-area-inset-right),${minPadding}px)]`
      default:
        return ''
    }
  }).join(' ')

  return <div className={cn(edgeClasses, className)}>{children}</div>
}

// ============================================================================
// VIEWPORT DETECTOR
// ============================================================================

export interface ViewportDetectorProps {
  onEnter?: () => void
  onLeave?: () => void
  onChange?: (isInViewport: boolean) => void
  threshold?: number
  rootMargin?: string
  children: React.ReactNode
}

export function ViewportDetector({
  onEnter,
  onLeave,
  onChange,
  threshold = 0,
  rootMargin = '0px',
  children,
}: ViewportDetectorProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onChange?.(entry.isIntersecting)
        if (entry.isIntersecting) {
          onEnter?.()
        } else {
          onLeave?.()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [onEnter, onLeave, onChange, threshold, rootMargin])

  return <div ref={ref}>{children}</div>
}

// ============================================================================
// MOBILE-OPTIMIZED SCROLL CONTAINER
// ============================================================================

export interface ScrollContainerProps {
  children: React.ReactNode
  className?: string
  horizontal?: boolean
  snap?: 'none' | 'x' | 'y' | 'both' | 'mandatory'
  hideScrollbar?: boolean
  momentum?: boolean
}

export function ScrollContainer({
  children,
  className,
  horizontal = false,
  snap = 'none',
  hideScrollbar = true,
  momentum = true,
}: ScrollContainerProps) {
  const snapClasses = {
    none: '',
    x: 'snap-x snap-mandatory',
    y: 'snap-y snap-mandatory',
    both: 'snap-both snap-mandatory',
    mandatory: 'snap-mandatory',
  }

  return (
    <div
      className={cn(
        'overflow-auto',
        horizontal ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto overflow-x-hidden',
        snapClasses[snap],
        momentum && '[-webkit-overflow-scrolling:touch]',
        hideScrollbar && '[&::-webkit-scrollbar]:hidden',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================================================
// HORIZONTAL SCROLL (for mobile carousels)
// ============================================================================

export interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  itemWidth?: string
  gap?: 'none' | 'sm' | 'md' | 'lg'
  snap?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function HorizontalScroll({
  children,
  className,
  itemWidth = '280px',
  gap = 'md',
  snap = true,
  padding = 'md',
}: HorizontalScrollProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
  }

  return (
    <div
      className={cn(
        'flex overflow-x-auto',
        '[-webkit-overflow-scrolling:touch]',
        '[&::-webkit-scrollbar]:hidden',
        snap && 'snap-x snap-mandatory',
        gapClasses[gap],
        paddingClasses[padding],
        className
      )}
      style={{
        scrollPaddingLeft: padding === 'none' ? 0 : padding === 'sm' ? 8 : padding === 'md' ? 16 : 24,
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            'flex-shrink-0',
            snap && 'snap-start'
          )}
          style={{ width: itemWidth }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export default {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveStack,
  Show,
  Hide,
  Device,
  AspectRatio,
  SafeArea,
  ViewportDetector,
  ScrollContainer,
  HorizontalScroll,
}
