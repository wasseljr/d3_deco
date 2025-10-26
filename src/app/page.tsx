import HeroSection from "@/components/hero-section";
import Content1 from "@/components/content-6";
import Stats1 from "@/components/stats-2"
import Location from "@/components/features-9"
import Faq from "@/components/faqs-2"
import { Content } from "next/font/google";
import Image from "next/image";
import FooterSection from "@/components/footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  return (
    <div className="pt- 0">
      <HeroSection/>
      <Content1/>
      <Location/>
      <Stats1/>
      <Faq/>
      <FooterSection/>
    </div>
  );
}
