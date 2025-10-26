'use client'
import dynamic from "next/dynamic";
import { HeroHeader } from "@/components/header";

const GSAPProvider = dynamic(() => import("@/components/GSAPProvider"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <GSAPProvider>
      <HeroHeader />
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </GSAPProvider>
  );
}