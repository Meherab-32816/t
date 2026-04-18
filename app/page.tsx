import { HeroSection } from "@/components/ui/hero-3";
import { Header } from "@/components/ui/header-3";
import Footer4Col from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
      </main>
      <Footer4Col />
    </div>
  );
}
