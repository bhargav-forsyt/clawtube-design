// FeedbackAnimations.tsx - Success and error animations
// Checkmarks, error states, and celebratory animations

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// SUCCESS CHECKMARK
// ============================================================================

interface SuccessCheckmarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  strokeWidth?: number
  onComplete?: () => void
}

/**
 * SuccessCheckmark - Animated checkmark with path drawing
 */
export function SuccessCheckmark({
  className,
  size = 'md',
  color = '#00D084',
  strokeWidth = 3,
  onComplete,
}: SuccessCheckmarkProps) {
  const sizes = {
    sm: 24,
    md: 48,
    lg: 64,
    xl: 96,
  }

  const s = sizes[size]

  return (
    <motion.svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 52 52"
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
    >
      {/* Circle background */}
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      {/* Checkmark */}
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 27 L22 35 L38 17"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

// ============================================================================
// ERROR X
// ============================================================================

interface ErrorXProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  strokeWidth?: number
}

/**
 * ErrorX - Animated X mark for errors
 */
export function ErrorX({
  className,
  size = 'md',
  color = '#FF4D4F',
  strokeWidth = 3,
}: ErrorXProps) {
  const sizes = {
    sm: 24,
    md: 48,
    lg: 64,
    xl: 96,
  }

  const s = sizes[size]

  return (
    <motion.svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 52 52"
      initial="hidden"
      animate="visible"
    >
      {/* Circle */}
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      {/* X lines */}
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        d="M18 18 L34 34"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 0.3 }}
      />
      <motion.path
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        d="M34 18 L18 34"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.25, delay: 0.4 }}
      />
    </motion.svg>
  )
}

// ============================================================================
// SUCCESS POP
// ============================================================================

interface SuccessPopProps {
  children: React.ReactNode
  className?: string
  show?: boolean
}

/**
 * SuccessPop - Container that pops in with bounce effect
 */
export function SuccessPop({ children, className, show = true }: SuccessPopProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={className}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: 1,
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            duration: 0.4,
            times: [0, 0.6, 1],
            ease: 'easeOut',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// ERROR SHAKE
// ============================================================================

interface ErrorShakeProps {
  children: React.ReactNode
  className?: string
  trigger?: boolean
  onShakeComplete?: () => void
}

/**
 * ErrorShake - Shakes element horizontally (error feedback)
 */
export function ErrorShake({
  children,
  className,
  trigger = false,
  onShakeComplete,
}: ErrorShakeProps) {
  return (
    <motion.div
      className={className}
      animate={
        trigger
          ? {
              x: [0, -10, 10, -10, 10, 0],
              transition: { duration: 0.4 },
            }
          : {}
      }
      onAnimationComplete={onShakeComplete}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// TOAST FEEDBACK
// ============================================================================

export type FeedbackType = 'success' | 'error' | 'warning' | 'info'

interface FeedbackToastProps {
  type: FeedbackType
  message: string
  className?: string
  onDismiss?: () => void
  autoDismiss?: boolean
  dismissDelay?: number
}

const feedbackConfig: Record<
  FeedbackType,
  { icon: React.ReactNode; bgColor: string; borderColor: string }
> = {
  success: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: 'bg-success/10',
    borderColor: 'border-success/30',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: 'bg-error/10',
    borderColor: 'border-error/30',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/30',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    bgColor: 'bg-secondary/10',
    borderColor: 'border-secondary/30',
  },
}

/**
 * FeedbackToast - Animated toast with icon and message
 */
export function FeedbackToast({
  type,
  message,
  className,
  onDismiss,
  autoDismiss = true,
  dismissDelay = 4000,
}: FeedbackToastProps) {
  const config = feedbackConfig[type]

  React.useEffect(() => {
    if (autoDismiss && onDismiss) {
      const timer = setTimeout(onDismiss, dismissDelay)
      return () => clearTimeout(timer)
    }
  }, [autoDismiss, dismissDelay, onDismiss])

  return (
    <motion.div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm',
        config.bgColor,
        config.borderColor,
        className
      )}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={springs.bouncy}
    >
      <span
        className={cn(
          'flex-shrink-0',
          type === 'success' && 'text-success',
          type === 'error' && 'text-error',
          type === 'warning' && 'text-warning',
          type === 'info' && 'text-secondary'
        )}
      >
        {config.icon}
      </span>
      <p className="text-sm text-white/90 flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-white/50 hover:text-white/80 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </motion.div>
  )
}

// ============================================================================
// CONFETTI BURST
// ============================================================================

interface ConfettiPieceProps {
  color: string
  index: number
}

function ConfettiPiece({ color, index }: ConfettiPieceProps) {
  const angle = (index / 20) * 360
  const velocity = 100 + Math.random() * 100

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{
        backgroundColor: color,
        left: '50%',
        top: '50%',
      }}
      initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
      animate={{
        x: Math.cos((angle * Math.PI) / 180) * velocity,
        y: Math.sin((angle * Math.PI) / 180) * velocity + 100,
        scale: [1, 1, 0],
        rotate: Math.random() * 720 - 360,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  )
}

interface ConfettiBurstProps {
  trigger: boolean
  className?: string
  colors?: string[]
  onComplete?: () => void
}

/**
 * ConfettiBurst - Celebration animation with confetti particles
 */
export function ConfettiBurst({
  trigger,
  className,
  colors = ['#FE2C55', '#25F4EE', '#FFD700', '#00D084', '#FF6B9D'],
  onComplete,
}: ConfettiBurstProps) {
  const [pieces, setPieces] = React.useState<number[]>([])

  React.useEffect(() => {
    if (trigger) {
      setPieces(Array.from({ length: 30 }, (_, i) => i))
      const timer = setTimeout(() => {
        setPieces([])
        onComplete?.()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [trigger, onComplete])

  return (
    <div className={cn('relative pointer-events-none', className)}>
      <AnimatePresence>
        {pieces.map((i) => (
          <ConfettiPiece
            key={`${trigger}-${i}`}
            color={colors[i % colors.length]}
            index={i}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// COMPLETION RING
// ============================================================================

interface CompletionRingProps {
  progress: number
  className?: string
  size?: number
  strokeWidth?: number
  children?: React.ReactNode
}

/**
 * CompletionRing - Circular progress that fills and celebrates
 */
export function CompletionRing({
  progress,
  className,
  size = 80,
  strokeWidth = 6,
  children,
}: CompletionRingProps) {
  const isComplete = progress >= 100
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isComplete ? '#00D084' : '#FE2C55'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
          transition={springs.smooth}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {isComplete ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={springs.bouncy}
          >
            <SuccessCheckmark size="sm" />
          </motion.div>
        ) : (
          children || (
            <span className="text-lg font-semibold text-white">
              {Math.round(progress)}%
            </span>
          )
        )}
      </div>
    </div>
  )
}

// ============================================================================
// SAVED INDICATOR
// ============================================================================

interface SavedIndicatorProps {
  show: boolean
  className?: string
  text?: string
}

/**
 * SavedIndicator - Brief "Saved!" confirmation
 */
export function SavedIndicator({
  show,
  className,
  text = 'Saved!',
}: SavedIndicatorProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            'inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-success/20 text-success text-xs font-medium',
            className
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={springs.bouncy}
        >
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
