// PageTransition.tsx - Page-level transition component
// Provides smooth page transitions with multiple animation presets

import * as React from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { pageTransitions, springs } from '@/lib/animations'

export type TransitionType = 'fade' | 'slideUp' | 'scale' | 'push'

export interface PageTransitionProps {
  children: React.ReactNode
  transition?: TransitionType
  className?: string
  mode?: 'wait' | 'sync' | 'popLayout'
  initial?: boolean
  onExitComplete?: () => void
}

const transitionVariants: Record<TransitionType, Variants> = {
  fade: pageTransitions.fade,
  slideUp: pageTransitions.slideUp,
  scale: pageTransitions.scale,
  push: pageTransitions.push,
}

/**
 * PageTransition - Wraps page content with animated transitions
 * 
 * Usage:
 * <PageTransition transition="slideUp">
 *   <YourPageContent />
 * </PageTransition>
 */
export function PageTransition({
  children,
  transition = 'fade',
  className,
  mode = 'wait',
  initial = true,
  onExitComplete,
}: PageTransitionProps) {
  const variants = transitionVariants[transition]

  return (
    <AnimatePresence mode={mode} onExitComplete={onExitComplete}>
      <motion.div
        key={transition}
        initial={initial ? 'initial' : false}
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// ROUTE TRANSITION WRAPPER
// ============================================================================

interface RouteTransitionProps {
  children: React.ReactNode
  pathname: string
  transition?: TransitionType
  className?: string
}

/**
 * RouteTransition - For router-based page transitions
 * Automatically triggers on pathname change
 */
export function RouteTransition({
  children,
  pathname,
  transition = 'slideUp',
  className,
}: RouteTransitionProps) {
  const variants = transitionVariants[transition]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// STAGGERED PAGE CONTENT
// ============================================================================

interface StaggerPageProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

/**
 * StaggerPage - Animates children with staggered entrance
 * Great for pages with multiple sections
 */
export function StaggerPage({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0.1,
}: StaggerPageProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem - Individual item for StaggerPage
 * Wrap each child element with this
 */
export interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  distance = 20,
}: StaggerItemProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...directionOffset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: springs.smooth,
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ============================================================================
// LAYOUT ANIMATION
// ============================================================================

interface LayoutTransitionProps {
  children: React.ReactNode
  className?: string
  layoutId?: string
}

/**
 * LayoutTransition - Shared element transitions
 * Use layoutId to connect elements across pages
 */
export function LayoutTransition({
  children,
  className,
  layoutId,
}: LayoutTransitionProps) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={springs.smooth}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// LOADING TRANSITION
// ============================================================================

interface LoadingTransitionProps {
  children: React.ReactNode
  isLoading: boolean
  fallback?: React.ReactNode
  className?: string
}

/**
 * LoadingTransition - Smooth transition between loading and content states
 */
export function LoadingTransition({
  children,
  isLoading,
  fallback,
  className,
}: LoadingTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={className}
        >
          {fallback}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={springs.smooth}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
