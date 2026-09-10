import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CategoryPreview from "@/components/CategoryPreview";
import HomeFavorites from "@/components/HomeFavorites";
import InstagramSection from "@/components/InstagramSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <CategoryPreview />
      <HomeFavorites />
      <InstagramSection />
    </main>
  );
}