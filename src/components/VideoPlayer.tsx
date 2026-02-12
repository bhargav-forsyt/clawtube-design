import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { springs, transitions } from '@/lib/animations'

interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onVideoTimeUpdate?: (currentTime: number, duration: number) => void
}

const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    { className, src, poster, autoPlay = false, loop = true, muted = true, onPlay, onPause, onEnded, onVideoTimeUpdate, ...props },
    ref
  ) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = React.useState(autoPlay)
    const [isMuted, setIsMuted] = React.useState(muted)
    const [isFullscreen, setIsFullscreen] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [showControls, setShowControls] = React.useState(true)
    const controlsTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    React.useImperativeHandle(ref, () => videoRef.current!)

    const handlePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
          onPause?.()
        } else {
          videoRef.current.play()
          onPlay?.()
        }
        setIsPlaying(!isPlaying)
      }
    }

    const handleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }

    const handleFullscreen = () => {
      const container = videoRef.current?.parentElement
      if (!container) return

      if (!document.fullscreenElement) {
        container.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }

    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current
        setProgress(duration ? (currentTime / duration) * 100 : 0)
        onVideoTimeUpdate?.(currentTime, duration)
      }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration
        videoRef.current.currentTime = time
        setProgress(parseFloat(e.target.value))
      }
    }

    const showControlsTemporarily = () => {
      setShowControls(true)
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    React.useEffect(() => {
      return () => {
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current)
        }
      }
    }, [])

    return (
      <div
        className={cn(
          'relative w-full h-full bg-black overflow-hidden group',
          className
        )}
        onClick={showControlsTemporarily}
        onMouseMove={showControlsTemporarily}
        {...props}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          onEnded={onEnded}
        />

        {/* Center Play Button */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={springs.bouncy}
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={transitions.fade}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            >
              {/* Progress Bar */}
              <div className="relative mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-1 opacity-0 cursor-pointer z-10"
                />
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    style={{ width: `${progress}%` }}
                    layoutId="progress"
                  />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={handleMute}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5 text-white" />
                  ) : (
                    <Maximize className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
VideoPlayer.displayName = 'VideoPlayer'

// TikTok-style video card with side actions
interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  videoSrc?: string
  poster?: string
  author?: {
    name: string
    avatar: string
    verified?: boolean
  }
  caption?: string
  likes?: number
  comments?: number
  shares?: number
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
}

const VideoCard = React.forwardRef<HTMLDivElement, VideoCardProps>(
  (
    {
      className,
      videoSrc,
      poster,
      author,
      caption,
      likes = 0,
      comments = 0,
      shares = 0,
      onLike,
      onComment,
      onShare,
      ...props
    },
    ref
  ) => {
    const [liked, setLiked] = React.useState(false)
    const [likeCount, setLikeCount] = React.useState(likes)

    const handleLike = () => {
      setLiked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      onLike?.()
    }

    const formatCount = (count: number) => {
      if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
      if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
      return count.toString()
    }

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full bg-black overflow-hidden', className)}
        {...props}
      >
        {/* Video Player */}
        <VideoPlayer src={videoSrc} poster={poster} className="absolute inset-0" />

        {/* Right Side Actions */}
        <div className="absolute right-2 bottom-24 flex flex-col items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex flex-col items-center gap-1"
          >
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-colors',
                liked && 'bg-primary/20'
              )}
            >
              <Heart
                className={cn('h-6 w-6 transition-colors', liked ? 'fill-primary text-primary' : 'text-white')}
              />
            </div>
            <span className="text-caption text-white font-medium">{formatCount(likeCount)}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onComment}
            className="flex flex-col items-center gap-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-caption text-white font-medium">{formatCount(comments)}</span>
          </motion.button>

          <motion.button whileTap={{ scale: 0.9 }} onClick={onShare} className="flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-caption text-white font-medium">{formatCount(shares)}</span>
          </motion.button>

          <motion.button whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm">
              <MoreHorizontal className="h-6 w-6 text-white" />
            </div>
          </motion.button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 right-20">
          {author && (
            <div className="flex items-center gap-2 mb-2">
              <img src={author.avatar} alt={author.name} className="h-8 w-8 rounded-full object-cover" />
              <span className="text-body text-white font-semibold">@{author.name}</span>
              {author.verified && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-secondary">
                  <svg className="h-3 w-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              )}
            </div>
          )}
          {caption && <p className="text-body text-white/90 line-clamp-2">{caption}</p>}
        </div>
      </div>
    )
  }
)
VideoCard.displayName = 'VideoCard'

export { VideoPlayer, VideoCard }
export type { VideoPlayerProps, VideoCardProps }
