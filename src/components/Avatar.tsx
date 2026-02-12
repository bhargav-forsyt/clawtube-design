import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-14 w-14',
        xl: 'h-20 w-20',
      },
      border: {
        true: 'ring-2 ring-background',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      border: false,
    },
  }
)

const avatarStatusVariants = cva(
  'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
  {
    variants: {
      status: {
        online: 'bg-success',
        away: 'bg-warning',
        offline: 'bg-foreground-tertiary',
        busy: 'bg-error',
      },
      size: {
        xs: 'h-2 w-2',
        sm: 'h-2.5 w-2.5',
        md: 'h-3 w-3',
        lg: 'h-4 w-4',
        xl: 'h-5 w-5',
      },
    },
    defaultVariants: {
      status: 'offline',
      size: 'md',
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  status?: 'online' | 'away' | 'offline' | 'busy'
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, border, status, src, alt, fallback, ...props }, ref) => {
  // Generate gradient from fallback string
  const getGradient = (text?: string) => {
    if (!text) return 'from-primary to-secondary'
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const gradients = [
      'from-primary to-secondary',
      'from-secondary to-primary',
      'from-success to-secondary',
      'from-primary to-success',
      'from-warning to-primary',
      'from-secondary to-warning',
    ]
    return gradients[hash % gradients.length]
  }

  const initials = fallback
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="relative inline-flex">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, border }), className)}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback
          className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-white font-medium',
            size === 'xs' && 'text-[10px]',
            size === 'sm' && 'text-body-sm',
            size === 'md' && 'text-body',
            size === 'lg' && 'text-h3',
            size === 'xl' && 'text-h2',
            getGradient(fallback)
          )}
        >
          {initials || '?'}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
      {status && (
        <span className={cn(avatarStatusVariants({ status, size }))} />
      )}
    </div>
  )
})
Avatar.displayName = AvatarPrimitive.Root.displayName

export { Avatar, avatarVariants }
