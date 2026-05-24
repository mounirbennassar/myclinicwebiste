import { Heart, Send, Globe, Camera, AtSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <a href="#home" className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-semibold text-white">Aurora</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">Medical Clinic</div>
            </div>
          </a>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            Compassionate, world-class healthcare for every stage of life — delivered
            with warmth and precision.
          </p>
          <div className="flex gap-3">
            {[Globe, Send, Camera, AtSign].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent-500 flex items-center justify-center transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-5">Explore</h4>
          <ul className="space-y-3 text-sm">
            {["About us", "Services", "Doctors", "Careers", "Press"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-accent-400 transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-5">Services</h4>
          <ul className="space-y-3 text-sm">
            {["Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Lab & Imaging"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-accent-400 transition">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-white font-semibold mb-5">Working hours</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex justify-between"><span>Mon – Fri</span><span>8:00 – 20:00</span></li>
            <li className="flex justify-between"><span>Saturday</span><span>9:00 – 17:00</span></li>
            <li className="flex justify-between"><span>Sunday</span><span>10:00 – 14:00</span></li>
            <li className="flex justify-between text-accent-400 pt-3 border-t border-white/10 mt-3"><span>Emergency</span><span>24 / 7</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Aurora Medical Clinic. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent-400 transition">Privacy</a>
            <a href="#" className="hover:text-accent-400 transition">Terms</a>
            <a href="#" className="hover:text-accent-400 transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
