// app/page.tsx
import Hero from "@/components/Hero";
import AboutOwner from "@/components/AboutOwner";
import ServicesPreview from "@/components/ServicesPreview";
import CountUpStats from "@/components/CountUpStats";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <AboutOwner />
      <ServicesPreview />
      <CountUpStats />
    </div>
  );
}