import type { Meta, StoryObj } from '@storybook/react'
import { Search, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Input } from './Input'
import { Button } from './Button'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'underline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Enter text...',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Search...',
    leftIcon: <Search className="h-4 w-4" />,
  },
}

export const Glass: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    placeholder: 'Glass input style...',
  },
}

export const Underline: Story = {
  args: {
    variant: 'underline',
    size: 'md',
    placeholder: 'Underline style...',
  },
}

export const Error: Story = {
  args: {
    variant: 'default',
    size: 'md',
    placeholder: 'Error state...',
    error: true,
  },
}

export const Password: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        rightElement={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-foreground-tertiary hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
    )
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input variant="default" placeholder="Default input" />
      <Input variant="glass" placeholder="Glass input" />
      <Input variant="underline" placeholder="Underline input" />
      <Input variant="default" placeholder="With left icon" leftIcon={<Search className="h-4 w-4" />} />
      <Input variant="default" placeholder="Error state" error />
      <div className="flex gap-2">
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
      </div>
    </div>
  ),
}
