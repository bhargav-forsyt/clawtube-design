import type { Meta, StoryObj } from '@storybook/react'
import { Badge, NotificationBadge, StatusIndicator } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dot: {
      control: 'boolean',
    },
    pulse: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot>New</Badge>
      <Badge dot variant="success">Live</Badge>
      <Badge dot pulse variant="error">Recording</Badge>
    </div>
  ),
}

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-background-tertiary flex items-center justify-center">
          <span className="text-white">💬</span>
        </div>
        <NotificationBadge count={5} />
      </div>
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-background-tertiary flex items-center justify-center">
          <span className="text-white">🔔</span>
        </div>
        <NotificationBadge count={100} />
      </div>
      <div className="relative">
        <div className="h-10 w-10 rounded-full bg-background-tertiary flex items-center justify-center">
          <span className="text-white">📧</span>
        </div>
        <NotificationBadge count={0} showZero />
      </div>
    </div>
  ),
}

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="flex items-center gap-2">
        <StatusIndicator status="online" />
        <span className="text-body text-white">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator status="offline" />
        <span className="text-body text-white">Offline</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator status="away" />
        <span className="text-body text-white">Away</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator status="busy" />
        <span className="text-body text-white">Busy</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusIndicator status="online" pulse />
        <span className="text-body text-white">Live</span>
      </div>
    </div>
  ),
}
