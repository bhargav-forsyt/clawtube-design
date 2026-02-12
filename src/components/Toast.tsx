import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/animations'

// Toast Provider
const ToastProvider = ToastPrimitive.Provider

// Toast Viewport
const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

// Toast variants
const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-lg p-4 pr-6 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default: 'bg-background-tertiary border border-border',
        success: 'bg-success-bg border border-success/20',
        error: 'bg-error-bg border border-error/20',
        warning: 'bg-warning-bg border border-warning/20',
        info: 'bg-info-bg border border-secondary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const toastIcons = {
  default: null,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastIconColors = {
  default: 'text-foreground',
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-secondary',
}

// Toast component
interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  closable?: boolean
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = 'default', title, description, closable = true, children, ...props }, ref) => {
  const Icon = toastIcons[variant || 'default']
  const iconColor = toastIconColors[variant || 'default']

  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      asChild
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        transition={springs.bouncy}
        layout
      >
        <div className="flex gap-3 items-start flex-1">
          {Icon && <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', iconColor)} />}
          <div className="flex flex-col gap-1 flex-1">
            {title && (
              <ToastPrimitive.Title className="text-body font-semibold text-foreground">
                {title}
              </ToastPrimitive.Title>
            )}
            {description && (
              <ToastPrimitive.Description className="text-body-sm text-foreground-secondary">
                {description}
              </ToastPrimitive.Description>
            )}
            {children}
          </div>
        </div>
        {closable && (
          <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100 focus:opacity-100 focus:outline-none">
            <X className="h-4 w-4 text-foreground-tertiary" />
          </ToastPrimitive.Close>
        )}
        <ToastPrimitive.Close asChild>
          <div />
        </ToastPrimitive.Close>
      </motion.div>
    </ToastPrimitive.Root>
  )
})
Toast.displayName = ToastPrimitive.Root.displayName

// Toast Action
const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-body-sm font-medium transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

// Hook for using toasts
interface ToastOptions {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

function useToast() {
  const [toasts, setToasts] = React.useState<Array<ToastOptions & { id: string }>>([])

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...options, id }
    setToasts((prev) => [...prev, newToast])
    
    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, options.duration || 5000)

    return id
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toast, dismiss, toasts }
}

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastAction,
  useToast,
}
export type { ToastOptions }
