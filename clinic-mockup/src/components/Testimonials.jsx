import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const items = [
  {
    quote:
      "The team at Aurora made me feel genuinely cared for. From the first call to follow-up, every detail was handled with warmth and professionalism.",
    name: "Emily R.",
    role: "Patient since 2021",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Dr. Whitman explained everything clearly and made me feel safe through my treatment. I would recommend Aurora to anyone in a heartbeat.",
    name: "Daniel K.",
    role: "Cardiology patient",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The pediatric team is incredible. My daughter actually looks forward to her checkups now — that says it all.",
    name: "Sofia M.",
    role: "Parent",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = items[index];

  return (
    <section className="py-24 px-6 bg-brand-50/40">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-600 mb-4">
          <span className="w-8 h-px bg-accent-500" /> Testimonials
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-brand-900 font-semibold mb-14">
          What our patients say.
        </h2>

        <div className="relative bg-white rounded-3xl shadow-soft p-10 md:p-16">
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 text-accent-500 bg-white rounded-full p-2 shadow-soft" />
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <p className="font-display italic text-xl md:text-2xl text-brand-900 leading-relaxed mb-8">
                “{t.quote}”
              </p>
              <div className="flex items-center justify-center gap-4">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-semibold text-brand-900">{t.name}</div>
                  <div className="text-xs text-ink-500 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "bg-accent-500 w-8" : "bg-brand-200 w-2"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
