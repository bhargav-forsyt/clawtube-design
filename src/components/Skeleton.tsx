import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animate?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', width, height, animate = true, style, ...props }, ref) => {
    const variantClasses = {
      text: 'rounded-md',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
      rounded: 'rounded-lg',
    }

    const dimensions = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/10',
          variantClasses[variant],
          animate && 'animate-pulse',
          className
        )}
        style={{
          ...dimensions,
          ...style,
        }}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

// Skeleton text lines (common pattern)
interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  lineHeight?: number
  animate?: boolean
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lineHeight = 16, animate = true, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            height={lineHeight}
            width={i === lines - 1 && lines > 1 ? '75%' : '100%'}
            animate={animate}
          />
        ))}
      </div>
    )
  }
)
SkeletonText.displayName = 'SkeletonText'

// Skeleton avatar (common pattern)
interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = 'md', animate = true, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-14 w-14',
      xl: 'h-20 w-20',
    }

    return (
      <Skeleton
        ref={ref}
        variant="circular"
        animate={animate}
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    )
  }
)
SkeletonAvatar.displayName = 'SkeletonAvatar'

// Skeleton card (common pattern)
interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hasImage?: boolean
  hasAvatar?: boolean
  lines?: number
  animate?: boolean
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, hasImage = true, hasAvatar = false, lines = 2, animate = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('rounded-xl bg-background-secondary p-4 space-y-4', className)}
        {...props}
      >
        {hasImage && (
          <Skeleton variant="rounded" height={160} animate={animate} className="w-full" />
        )}
        <div className="flex items-start gap-3">
          {hasAvatar && <SkeletonAvatar size="md" animate={animate} />}
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" height={20} width="60%" animate={animate} />
            <SkeletonText lines={lines} lineHeight={14} animate={animate} />
          </div>
        </div>
      </div>
    )
  }
)
SkeletonCard.displayName = 'SkeletonCard'

// Video card skeleton (TikTok style)
interface SkeletonVideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: 'video' | 'square' | 'portrait'
  animate?: boolean
}

const SkeletonVideoCard = React.forwardRef<HTMLDivElement, SkeletonVideoCardProps>(
  ({ className, aspectRatio = 'portrait', animate = true, ...props }, ref) => {
    const aspectClasses = {
      video: 'aspect-video',
      square: 'aspect-square',
      portrait: 'aspect-[9/16]',
    }

    return (
      <div ref={ref} className={cn('relative overflow-hidden rounded-lg', className)} {...props}>
        <div className={cn('relative w-full', aspectClasses[aspectRatio])}>
          <Skeleton variant="rounded" animate={animate} className="absolute inset-0" />
          {/* Play button placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Skeleton variant="circular" width={48} height={48} animate={animate} />
          </div>
        </div>
        {/* Caption area */}
        <div className="mt-2 flex items-center gap-2 px-1">
          <SkeletonAvatar size="sm" animate={animate} />
          <div className="flex-1">
            <Skeleton variant="text" height={14} width="70%" animate={animate} />
          </div>
        </div>
      </div>
    )
  }
)
SkeletonVideoCard.displayName = 'SkeletonVideoCard'

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonVideoCard,
}
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonCardProps, SkeletonVideoCardProps }
