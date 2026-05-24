import { motion } from "framer-motion";
import { Check, Award } from "lucide-react";

const bullets = [
  "Board-certified physicians across 18 specialties",
  "State-of-the-art diagnostic technology",
  "Patient-first culture with measurable outcomes",
  "Multilingual care team",
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=1200&q=80"
              alt="Doctor consulting patient"
              className="w-full h-[560px] object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 lg:-right-12 bg-white rounded-2xl shadow-soft p-6 flex items-center gap-4 max-w-xs">
            <div className="w-14 h-14 rounded-2xl bg-accent-500/10 text-accent-600 flex items-center justify-center">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="font-display text-2xl text-brand-900 font-semibold">25+ Years</div>
              <div className="text-xs text-ink-500">Trusted patient care</div>
            </div>
          </div>
          <div className="absolute -top-6 -left-4 lg:-left-10 bg-brand-700 text-white rounded-2xl p-6 shadow-soft">
            <div className="font-display text-3xl font-semibold">98%</div>
            <div className="text-xs uppercase tracking-widest text-brand-100 mt-1">Patient satisfaction</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-600 mb-4">
            <span className="w-8 h-px bg-accent-500" /> About Aurora
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-brand-900 font-semibold leading-tight mb-6">
            A new standard in personalized healthcare.
          </h2>
          <p className="text-ink-500 leading-relaxed mb-8 text-lg">
            At Aurora Medical Clinic, we believe healthcare should feel reassuring,
            human, and genuinely helpful. From your first consultation to your full
            recovery, our team is with you — every step of the way.
          </p>
          <ul className="space-y-3 mb-10">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-ink-700">{b}</span>
              </li>
            ))}
          </ul>
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-7 py-4 rounded-full font-semibold shadow-soft transition"
          >
            Discover our approach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
