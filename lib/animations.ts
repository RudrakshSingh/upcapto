'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// CRED-style animation presets
export const animations = {
  // Text animations
  fadeUp: {
    from: { opacity: 0, y: 60, scale: 0.95 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
  },
  
  slideInLeft: {
    from: { opacity: 0, x: -100, rotation: -5 },
    to: { opacity: 1, x: 0, rotation: 0, duration: 1, ease: "power3.out" }
  },
  
  slideInRight: {
    from: { opacity: 0, x: 100, rotation: 5 },
    to: { opacity: 1, x: 0, rotation: 0, duration: 1, ease: "power3.out" }
  },
  
  scaleIn: {
    from: { opacity: 0, scale: 0.8, y: 50 },
    to: { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
  },
  
  staggerText: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
  },
  
  // Hero animations
  heroText: {
    from: { opacity: 0, y: 100, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
  },
  
  // Card animations
  cardHover: {
    scale: 1.05,
    y: -10,
    rotation: 2,
    duration: 0.3,
    ease: "power2.out"
  },
  
  cardLeave: {
    scale: 1,
    y: 0,
    rotation: 0,
    duration: 0.3,
    ease: "power2.out"
  },
  
  // Button animations
  buttonHover: {
    scale: 1.02,
    y: -2,
    duration: 0.2,
    ease: "power2.out"
  },
  
  buttonTap: {
    scale: 0.98,
    duration: 0.1,
    ease: "power2.out"
  },
  
  // Parallax animations
  parallaxSlow: {
    yPercent: -50,
    ease: "none"
  },
  
  parallaxFast: {
    yPercent: -100,
    ease: "none"
  },
  
  // Reveal animations
  revealUp: {
    from: { opacity: 0, y: 100, clipPath: "inset(100% 0 0 0)" },
    to: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.out" }
  },
  
  revealLeft: {
    from: { opacity: 0, x: -100, clipPath: "inset(0 100% 0 0)" },
    to: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" }
  },
  
  revealRight: {
    from: { opacity: 0, x: 100, clipPath: "inset(0 0 0 100%)" },
    to: { opacity: 1, x: 0, clipPath: "inset(0 0 0 0%)", duration: 1, ease: "power3.out" }
  }
}

// CRED-style scroll trigger configurations
export const scrollTriggers = {
  // Standard scroll trigger
  standard: {
    trigger: null,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  
  // Hero section trigger
  hero: {
    trigger: null,
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse"
  },
  
  // Parallax trigger
  parallax: {
    trigger: null,
    start: "top bottom",
    end: "bottom top",
    scrub: 1
  },
  
  // Stagger trigger
  stagger: {
    trigger: null,
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse"
  }
}

// Utility functions for CRED-style animations
export const animateText = (selector: string, animation = animations.fadeUp) => {
  return gsap.fromTo(selector, animation.from, {
    ...animation.to,
    scrollTrigger: {
      ...scrollTriggers.standard,
      trigger: selector
    }
  })
}

export const animateStagger = (selector: string, animation = animations.staggerText) => {
  return gsap.fromTo(selector, animation.from, {
    ...animation.to,
    scrollTrigger: {
      ...scrollTriggers.stagger,
      trigger: selector
    }
  })
}

export const animateParallax = (selector: string, speed = 0.5) => {
  return gsap.to(selector, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      ...scrollTriggers.parallax,
      trigger: selector
    }
  })
}

export const animateReveal = (selector: string, direction = 'up') => {
  const animation = direction === 'left' ? animations.revealLeft : 
                   direction === 'right' ? animations.revealRight : 
                   animations.revealUp
                   
  return gsap.fromTo(selector, animation.from, {
    ...animation.to,
    scrollTrigger: {
      ...scrollTriggers.standard,
      trigger: selector
    }
  })
}

// Hover animations
export const addHoverAnimation = (element: HTMLElement, type = 'card') => {
  const hoverAnimation = type === 'card' ? animations.cardHover : animations.buttonHover
  const leaveAnimation = type === 'card' ? animations.cardLeave : { scale: 1, y: 0, duration: 0.2 }
  
  element.addEventListener('mouseenter', () => {
    gsap.to(element, hoverAnimation)
  })
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, leaveAnimation)
  })
}

// Smooth scroll utility
export const smoothScrollTo = (target: string, offset = 0) => {
  const element = document.querySelector(target)
  if (element) {
    // Use native smooth scroll instead of GSAP scrollTo
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    })
  }
}

// Initialize all animations
export const initAnimations = () => {
  // Set default ease
  gsap.defaults({ ease: "power2.out" })
  
  // Refresh ScrollTrigger
  ScrollTrigger.refresh()
}

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}

export default animations
