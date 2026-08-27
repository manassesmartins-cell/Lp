import Hero from "@/components/hero/Hero";
import Invitation from "@/components/sections/Invitation";
import Rupture from "@/components/sections/Rupture";
import Lineup from "@/components/sections/Lineup";
import Countdown from "@/components/sections/Countdown";
import Rules from "@/components/sections/Rules";
import Gallery from "@/components/sections/Gallery";
import FinalCall from "@/components/sections/FinalCall";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main id="top" className="relative bg-void">
        <Hero />
        <Invitation />
        <Rupture />
        <Lineup />
        <Countdown />
        <Rules />
        <Gallery />
        <FinalCall />
      </main>
      <Footer />
    </>
  );
}
