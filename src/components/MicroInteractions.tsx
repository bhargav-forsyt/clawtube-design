// MicroInteractions.tsx - Reusable micro-interaction components
// Button effects, hover states, tap feedback, and animated icons

import * as React from 'react'
import { motion, type TargetAndTransition } from 'framer-motion'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// ANIMATED BUTTON
// ============================================================================

export interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: 'scale' | 'press' | 'lift' | 'glow'
  whileHover?: TargetAndTransition
  whileTap?: TargetAndTransition
}

/**
 * AnimatedButton - Button with built-in micro-interactions
 */
export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, variant = 'press', whileHover, whileTap, onClick, disabled, type, style }, ref) => {
    const variantStyles: Record<string, { hover: TargetAndTransition; tap: TargetAndTransition }> = {
      scale: {
        hover: { scale: 1.02 },
        tap: { scale: 0.96 },
      },
      press: {
        hover: {},
        tap: { scale: 0.96 },
      },
      lift: {
        hover: { y: -2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' },
        tap: { y: 0, scale: 0.98 },
      },
      glow: {
        hover: {
          boxShadow: '0 0 20px rgba(254, 44, 85, 0.4)',
        },
        tap: { scale: 0.96 },
      },
    }

    const styles = variantStyles[variant]

    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={whileHover ?? styles.hover}
        whileTap={whileTap ?? styles.tap}
        transition={springs.bouncy}
        onClick={onClick}
        disabled={disabled}
        type={type}
        style={style}
      >
        {children}
      </motion.button>
    )
  }
)
AnimatedButton.displayName = 'AnimatedButton'

// ============================================================================
// ANIMATED CARD
// ============================================================================

export interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  liftOnHover?: boolean
  scaleOnTap?: boolean
  glowOnHover?: boolean
}

/**
 * AnimatedCard - Card with hover lift and tap effects
 */
export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, liftOnHover = true, scaleOnTap = true, glowOnHover = false, onClick, style }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-2xl bg-surface-glass border border-border',
          className
        )}
        whileHover={
          liftOnHover
            ? {
                y: -4,
                boxShadow: glowOnHover
                  ? '0 0 30px rgba(254, 44, 85, 0.2)'
                  : '0 8px 24px rgba(0, 0, 0, 0.3)',
              }
            : undefined
        }
        whileTap={scaleOnTap ? { scale: 0.98 } : undefined}
        transition={springs.gentle}
        onClick={onClick}
        style={style}
      >
        {children}
      </motion.div>
    )
  }
)
AnimatedCard.displayName = 'AnimatedCard'

// ============================================================================
// LIKE BUTTON
// ============================================================================

export interface LikeButtonProps {
  liked: boolean
  count?: number
  onClick: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * LikeButton - Animated heart/like button with burst effect
 */
export function LikeButton({ liked, count, onClick, className, size = 'md' }: LikeButtonProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <motion.button
      className={cn(
        'flex flex-col items-center gap-1 touch-target',
        className
      )}
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
    >
      <motion.div
        animate={
          liked
            ? {
                scale: [1, 0.8, 1.3, 1],
                transition: { duration: 0.4, times: [0, 0.2, 0.5, 1] },
              }
            : {}
        }
      >
        <svg
          className={cn(sizeClasses[size], liked ? 'text-primary' : 'text-white/60')}
          viewBox="0 0 24 24"
          fill={liked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={liked ? 0 : 2}
        >
          <motion.path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            initial={false}
            animate={
              liked
                ? {
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.3 },
                  }
                : {}
            }
          />
        </svg>
      </motion.div>
      {count !== undefined && (
        <motion.span
          key={count}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-sm font-medium text-white/80"
        >
          {count.toLocaleString()}
        </motion.span>
      )}
    </motion.button>
  )
}

// ============================================================================
// ANIMATED ICON
// ============================================================================

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  animate?: 'pulse' | 'spin' | 'bounce' | 'shake'
  onClick?: () => void
}

/**
 * AnimatedIcon - Wrapper for icons with animation presets
 */
