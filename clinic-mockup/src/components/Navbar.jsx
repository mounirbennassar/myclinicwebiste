import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Menu, X, Heart, Search } from "lucide-react";
import { doctors, allSpecialties, prefillDoctors } from "../lib/doctors";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Find a Doctor", href: "#doctors" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { doctors: [], specialties: [] };
    return {
      doctors: doctors
        .filter((d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q))
        .slice(0, 5),
      specialties: allSpecialties.filter((s) => s.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [searchQuery]);

  const handleSelectDoctor = (doc) => {
    setSearchOpen(false);
    setSearchQuery("");
    prefillDoctors({ search: doc.name });
  };
  const handleSelectSpecialty = (spec) => {
    setSearchOpen(false);
    setSearchQuery("");
    prefillDoctors({ specialty: spec });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-soft py-3"
          : "bg-white/95 backdrop-blur border-b border-brand-50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-brand-600 shadow-sm shadow-brand-900/10">
            <Heart className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-brand-800">
              Aurora
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-ink-500">
              Medical Clinic
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-accent-500"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Quick doctor / specialty search */}
          <div ref={searchRef} className="relative">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/70 px-3 py-2 text-xs font-semibold text-ink-500 hover:text-brand-700 transition"
              aria-label="Search doctors"
            >
              <Search className="w-4 h-4 text-brand-600" />
              <span className="hidden xl:inline">Search…</span>
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-brand-100 shadow-soft p-3 z-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-500" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Doctor name or specialty…"
                    className="w-full pl-9 pr-3 py-2.5 bg-brand-50/40 border border-brand-100 rounded-xl text-sm text-ink-700 placeholder-ink-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 max-h-80 overflow-y-auto">
                    {searchResults.specialties.length > 0 && (
                      <>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-ink-500 px-2 py-1.5">
                          Specialties
                        </div>
                        {searchResults.specialties.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSelectSpecialty(s)}
                            className="w-full text-left px-2 py-2 rounded-lg hover:bg-brand-50 text-sm text-brand-900 font-medium"
                          >
                            {s}
                          </button>
                        ))}
                      </>
                    )}
                    {searchResults.doctors.length > 0 && (
                      <>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-ink-500 px-2 py-1.5 mt-1">
                          Doctors
                        </div>
                        {searchResults.doctors.map((d) => (
                          <button
                            key={d.id}
                            onClick={() => handleSelectDoctor(d)}
                            className="w-full flex items-center gap-3 text-left px-2 py-2 rounded-lg hover:bg-brand-50"
                          >
                            <img src={d.img} alt="" className="w-9 h-9 rounded-lg object-cover bg-brand-50" />
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-brand-900 truncate">{d.name}</div>
                              <div className="text-[11px] text-ink-500 truncate">{d.specialty}</div>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                    {searchResults.doctors.length === 0 && searchResults.specialties.length === 0 && (
                      <div className="text-xs text-ink-500 px-2 py-3 text-center">No matches.</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-1 rounded-full border border-brand-100 bg-brand-50/70 p-1 text-xs font-semibold text-ink-500"
            aria-label="Language switcher"
          >
            <Globe2 className="ml-2 h-4 w-4 text-brand-600" />
            {["EN", "AR"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`rounded-full px-3 py-1.5 transition ${
                  language === code
                    ? "bg-white text-brand-800 shadow-sm"
                    : "hover:text-brand-700"
                }`}
                aria-pressed={language === code}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href="#doctors"
            className="inline-flex items-center justify-center whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-soft transition"
          >
            Book Appointment
          </a>
        </div>

        <button
          className="lg:hidden text-ink-900"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-soft px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-ink-700 font-medium py-2 border-b border-brand-50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <div
            className="flex w-full items-center gap-1 rounded-full border border-brand-100 bg-brand-50/80 p-1 text-xs font-semibold text-ink-500"
            aria-label="Language switcher"
          >
            <Globe2 className="ml-3 h-4 w-4 text-brand-600" />
            {["EN", "AR"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                className={`flex-1 rounded-full px-3 py-2 transition ${
                  language === code
                    ? "bg-white text-brand-800 shadow-sm"
                    : "hover:text-brand-700"
                }`}
                aria-pressed={language === code}
              >
                {code}
              </button>
            ))}
          </div>
          <a
            href="#doctors"
            className="block whitespace-nowrap text-center bg-accent-500 text-white py-3 rounded-full font-semibold mt-3"
          >
            Book Appointment
          </a>
        </div>
      )}
    </motion.header>
  );
}
