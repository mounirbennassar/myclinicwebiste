import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Features from "./components/Features";
import About from "./components/About";
import Services from "./components/Services";
import Stats from "./components/Stats";
import Doctors from "./components/Doctors";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  const [view, setView] = useState("home"); // 'home' or 'find-doctor'

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#find-doctor") {
        setView("find-doctor");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setView("home");
        if (window.location.hash) {
          const id = window.location.hash.substring(1);
          // Wait for DOM to paint homepage sections before scrolling
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 80);
        }
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash(); // Initial check on load
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink-700">
      <Navbar currentView={view} />
      <main>
        {view === "find-doctor" ? (
          <div className="pt-20">
            {/* Elegant subpage banner */}
            <div className="bg-brand-900 text-white py-16 px-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#2f8b8d,transparent)] opacity-40" />
              <div className="max-w-7xl mx-auto relative z-10 text-center">
                <span className="text-accent-400 text-xs font-bold uppercase tracking-[0.2em] bg-white/10 px-3 py-1 rounded-full">
                  Aurora Medical
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-3">
                  Find a Doctor
                </h1>
                <p className="text-brand-100 max-w-xl mx-auto text-sm md:text-base">
                  Search and book consultation slots with our elite medical specialists.
                </p>
              </div>
            </div>
            
            {/* The main interactive Find a Doctor page */}
            <Doctors />
          </div>
        ) : (
          <>
            <div id="home"><HeroSlider /></div>
            <div id="features"><Features /></div>
            <div id="about"><About /></div>
            <div id="services"><Services /></div>
            <Stats />
            <Doctors />
            <Testimonials />
            <CTA />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
