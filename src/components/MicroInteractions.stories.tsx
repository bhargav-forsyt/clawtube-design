import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import {
  AnimatedButton,
  AnimatedCard,
  LikeButton,
  AnimatedIcon,
  PressFeedback,
  HoverScale,
  RippleButton,
  AnimatedBadge,
  ToggleSwitch,
} from './MicroInteractions'

const meta: Meta = {
  title: 'Animation/MicroInteractions',
  parameters: {
    layout: 'padded',
  },
}

export default meta

export const ButtonVariants = () => {
  const variants: Array<{ variant: 'scale' | 'press' | 'lift' | 'glow'; label: string }> = [
    { variant: 'scale', label: 'Scale on Hover' },
    { variant: 'press', label: 'Press Effect' },
    { variant: 'lift', label: 'Lift on Hover' },
    { variant: 'glow', label: 'Glow on Hover' },
  ]

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map(({ variant, label }) => (
        <AnimatedButton
          key={variant}
          variant={variant}
          className="px-6 py-3 bg-primary text-white rounded-full font-medium"
        >
          {label}
        </AnimatedButton>
      ))}
    </div>
  )
}

export const CardInteractions = () => (
  <div className="grid grid-cols-2 gap-4">
    <AnimatedCard className="p-6">
      <h3 className="text-lg font-semibold text-white">Lift on Hover</h3>
      <p className="text-white/60 mt-2">Hover to see the lift effect</p>
    </AnimatedCard>
    <AnimatedCard className="p-6" glowOnHover>
      <h3 className="text-lg font-semibold text-white">Glow on Hover</h3>
      <p className="text-white/60 mt-2">Hover to see the glow effect</p>
    </AnimatedCard>
  </div>
)

export const LikeButtonDemo = () => {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(1234)

  const handleLike = () => {
    setLiked(!liked)
    setCount(liked ? count - 1 : count + 1)
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-center gap-8">
        <LikeButton liked={liked} count={count} onClick={handleLike} size="sm" />
        <LikeButton liked={liked} count={count} onClick={handleLike} size="md" />
        <LikeButton liked={liked} count={count} onClick={handleLike} size="lg" />
      </div>
      <p className="text-white/60">Click to toggle like state</p>
    </div>
  )
}

export const AnimatedIcons = () => (
  <div className="flex items-center gap-8 p-8">
    <AnimatedIcon animate="pulse" className="text-primary">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </AnimatedIcon>
    <AnimatedIcon animate="spin" className="text-secondary">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </AnimatedIcon>
    <AnimatedIcon animate="bounce" className="text-success">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5z" />
      </svg>
    </AnimatedIcon>
  </div>
)

export const PressFeedbackDemo = () => (
  <div className="flex flex-wrap gap-4 p-8">
    <PressFeedback className="px-6 py-3 bg-surface-glass rounded-xl cursor-pointer">
      <span className="text-white">Press Me</span>
    </PressFeedback>
    <PressFeedback className="px-6 py-3 bg-primary rounded-xl cursor-pointer" scale={0.92}>
      <span className="text-white">Strong Press</span>
    </PressFeedback>
  </div>
)

export const HoverScaleDemo = () => (
  <div className="flex flex-wrap gap-4 p-8">
    <HoverScale className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center cursor-pointer">
      <span className="text-white font-bold">1.05x</span>
    </HoverScale>
    <HoverScale scale={1.1} className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center cursor-pointer">
      <span className="text-black font-bold">1.1x</span>
    </HoverScale>
    <HoverScale scale={1.2} className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center cursor-pointer">
      <span className="text-white font-bold">1.2x</span>
    </HoverScale>
  </div>
)

export const RippleButtonDemo = () => (
  <div className="flex flex-wrap gap-4 p-8">
    <RippleButton className="px-8 py-4 bg-primary text-white rounded-full font-medium overflow-hidden">
      Click for Ripple
    </RippleButton>
    <RippleButton
      className="px-8 py-4 bg-surface-glass text-white rounded-full font-medium overflow-hidden border border-border"
      rippleColor="rgba(254, 44, 85, 0.3)"
    >
      Custom Ripple
    </RippleButton>
  </div>
)

export const AnimatedBadgeDemo = () => {
  const [count, setCount] = useState(5)

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          className="w-10 h-10 rounded-full bg-surface-glass text-white flex items-center justify-center"
        >
          -
        </button>
        <AnimatedBadge className="min-w-[2rem] h-8 px-3 bg-primary text-white rounded-full flex items-center justify-center font-bold">
          {count}
        </AnimatedBadge>
        <button
          onClick={() => setCount(count + 1)}
          className="w-10 h-10 rounded-full bg-surface-glass text-white flex items-center justify-center"
        >
          +
        </button>
      </div>
      <p className="text-white/60">Change count to see badge animation</p>
    </div>
  )
}

export const ToggleSwitchDemo = () => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="flex items-center gap-8">
        <ToggleSwitch size="sm" checked={checked} onChange={setChecked} />
        <ToggleSwitch size="md" checked={checked} onChange={setChecked} />
        <ToggleSwitch size="lg" checked={checked} onChange={setChecked} />
      </div>
      <p className="text-white/60">Click to toggle</p>
    </div>
  )
}
