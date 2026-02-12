import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { 
  Home, 
  Search, 
  PlusSquare, 
  MessageCircle, 
  User,
  Menu,
  Bell,
  ArrowLeft,
  MoreVertical 
} from 'lucide-react'
import { 
  MobileNavigation, 
  MobileHeader, 
  MobileLayout, 
  TabBar, 
  FloatingActionButton,
  SideDrawer,
  type NavItem 
} from './MobileNavigation'

const meta: Meta<typeof MobileNavigation> = {
  title: 'Mobile/Navigation',
  component: MobileNavigation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const navItems: NavItem[] = [
  { id: 'home', icon: <Home />, label: 'Home' },
  { id: 'discover', icon: <Search />, label: 'Discover' },
  { id: 'messages', icon: <MessageCircle />, label: 'Messages', badge: 3 },
  { id: 'profile', icon: <User />, label: 'Profile' },
]

// ============================================================================
// BOTTOM NAVIGATION
// ============================================================================

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <div className="p-4 text-text-secondary">
          <p>Active tab: {active}</p>
        </div>
        <MobileNavigation
          items={navItems}
          activeItem={active}
          onItemClick={setActive}
        />
      </div>
    )
  },
}

export const WithCenterAction: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <div className="p-4 text-text-secondary">
          <p>Active tab: {active}</p>
          <p className="mt-2 text-sm">Center action button for primary CTA (e.g., create post)</p>
        </div>
        <MobileNavigation
          items={navItems}
          activeItem={active}
          onItemClick={setActive}
          centerAction={{
            icon: <PlusSquare />,
            onClick: () => alert('Create new!'),
            label: 'Create',
          }}
        />
      </div>
    )
  },
}

export const WithBadges: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    const itemsWithBadges: NavItem[] = [
      { id: 'home', icon: <Home />, label: 'Home' },
      { id: 'discover', icon: <Search />, label: 'Discover' },
      { id: 'messages', icon: <MessageCircle />, label: 'Messages', badge: 99 },
      { id: 'profile', icon: <User />, label: 'Profile', badge: 1 },
    ]
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <MobileNavigation
          items={itemsWithBadges}
          activeItem={active}
          onItemClick={setActive}
        />
      </div>
    )
  },
}

export const NoLabels: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <MobileNavigation
          items={navItems}
          activeItem={active}
          onItemClick={setActive}
          showLabels={false}
        />
      </div>
    )
  },
}

export const SolidVariant: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <MobileNavigation
          items={navItems}
          activeItem={active}
          onItemClick={setActive}
          variant="solid"
        />
      </div>
    )
  },
}

// ============================================================================
// MOBILE HEADER
// ============================================================================

export const HeaderDefault: Story = {
  render: () => (
    <div className="h-[600px] bg-bg-primary">
      <MobileHeader
        title="Home"
        left={
          <button className="p-2 rounded-full hover:bg-white/10">
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
        }
        right={
          <button className="p-2 rounded-full hover:bg-white/10">
            <Bell className="w-5 h-5 text-text-primary" />
          </button>
        }
      />
      <div className="p-4 text-text-secondary">
        <p>Content goes here</p>
      </div>
    </div>
  ),
}

export const HeaderWithBack: Story = {
  render: () => (
    <div className="h-[600px] bg-bg-primary">
      <MobileHeader
        title="Settings"
        left={
          <button className="p-2 rounded-full hover:bg-white/10">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
        }
        right={
          <button className="p-2 rounded-full hover:bg-white/10">
            <MoreVertical className="w-5 h-5 text-text-primary" />
          </button>
        }
      />
      <div className="p-4 text-text-secondary">
        <p>Settings content</p>
      </div>
    </div>
  ),
}

export const HeaderTransparent: Story = {
  render: () => (
    <div className="h-[600px] bg-gradient-to-b from-primary/20 to-bg-primary">
      <MobileHeader
        title="Profile"
        variant="transparent"
        left={
          <button className="p-2 rounded-full bg-black/20 backdrop-blur">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
        }
        right={
          <button className="p-2 rounded-full bg-black/20 backdrop-blur">
            <MoreVertical className="w-5 h-5 text-text-primary" />
          </button>
        }
      />
      <div className="p-4 text-text-secondary">
        <p>Profile content with transparent header</p>
      </div>
    </div>
  ),
}

// ============================================================================
// MOBILE LAYOUT
// ============================================================================

