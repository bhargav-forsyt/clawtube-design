// LoadingAnimations.tsx - Loading states and skeletons with animations
// TikTok-inspired loading patterns with shimmer, pulse, and skeleton effects

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '@/lib/animations'
import { cn } from '@/lib/utils'

// ============================================================================
// SHIMMER SKELETON
// ============================================================================

interface ShimmerSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  borderRadius?: number
}

/**
 * ShimmerSkeleton - Skeleton with animated shimmer effect
 */
export function ShimmerSkeleton({
  className,
  width = '100%',
  height = 16,
  borderRadius = 8,
}: ShimmerSkeletonProps) {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      style={{ width, height, borderRadius }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(90deg, #1C1F2E 0%, #2A2E42 50%, #1C1F2E 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['200% 0%', '-200% 0%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  )
}

// ============================================================================
// VIDEO CARD SKELETON
// ============================================================================

interface VideoCardSkeletonProps {
  className?: string
}

/**
 * VideoCardSkeleton - Skeleton for video cards (TikTok-style)
 */
export function VideoCardSkeleton({ className }: VideoCardSkeletonProps) {
  return (
    <motion.div
      className={cn('rounded-2xl overflow-hidden bg-surface-glass', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.smooth}
    >
      {/* Video thumbnail placeholder */}
      <div className="aspect-[9/16] relative overflow-hidden">
        <ShimmerSkeleton width="100%" height="100%" borderRadius={0} />
        
        {/* Play button placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full bg-white/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
      
      {/* Info section */}
      <div className="p-3 space-y-2">
        <ShimmerSkeleton width="80%" height={16} borderRadius={4} />
        <div className="flex items-center gap-2">
          <ShimmerSkeleton width={24} height={24} borderRadius={12} />
          <ShimmerSkeleton width="50%" height={12} borderRadius={4} />
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// FEED SKELETON
// ============================================================================

interface FeedSkeletonProps {
  count?: number
  className?: string
  columns?: number
}

/**
 * FeedSkeleton - Grid of video card skeletons
 */
export function FeedSkeleton({ count = 6, className, columns = 2 }: FeedSkeletonProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: i * 0.05 }}
        >
          <VideoCardSkeleton />
        </motion.div>
      ))}
    </div>
  )
}

// ============================================================================
// SPINNER
// ============================================================================

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

/**
 * Spinner - Rotating spinner with brand colors
 */
export function Spinner({ className, size = 'md', color = '#FE2C55' }: SpinnerProps) {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  }

  const s = sizes[size]

  return (
    <motion.svg
      className={className}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="30 60"
        style={{ color }}
      />
    </motion.svg>
  )
}

// ============================================================================
// BOUNCING DOTS
// ============================================================================

interface BouncingDotsProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

/**
 * BouncingDots - Three dots bouncing animation
 */
export function BouncingDots({ className, size = 'md', color = '#FE2C55' }: BouncingDotsProps) {
  const sizes = {
    sm: { dot: 6, gap: 4 },
    md: { dot: 8, gap: 6 },
    lg: { dot: 12, gap: 8 },
  }

  const s = sizes[size]

  return (
    <div className={cn('flex items-center', className)} style={{ gap: s.gap }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: s.dot,
            height: s.dot,
            backgroundColor: color,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// PULSING DOT
// ============================================================================

interface PulsingDotProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

/**
 * PulsingDot - Single pulsing dot for live indicators
 */
export function PulsingDot({ className, size = 'md', color = '#FE2C55' }: PulsingDotProps) {
  const sizes = {
    sm: 6,
    md: 8,
    lg: 12,
  }

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className="rounded-full absolute inset-0"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div
        className="rounded-full relative"
        style={{
          width: sizes[size],
          height: sizes[size],
          backgroundColor: color,
        }}
      />
    </div>
  )
}

// ============================================================================
// PROGRESS BAR
// ============================================================================

interface ProgressBarProps {
  progress: number
  className?: string
  height?: number
  color?: string
  showLabel?: boolean
}

/**
 * ProgressBar - Animated progress bar with percentage
 */
export function ProgressBar({
  progress,
  className,
  height = 4,
  color = '#FE2C55',
  showLabel = false,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={cn('w-full', className)}>
      <div
        className="w-full bg-white/10 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={springs.smooth}
        />
      </div>
      {showLabel && (
        <motion.span
          className="text-sm text-white/60 mt-1 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Math.round(clampedProgress)}%
        </motion.span>
      )}
    </div>
  )
}

// ============================================================================
// CIRCULAR PROGRESS
// ============================================================================

interface CircularProgressProps {
  progress: number
  className?: string
  size?: number
  strokeWidth?: number
  color?: string
  showLabel?: boolean
}

/**
 * CircularProgress - Animated circular progress indicator
 */
export function CircularProgress({
  progress,
  className,
  size = 48,
  strokeWidth = 4,
  color = '#FE2C55',
  showLabel = false,
}: CircularProgressProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={springs.smooth}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-medium text-white">
          {Math.round(clampedProgress)}%
        </span>
      )}
    </div>
  )
}

