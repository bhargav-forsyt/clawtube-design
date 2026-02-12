import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/animations'

const inputVariants = cva(
  'flex w-full bg-background-tertiary text-foreground placeholder:text-foreground-tertiary transition-all duration-fast focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border border-transparent focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
        glass: 'glass border border-border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20',
        underline: 'border-b border-border rounded-none bg-transparent px-0 focus-visible:border-primary',
      },
      size: {
        sm: 'h-9 px-3 text-body-sm rounded-md',
        md: 'h-11 px-4 text-body rounded-lg',
        lg: 'h-13 px-4 text-body-lg rounded-lg',
      },
      error: {
        true: 'border-error focus-visible:border-error focus-visible:ring-error/20',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      error: false,
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, leftIcon, rightElement, ...props }, ref) => {
    return (
      <motion.div
        className="relative flex items-center w-full"
        whileFocus={{ scale: 1.01 }}
        transition={springs.gentle}
      >
        {leftIcon && (
          <div className="absolute left-3 text-foreground-tertiary pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants({ variant, size, error }),
            leftIcon && 'pl-10',
            rightElement && 'pr-10',
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3">
            {rightElement}
          </div>
        )}
      </motion.div>
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