export const FullLayout: Story = {
  render: () => {
    const [active, setActive] = useState('home')
    return (
      <MobileLayout
        className="h-[600px]"
        header={
          <MobileHeader
            title="ClawTube"
            left={
              <button className="p-2 rounded-full hover:bg-white/10">
                <Menu className="w-5 h-5 text-text-primary" />
              </button>
            }
            right={
              <button className="p-2 rounded-full hover:bg-white/10">
                <Bell className="w-5 h-5 text-text-primary" />
              </button>
            }
          />
        }
        navigation={
          <MobileNavigation
            items={navItems}
            activeItem={active}
            onItemClick={setActive}
            centerAction={{
              icon: <PlusSquare />,
              onClick: () => alert('Create!'),
              label: 'Create',
            }}
          />
        }
      >
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-bg-secondary p-4">
              <div className="h-4 w-1/3 bg-white/10 rounded mb-2" />
              <div className="h-3 w-2/3 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </MobileLayout>
    )
  },
}

// ============================================================================
// TAB BAR
// ============================================================================

export const TabBarStory: Story = {
  render: () => {
    const [active, setActive] = useState('for-you')
    return (
      <div className="h-[600px] bg-bg-primary">
        <TabBar
          tabs={[
            { id: 'for-you', label: 'For You', count: 1240 },
            { id: 'following', label: 'Following', count: 42 },
            { id: 'trending', label: 'Trending' },
          ]}
          activeTab={active}
          onChange={setActive}
        />
        <div className="p-4 text-text-secondary">
          <p>Active tab: {active}</p>
        </div>
      </div>
    )
  },
}

// ============================================================================
// FLOATING ACTION BUTTON
// ============================================================================

export const FloatingActionButtonStory: Story = {
  render: () => (
    <div className="h-[600px] bg-bg-primary relative">
      <div className="p-4 text-text-secondary">
        <p>Floating action button in bottom-right corner</p>
      </div>
      <FloatingActionButton
        icon={<PlusSquare />}
        onClick={() => alert('FAB clicked!')}
        label="Add new"
        position="bottom-right"
      />
    </div>
  ),
}

export const FloatingActionButtonCenter: Story = {
  render: () => (
    <div className="h-[600px] bg-bg-primary relative">
      <div className="p-4 text-text-secondary">
        <p>Floating action button centered</p>
      </div>
      <FloatingActionButton
        icon={<PlusSquare />}
        onClick={() => alert('FAB clicked!')}
        label="Add new"
        position="bottom-center"
        variant="secondary"
      />
    </div>
  ),
}

// ============================================================================
// SIDE DRAWER
// ============================================================================

export const SideDrawerStory: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <div className="h-[600px] bg-bg-primary relative">
        <button
          className="m-4 px-4 py-2 bg-primary text-white rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Open Drawer
        </button>
        <SideDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          side="left"
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Menu</h2>
            <nav className="space-y-2">
              {['Home', 'Discover', 'Notifications', 'Messages', 'Profile'].map((item) => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-3 rounded-lg text-text-primary hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </SideDrawer>
      </div>
    )
  },
}

// ============================================================================
// TOUCH TARGET SIZES
// ============================================================================

export const TouchTargetDemo: Story = {
  render: () => (
    <div className="p-4 space-y-6 bg-bg-primary min-h-[600px]">
      <h2 className="text-lg font-semibold text-text-primary">Touch Target Sizes</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button 
            className="w-11 h-11 bg-primary rounded-lg flex items-center justify-center text-xs text-white"
            title="44px - WCAG minimum"
          >
            44
          </button>
          <span className="text-text-secondary text-sm">44px - WCAG / Apple minimum</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-xs text-black"
            title="48px - Google recommended"
          >
            48
          </button>
          <span className="text-text-secondary text-sm">48px - Google Material recommended</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xs text-white"
            title="40px - Compact (avoid)"
          >
            40
          </button>
          <span className="text-text-secondary text-sm">40px - Compact (use sparingly)</span>
        </div>
      </div>
      
      <div className="p-4 bg-bg-secondary rounded-lg">
        <h3 className="text-sm font-medium text-text-primary mb-2">Guidelines</h3>
        <ul className="text-sm text-text-secondary space-y-1 list-disc pl-4">
          <li>Minimum 44x44px for all interactive elements</li>
          <li>48x48px preferred for primary actions</li>
          <li>Spacing between targets: minimum 8px</li>
          <li>All buttons in this system meet WCAG 2.1 requirements</li>
        </ul>
      </div>
    </div>
  ),
}
