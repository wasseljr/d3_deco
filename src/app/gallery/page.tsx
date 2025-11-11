// app/gallery/page.tsx
'use client';


import  Footer  from '@/components/footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import { Monoton,Baumans } from "next/font/google";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
const monoton = Monoton({
  subsets: ["latin"],
  weight: "400",
});
const baumans =Baumans({
  subsets: ["latin"],
  weight:"400",
 });


const allImages = [
  '/images/post1.png',
  '/images/post2.png',
  '/images/post3.png',
  '/images/post4.png',
  '/images/post5.png',
];

/* -------------------------------------------------
   Titles / descriptions (same order as allImages)
   ------------------------------------------------- */
const projectDetails = [
  { title: 'Post 1', description: 'A stunning visual that captures the essence of our first milestone project.' },
  { title: 'Post 2', description: 'Innovative design meets functional excellence in this showcase piece.' },
  { title: 'Post 3', description: 'Precision craftsmanship and bold aesthetics come together beautifully.' },
  { title: 'Post 4', description: 'A client-favorite that highlights our attention to detail and creativity.' },
  { title: 'Post 5', description: 'The final touch – a project that exceeded expectations on every level.' },
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const selected = selectedIdx !== null ? projectDetails[selectedIdx] : null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* -------------------------------------------------
          Header – fades out when a modal is open
          ------------------------------------------------- */}
      <AnimatePresence>
        {!selected && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-0 z-40"
          >
            
          </motion.div>
        )}
      </AnimatePresence>

      
      <main className="flex-1 container mx-auto px-4 py-8 pt-30">
        <section className="mb-10 px-28">
          <h1 className={`${monoton.className} text-4xl font-bold text-center mb-4`}>Gallery</h1>

          <p className={` ${baumans.className} text-lg text-center text-muted-foreground`}>
            🌟 Our Services :
            We specialize in custom decoration, manufacturing, and design, both indoors and outdoors.
            Our expertise combines modern design, high-quality materials, and professional finishing to bring your spaces to life and enhance your brand image.
          </p>
        </section>

        <Swiper
          modules={[Navigation, Pagination, Zoom]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {allImages.map((src, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => setSelectedIdx(idx)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${idx + 1}`}
                  width={800}
                  height={600}
                  className="object-cover w-full h-64 md:h-80 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>

      {/* -------------------------------------------------
          Zoom-in modal (blurred image + description)
          ------------------------------------------------- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full bg-background rounded-lg shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10"
                onClick={() => setSelectedIdx(null)}
              >
                X
              </Button>

              <div className="relative">
                <Image
                  src={allImages[selectedIdx!]}
                  alt={selected.title}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover filter blur-sm"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 mt-">
                    {selected.title}
                  </h2>
                  <p className="text-base md:text-lg max-w-xl mt-165">
                    {selected.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}