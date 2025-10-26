"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!ScrollSmoother.get()) {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.0,
          effects: true,
        });
      }
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
