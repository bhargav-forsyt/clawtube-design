import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold text-caption whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        secondary: 'bg-secondary text-black',
        outline: 'border border-border bg-transparent text-foreground hover:bg-white/5',
        ghost: 'bg-transparent text-foreground hover:bg-white/10',
        success: 'bg-success text-black',
        warning: 'bg-warning text-black',
        error: 'bg-error text-white',
        info: 'bg-info text-black',
      },
      size: {
        sm: 'h-5 px-2 min-w-[20px]',
        md: 'h-6 px-2.5 min-w-[24px]',
        lg: 'h-7 px-3 min-w-[28px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  pulse?: boolean
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, pulse, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-1.5 w-1.5 rounded-full',
              pulse && 'animate-pulse',
              variant === 'default' && 'bg-white',
              variant === 'secondary' && 'bg-black',
              variant === 'success' && 'bg-black',
              variant === 'warning' && 'bg-black',
              variant === 'error' && 'bg-white',
              variant === 'info' && 'bg-black',
              (variant === 'outline' || variant === 'ghost') && 'bg-current'
            )}
          />
        )}
        {children}
      </span>
    )
  }
)
Badge.displayName = 'Badge'

// Notification badge (overlay on icons/avatars)
interface NotificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count?: number
  max?: number
  showZero?: boolean
  size?: 'sm' | 'md'
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ className, count = 0, max = 99, showZero = false, size = 'md', position = 'top-right', ...props }, ref) => {
    const displayCount = count > max ? `${max}+` : count
    const showBadge = count > 0 || showZero

    if (!showBadge) return null

    const positionClasses = {
      'top-right': '-top-1 -right-1',
      'top-left': '-top-1 -left-1',
      'bottom-right': '-bottom-1 -right-1',
      'bottom-left': '-bottom-1 -left-1',
    }

    const sizeClasses = {
      sm: 'h-4 min-w-[16px] px-1 text-[10px]',
      md: 'h-5 min-w-[20px] px-1.5 text-caption',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'absolute flex items-center justify-center rounded-full bg-error text-white font-semibold',
          'ring-2 ring-background-primary',
          positionClasses[position],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {displayCount}
      </span>
    )
  }
)
NotificationBadge.displayName = 'NotificationBadge'

// Status indicator dot
interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'online' | 'offline' | 'away' | 'busy'
  size?: 'sm' | 'md' | 'lg'
  pulse?: boolean
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, status, size = 'md', pulse = false, ...props }, ref) => {
    const statusColors = {
      online: 'bg-success',
      offline: 'bg-text-tertiary',
      away: 'bg-warning',
      busy: 'bg-error',
    }

    const sizeClasses = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-block rounded-full ring-2 ring-background-primary',
          statusColors[status],
          sizeClasses[size],
          pulse && 'animate-pulse',
          className
        )}
        {...props}
      />
    )
  }
)
StatusIndicator.displayName = 'StatusIndicator'

export { Badge, badgeVariants, NotificationBadge, StatusIndicator }
