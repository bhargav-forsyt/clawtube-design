// Comprehensive Animation System for ClawTube Design System
// Framer Motion-based with spring physics, optimized for 60fps

import type { Transition, Variants, TargetAndTransition } from 'framer-motion'

// ============================================================================
// SPRING CONFIGURATIONS
// ============================================================================

export interface SpringConfig {
  type: 'spring'
  stiffness: number
  damping: number
  mass?: number
  restDelta?: number
  restSpeed?: number
}

/**
 * Spring presets tuned for TikTok-style interactions
 * All springs optimized for 60fps performance
 */
export const springs: Record<string, SpringConfig> = {
  // Bouncy — playful interactions (buttons, likes)
  bouncy: {
    type: 'spring',
    stiffness: 400,
    damping: 25,
    mass: 1,
    restDelta: 0.01,
  },

  // Smooth — general UI transitions
  smooth: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    mass: 1,
    restDelta: 0.01,
  },

  // Snappy — quick feedback (toggles, switches, taps)
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 35,
    mass: 0.8,
    restDelta: 0.01,
  },

  // Gentle — subtle emphasis (hovers, tooltips)
  gentle: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 1,
    restDelta: 0.01,
  },

  // Stiff — precise, mechanical (modals, toasts, drawers)
  stiff: {
    type: 'spring',
    stiffness: 600,
    damping: 40,
    mass: 1,
    restDelta: 0.01,
  },

  // Wobbly — elastic effects (pull-to-refresh, success states)
  wobbly: {
    type: 'spring',
    stiffness: 280,
    damping: 20,
    mass: 1.2,
    restDelta: 0.01,
  },

  // Slow — cinematic reveals (page transitions, hero content)
  slow: {
    type: 'spring',
    stiffness: 150,
    damping: 25,
    mass: 1.5,
    restDelta: 0.01,
  },
}

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const transitions: Record<string, Transition> = {
  // Standard fade
  fade: {
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1],
  },

  // Scale for modals/dialogs
  scale: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  },

  // Slide for toasts/drawers
  slide: {
    type: 'spring',
    stiffness: 400,
    damping: 35,
  },

  // Default spring
  default: springs.smooth,

  // Quick exit for snappy feel
  quickExit: {
    duration: 0.15,
    ease: [0.4, 0, 1, 1],
  },
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

export const variants: Record<string, Variants> = {
  // Fade in/out
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },

  // Scale in/out (modals, popovers)
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: springs.smooth,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: transitions.quickExit,
    },
  },

  // Scale with spring bounce
  scaleBounce: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: springs.bouncy,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: transitions.quickExit,
    },
  },

  // Slide up (toasts, bottom sheets, snackbars)
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springs.stiff,
    },
    exit: {
      opacity: 0,
      y: 100,
      transition: transitions.quickExit,
    },
  },

  // Slide down (dropdowns, menus)
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springs.smooth,
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: transitions.quickExit,
    },
  },

  // Slide from left (drawers, side panels)
  slideLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: springs.stiff,
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: transitions.quickExit,
    },
  },

  // Slide from right (drawers, side panels)
  slideRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: springs.stiff,
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: transitions.quickExit,
    },
  },

  // Page transition - fade + slide up
  page: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springs.smooth,
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: transitions.quickExit,
    },
  },

  // Stagger container
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  },

  // Stagger item
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springs.smooth,
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.1 },
    },
  },

  // List items (for feed-like content)
  listItem: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springs.smooth,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  },

  // Pop in (for badges, notifications)
  popIn: {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: springs.bouncy,
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.1 },
    },
  },

  // Pulse (attention-grabbing)
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
}

// ============================================================================
// MICRO-INTERACTIONS
// ============================================================================

export const microInteractions = {
  // Button press effect
  buttonTap: {
    scale: 0.96,
    transition: springs.snappy,
  },

  // Button hover effect
  buttonHover: {
    scale: 1.02,
    transition: springs.gentle,
  },

  // Card hover lift
  cardHover: {
    y: -4,
    scale: 1.01,
    transition: springs.gentle,
  },

  // Card tap
  cardTap: {
    scale: 0.98,
    transition: springs.snappy,
  },

  // Icon button press
  iconTap: {
    scale: 0.85,
    transition: springs.bouncy,
  },

  // Like/heart animation
  likeTap: {
    scale: [1, 0.8, 1.3, 1],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.5, 1],
      ease: 'easeOut',
    },
  },

  // Subtle glow on hover
  glowHover: {
    boxShadow: '0 0 20px rgba(254, 44, 85, 0.4)',
    transition: { duration: 0.2 },
  },
}

// ============================================================================
// LOADING ANIMATIONS
// ============================================================================

