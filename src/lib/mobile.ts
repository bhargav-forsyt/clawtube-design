// Mobile viewport utilities and hooks
// Handles safe areas, viewport height, touch events, and responsive behavior

import { useState, useEffect, useCallback } from 'react'

// ============================================================================
// VIEWPORT HEIGHT UTILITIES
// ============================================================================

/**
 * Mobile viewport height that accounts for browser chrome
 * Solves the 100vh issue on mobile browsers
 */
export function useViewportHeight(): number {
  const [vh, setVh] = useState(() => {
    if (typeof window === 'undefined') return 768
    return window.innerHeight
  })

  useEffect(() => {
    const updateVh = () => {
      // Use visualViewport if available for more accurate height
      const height = window.visualViewport?.height ?? window.innerHeight
      setVh(height)
    }

    updateVh()
    
    window.addEventListener('resize', updateVh)
    window.addEventListener('orientationchange', updateVh)
    window.visualViewport?.addEventListener('resize', updateVh)

    return () => {
      window.removeEventListener('resize', updateVh)
      window.removeEventListener('orientationchange', updateVh)
      window.visualViewport?.removeEventListener('resize', updateVh)
    }
  }, [])

  return vh
}

/**
 * CSS custom property for dynamic viewport height
 * Use --vh in CSS for accurate mobile heights
 */
