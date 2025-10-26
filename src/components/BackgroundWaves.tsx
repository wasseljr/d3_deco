"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function BackgroundWaves() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    // Animate the stroke drawing
    gsap.fromTo(
      path,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut",
      }
    )

    // Add subtle continuous wave motion
    gsap.to(path, {
      duration: 4,
      attr: { d: wavePath2 },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  const wavePath1 =
    "M0 200 Q250 100 500 200 T1000 200"
  const wavePath2 =
    "M0 200 Q250 150 500 200 T1000 200"

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1000 400"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 -z-10 opacity-40"
    >
      <path
        ref={pathRef}
        d={wavePath1}
        stroke="#c89b3c"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  )
}