// ============================================================================
// LOADING OVERLAY
// ============================================================================

interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl'
  blur?: boolean
}

/**
 * LoadingOverlay - Full overlay with spinner
 */
export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = 'lg',
  blur = true,
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-black/50',
              blur && 'backdrop-blur-sm'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spinner size={spinnerSize} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// SKELETON TEXT
// ============================================================================

interface SkeletonTextProps {
  lines?: number
  className?: string
  lastLineWidth?: string
}

/**
 * SkeletonText - Multiple lines of skeleton text
 */
export function SkeletonText({
  lines = 3,
  className,
  lastLineWidth = '60%',
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerSkeleton
          key={i}
          width={i === lines - 1 ? lastLineWidth : '100%'}
          height={14}
          borderRadius={4}
        />
      ))}
    </div>
  )
}

// ============================================================================
// AVATAR SKELETON
// ============================================================================

interface AvatarSkeletonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * AvatarSkeleton - Circular avatar placeholder
 */
export function AvatarSkeleton({ className, size = 'md' }: AvatarSkeletonProps) {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 80,
  }

  return (
    <ShimmerSkeleton
      className={className}
      width={sizes[size]}
      height={sizes[size]}
      borderRadius={sizes[size] / 2}
    />
  )
}

// ============================================================================
// UPLOAD PROGRESS
// ============================================================================

interface UploadProgressProps {
  progress: number
  fileName?: string
  className?: string
}

/**
 * UploadProgress - Upload indicator with file name and progress
 */
export function UploadProgress({ progress, fileName, className }: UploadProgressProps) {
  return (
    <motion.div
      className={cn(
        'p-4 rounded-2xl bg-surface-glass border border-border',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
        <div className="flex-1 min-w-0">
          {fileName && (
            <p className="text-sm font-medium text-white truncate">{fileName}</p>
          )}
          <p className="text-xs text-white/60">Uploading...</p>
        </div>
        <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      <ProgressBar progress={progress} />
    </motion.div>
  )
}

// ============================================================================
// PULL TO REFRESH
// ============================================================================

interface PullToRefreshProps {
  isRefreshing: boolean
  pullDistance: number
  className?: string
}

/**
 * PullToRefresh - Visual indicator for pull-to-refresh
 */
export function PullToRefresh({
  isRefreshing,
  pullDistance,
  className,
}: PullToRefreshProps) {
  const threshold = 80
  const progress = Math.min(pullDistance / threshold, 1)

  return (
    <motion.div
      className={cn('flex items-center justify-center overflow-hidden', className)}
      animate={{
        height: isRefreshing ? 60 : Math.max(pullDistance * 0.5, 0),
        opacity: pullDistance > 20 ? 1 : 0,
      }}
      transition={springs.gentle}
    >
      {isRefreshing ? (
        <Spinner size="md" />
      ) : (
        <motion.div
          animate={{
            rotate: progress * 180,
            scale: 0.5 + progress * 0.5,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white/60"
          >
            <path d="M12 5v14M5 12l7-7 7 7" />
          </svg>
        </motion.div>
      )}
    </motion.div>
  )
}
