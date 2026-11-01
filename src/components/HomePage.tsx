import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Systems from "@/components/Systems";
import Stack from "@/components/Stack";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Systems />
        <Stack />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
