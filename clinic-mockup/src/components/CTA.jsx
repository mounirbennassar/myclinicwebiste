import { motion } from "framer-motion";
import { Calendar, Phone, MapPin, Mail } from "lucide-react";
import { allSpecialties } from "../lib/doctors";

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-10 md:p-14 text-white bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-400/20 blur-3xl" />
          <span className="relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-accent-400 mb-4">
            <span className="w-8 h-px bg-accent-400" /> Get in touch
          </span>
          <h2 className="relative font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Ready to feel better? Let's begin.
          </h2>
          <p className="relative text-white/80 leading-relaxed mb-10 max-w-md">
            Book your appointment online or speak directly with one of our coordinators.
            We'll match you with the right specialist — usually within 24 hours.
          </p>
          <div className="relative space-y-4 mb-10">
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-accent-400" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Call us</div>
                <div className="font-semibold">+1 (800) 555-2020</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-accent-400" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Email</div>
                <div className="font-semibold">care@auroraclinic.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent-400" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Visit</div>
                <div className="font-semibold">221 Wellness Avenue, Suite 400</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="bg-white rounded-3xl shadow-soft p-10 md:p-12 border border-brand-50"
        >
          <h3 className="font-display text-3xl text-brand-900 font-semibold mb-2">
            Book an appointment
          </h3>
          <p className="text-ink-500 mb-8">We'll get back to you within one business hour.</p>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" placeholder="Jane Doe" />
            <Field label="Phone" placeholder="+1 555 000 0000" />
            <Field label="Email" placeholder="you@email.com" />
            <Field label="Preferred date" type="date" />
          </div>
          <div className="mt-5">
            <label className="block text-xs uppercase tracking-widest text-ink-500 mb-2">
              Service
            </label>
            <select className="w-full bg-brand-50/40 border border-brand-100 rounded-xl px-4 py-3.5 text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-300">
              {allSpecialties.map((s) => (
                <option key={s}>{s}</option>
              ))}
              <option>Other</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="block text-xs uppercase tracking-widest text-ink-500 mb-2">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Tell us briefly how we can help…"
              className="w-full bg-brand-50/40 border border-brand-100 rounded-xl px-4 py-3 text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="mt-7 w-full inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-7 py-4 rounded-full font-semibold shadow-soft transition"
          >
            <Calendar className="w-4 h-4" />
            Request appointment
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-ink-500 mb-2">{label}</label>
      <input
        {...props}
        className="w-full bg-brand-50/40 border border-brand-100 rounded-xl px-4 py-3.5 text-ink-700 placeholder:text-ink-500/50 focus:outline-none focus:ring-2 focus:ring-brand-300"
      />
    </div>
  );
}
