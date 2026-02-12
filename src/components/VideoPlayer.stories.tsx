import type { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer, VideoCard } from './VideoPlayer'

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: {
      control: 'boolean',
    },
    loop: {
      control: 'boolean',
    },
    muted: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    autoPlay: false,
    loop: true,
    muted: true,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="w-full max-w-2xl aspect-video">
      <VideoPlayer {...args} className="rounded-lg" />
    </div>
  ),
}

export const Portrait: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    autoPlay: false,
    loop: true,
    muted: true,
  },
  parameters: {
    layout: 'padded',
  },
  render: (args) => (
    <div className="w-full max-w-[360px] aspect-[9/16]">
      <VideoPlayer {...args} className="rounded-lg" />
    </div>
  ),
}

export const VideoCardStory: StoryObj<typeof VideoCard> = {
  name: 'Video Card (TikTok Style)',
  render: () => (
    <div className="w-full max-w-[360px] aspect-[9/16]">
      <VideoCard
        videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        author={{
          name: 'clawtube_official',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=clawtube',
          verified: true,
        }}
        caption="Check out this amazing video! 🎬 #clawtube #video #trending"
        likes={12500}
        comments={342}
        shares={89}
        className="rounded-lg"
      />
    </div>
  ),
}

export const VideoCardGrid: StoryObj<typeof VideoCard> = {
  name: 'Video Card Grid',
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-[9/16]">
          <VideoCard
            videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            author={{
              name: `user_${i}`,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
              verified: i === 1,
            }}
            caption={`Video ${i} - Amazing content! 🔥`}
            likes={1000 * i}
            comments={100 * i}
            shares={10 * i}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  ),
}
