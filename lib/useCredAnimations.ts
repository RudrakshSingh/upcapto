'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { animations, scrollTriggers, animateText, animateStagger, animateParallax, animateReveal, addHoverAnimation } from './animations'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const useCredAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Initialize ScrollTrigger
      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return { containerRef }
}

// Hook for text animations
export const useTextAnimation = (animation = 'fadeUp') => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const animConfig = animations[animation as keyof typeof animations] || animations.fadeUp

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    if ('from' in animConfig && 'to' in animConfig) {
      tl.fromTo(element, animConfig.from, animConfig.to)
    } else {
      tl.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
    }

    return () => {
      tl.kill()
    }
  }, [animation])

  return ref
}

// Hook for stagger animations
export const useStaggerAnimation = (delay = 0.1) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = ref.current.children
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(elements, 
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6, 
        ease: "power2.out", 
        stagger: delay 
      }
    )

    return () => {
      tl.kill()
    }
  }, [delay])

  return ref
}

// Hook for parallax animations
export const useParallaxAnimation = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    })

    tl.to(element, {
      yPercent: -50 * speed,
      ease: "none"
    })

    return () => {
      tl.kill()
    }
  }, [speed])

  return ref
}

// Hook for reveal animations
export const useRevealAnimation = (direction = 'up') => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const animConfig = direction === 'left' ? animations.revealLeft : 
                      direction === 'right' ? animations.revealRight : 
                      animations.revealUp

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    tl.fromTo(element, animConfig.from, animConfig.to)

    return () => {
      tl.kill()
    }
  }, [direction])

  return ref
}

// Hook for hover animations
export const useHoverAnimation = (type = 'card') => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    addHoverAnimation(element, type)

    return () => {
      // Cleanup hover listeners if needed
    }
  }, [type])

  return ref
}

// Hook for button hover animations
export const useButtonHoverAnimation = () => {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    addHoverAnimation(element, 'button')

    return () => {
      // Cleanup hover listeners if needed
    }
  }, [])

  return ref
}

// Hook for form hover animations
export const useFormHoverAnimation = () => {
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    addHoverAnimation(element, 'card')

    return () => {
      // Cleanup hover listeners if needed
    }
  }, [])

  return ref
}

// Hook for hero animations
export const useHeroAnimation = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reverse"
      }
    })

    // Animate hero text with stagger
    const textElements = element.querySelectorAll('h1, h2, p')
    tl.fromTo(textElements, 
      { opacity: 0, y: 100, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: "power3.out", 
        stagger: 0.2 
      }
    )

    return () => {
      tl.kill()
    }
  }, [])

  return ref
}

// Hook for smooth scrolling
export const useSmoothScroll = () => {
  const scrollTo = (target: string, offset = 0) => {
    const element = document.querySelector(target)
    if (element) {
      // Use native smooth scroll instead of GSAP scrollTo
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return { scrollTo }
}

export default useCredAnimations
