import { useEffect, useState } from "react";
import { initScroll, destroyScroll, ScrollTrigger, reduceMotion } from "./lib/scroll";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ParticleCanvas from "./components/ParticleCanvas";
import ScrollIndicator from "./components/ScrollIndicator";
import CursorGlow from "./components/CursorGlow";
import Hero from "./sections/Hero";
import Process from "./sections/Process";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Certs from "./sections/Certs";
import Contact from "./sections/Contact";

export default function App() {
  const [ready, setReady] = useState(reduceMotion);

  useEffect(() => {
    initScroll();
    // Effect App jalan setelah semua section membuat ScrollTrigger-nya. Urutkan ulang supaya
    // trigger di bawah section yang di-pin (Work) menghitung posisi dengan benar.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => destroyScroll();
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {!reduceMotion && <Loader onDone={() => setReady(true)} />}
      <Nav />
      <main id="main" className="relative" style={{ zIndex: "var(--z-content)" }}>
        <Hero ready={ready} />
        <Process />
        <About />
        <Stack />
        <Work />
        <Experience />
        <Certs />
        <Contact />
      </main>
      <Footer />
      <ScrollIndicator />
      <CursorGlow />
      <ParticleCanvas ready={ready} />
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
    </>
  );
}
