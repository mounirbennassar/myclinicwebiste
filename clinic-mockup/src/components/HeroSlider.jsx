import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import { doctors, allSpecialties, prefillDoctors } from "../lib/doctors";

const slides = [
  {
    tag: "Welcome to Aurora",
    title: "Compassionate care\nfor every stage of life.",
    desc: `Our team of ${doctors.length}+ board-certified specialists across ${allSpecialties.length} medical disciplines combines warmth with world-class expertise.`,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80",
    cta1: { label: "Find a Doctor", prefill: {} },
    cta2: { label: "Our Services", href: "#services" },
  },
  {
    tag: "Advanced Diagnostics",
    title: "Modern technology,\ntimeless care.",
    desc: "From digital imaging to genomic screening, we use the latest tools so you get accurate answers and faster recovery.",
    image:
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1920&q=80",
    cta1: { label: "Explore Diagnostics", href: "#services" },
    cta2: { label: "Meet Our Doctors", prefill: {} },
  },
  {
    tag: "Expert Cardiology",
    title: "A team you can\ntruly rely on.",
    desc: "From heart health to pediatrics and dermatology — find the right specialist for you in seconds.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1920&q=80",
    cta1: { label: "See Cardiologists", prefill: { specialty: "Cardiology" } },
    cta2: { label: "Book a Visit", href: "#contact" },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const length = slides.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ opacity: { duration: 1.0 }, scale: { duration: 7, ease: "easeOut" } }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-800/60 to-brand-700/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative ring */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border border-white/5" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
        <div className="max-w-2xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-400 mb-6">
                <span className="w-8 h-px bg-accent-400" /> {slide.tag}
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.05] whitespace-pre-line mb-6">
                {slide.title}
              </h1>
              <p className="text-lg text-white/85 max-w-xl mb-10 leading-relaxed">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <CtaButton cta={slide.cta1} primary />
                <CtaButton cta={slide.cta2} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-10 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className="group flex items-center"
              >
                <span
                  className={`block h-[3px] transition-all duration-500 ${
                    i === index ? "w-12 bg-accent-400" : "w-6 bg-white/40 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
            <span className="ml-4 text-white/60 text-sm tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white hover:text-brand-800 transition flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-12 h-12 rounded-full border border-white/30 text-white hover:bg-white hover:text-brand-800 transition flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-0 right-6 z-10 hidden lg:flex flex-col items-center text-white/60 text-xs">
        <span className="rotate-90 origin-bottom-right tracking-[0.3em] mb-12">SCROLL</span>
      </div>
    </section>
  );
}

function CtaButton({ cta, primary }) {
  const className = primary
    ? "group inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-7 py-4 rounded-full font-semibold shadow-soft transition"
    : "inline-flex items-center gap-2 border border-white/40 hover:bg-white hover:text-brand-800 text-white px-7 py-4 rounded-full font-semibold transition";

  const inner = (
    <>
      {primary && <Calendar className="w-4 h-4" />}
      {cta.label}
      {primary && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />}
    </>
  );

  if (cta.prefill !== undefined) {
    return (
      <button type="button" onClick={() => prefillDoctors(cta.prefill)} className={className}>
        {inner}
      </button>
    );
  }
  return (
    <a href={cta.href} className={className}>
      {inner}
    </a>
  );
}
