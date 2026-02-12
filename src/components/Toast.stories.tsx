import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ToastProvider, ToastViewport, Toast, ToastAction, useToast } from './Toast'
import { Button } from './Button'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    closable: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component for toast stories
const ToastDemo = ({ variant = 'default' }: { variant?: 'default' | 'success' | 'error' | 'warning' | 'info' }) => {
  const [open, setOpen] = useState(false)
  
  return (
    <ToastProvider>
      <div className="p-8">
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
      </div>
      <Toast 
        open={open} 
        onOpenChange={setOpen}
        variant={variant}
        title="Toast Title"
        description="This is a toast notification message."
      />
      <ToastViewport />
    </ToastProvider>
  )
}

export const Default: Story = {
  render: () => <ToastDemo variant="default" />,
}

export const Success: Story = {
  render: () => <ToastDemo variant="success" />,
}

export const Error: Story = {
  render: () => <ToastDemo variant="error" />,
}

export const Warning: Story = {
  render: () => <ToastDemo variant="warning" />,
}

export const Info: Story = {
  render: () => <ToastDemo variant="info" />,
}

export const AllVariants: Story = {
  render: () => {
    const [toasts, setToasts] = useState<Array<{ id: number; variant: 'default' | 'success' | 'error' | 'warning' | 'info' }>>([])
    let idCounter = 0

    const addToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
      const newToast = { id: idCounter++, variant }
      setToasts(prev => [...prev, newToast])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id))
      }, 5000)
    }

    return (
      <ToastProvider>
        <div className="p-8 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => addToast('default')}>Default</Button>
            <Button variant="secondary" onClick={() => addToast('success')}>Success</Button>
            <Button variant="ghost" onClick={() => addToast('error')}>Error</Button>
            <Button variant="glass" onClick={() => addToast('warning')}>Warning</Button>
            <Button onClick={() => addToast('info')}>Info</Button>
          </div>
        </div>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            open={true}
            variant={toast.variant}
            title={`${toast.variant.charAt(0).toUpperCase() + toast.variant.slice(1)} Toast`}
            description="This is a sample notification message."
          />
        ))}
        <ToastViewport />
      </ToastProvider>
    )
  },
}

export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    
    return (
      <ToastProvider>
        <div className="p-8">
          <Button onClick={() => setOpen(true)}>Show Toast with Action</Button>
        </div>
        <Toast 
          open={open} 
          onOpenChange={setOpen}
          variant="default"
          title="Update Available"
          description="A new version is ready to install."
        >
          <ToastAction altText="Update now" onClick={() => alert('Updating...')}>
            Update
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    )
  },
}
