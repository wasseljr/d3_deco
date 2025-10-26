"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    // Refresh ScrollTrigger after page load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}