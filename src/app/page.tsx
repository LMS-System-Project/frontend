import Hero from "@/components/home/Hero";
import Lifecycle from "@/components/home/Lifecycle";
import Features from "@/components/home/Features";
import Reviews from "@/components/home/Reviews";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-primary-text">
      <Hero />
      <Features />
      <Lifecycle />
      <Reviews />
      <Footer />
    </main>
  );
}
