'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import Image from 'next/image'
import { heroIntro, heroParallax } from '@/lib/animations'

/**
 * Hero Component
 * 
 * @param {string} title - Main hero title
 * @param {string} subtitle - Hero subtitle/description
 * @param {"image"|"video"|"carousel"} mediaType - Type of background media
 * @param {string|Array} mediaSrc - Path to media asset or array of media objects {type:'video'|'image', src:'', poster:''}
 * @param {Array<{text: string, href: string, variant?: string}>} ctas - Array of call-to-action buttons
 * @param {string} kicker - Small text below subtitle
 */
export default function Hero({ 
  title = "Welcome",
  subtitle = "",
  mediaType = "image",
  mediaSrc = "",
  ctas = [],
  kicker = ""
}) {
  const [videoReady, setVideoReady] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctasRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return

    // Wait for media to be ready (especially for video)
    const initAnimations = () => {
      // Hero intro animation (title, subtitle, CTAs)
      heroIntro(heroRef.current)

      // Parallax effect on media
      if (mediaRef.current && heroRef.current) {
        heroParallax(mediaRef.current, heroRef.current)
      }
    }

    // If video, wait for it to be ready; otherwise animate immediately
    if (videoReady || mediaType !== 'video') {
      initAnimations()
    } else {
      // Fallback: animate after a short delay if video never becomes ready
      const timeout = setTimeout(initAnimations, 1000)
      return () => clearTimeout(timeout)
    }
  }, [videoReady, mediaType, subtitle, ctas.length])

  // Function to handle slide transitions (for carousel/slider functionality)
  const handleSlideTransition = (direction = 'next') => {
    if (!contentRef.current) return

    const tl = gsap.timeline()

    // Fade out current content
    tl.to(contentRef.current, {
      opacity: 0,
      x: direction === 'next' ? -50 : 50,
      duration: 0.5,
      ease: 'power2.in'
    })

    // TODO: Update content here (title, subtitle, media, etc.)
    // This is where you'd update the props/state with new slide data

    // Fade in new content
    tl.to(contentRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
  }

  return (
    <section 
      ref={heroRef}
      className="hero-media relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      data-type={mediaType}
    >
      {/* Background Media */}
      <div 
        ref={mediaRef}
        className={`absolute inset-0 w-full h-full grayscale overflow-hidden ${videoReady ? 'hero-media--ready' : ''}`}
      >
        {/* Handle array of media (Swiper carousel) */}
        {Array.isArray(mediaSrc) && mediaSrc.length > 0 ? (
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="absolute inset-0 w-full h-full"
          >
            {mediaSrc.map((media, index) => (
              <SwiperSlide key={index} className="absolute inset-0">
                {media.type === 'video' ? (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    <video
                      className={`w-full h-full object-contain sm:object-cover min-w-full min-h-full transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        objectPosition: 'center center',
                      }}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      poster={media.poster || '/assets/hero-video-frame.jpg'}
                      onCanPlayThrough={() => {
                        setVideoReady(true)
                        setImageLoaded(true)
                      }}
                      onError={() => setAutoplayBlocked(true)}
                    >
                      <source src={media.src || '/assets/vid.mp4'} type="video/mp4" />
                    </video>
                    {/* Fallback to poster if video fails */}
                    {autoplayBlocked && (
                      <Image
                        src={media.poster || '/assets/hero-video-frame.jpg'}
                        alt=""
                        fill
                        className="object-contain sm:object-cover bw-image"
                        unoptimized
                        onLoad={() => setImageLoaded(true)}
                      />
                    )}
                  </div>
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                    <Image
                      src={media.src || '/assets/hero-1.jpg'}
                      alt=""
                      fill
                      className={`object-contain sm:object-cover min-w-full min-h-full bw-image transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      priority={index === 0}
                      unoptimized
                      onLoad={() => setImageLoaded(true)}
                      style={{
                        objectPosition: 'center center',
                      }}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : mediaType === 'video' ? (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              className={`w-full h-full object-contain sm:object-cover min-w-full min-h-full transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
              style={{
                objectPosition: 'center center',
              }}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              poster="/assets/hero-video-frame.jpg"
              onCanPlayThrough={() => {
                setVideoReady(true)
                setImageLoaded(true)
              }}
              onError={(e) => {
                console.warn('Video autoplay may be blocked')
                setAutoplayBlocked(true)
              }}
            >
              <source src={mediaSrc || '/assets/vid.mp4'} type="video/mp4" />
            </video>
            {/* Show poster as fallback if autoplay is blocked */}
            {autoplayBlocked && (
              <Image
                src="/assets/hero-video-frame.jpg"
                alt=""
                fill
                className="object-contain sm:object-cover bw-image transition-opacity duration-1000"
                style={{
                  objectPosition: 'center center',
                }}
                unoptimized
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
            <Image
              src={mediaSrc || '/assets/hero-1.jpg'}
              alt=""
              fill
              className={`object-contain sm:object-cover min-w-full min-h-full bw-image transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              priority
              unoptimized
              onLoad={() => setImageLoaded(true)}
              style={{
                objectPosition: 'center center',
              }}
            />
          </div>
        )}
      </div>

      {/* Creative gradient overlay - stronger at edges, lighter in center */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      />
      {/* Additional subtle overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 h-full flex flex-col justify-center items-center text-center"
      >
        {/* Hidden H1 for accessibility if title is not an H1 */}
        {title && (
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 leading-tight whitespace-normal break-words"
            style={{ wordBreak: 'normal', hyphens: 'auto' }}
            aria-label={title}
          >
            {title}
          </h1>
        )}

        {subtitle && (
          <p 
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed whitespace-normal"
            style={{ wordBreak: 'normal' }}
          >
            {subtitle}
          </p>
        )}

        {kicker && (
          <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 uppercase tracking-wider whitespace-normal">
            {kicker}
          </p>
        )}

        {ctas.length > 0 && (
          <div 
            ref={ctasRef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            {ctas.map((cta, index) => (
              <a
                key={index}
                href={cta.href}
                className={`
                  px-6 sm:px-8 py-3 sm:py-4 rounded-sm font-medium transition-all duration-300 hover-scale
                  ${cta.variant === 'secondary' 
                    ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20' 
                    : 'bg-[var(--accent)] text-[var(--bg)] hover:bg-[var(--fg)] hover:text-[var(--bg)]'
                  }
                `}
              >
                {cta.text}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

