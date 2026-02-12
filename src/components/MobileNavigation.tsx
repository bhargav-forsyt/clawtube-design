// MobileNavigation.tsx - Bottom navigation bar for mobile apps
// TikTok-style tab bar with center action button

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { springs } from '@/lib/animations'
import { useSafeAreaInsets, touchTargets } from '@/lib/mobile'

// ============================================================================
// TYPES
// ============================================================================

export interface NavItem {
  id: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  label: string
  badge?: number
  onClick?: () => void
  href?: string
}

export interface MobileNavigationProps {
  items: NavItem[]
  activeItem: string
  onItemClick: (id: string) => void
  centerAction?: {
    icon: React.ReactNode
    onClick: () => void
    label: string
  }
  className?: string
  variant?: 'default' | 'glass' | 'solid'
  showLabels?: boolean
  safeArea?: boolean
}

// ============================================================================
// BOTTOM NAVIGATION
// ============================================================================

export function MobileNavigation({
  items,
  activeItem,
  onItemClick,
  centerAction,
  className,
  variant = 'glass',
  showLabels = true,
  safeArea = true,
}: MobileNavigationProps) {
  const insets = useSafeAreaInsets()
  
  // Filter for regular items vs center action
  const leftItems = centerAction ? items.slice(0, Math.ceil(items.length / 2)) : items
  const rightItems = centerAction ? items.slice(Math.ceil(items.length / 2)) : []

  const navClasses = cn(
    'fixed bottom-0 left-0 right-0 z-50',
    'flex items-center justify-around',
    'px-2',
    variant === 'glass' && 'bg-surface-glass/95 backdrop-blur-xl border-t border-border',
    variant === 'solid' && 'bg-bg-secondary border-t border-border',
    variant === 'default' && 'bg-bg-primary',
    className
  )

  return (
    <nav 
      className={navClasses}
      style={{
        paddingBottom: safeArea ? `max(${insets.bottom}px, env(safe-area-inset-bottom))` : undefined,
        height: safeArea ? `calc(${touchTargets.comfortable + 16}px + env(safe-area-inset-bottom))` : undefined,
      }}
    >
      {/* Left items */}
      {leftItems.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
          onClick={() => {
            onItemClick(item.id)
            item.onClick?.()
          }}
          showLabel={showLabels}
        />
      ))}

      {/* Center action */}
      {centerAction && (
        <CenterActionButton
          {...centerAction}
          onClick={centerAction.onClick}
        />
      )}

      {/* Right items */}
      {rightItems.map((item) => (
        <NavButton
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
          onClick={() => {
            onItemClick(item.id)
            item.onClick?.()
          }}
          showLabel={showLabels}
        />
      ))}
    </nav>
  )
}

// ============================================================================
// NAV BUTTON
// ============================================================================

interface NavButtonProps {
  item: NavItem
  isActive: boolean
  onClick: () => void
  showLabel: boolean
}

function NavButton({ item, isActive, onClick, showLabel }: NavButtonProps) {
  const Icon = isActive && item.activeIcon ? item.activeIcon : item.icon

  return (
    <motion.button
      className={cn(
        'relative flex flex-col items-center justify-center',
        'min-w-[64px] px-2 py-1',
        'rounded-xl',
        'transition-colors duration-200',
        'active:scale-95',
        isActive ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
      )}
      style={{
        minHeight: touchTargets.min,
        minWidth: touchTargets.min,
      }}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      transition={springs.snappy}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon */}
      <motion.div
        className="relative"
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        transition={springs.bouncy}
      >
        <span className="block w-6 h-6">{Icon}</span>
        
        {/* Badge */}
        {item.badge !== undefined && item.badge > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white px-1">
            {item.badge > 99 ? '99+' : item.badge}
          </span>
        )}

        {/* Active indicator dot */}
        {isActive && (
          <motion.span
            className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
            layoutId="activeIndicator"
            transition={springs.smooth}
          />
        )}
      </motion.div>

      {/* Label */}
      {showLabel && (
        <span className={cn(
          'mt-1 text-[10px] font-medium leading-none',
          isActive ? 'text-primary' : 'text-text-secondary'
        )}>
          {item.label}
        </span>
      )}
    </motion.button>
  )
}

// ============================================================================
// CENTER ACTION BUTTON
// ============================================================================

interface CenterActionButtonProps {
  icon: React.ReactNode
  onClick: () => void
  label: string
}

function CenterActionButton({ icon, onClick, label }: CenterActionButtonProps) {
  return (
    <motion.button
      className={cn(
        'relative flex items-center justify-center',
        '-mt-6',
        'w-14 h-14',
        'rounded-2xl',
        'bg-gradient-to-br from-primary to-primary-hover',
        'text-white',
        'shadow-lg shadow-primary/30',
        'border-4 border-bg-primary'
      )}
      style={{
        minHeight: touchTargets.comfortable,
        minWidth: touchTargets.comfortable,
      }}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      transition={springs.bouncy}
      aria-label={label}
    >
      <span className="w-7 h-7">{icon}</span>
    </motion.button>
  )
}

// ============================================================================
// MOBILE HEADER
// ============================================================================

export interface MobileHeaderProps {
  title?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
  sticky?: boolean
  safeArea?: boolean
  variant?: 'default' | 'glass' | 'transparent'
}

