'use client';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextEffect } from '@/components/ui/text-effect';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackgroundWavesComponent from '@/components/BackgroundWaves';
import 'swiper/css';
import 'swiper/css/navigation';

gsap.registerPlugin(ScrollTrigger);

const allImages = [
  '/images/post1.png',
  '/images/post2.png',
  '/images/post3.png',
  '/images/post4.png',
  '/images/post5.png',
];

const initialImages = allImages.slice(0, 5);

function BackgroundWaves() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    if (paths) {
      gsap.to(paths, {
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -50,
        ease: 'none',
        duration: 2,
        stagger: 0.2,
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden opacity-10 pointer-events-none">
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 400"
        className="w-full h-full"
      >
        <path
          fill="none"
          stroke="#c87533"
          strokeWidth="1"
          d="M0,200 C200,100 400,300 600,200 C700,150 800,250 900,200"
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const swiperRef = useRef<SwiperRef>(null);
  const [visibleImages, setVisibleImages] = useState(initialImages);

  useEffect(() => {
    const loadMoreImages = () => {
      const swiper = swiperRef.current?.swiper;
      if (swiper) {
        const activeIndex = swiper.activeIndex;
        const newImages = allImages.slice(0, Math.min(activeIndex + 6, allImages.length));
        if (newImages.length > visibleImages.length) {
          setVisibleImages(newImages);
        }
      }
    };
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.on('slideChange', loadMoreImages);
    }
    return () => swiper?.off('slideChange', loadMoreImages);
  }, [visibleImages]);

  return (
    <main className="relative pt-[80px] overflow-hidden">
      <BackgroundWavesComponent />
      <BackgroundWaves />

      <div
        aria-hidden
        className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
      >
        <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[hsla(0,0%,85%,.08)]" />
        <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[hsla(0,0%,85%,.06)]" />
        <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[hsla(0,0%,85%,.04)]" />
      </div>

      <section>
        <div className="relative pt-8 md:pt-16">
          <div className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32">
            <Image
              src="https://ik.imagekit.io/lrigu76hy/tailark/night-background.jpg?updatedAt=1745733451120"
              alt="background"
              className="hidden size-full dark:block"
              width={3276}
              height={4095}
            />
          </div>

          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full bg-[var(--color-background)]"
          />

          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <Link
                href="#link"
                className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
              >
                <span className="text-foreground text-sm">Visit Our Online Store</span>
                <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                  </div>
                </div>
              </Link>

              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="mx-auto mt-8 max-w-4xl text-balance text-5xl max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem]"
              >
                Design & Aménagement
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.5}
                as="p"
                className="mx-auto mt-8 max-w-2xl text-balance text-lg"
              >
                🏗 Solid Surface, Alucobond, bois rouge & MDF ⚙ Découpe CNC & finitions de qualité
              </TextEffect>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                <div
                  key={1}
                  className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
                >
                  <Button asChild size="lg" className="rounded-xl px-5 text-base">
                    <Link href="/form">
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mask-b-from-55% relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
              <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                className="aspect-[16/9] rounded-2xl"
              >
                {visibleImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        className="bg-background rounded-2xl object-contain"
                        src={src}
                        alt={`Hero image ${index + 1}`}
                        fill
                        loading={index === 0 ? undefined : 'lazy'}
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL="/images/placeholder.jpg"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}