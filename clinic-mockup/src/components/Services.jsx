import { motion } from "framer-motion";
import {
  HeartPulse, Brain, Baby, Eye, Bone, Activity, Stethoscope, Microscope,
  Ear, Smile, Pill, Sparkles, Wind, Droplets, ShieldCheck, UserCheck, ArrowUpRight,
} from "lucide-react";
import { topSpecialties, prefillDoctors } from "../lib/doctors";

// Map specialty names to icon + short description
const meta = {
  "Cardiology":                  { icon: HeartPulse,   desc: "Comprehensive heart care, diagnostics, and prevention." },
  "Neurology":                   { icon: Brain,        desc: "Expert care for neurological conditions and headaches." },
  "Pediatrics":                  { icon: Baby,         desc: "Gentle, family-focused care from infancy onward." },
  "Ophthalmology":               { icon: Eye,          desc: "Eye exams, laser treatments, and surgical care." },
  "Orthopedics":                 { icon: Bone,         desc: "Restoring mobility with advanced orthopedic care." },
  "Internal Medicine":           { icon: Activity,     desc: "Personalized adult primary care, evidence-based." },
  "Family Medicine":             { icon: Stethoscope,  desc: "Whole-person care for every member of your family." },
  "Dermatology & Cosmetics":     { icon: Sparkles,     desc: "Skin health, aesthetic care, and advanced treatments." },
  "Obstetrics & Gynecology":     { icon: UserCheck,    desc: "Women's health, pregnancy, and gynecologic care." },
  "ENT":                         { icon: Ear,          desc: "Ear, nose, and throat specialists for every age." },
  "Dental":                      { icon: Smile,        desc: "Modern dentistry — cosmetic, restorative, and routine." },
  "Endocrinology & Diabetes":    { icon: Droplets,     desc: "Hormones, diabetes, and metabolic health managed expertly." },
  "Gastroenterology & Hepatology": { icon: Pill,       desc: "Digestive and liver care with advanced endoscopy." },
  "Pulmonology & Sleep Medicine": { icon: Wind,        desc: "Breathing, sleep, and respiratory wellness." },
  "Allergy & Immunology":        { icon: ShieldCheck,  desc: "Allergy testing, asthma, and immune disorders." },
};

const fallback = { icon: Microscope, desc: "Specialist consultations and personalized treatment plans." };

const services = topSpecialties.map(({ specialty, count }) => ({
  title: specialty,
  count,
  ...(meta[specialty] || fallback),
}));

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-brand-50/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-600 mb-4">
              <span className="w-8 h-px bg-accent-500" /> Our Services
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-brand-900 font-semibold leading-tight">
              Comprehensive care, all in one place.
            </h2>
          </div>
          <p className="text-ink-500 max-w-md">
            From routine checkups to complex specialties, we offer a full spectrum of
            medical services delivered with warmth and precision.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              onClick={() => prefillDoctors({ specialty: s.title })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative text-left bg-white rounded-2xl p-7 shadow-[0_2px_30px_-15px_rgba(28,87,89,0.2)] hover:shadow-soft hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-accent-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition">
                  <s.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-accent-600 bg-accent-400/10 px-2 py-1 rounded-md">
                  {s.count} {s.count === 1 ? "doctor" : "doctors"}
                </span>
              </div>
              <h3 className="font-display text-xl text-brand-900 font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-5">{s.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-brand-700 font-medium">
                Find a specialist
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