export function useViewportHeightCSS(): string {
  const vh = useViewportHeight()
  
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`)
    }
  }, [vh])

  return `${vh}px`
}

// ============================================================================
// SAFE AREA INSETS
// ============================================================================

export interface SafeAreaInsets {
  top: number
  right: number
  bottom: number
  left: number
}

/**
 * Hook to get CSS environment safe area insets
 * For notched devices (iPhone X+, modern Android)
 */
export function useSafeAreaInsets(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateInsets = () => {
      const styles = getComputedStyle(document.documentElement)
      setInsets({
        top: parseInt(styles.getPropertyValue('--safe-top') || '0', 10),
        right: parseInt(styles.getPropertyValue('--safe-right') || '0', 10),
        bottom: parseInt(styles.getPropertyValue('--safe-bottom') || '0', 10),
        left: parseInt(styles.getPropertyValue('--safe-left') || '0', 10),
      })
    }

    updateInsets()
    window.addEventListener('resize', updateInsets)
    return () => window.removeEventListener('resize', updateInsets)
  }, [])

  return insets
}

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

export interface BreakpointState {
  isMobile: boolean      // < 768px
  isTablet: boolean      // 768px - 1023px
  isDesktop: boolean     // >= 1024px
  isTouch: boolean       // Mobile or tablet
  current: Breakpoint
}

/**
 * Hook to track current breakpoint and device type
 */
export function useBreakpoint(): BreakpointState {
  const [state, setState] = useState<BreakpointState>(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouch: false,
    current: 'xl',
  }))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQueries = {
      sm: window.matchMedia(`(min-width: ${breakpoints.sm}px)`),
      md: window.matchMedia(`(min-width: ${breakpoints.md}px)`),
      lg: window.matchMedia(`(min-width: ${breakpoints.lg}px)`),
      xl: window.matchMedia(`(min-width: ${breakpoints.xl}px)`),
      '2xl': window.matchMedia(`(min-width: ${breakpoints['2xl']}px)`),
    }

    const updateState = () => {
      const width = window.innerWidth
      let current: Breakpoint = 'xs'
      
      if (width >= breakpoints['2xl']) current = '2xl'
      else if (width >= breakpoints.xl) current = 'xl'
      else if (width >= breakpoints.lg) current = 'lg'
      else if (width >= breakpoints.md) current = 'md'
      else if (width >= breakpoints.sm) current = 'sm'
      else current = 'xs'

      setState({
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        isTouch: width < breakpoints.lg || 'ontouchstart' in window,
        current,
      })
    }

    updateState()

    Object.values(mediaQueries).forEach((mq) => {
      mq.addEventListener('change', updateState)
    })

    return () => {
      Object.values(mediaQueries).forEach((mq) => {
        mq.removeEventListener('change', updateState)
      })
    }
  }, [])

  return state
}

// ============================================================================
// TOUCH / POINTER DETECTION
// ============================================================================

/**
 * Detect if device supports touch
 */
export function useTouchCapability(): {
  isTouch: boolean
  isHover: boolean
  pointerType: 'coarse' | 'fine' | 'none'
} {
  const [state, setState] = useState({
    isTouch: false,
    isHover: true,
    pointerType: 'fine' as 'coarse' | 'fine' | 'none',
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateCapabilities = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const fine = window.matchMedia('(pointer: fine)').matches
      const hover = window.matchMedia('(hover: hover)').matches
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setState({
        isTouch: touch || coarse,
        isHover: hover,
        pointerType: coarse ? 'coarse' : fine ? 'fine' : 'none',
      })
    }

    updateCapabilities()
  }, [])

  return state
}

// ============================================================================
// KEYBOARD VISIBILITY
// ============================================================================

/**
 * Hook to detect virtual keyboard visibility on mobile
 */
export function useKeyboardVisibility(): {
  isVisible: boolean
  height: number
} {
  const [state, setState] = useState({ isVisible: false, height: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      const windowHeight = window.innerHeight
      const viewportHeight = visualViewport.height
      const keyboardHeight = windowHeight - viewportHeight

      setState({
        isVisible: keyboardHeight > 150, // Threshold for keyboard
        height: Math.max(0, keyboardHeight),
      })
    }

    visualViewport.addEventListener('resize', handleResize)
    return () => visualViewport.removeEventListener('resize', handleResize)
  }, [])

  return state
}

// ============================================================================
// SCROLL LOCK
// ============================================================================

/**
 * Lock body scroll (for modals, bottom sheets)
 * Preserves scroll position and handles iOS bounce
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (locked) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.body.dataset.scrollY = String(scrollY)
    } else {
      const scrollY = document.body.dataset.scrollY || '0'
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      window.scrollTo(0, parseInt(scrollY, 10))
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [locked])
}

// ============================================================================
// SWIPE GESTURE HOOK
// ============================================================================

export interface SwipeState {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  isSwiping: boolean
}

export interface SwipeCallbacks {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipe?: (deltaX: number, deltaY: number) => void
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
}

/**
 * Hook for handling swipe gestures on an element
 */
export function useSwipe(
  elementRef: React.RefObject<HTMLElement>,
  callbacks: SwipeCallbacks,
  threshold: number = 50
): void {
  const [state, setState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    isSwiping: false,
  })

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    setState({
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isSwiping: true,
    })
    callbacks.onSwipeStart?.()
  }, [callbacks])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!state.isSwiping) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - state.startX
    const deltaY = touch.clientY - state.startY
    
    setState(prev => ({ ...prev, deltaX, deltaY }))
    callbacks.onSwipe?.(deltaX, deltaY)
  }, [state.isSwiping, state.startX, state.startY, callbacks])

  const handleTouchEnd = useCallback(() => {
    if (!state.isSwiping) return

    const { deltaX, deltaY } = state
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > threshold || absY > threshold) {
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) callbacks.onSwipeRight?.()
        else callbacks.onSwipeLeft?.()
      } else {
        // Vertical swipe
        if (deltaY > 0) callbacks.onSwipeDown?.()
        else callbacks.onSwipeUp?.()
      }
    }

    setState(prev => ({ ...prev, isSwiping: false }))
    callbacks.onSwipeEnd?.()
  }, [state, callbacks, threshold])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd)

    return () => {
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
    }
  }, [elementRef, handleTouchStart, handleTouchMove, handleTouchEnd])
}

// ============================================================================
// DOUBLE TAP
// ============================================================================

/**
 * Hook for detecting double-tap gestures
 * Like Instagram/TikTok double-tap to like
 */
export function useDoubleTap(
  callback: () => void,
  delay: number = 300
): () => void {
  const [lastTap, setLastTap] = useState(0)

  return useCallback(() => {
    const now = Date.now()
    if (now - lastTap < delay) {
      callback()
      setLastTap(0)
    } else {
      setLastTap(now)
    }
  }, [lastTap, callback, delay])
}

// ============================================================================
// PULL TO REFRESH HOOK
// ============================================================================

export interface PullToRefreshState {
  isPulling: boolean
  pullDistance: number
  isRefreshing: boolean
}

export function usePullToRefresh(
  onRefresh: () => Promise<void>,
  threshold: number = 80
): {
  state: PullToRefreshState
  handlers: {
    onTouchStart: (e: React.TouchEvent) => void
    onTouchMove: (e: React.TouchEvent) => void
    onTouchEnd: () => void
  }
} {
  const [state, setState] = useState<PullToRefreshState>({
    isPulling: false,
    pullDistance: 0,
    isRefreshing: false,
  })
  const [startY, setStartY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsAtTop(scrollTop <= 0)
    setStartY(e.touches[0].clientY)
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isAtTop || state.isRefreshing) return
    
    const currentY = e.touches[0].clientY
    const diff = currentY - startY
    
    if (diff > 0) {
      setState(prev => ({
        ...prev,
        isPulling: true,
        pullDistance: Math.min(diff * 0.5, threshold * 1.5),
      }))
    }
  }, [isAtTop, startY, state.isRefreshing, threshold])

  const onTouchEnd = useCallback(async () => {
    if (!state.isPulling) return

    if (state.pullDistance >= threshold && !state.isRefreshing) {
      setState(prev => ({ ...prev, isRefreshing: true }))
      await onRefresh()
      setState({ isPulling: false, pullDistance: 0, isRefreshing: false })
    } else {
      setState({ isPulling: false, pullDistance: 0, isRefreshing: false })
    }
  }, [state.isPulling, state.pullDistance, state.isRefreshing, threshold, onRefresh])

  return {
    state,
    handlers: { onTouchStart, onTouchMove, onTouchEnd },
  }
}

// ============================================================================
// LONG PRESS
// ============================================================================

/**
 * Hook for handling long press gestures
 */
export function useLongPress(
  onLongPress: () => void,
  onClick?: () => void,
  duration: number = 500
): {
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
} {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [isLongPress, setIsLongPress] = useState(false)

  const start = useCallback(() => {
    setIsLongPress(false)
    const t = setTimeout(() => {
      setIsLongPress(true)
      onLongPress()
    }, duration)
    setTimer(t)
  }, [onLongPress, duration])

  const end = useCallback(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    if (!isLongPress && onClick) {
      onClick()
    }
    setIsLongPress(false)
  }, [timer, isLongPress, onClick])

  const cancel = useCallback(() => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setIsLongPress(false)
  }, [timer])

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
  }
}

// ============================================================================
// MOMENTUM SCROLL
// ============================================================================

/**
 * CSS values for momentum scrolling on mobile
 */
export const momentumScrollCSS = {
  WebkitOverflowScrolling: 'touch',
  overscrollBehavior: 'contain',
} as const

/**
 * Prevent elastic bounce on iOS when not needed
 */
export const preventBounceCSS = {
  overscrollBehavior: 'none',
  touchAction: 'pan-y pinch-zoom',
} as const

// ============================================================================
// TOUCH TARGET SIZES
// ============================================================================

/**
 * Minimum touch target sizes per platform guidelines
 * - Apple: 44x44pt
 * - Google: 48x48dp
 * - WCAG: 44x44px
 */
export const touchTargets = {
  min: 44,      // WCAG minimum
  apple: 44,    // Apple HIG
  google: 48,   // Material Design
  comfortable: 48,
  compact: 40,
} as const

/**
 * Check if element meets minimum touch target size
 */
export function meetsTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return rect.width >= touchTargets.min && rect.height >= touchTargets.min
}

// ============================================================================
// REDUCED MOTION
// ============================================================================

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  useViewportHeight,
  useViewportHeightCSS,
  useSafeAreaInsets,
  useBreakpoint,
  useTouchCapability,
  useKeyboardVisibility,
  useScrollLock,
  useSwipe,
  useDoubleTap,
  usePullToRefresh,
  useLongPress,
  useReducedMotion,
  touchTargets,
  breakpoints,
  momentumScrollCSS,
  preventBounceCSS,
}
