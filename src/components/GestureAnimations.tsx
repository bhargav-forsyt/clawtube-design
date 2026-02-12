// GestureAnimations.tsx - Swipe, drag, and gesture-based animations
// TikTok-style interactions: swipe to dismiss, card swipes, pull-to-refresh

import * as React from 'react'
import { motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// SWIPE TO DISMISS
// ============================================================================

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'horizontal' | 'vertical'

interface SwipeToDismissProps {
  children: React.ReactNode
  className?: string
  direction?: SwipeDirection
  threshold?: number
  onDismiss: (direction: number) => void
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
  snapBack?: boolean
}

/**
 * SwipeToDismiss - Element that can be swiped away
 * Useful for notifications, list items, cards
 */
export function SwipeToDismiss({
  children,
  className,
  direction = 'horizontal',
  threshold = 100,
  onDismiss,
  onSwipeStart,
  onSwipeEnd,
  snapBack = false,
}: SwipeToDismissProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const opacity = useTransform(
    direction === 'horizontal' || direction === 'left' || direction === 'right'
      ? x
      : y,
    [-threshold, 0, threshold],
    [0.3, 1, 0.3]
  )

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const isHorizontal = direction === 'horizontal' || direction === 'left' || direction === 'right'
    const offset = isHorizontal ? info.offset.x : info.offset.y
    const velocity = isHorizontal ? info.velocity.x : info.velocity.y

    const shouldDismiss =
      Math.abs(offset) > threshold || Math.abs(velocity) > 500

    if (shouldDismiss) {
      const directionMultiplier = offset > 0 ? 1 : -1
      onDismiss(directionMultiplier)
    }
    onSwipeEnd?.()
  }

  const dragConstraints = snapBack
    ? { left: 0, right: 0, top: 0, bottom: 0 }
    : undefined

  const dragDirection =
    direction === 'horizontal'
      ? 'x'
      : direction === 'vertical'
      ? 'y'
      : direction === 'left' || direction === 'right'
      ? 'x'
      : 'y'

  return (
    <motion.div
      className={cn('touch-pan-y', className)}
      style={{
        x: direction === 'horizontal' || direction === 'left' || direction === 'right' ? x : undefined,
        y: direction === 'vertical' || direction === 'up' || direction === 'down' ? y : undefined,
        opacity,
      }}
      drag={dragDirection}
      dragConstraints={dragConstraints}
      dragElastic={0.3}
      onDragStart={onSwipeStart}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// SWIPEABLE CARD (TINDER-STYLE)
// ============================================================================

interface SwipeableCardProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  threshold?: number
  overlayLeft?: React.ReactNode
  overlayRight?: React.ReactNode
  overlayUp?: React.ReactNode
}

/**
 * SwipeableCard - Card that can be swiped in multiple directions
 * TikTok-style video card swiping
 */
export function SwipeableCard({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  threshold = 100,
  overlayLeft,
  overlayRight,
  overlayUp,
}: SwipeableCardProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(
    [x, y],
    ([latestX, latestY]: number[]) => {
      const absX = Math.abs(latestX)
      const absY = Math.abs(latestY)
      return 1 - Math.max(absX, absY) / 300
    }
  )

  // Overlay opacities
  const leftOpacity = useTransform(x, [-100, -50, 0], [1, 0.5, 0])
  const rightOpacity = useTransform(x, [0, 50, 100], [0, 0.5, 1])
  const upOpacity = useTransform(y, [-100, -50, 0], [1, 0.5, 0])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { x: offsetX, y: offsetY } = info.offset
    const velocity = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2)

    if (offsetX > threshold || (offsetX > 50 && velocity > 500)) {
      onSwipeRight?.()
    } else if (offsetX < -threshold || (offsetX < -50 && velocity > 500)) {
      onSwipeLeft?.()
    } else if (offsetY < -threshold || (offsetY < -50 && velocity > 500)) {
      onSwipeUp?.()
    }
  }

  return (
    <motion.div
      className={cn('relative', className)}
      style={{ x, y, rotate, opacity }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
    >
      {/* Overlays */}
      {overlayLeft && (
        <motion.div
          className="absolute inset-0 flex items-center justify-start px-8 pointer-events-none"
          style={{ opacity: leftOpacity }}
        >
          {overlayLeft}
        </motion.div>
      )}
      {overlayRight && (
        <motion.div
          className="absolute inset-0 flex items-center justify-end px-8 pointer-events-none"
          style={{ opacity: rightOpacity }}
        >
          {overlayRight}
        </motion.div>
      )}
      {overlayUp && (
        <motion.div
          className="absolute inset-0 flex items-start justify-center pt-8 pointer-events-none"
          style={{ opacity: upOpacity }}
        >
          {overlayUp}
        </motion.div>
      )}
      {children}
    </motion.div>
  )
}