export function MobileHeader({
  title,
  left,
  right,
  className,
  sticky = true,
  safeArea = true,
  variant = 'glass',
}: MobileHeaderProps) {
  const insets = useSafeAreaInsets()

  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'px-4 py-3',
        'z-40',
        sticky && 'sticky top-0',
        variant === 'glass' && 'bg-surface-glass/80 backdrop-blur-xl border-b border-border',
        variant === 'default' && 'bg-bg-secondary',
        variant === 'transparent' && 'bg-transparent',
        className
      )}
      style={{
        paddingTop: safeArea ? `max(${insets.top}px, env(safe-area-inset-top), 12px)` : undefined,
      }}
    >
      {/* Left slot */}
      <div className="flex items-center gap-2 min-w-[44px]">
        {left}
      </div>

      {/* Title */}
      <div className="flex-1 flex items-center justify-center px-4">
        {typeof title === 'string' ? (
          <h1 className="text-lg font-semibold text-text-primary truncate">{title}</h1>
        ) : (
          title
        )}
      </div>

      {/* Right slot */}
      <div className="flex items-center justify-end gap-2 min-w-[44px]">
        {right}
      </div>
    </header>
  )
}

// ============================================================================
// MOBILE LAYOUT
// ============================================================================

export interface MobileLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  navigation?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function MobileLayout({
  children,
  header,
  navigation,
  className,
  contentClassName,
}: MobileLayoutProps) {
  return (
    <div className={cn('flex flex-col min-h-screen bg-bg-primary', className)}>
      {/* Header */}
      {header}

      {/* Main content */}
      <main
        className={cn(
          'flex-1 overflow-y-auto',
          'overscroll-behavior-y-contain',
          '-webkit-overflow-scrolling-touch',
          contentClassName
        )}
        style={{
          paddingBottom: navigation ? 'calc(64px + env(safe-area-inset-bottom))' : undefined,
        }}
      >
        {children}
      </main>

      {/* Navigation */}
      {navigation}
    </div>
  )
}

// ============================================================================
// TAB BAR (Alternative to bottom nav)
// ============================================================================

export interface TabBarProps {
  tabs: Array<{
    id: string
    label: string
    count?: number
  }>
  activeTab: string
  onChange: (id: string) => void
  className?: string
}

export function TabBar({ tabs, activeTab, onChange, className }: TabBarProps) {
  return (
    <div className={cn('flex border-b border-border', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'relative flex-1 flex items-center justify-center gap-2',
            'py-3 px-4',
            'text-sm font-medium',
            'transition-colors',
            activeTab === tab.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
          )}
          style={{
            minHeight: touchTargets.min,
          }}
          onClick={() => onChange(tab.id)}
        >
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span className="px-1.5 py-0.5 text-xs rounded-full bg-bg-tertiary text-text-secondary">
              {tab.count}
            </span>
          )}
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              layoutId="tabIndicator"
              transition={springs.snappy}
            />
          )}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// SIDE DRAWER
// ============================================================================

export interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: 'left' | 'right'
  className?: string
}

export function SideDrawer({
  isOpen,
  onClose,
  children,
  side = 'left',
  className,
}: SideDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <motion.div
        className={cn(
          'fixed top-0 bottom-0 z-50',
          'w-[280px] max-w-[80vw]',
          'bg-bg-secondary',
          'overflow-y-auto',
          side === 'left' ? 'left-0' : 'right-0',
          className
        )}
        initial={{ x: side === 'left' ? '-100%' : '100%' }}
        animate={{ x: isOpen ? 0 : side === 'left' ? '-100%' : '100%' }}
        exit={{ x: side === 'left' ? '-100%' : '100%' }}
        transition={springs.stiff}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {children}
      </motion.div>
    </>
  )
}

// ============================================================================
// FLOATING ACTION BUTTON
// ============================================================================

export interface FloatingActionButtonProps {
  icon: React.ReactNode
  onClick: () => void
  label: string
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  variant?: 'primary' | 'secondary' | 'glass'
  className?: string
  safeArea?: boolean
}

export function FloatingActionButton({
  icon,
  onClick,
  label,
  position = 'bottom-right',
  variant = 'primary',
  className,
  safeArea = true,
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'right-4 bottom-4',
    'bottom-left': 'left-4 bottom-4',
    'bottom-center': 'left-1/2 -translate-x-1/2 bottom-4',
  }

  const variantClasses = {
    primary: 'bg-primary text-white shadow-lg shadow-primary/30',
    secondary: 'bg-secondary text-black shadow-lg shadow-secondary/30',
    glass: 'glass text-text-primary border border-border',
  }

  return (
    <motion.button
      className={cn(
        'fixed z-40',
        'flex items-center justify-center',
        'w-14 h-14 rounded-full',
        variantClasses[variant],
        positionClasses[position],
        className
      )}
      style={{
        marginBottom: safeArea ? 'env(safe-area-inset-bottom)' : undefined,
        minHeight: touchTargets.comfortable,
        minWidth: touchTargets.comfortable,
      }}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      transition={springs.bouncy}
      aria-label={label}
    >
      <span className="w-6 h-6">{icon}</span>
    </motion.button>
  )
}

export default MobileNavigation