export const loadingAnimations = {
  // Skeleton shimmer
  shimmer: {
    background: [
      'linear-gradient(90deg, #1C1F2E 0%, #2A2E42 50%, #1C1F2E 100%)',
      'linear-gradient(90deg, #1C1F2E 0%, #1C1F2E 50%, #2A2E42 100%)',
      'linear-gradient(90deg, #2A2E42 0%, #1C1F2E 50%, #1C1F2E 100%)',
      'linear-gradient(90deg, #1C1F2E 0%, #2A2E42 50%, #1C1F2E 100%)',
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },

  // Spinner rotation
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },

  // Bouncing dots
  bounceDots: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  // Pulse loading
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },

  // Progress bar
  progressBar: (progress: number): TargetAndTransition => ({
    width: `${progress}%`,
    transition: springs.smooth,
  }),
}

// ============================================================================
// SUCCESS / ERROR ANIMATIONS
// ============================================================================

export const feedbackAnimations = {
  // Success checkmark
  success: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.4, ease: 'easeOut' },
        opacity: { duration: 0.1 },
      },
    },
  },

  // Error shake
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },

  // Success pop
  successPop: {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: {
        duration: 0.4,
        times: [0, 0.6, 1],
        ease: 'easeOut',
      },
    },
  },

  // Error pulse
  errorPulse: {
    boxShadow: [
      '0 0 0 0 rgba(255, 77, 79, 0)',
      '0 0 0 10px rgba(255, 77, 79, 0.2)',
      '0 0 0 0 rgba(255, 77, 79, 0)',
    ],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

// ============================================================================
// GESTURE ANIMATIONS
// ============================================================================

export const gestureAnimations = {
  // Swipe to dismiss
  swipeDismiss: {
    x: 0,
    opacity: 1,
    exit: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      transition: springs.smooth,
    }),
  },

  // Drag constraints with spring back
  dragSpringBack: {
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: 0.2,
    dragTransition: springs.gentle,
  },

  // Pull to refresh indicator
  pullToRefresh: {
    initial: { y: -50, opacity: 0 },
    pulling: (offset: number) => ({
      y: Math.min(offset * 0.5, 60) - 50,
      opacity: Math.min(offset / 100, 1),
      rotate: Math.min(offset * 2, 360),
    }),
    refreshing: {
      y: 10,
      opacity: 1,
      rotate: 360,
      transition: {
        rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
        y: springs.bouncy,
      },
    },
  },

  // Card swipe (like/dislike)
  cardSwipe: {
    initial: { x: 0, rotate: 0, opacity: 1 },
    swipe: (offset: number) => ({
      x: offset,
      rotate: offset * 0.05,
      opacity: 1 - Math.abs(offset) / 500,
    }),
    exit: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      transition: springs.smooth,
    }),
  },
}

// ============================================================================
// PAGE TRANSITION CONFIGS
// ============================================================================

export const pageTransitions = {
  // Fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },

  // Slide up transition
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: springs.smooth },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  },

  // Scale transition
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: springs.smooth },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  },

  // Push transition (iOS-style)
  push: {
    initial: { x: '100%' },
    animate: { x: 0, transition: springs.smooth },
    exit: { x: '-30%', opacity: 0.5, transition: { duration: 0.3 } },
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create custom stagger variants
 */
export function createStaggerVariants(
  staggerDelay: number = 0.05,
  itemDelay: number = 0
): { container: Variants; item: Variants } {
  return {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: itemDelay,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: springs.smooth,
      },
    },
  }
}

/**
 * Create a spring with custom stiffness/damping
 */
export function createSpring(
  stiffness: number,
  damping: number,
  mass: number = 1
): SpringConfig {
  return {
    type: 'spring',
    stiffness,
    damping,
    mass,
    restDelta: 0.01,
  }
}

/**
 * Convert CSS duration to Framer Motion format
 */
export function durationToSeconds(ms: number): number {
  return ms / 1000
}

/**
 * Easing curves as cubic bezier arrays
 */
export const easings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  elastic: [0.68, -0.55, 0.265, 1.55],
}

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Returns transition config respecting reduced motion preferences
 */
export function getAccessibleTransition(
  prefersReducedMotion: boolean,
  transition: Transition = transitions.default
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 }
  }
  return transition
}

/**
 * Returns variants respecting reduced motion preferences
 */
export function getAccessibleVariants(
  prefersReducedMotion: boolean,
  animationVariants: Variants
): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: {},
      visible: {},
      exit: {},
    }
  }
  return animationVariants
}

// Re-export everything for backward compatibility
export { springs as defaultSprings, transitions as defaultTransitions, variants as defaultVariants }
