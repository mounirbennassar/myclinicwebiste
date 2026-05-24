import { motion } from "framer-motion";
import { Clock, ShieldCheck, Stethoscope, Ambulance } from "lucide-react";

const items = [
  { icon: Clock, title: "Open 7 days", desc: "Mon–Sun, including evenings for your convenience." },
  { icon: ShieldCheck, title: "Insurance accepted", desc: "We work with most major insurance providers." },
  { icon: Stethoscope, title: "40+ Specialists", desc: "Multidisciplinary care under one roof." },
  { icon: Ambulance, title: "24/7 Emergency", desc: "Urgent care available around the clock." },
];

export default function Features() {
  return (
    <section className="relative -mt-16 z-20 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-soft grid grid-cols-2 lg:grid-cols-4 overflow-hidden">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-8 lg:p-10 group hover:bg-brand-50/40 transition border-b lg:border-b-0 lg:border-r border-brand-50 last:border-0"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition">
              <it.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl text-brand-900 font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-ink-500 leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
