"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import PlanPreview from "@/components/home/PlanPreview";
import FAQ from "@/components/home/FAQ";

const Globe = dynamic(() => import("@/components/home/Globe"), { ssr: false });

export default function Home() {
  return (
    <>
      <Hero />
      <Globe />
      <Features />
      <HowItWorks />
      <PlanPreview />
      <FAQ />
    </>
  );
}
