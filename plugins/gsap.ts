import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)
  gsap.registerPlugin(CSSPlugin)

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
