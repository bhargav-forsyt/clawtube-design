import type { Meta, StoryObj } from '@storybook/react'
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonVideoCard,
} from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animate: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: 200,
    height: 20,
    variant: 'text',
    animate: true,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <Skeleton variant="text" height={20} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="rounded" height={100} />
    </div>
  ),
}

export const TextLines: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <SkeletonText lines={3} />
      <SkeletonText lines={2} lineHeight={20} />
    </div>
  ),
}

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="w-[320px] space-y-4">
      <SkeletonCard hasImage hasAvatar lines={2} />
      <SkeletonCard hasImage={false} hasAvatar lines={1} />
    </div>
  ),
}

export const VideoCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[200px]">
        <SkeletonVideoCard aspectRatio="portrait" />
      </div>
      <div className="w-[200px]">
        <SkeletonVideoCard aspectRatio="video" />
      </div>
      <div className="w-[200px]">
        <SkeletonVideoCard aspectRatio="square" />
      </div>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="w-[400px] space-y-6 p-4 bg-background-secondary rounded-xl">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <SkeletonAvatar size="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={14} width="40%" />
        </div>
      </div>
      
      {/* Content */}
      <Skeleton variant="rounded" height={200} />
      
      {/* Action Bar */}
      <div className="flex gap-4">
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={40} height={40} />
      </div>
      
      {/* Text */}
      <SkeletonText lines={3} />
    </div>
  ),
}

export const NoAnimation: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <SkeletonText lines={2} animate={false} />
      <Skeleton variant="rounded" height={100} animate={false} />
    </div>
  ),
}
