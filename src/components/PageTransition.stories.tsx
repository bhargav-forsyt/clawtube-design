import type { Meta, StoryObj } from '@storybook/react'
import { motion } from 'framer-motion'
import {
  PageTransition,
  RouteTransition,
  StaggerPage,
  StaggerItem,
  LoadingTransition,
} from './PageTransition'

const meta: Meta<typeof PageTransition> = {
  title: 'Animation/PageTransition',
  component: PageTransition,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof PageTransition>

export const Fade: Story = {
  render: () => (
    <PageTransition transition="fade" className="p-8 bg-surface-glass rounded-2xl">
      <h2 className="text-2xl font-bold text-white">Fade Transition</h2>
      <p className="text-white/60 mt-2">Content fades in smoothly</p>
    </PageTransition>
  ),
}

export const SlideUp: Story = {
  render: () => (
    <PageTransition transition="slideUp" className="p-8 bg-surface-glass rounded-2xl">
      <h2 className="text-2xl font-bold text-white">Slide Up</h2>
      <p className="text-white/60 mt-2">Content slides up from below</p>
    </PageTransition>
  ),
}

export const Scale: Story = {
  render: () => (
    <PageTransition transition="scale" className="p-8 bg-surface-glass rounded-2xl">
      <h2 className="text-2xl font-bold text-white">Scale Transition</h2>
      <p className="text-white/60 mt-2">Content scales in from 95%</p>
    </PageTransition>
  ),
}

export const Stagger: Story = {
  render: () => (
    <StaggerPage className="p-8 bg-surface-glass rounded-2xl space-y-4">
      <StaggerItem>
        <div className="h-16 bg-primary/20 rounded-lg flex items-center px-4">
          <span className="text-white font-medium">Item 1</span>
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="h-16 bg-secondary/20 rounded-lg flex items-center px-4">
          <span className="text-white font-medium">Item 2</span>
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="h-16 bg-white/10 rounded-lg flex items-center px-4">
          <span className="text-white font-medium">Item 3</span>
        </div>
      </StaggerItem>
      <StaggerItem>
        <div className="h-16 bg-primary/20 rounded-lg flex items-center px-4">
          <span className="text-white font-medium">Item 4</span>
        </div>
      </StaggerItem>
    </StaggerPage>
  ),
}

export const Loading: Story = {
  render: () => (
    <LoadingTransition
      isLoading={false}
      fallback={
        <div className="p-8 text-center">
          <motion.div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-white/60 mt-4">Loading...</p>
        </div>
      }
    >
      <div className="p-8 bg-surface-glass rounded-2xl">
        <h2 className="text-xl font-bold text-white">Content Loaded!</h2>
        <p className="text-white/60 mt-2">This is the actual content</p>
      </div>
    </LoadingTransition>
  ),
}
