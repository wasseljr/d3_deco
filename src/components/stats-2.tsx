"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => {
      if (numberRef.current) {
        observer.unobserve(numberRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={numberRef}>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2 className="text-4xl font-semibold lg:text-5xl">D3 in numbers</h2>
          <p>
            D3 Déco is evolving to be more than a workshop — it's a creative space
            where craftsmanship meets precision. From CNC cutting to fine resin
            finishes, we've brought ideas to life in over 250 projects across 12
            cities in Algeria.
          </p>
        </div>

        <div className="grid gap-0.5 *:text-center md:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          <div 
            className="bg-muted rounded-(--radius) space-y-4 py-12 transition-all duration-700"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(60px)',
              transitionDelay: '0ms'
            }}
          >
            <div className="text-5xl font-bold">
              +<AnimatedNumber value={10} />
            </div>
            <p>Years of Experience</p>
          </div>

          <div 
            className="bg-muted rounded-(--radius) space-y-4 py-12 transition-all duration-700"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(60px)',
              transitionDelay: '150ms'
            }}
          >
            <div className="text-5xl font-bold">
              <AnimatedNumber value={95} suffix="%" />
            </div>
            <p>Conversion Rate</p>
          </div>

          <div 
            className="bg-muted rounded-(--radius) space-y-4 py-12 transition-all duration-700"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? 'translateY(0)' : 'translateY(60px)',
              transitionDelay: '300ms'
            }}
          >
            <div className="text-5xl font-bold">
              +<AnimatedNumber value={1000} />
            </div>
            <p>Satisfied Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}