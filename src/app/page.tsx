import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Approach from "@/components/Approach";
import Process from "@/components/Process";
import Stack from "@/components/Stack";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Approach />
        <Process />
        <Stack />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
