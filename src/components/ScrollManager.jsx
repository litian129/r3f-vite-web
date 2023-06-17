import { useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { gsap } from "gsap"
import { useEffect, useRef } from "react"

export const ScrollManager = (props) => {
  const { section, onSectionChange } = props

  const data = useScroll()
  const lastScroll = useRef(0)
  const isAnimating = useRef(false)

  data.fill.classList.add("top-0")
  data.fill.classList.add("absolute")

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        console.log('gsap onStart :>> ');
        isAnimating.current = true
      },
      onComplete: () => {
        console.log('gsap onComplete :>> ');
        isAnimating.current = false
      }
    })
  }, [section])

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages)
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      console.log('data down :>> ', data);
      onSectionChange(1)
    }
    if (data.scroll.current < lastScroll.current && data.scroll.current < 1 / (data.pages - 1)) {
      console.log('data up :>> ', data);
      onSectionChange(0)
    }
    lastScroll.current = data.scroll.current
  })
  return null
}