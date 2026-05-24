import { motion } from "framer-motion";
import { doctors, allSpecialties, allBranches } from "../lib/doctors";

const stats = [
  { value: "120k+", label: "Patients treated" },
  { value: `${doctors.length}+`, label: "Expert specialists" },
  { value: `${allSpecialties.length}`, label: "Medical specialties" },
  { value: `${allBranches.length}`, label: "Clinic locations" },
];

export default function Stats() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-brand-900/85" />
      <div className="relative max-w-7xl mx-auto text-white text-center">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-400 mb-4">
          <span className="w-8 h-px bg-accent-400" /> By the numbers
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-14 max-w-2xl mx-auto">
          A legacy of trust, built on results.
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="font-display text-5xl md:text-6xl font-semibold text-accent-400 mb-3">
                {s.value}
              </div>
              <div className="text-sm uppercase tracking-[0.2em] text-white/70">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
