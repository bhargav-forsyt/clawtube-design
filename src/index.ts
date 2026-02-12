// Main entry point for ClawTube Design System

// Styles
import './styles/globals.css'

// Utils
export { cn } from './lib/utils'
export {
  springs,
  transitions,
  variants,
  microInteractions,
  loadingAnimations,
  feedbackAnimations,
  gestureAnimations,
  pageTransitions,
  createStaggerVariants,
  createSpring,
  durationToSeconds,
  easings,
  getAccessibleTransition,
  getAccessibleVariants,
  defaultSprings,
  defaultTransitions,
  defaultVariants,
} from './lib/animations'
export type { SpringConfig } from './lib/animations'

// Tokens
export {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animation,
  breakpoints,
  springConfigs,
  tokens,
} from './tokens'
export type {
  Tokens,
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Animation,
  Breakpoints,
  SpringConfigs,
} from './tokens'

// Components
export { Button, buttonVariants, type ButtonProps } from './components/Button'
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants, type CardProps } from './components/Card'
export { Input, inputVariants, type InputProps } from './components/Input'
export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  type ModalContentProps,
} from './components/Modal'
export { ToastProvider, ToastViewport, Toast, ToastAction, useToast, type ToastOptions } from './components/Toast'
export { Avatar, avatarVariants, type AvatarProps } from './components/Avatar'
export { Badge, badgeVariants, NotificationBadge, StatusIndicator } from './components/Badge'
export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonVideoCard, type SkeletonProps, type SkeletonTextProps, type SkeletonAvatarProps, type SkeletonCardProps, type SkeletonVideoCardProps } from './components/Skeleton'
export { VideoPlayer, VideoCard, type VideoPlayerProps, type VideoCardProps } from './components/VideoPlayer'

// Animation Components
export {
  PageTransition,
  RouteTransition,
  StaggerPage,
  StaggerItem,
  LayoutTransition,
  LoadingTransition,
  type TransitionType,
  type PageTransitionProps,
  type StaggerItemProps,
} from './components/PageTransition'

export {
  AnimatedButton,
  AnimatedCard,
  LikeButton,
  AnimatedIcon,
  PressFeedback,
  HoverScale,
  RippleButton,
  AnimatedBadge,
  ToggleSwitch,
  FocusRing,
  type AnimatedButtonProps,
  type AnimatedCardProps,
  type LikeButtonProps,
} from './components/MicroInteractions'

export {
  ShimmerSkeleton,
  VideoCardSkeleton,
  FeedSkeleton,
  Spinner,
  BouncingDots,
  PulsingDot,
  ProgressBar,
  CircularProgress,
  LoadingOverlay,
  SkeletonText as LoadingSkeletonText,
  AvatarSkeleton,
  UploadProgress,
  PullToRefresh,
} from './components/LoadingAnimations'

export {
  SuccessCheckmark,
  ErrorX,
  SuccessPop,
  ErrorShake,
  FeedbackToast,
  ConfettiBurst,
  CompletionRing,
  SavedIndicator,
  type FeedbackType,
} from './components/FeedbackAnimations'

export {
  SwipeToDismiss,
  SwipeableCard,
  PullToRefresh as PullToRefreshContainer,
  BottomSheet,
  SwipeableListItem,
  DraggableSlider,
  ScrollSnapCarousel,
  DoubleTapHeart,
  PinchToZoom,
  type SwipeDirection,
  type SwipeableListItemProps,
} from './components/GestureAnimations'

// Mobile Components & Hooks
export {
  MobileNavigation,
  MobileHeader,
  MobileLayout,
  TabBar,
  SideDrawer,
  FloatingActionButton,
  type NavItem,
  type MobileNavigationProps,
  type MobileHeaderProps,
  type MobileLayoutProps,
  type TabBarProps,
  type SideDrawerProps,
  type FloatingActionButtonProps,
} from './components/MobileNavigation'

export {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveStack,
  Show,
  Hide,
  Device,
  AspectRatio,
  SafeArea,
  ViewportDetector,
  ScrollContainer,
  HorizontalScroll,
  type ResponsiveContainerProps,
  type ResponsiveGridProps,
  type ResponsiveStackProps,
  type ShowProps,
  type HideProps,
  type DeviceProps,
  type AspectRatioProps,
  type SafeAreaProps,
  type ViewportDetectorProps,
  type ScrollContainerProps,
  type HorizontalScrollProps,
} from './components/Responsive'

// Mobile Utilities
export {
  useViewportHeight,
  useViewportHeightCSS,
  useSafeAreaInsets,
  useBreakpoint,
  useTouchCapability,
  useKeyboardVisibility,
  useScrollLock,
  useSwipe,
  useDoubleTap,
  usePullToRefresh,
  useLongPress,
  useReducedMotion,
  touchTargets,
  breakpoints as mobileBreakpoints,
  momentumScrollCSS,
  preventBounceCSS,
} from './lib/mobile'
export type {
  SafeAreaInsets,
  Breakpoint,
  BreakpointState,
  SwipeState,
  SwipeCallbacks,
  PullToRefreshState,
} from './lib/mobile'
