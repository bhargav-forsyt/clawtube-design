import type { Meta, StoryObj } from '@storybook/react'
import { Heart, Share2, MessageCircle } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'glass'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Button',
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    children: 'Button',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    leftIcon: <Heart className="h-4 w-4" />,
    children: 'Like',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    loading: true,
    children: 'Loading',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="glass">Glass</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" leftIcon={<Heart className="h-4 w-4" />}>Like</Button>
        <Button variant="primary" rightIcon={<Share2 className="h-4 w-4" />}>Share</Button>
        <Button variant="primary" leftIcon={<MessageCircle className="h-4 w-4" />} rightIcon={<span className="text-caption">12</span>}>Comments</Button>
      </div>
    </div>
  ),
}