// ============================================================================
// PULL TO REFRESH
// ============================================================================

interface PullToRefreshProps {
  children: React.ReactNode
  className?: string
  onRefresh: () => Promise<void>
  threshold?: number
  maxPull?: number
  refreshIndicator?: React.ReactNode
}

/**
 * PullToRefresh - Container that triggers refresh when pulled down
 * Native-app style pull gesture
 */
export function PullToRefresh({
  children,
  className,
  onRefresh,
  threshold = 80,
  maxPull = 120,
  refreshIndicator,
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const y = useMotionValue(0)
  const scale = useTransform(y, [0, maxPull], [0.8, 1])
  const rotate = useTransform(y, [0, maxPull], [0, 180])
  const opacity = useTransform(y, [0, threshold / 2], [0, 1])

  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const pulled = info.offset.y

    if (pulled > threshold && !isRefreshing) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Refresh indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center pt-4"
        style={{ y: Math.min(y.get(), maxPull), opacity, scale, rotate }}
      >
        {refreshIndicator || (
          <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-primary" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: isRefreshing ? threshold : 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ y: isRefreshing ? threshold : 0 }}
        animate={{ y: isRefreshing ? threshold : 0 }}
        transition={springs.bouncy}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ============================================================================
// DRAGGABLE BOTTOM SHEET
// ============================================================================

interface BottomSheetProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
  snapPoints?: number[]
  initialSnap?: number
  backdrop?: boolean
}

/**
 * BottomSheet - Draggable bottom sheet modal
 * TikTok-style comment sheet, share sheet
 */
export function BottomSheet({
  children,
  className,
  isOpen,
  onClose,
  snapPoints = [0.3, 0.6, 0.9],
  initialSnap = 0,
  backdrop = true,
}: BottomSheetProps) {
  const [currentSnap, setCurrentSnap] = React.useState(initialSnap)
  const y = useMotionValue(0)
  const backdropOpacity = useTransform(y, [0, 300], [1, 0])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.y
    const offset = info.offset.y

    if (velocity > 500 || offset > 150) {
      onClose()
    } else if (velocity < -500) {
      setCurrentSnap(Math.min(currentSnap + 1, snapPoints.length - 1))
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      {backdrop && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ opacity: backdropOpacity }}
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <motion.div
        className={cn(
          'fixed left-0 right-0 bottom-0 z-50 bg-surface-glass rounded-t-3xl',
          className
        )}
        initial={{ y: '100%' }}
        animate={{ y: `${(1 - snapPoints[currentSnap]) * 100}%` }}
        exit={{ y: '100%' }}
        transition={springs.stiff}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ y }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>
        {children}
      </motion.div>
    </>
  )
}

// ============================================================================
// SWIPEABLE LIST ITEM
// ============================================================================

export interface SwipeableListItemProps {
  children: React.ReactNode
  className?: string
  leftAction?: {
    content: React.ReactNode
    onTrigger: () => void
    color?: string
  }
  rightAction?: {
    content: React.ReactNode
    onTrigger: () => void
    color?: string
  }
  threshold?: number
}

/**
 * SwipeableListItem - List item with swipe actions
 * iOS-style swipe to reveal actions
 */
export function SwipeableListItem({
  children,
  className,
  leftAction,
  rightAction,
  threshold = 80,
}: SwipeableListItemProps) {
  const x = useMotionValue(0)
  const leftWidth = useTransform(x, [0, threshold, threshold * 2], [0, threshold, threshold])
  const rightWidth = useTransform(x, [0, -threshold, -threshold * 2], [0, threshold, threshold])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset > threshold || (offset > 50 && velocity > 300)) {
      leftAction?.onTrigger()
    } else if (offset < -threshold || (offset < -50 && velocity < -300)) {
      rightAction?.onTrigger()
    }
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Left action background */}
      {leftAction && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 flex items-center justify-end px-4"
          style={{
            width: leftWidth,
            backgroundColor: leftAction.color || '#00D084',
          }}
        >
          {leftAction.content}
        </motion.div>
      )}

      {/* Right action background */}
      {rightAction && (
        <motion.div
          className="absolute right-0 top-0 bottom-0 flex items-center justify-start px-4"
          style={{
            width: rightWidth,
            backgroundColor: rightAction.color || '#FF4D4F',
          }}
        >
          {rightAction.content}
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: rightAction ? -threshold * 2 : 0, right: leftAction ? threshold * 2 : 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{ x }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// ============================================================================
// DRAGGABLE SLIDER
// ============================================================================

interface DraggableSliderProps {
  className?: string
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (value: number) => void
  orientation?: 'horizontal' | 'vertical'
  trackClassName?: string
  thumbClassName?: string
}

/**
 * DraggableSlider - Touch-optimized slider with spring physics
 */
export function DraggableSlider({
  className,
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  orientation = 'horizontal',
  trackClassName,
  thumbClassName,
}: DraggableSliderProps) {
  const constraintsRef = React.useRef<HTMLDivElement>(null)
  const isHorizontal = orientation === 'horizontal'

  const percentage = ((value - min) / (max - min)) * 100

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!constraintsRef.current) return

    const rect = constraintsRef.current.getBoundingClientRect()
    const size = isHorizontal ? rect.width : rect.height
    const offset = isHorizontal ? info.point.x - rect.left : rect.bottom - info.point.y
    const percent = Math.max(0, Math.min(1, offset / size))
    const newValue = min + percent * (max - min)
    const steppedValue = Math.round(newValue / step) * step

    onChange(Math.max(min, Math.min(max, steppedValue)))
  }

  return (
    <div
      ref={constraintsRef}
      className={cn(
        'relative bg-white/10 rounded-full',
        isHorizontal ? 'h-2 w-full' : 'w-2 h-full',
        className
      )}
    >
      {/* Fill */}
      <motion.div
        className={cn('absolute bg-primary rounded-full', trackClassName)}
        style={{
          [isHorizontal ? 'width' : 'height']: `${percentage}%`,
          [isHorizontal ? 'height' : 'width']: '100%',
          [isHorizontal ? 'left' : 'bottom']: 0,
        }}
      />

      {/* Thumb */}
      <motion.div
        className={cn(
          'absolute w-5 h-5 bg-white rounded-full shadow-lg cursor-grab active:cursor-grabbing',
          thumbClassName
        )}
        drag={isHorizontal ? 'x' : 'y'}
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{
          [isHorizontal ? 'left' : 'bottom']: `calc(${percentage}% - 10px)`,
          [isHorizontal ? 'top' : 'left']: '50%',
          [isHorizontal ? 'y' : 'x']: '-50%',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />
    </div>
  )
}

// ============================================================================
// SCROLL SNAP CAROUSEL
// ============================================================================

interface ScrollSnapCarouselProps {
  children: React.ReactNode[]
  className?: string
  itemClassName?: string
  snapTo?: 'start' | 'center' | 'end'
}

/**
 * ScrollSnapCarousel - Horizontal scroll with snap points
 * For stories, video carousels
 */
export function ScrollSnapCarousel({
  children,
  className,
  itemClassName,
  snapTo = 'center',
}: ScrollSnapCarouselProps) {
  return (
    <div
      className={cn(
        'flex overflow-x-auto scrollbar-hide snap-x snap-mandatory',
        className
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          className={cn(
            'flex-shrink-0 snap-start',
            snapTo === 'center' && 'snap-center',
            snapTo === 'end' && 'snap-end',
            itemClassName
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={springs.smooth}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// DOUBLE TAP HEART
// ============================================================================

interface DoubleTapHeartProps {
  children: React.ReactNode
  className?: string
  onDoubleTap: () => void
}

/**
 * DoubleTapHeart - Detects double tap and shows heart animation
 * TikTok-style double tap to like
 */
export function DoubleTapHeart({ children, className, onDoubleTap }: DoubleTapHeartProps) {
  const [hearts, setHearts] = React.useState<{ id: number; x: number; y: number }[]>([])
  const lastTapRef = React.useRef(0)

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now()
    const timeDiff = now - lastTapRef.current

    if (timeDiff < 300) {
      // Double tap detected
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()

      const newHeart = {
        id: now,
        x: clientX - rect.left,
        y: clientY - rect.top,
      }

      setHearts((prev) => [...prev, newHeart])
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 800)

      onDoubleTap()
    }

    lastTapRef.current = now
  }

  return (
    <div
      className={cn('relative', className)}
      onClick={handleTap}
      onTouchStart={handleTap}
    >
      {children}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none text-primary"
          style={{ left: heart.x, top: heart.y }}
          initial={{ scale: 0, opacity: 1, y: 0 }}
          animate={{
            scale: [0, 1.5, 1],
            opacity: [1, 1, 0],
            y: -100,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// PINCH TO ZOOM
// ============================================================================

interface PinchToZoomProps {
  children: React.ReactNode
  className?: string
  _minScale?: number
  _maxScale?: number
}

/**
 * PinchToZoom - Container supporting pinch gesture for zooming
 * For images, videos
 */
export function PinchToZoom({
  children,
  className,
}: PinchToZoomProps) {
  const scale = useMotionValue(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleDrag = () => {
    // Reset position when zoomed out
    if (scale.get() <= 1) {
      x.set(0)
      y.set(0)
    }
  }

  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      style={{ scale, x, y }}
      drag={scale.get() > 1}
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      onDrag={handleDrag}
      whileTap={{ cursor: 'grabbing' }}
    >
      {children}
    </motion.div>
  )
}
