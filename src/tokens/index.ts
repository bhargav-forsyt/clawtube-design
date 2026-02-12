// Design Tokens - Source of truth for ClawTube Design System

export const colors = {
  primary: {
    DEFAULT: '#FE2C55',
    hover: '#FF3B6B',
    pressed: '#E12648',
    glow: 'rgba(254, 44, 85, 0.4)',
  },
  secondary: {
    DEFAULT: '#25F4EE',
    hover: '#4FF7F1',
    pressed: '#1ED8D3',
    glow: 'rgba(37, 244, 238, 0.4)',
  },
  background: {
    primary: '#000000',
    secondary: '#0F0F0F',
    tertiary: '#161823',
    elevated: '#1C1F2E',
  },
  surface: {
    glass: 'rgba(15, 15, 23, 0.85)',
  },
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(255, 255, 255, 0.2)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.65)',
    tertiary: 'rgba(255, 255, 255, 0.45)',
    inverse: '#000000',
  },
  semantic: {
    success: '#00D084',
    warning: '#FFB800',
    error: '#FF4D4F',
    info: '#25F4EE',
  },
} as const

export const typography = {
  family: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
  scale: {
    display: { size: 32, weight: 600, lineHeight: 1.1, letterSpacing: -0.02 },
    h1: { size: 24, weight: 600, lineHeight: 1.2, letterSpacing: -0.02 },
    h2: { size: 20, weight: 600, lineHeight: 1.3, letterSpacing: 0 },
    h3: { size: 18, weight: 600, lineHeight: 1.3, letterSpacing: 0 },
    h4: { size: 16, weight: 600, lineHeight: 1.4, letterSpacing: 0 },
    bodyLarge: { size: 16, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
    body: { size: 14, weight: 400, lineHeight: 1.5, letterSpacing: 0 },
    bodySmall: { size: 13, weight: 400, lineHeight: 1.5, letterSpacing: 0.05 },
    caption: { size: 12, weight: 400, lineHeight: 1.4, letterSpacing: 0.05 },
    overline: { size: 11, weight: 600, lineHeight: 1.3, letterSpacing: 0.1 },
  },
} as const

export const spacing = {
  unit: 4,
  scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96],
} as const

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
  md: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.5)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.6)',
  glow: {
    primary: '0 0 20px rgba(254, 44, 85, 0.4)',
    secondary: '0 0 20px rgba(37, 244, 238, 0.4)',
  },
} as const

export const animation = {
  duration: {
    instant: 0,
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 400,
    slowest: 600,
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    elastic: [0.68, -0.55, 0.265, 1.55],
  },
} as const

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Spring physics configs (raw values for reference)
export const springConfigs = {
  bouncy: { stiffness: 400, damping: 25, mass: 1 },
  smooth: { stiffness: 300, damping: 30, mass: 1 },
  snappy: { stiffness: 500, damping: 35, mass: 1 },
  gentle: { stiffness: 200, damping: 25, mass: 1 },
  stiff: { stiffness: 600, damping: 40, mass: 1 },
} as const

// Export all tokens as a single object
export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animation,
  breakpoints,
  springConfigs,
} as const

export type Tokens = typeof tokens
export type Colors = typeof colors
export type Typography = typeof typography
export type Spacing = typeof spacing
export type Radius = typeof radius
export type Shadows = typeof shadows
export type Animation = typeof animation
export type Breakpoints = typeof breakpoints
export type SpringConfigs = typeof springConfigs