export function AnimatedIcon({
  children,
  className,
  animate,
  onClick,
}: AnimatedIconProps) {
  const animations: Record<string, TargetAndTransition> = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { repeat: Infinity, duration: 2 },
    },
    spin: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 1, ease: 'linear' },
    },
    bounce: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 0.6 },
    },
    shake: {
      x: [0, -3, 3, -3, 3, 0],
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      className={cn('inline-flex', className)}
      animate={animate ? animations[animate] : undefined}
      whileTap={onClick ? { scale: 0.85 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// PRESS FEEDBACK
// ============================================================================

interface PressFeedbackProps {
  children: React.ReactNode
  className?: string
  scale?: number
  opacity?: number
}

/**
 * PressFeedback - Adds tap/press feedback to any element
 */
export function PressFeedback({
  children,
  className,
  scale = 0.96,
  opacity = 0.8,
}: PressFeedbackProps) {
  return (
    <motion.div
      className={className}
      whileTap={{ scale, opacity }}
      transition={springs.snappy}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// HOVER SCALE
// ============================================================================

interface HoverScaleProps {
  children: React.ReactNode
  className?: string
  scale?: number
}

/**
 * HoverScale - Scales element on hover
 */
export function HoverScale({ children, className, scale = 1.05 }: HoverScaleProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={springs.gentle}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// RIPPLE BUTTON
// ============================================================================

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  rippleColor?: string
}

interface Ripple {
  id: number
  x: number
  y: number
}

/**
 * RippleButton - Material Design ripple effect button
 */
export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ children, className, rippleColor = 'rgba(255, 255, 255, 0.3)', onClick }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const newRipple = { id: Date.now(), x, y }
      setRipples((prev) => [...prev, newRipple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)

      onClick?.(e)
    }

    return (
      <motion.button
        ref={ref}
        className={cn('relative overflow-hidden', className)}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.5 }}
            animate={{
              width: 500,
              height: 500,
              x: -250,
              y: -250,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.button>
    )
  }
)
RippleButton.displayName = 'RippleButton'

// ============================================================================
// BADGE ANIMATION
// ============================================================================

interface AnimatedBadgeProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

/**
 * AnimatedBadge - Badge with pop-in animation
 */
export function AnimatedBadge({ children, className, animate = true }: AnimatedBadgeProps) {
  return (
    <motion.span
      className={className}
      initial={animate ? { scale: 0, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={springs.bouncy}
    >
      {children}
    </motion.span>
  )
}

// ============================================================================
// TOGGLE SWITCH
// ============================================================================

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * ToggleSwitch - Animated toggle with spring physics
 */
export function ToggleSwitch({ checked, onChange, size = 'md' }: ToggleSwitchProps) {
  const sizes = {
    sm: { width: 36, height: 20, knob: 14 },
    md: { width: 48, height: 26, knob: 20 },
    lg: { width: 60, height: 32, knob: 26 },
  }

  const s = sizes[size]

  return (
    <motion.button
      className={cn(
        'relative rounded-full cursor-pointer',
        checked ? 'bg-primary' : 'bg-white/20'
      )}
      style={{ width: s.width, height: s.height }}
      onClick={() => onChange(!checked)}
      animate={{ backgroundColor: checked ? '#FE2C55' : 'rgba(255, 255, 255, 0.2)' }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md"
        style={{ width: s.knob, height: s.knob }}
        animate={{
          left: checked ? s.width - s.knob - (s.height - s.knob) / 2 : (s.height - s.knob) / 2,
        }}
        transition={springs.snappy}
      />
    </motion.button>
  )
}

// ============================================================================
// FOCUS RING
// ============================================================================

interface FocusRingProps {
  children: React.ReactNode
  className?: string
  color?: string
}

/**
 * FocusRing - Animated focus ring for accessibility
 */
export function FocusRing({ children, className, color = '#FE2C55' }: FocusRingProps) {
  return (
    <motion.div
      className={cn('relative focus-ring', className)}
      whileFocus={{
        boxShadow: `0 0 0 3px ${color}40`,
      }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  )
}
