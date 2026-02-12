import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['online', 'away', 'offline', 'busy', null],
    },
    border: {
      control: 'boolean',
    },
    src: {
      control: 'text',
    },
    fallback: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    fallback: 'JD',
  },
}

export const WithImage: Story = {
  args: {
    size: 'md',
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    fallback: 'JD',
    alt: 'User avatar',
  },
}

export const WithStatus: Story = {
  args: {
    size: 'md',
    fallback: 'JD',
    status: 'online',
  },
}

export const WithBorder: Story = {
  args: {
    size: 'md',
    fallback: 'JD',
    border: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" fallback="XS" />
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="md" fallback="ON" status="online" />
      <Avatar size="md" fallback="AW" status="away" />
      <Avatar size="md" fallback="OF" status="offline" />
      <Avatar size="md" fallback="BU" status="busy" />
    </div>
  ),
}

export const WithImageAndStatus: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar 
        size="sm" 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" 
        fallback="U1" 
        status="online" 
      />
      <Avatar 
        size="md" 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" 
        fallback="U2" 
        status="busy" 
      />
      <Avatar 
        size="lg" 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" 
        fallback="U3" 
        status="away" 
        border 
      />
      <Avatar 
        size="xl" 
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" 
        fallback="U4" 
        status="offline" 
        border 
      />
    </div>
  ),
}

export const FallbackGradients: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="lg" fallback="Alice Smith" />
      <Avatar size="lg" fallback="Bob Johnson" />
      <Avatar size="lg" fallback="Carol White" />
      <Avatar size="lg" fallback="David Brown" />
      <Avatar size="lg" fallback="Eve Davis" />
      <Avatar size="lg" fallback="Frank Miller" />
    </div>
  ),
}
