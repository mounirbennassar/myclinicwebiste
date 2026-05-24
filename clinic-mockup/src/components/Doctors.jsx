import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
  Filter,
  Sparkles,
  ChevronDown,
  User,
  Activity
} from "lucide-react";
import { doctors as doctorsData, allBranches, allSpecialties, PREFILL_EVENT } from "../lib/doctors";

const branches = ["All Locations", ...allBranches];
const specialties = ["All Specialties", ...allSpecialties];
const quickFilterSpecs = ["All", "Cardiology", "Pediatrics", "Dermatology & Cosmetics", "Orthopedics", "Internal Medicine"];

export default function Doctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All Locations");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [activeQuickFilter, setActiveQuickFilter] = useState("All");
  const [detailsDoctor, setDetailsDoctor] = useState(null);

  // Listen for cross-component prefill (Hero CTA, Services tile, Navbar search)
  useEffect(() => {
    const onPrefill = (e) => {
      const { specialty, branch, search } = e.detail || {};
      if (specialty) {
        setSelectedSpecialty(specialty);
        setActiveQuickFilter(quickFilterSpecs.includes(specialty) ? specialty : "All");
      }
      if (branch) setSelectedBranch(branch);
      if (typeof search === "string") setSearchQuery(search);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // Booking Modal States
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Filter computation
  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBranch =
        selectedBranch === "All Locations" || doc.branch === selectedBranch;

      const matchesSpecialty =
        selectedSpecialty === "All Specialties" || doc.specialty === selectedSpecialty;

      return matchesSearch && matchesBranch && matchesSpecialty;
    });
  }, [searchQuery, selectedBranch, selectedSpecialty]);

  // Handle Quick Filter Pill Click
  const handleQuickFilter = (spec) => {
    setActiveQuickFilter(spec);
    if (spec === "All") {
      setSelectedSpecialty("All Specialties");
    } else {
      setSelectedSpecialty(spec);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBranch("All Locations");
    setSelectedSpecialty("All Specialties");
    setActiveQuickFilter("All");
  };

  // Generate Booking Dates (next 5 days)
  const bookingDates = useMemo(() => {
    const dates = [];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: days[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()],
        fullString: `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`,
      });
    }
    return dates;
  }, []);

  const timeSlots = ["09:00 AM", "10:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM"];

  // Open booking modal
  const handleOpenBooking = (doc) => {
    setBookingDoctor(doc);
    setSelectedDate(bookingDates[0].fullString);
    setSelectedTime(timeSlots[0]);
    setIsBooked(false);
    setPatientName("");
    setPatientPhone("");
  };

  // Handle submit appointment
  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (patientName && patientPhone) {
      setIsBooked(true);
    }
  };

  return (
    <section id="doctors" className="relative py-28 px-6 bg-gradient-to-b from-brand-50/30 via-white to-brand-50/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent-400/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] bg-brand-100/60 text-brand-800 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-500" /> Find Your Doctor
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-brand-900 font-bold leading-tight mb-6"
          >
            Our Doctors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-ink-500 max-w-3xl mx-auto leading-relaxed"
          >
            Our service connects you with a diverse range of experienced healthcare professionals, each dedicated to your well-being. Browse profiles, read patient reviews, and choose the doctor who resonates with your needs. Whether you're seeking a specialist or a primary care physician, we're here to ensure you receive the exceptional care you deserve.
          </motion.p>
        </div>

        {/* Elegant Modern Search Engine Console */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-xl border border-brand-100/80 shadow-soft rounded-3xl p-5 md:p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* Search text input */}
              <div className="relative md:col-span-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <input
                  type="text"
                  placeholder="Doctor name, role or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-brand-50/40 border border-brand-100 rounded-2xl text-ink-700 placeholder-ink-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition duration-300"
                />
              </div>

              {/* Location Filter */}
              <div className="relative md:col-span-3">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-500" />
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full pl-11 pr-10 py-3.5 bg-brand-50/40 border border-brand-100 rounded-2xl text-ink-700 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition duration-300 cursor-pointer font-medium"
                >
                  {branches.map((b) => (
                    <option key={b} value={b} className="text-ink-700">
                      {b === "All Locations" ? "All Locations" : b.replace("Jeddah ", "")}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500 pointer-events-none" />
              </div>

              {/* Specialty Filter */}
              <div className="relative md:col-span-3">
                <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500" />
                <select
                  value={selectedSpecialty}
                  onChange={(e) => {
                    setSelectedSpecialty(e.target.value);
                    const matchedQuick = e.target.value === "All Specialties" ? "All" : e.target.value;
                    setActiveQuickFilter(matchedQuick);
                  }}
                  className="w-full pl-11 pr-10 py-3.5 bg-brand-50/40 border border-brand-100 rounded-2xl text-ink-700 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition duration-300 cursor-pointer font-medium"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500 pointer-events-none" />
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Force visual feedback/jump to list
                    const el = document.getElementById("doctors-grid");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-soft hover:shadow-lg transition duration-300"
                >
                  <ArrowRight className="w-4 h-4" /> Search
                </button>
              </div>

            </div>

            {/* Selected Filters feedback & Reset */}
            {(searchQuery || selectedBranch !== "All Locations" || selectedSpecialty !== "All Specialties") && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-brand-50 text-sm">
                <span className="text-ink-500">Active filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-800 rounded-lg text-xs">
                    "{searchQuery}"
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </span>
                )}
                {selectedBranch !== "All Locations" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-800 rounded-lg text-xs">
                    {selectedBranch}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBranch("All Locations")} />
                  </span>
                )}
                {selectedSpecialty !== "All Specialties" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-800 rounded-lg text-xs">
                    {selectedSpecialty}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => {
                      setSelectedSpecialty("All Specialties");
                      setActiveQuickFilter("All");
                    }} />
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs text-accent-600 hover:text-accent-500 font-semibold underline ml-auto cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Filter Pills */}
        <div className="flex justify-center flex-wrap gap-2.5 mb-14">
          {quickFilterSpecs.map((spec) => (
            <button
              key={spec}
              onClick={() => handleQuickFilter(spec)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border shadow-sm ${
                activeQuickFilter === spec
                  ? "bg-brand-900 text-white border-brand-900"
                  : "bg-white text-ink-500 hover:text-brand-900 hover:bg-brand-50 border-brand-100/50"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Doctors Results Grid */}
        <div id="doctors-grid" className="scroll-mt-28">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold text-brand-900">
              Specialists Found ({filteredDoctors.length})
            </h3>
            <span className="text-sm text-ink-500">
              Jeddah Branches
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredDoctors.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {filteredDoctors.map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group flex flex-col bg-white rounded-[2rem] border border-brand-100/50 hover:border-brand-300/60 shadow-soft hover:shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    {/* Doctor Image & Badges */}
                    <div className="relative overflow-hidden aspect-[4/5] bg-brand-50">
                      <img
                        src={doc.img}
                        alt={doc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Role Tag */}
                      {doc.role && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-900 shadow-sm">
                          {doc.role}
                        </div>
                      )}

                      {/* Location Badge (Bottom left) */}
                      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-900/75 backdrop-blur-sm text-[10px] uppercase tracking-wider font-semibold text-white rounded-full">
                          <MapPin className="w-3 h-3 text-accent-400" /> {doc.branch.replace("Jeddah ", "")}
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Specialty pill */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs uppercase font-bold tracking-widest text-brand-600">
                            {doc.specialty}
                          </span>
                        </div>

                        {/* Name & Role */}
                        <h4 className="font-display text-xl text-brand-900 font-bold mb-1 group-hover:text-brand-600 transition duration-300">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-ink-500 mb-4">{doc.education}</p>
                        
                        {/* Languages and details */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {doc.languages.map((l) => (
                            <span key={l} className="text-[10px] text-ink-500/80 bg-brand-50 px-2.5 py-0.5 rounded-md font-medium">
                              {l}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer & CTA */}
                      <div className="space-y-2">
                        <button
                          onClick={() => handleOpenBooking(doc)}
                          className="w-full bg-white hover:bg-brand-900 text-brand-900 hover:text-white border border-brand-200 hover:border-brand-900 font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-sm"
                        >
                          Book Appointment
                        </button>
                        <button
                          onClick={() => setDetailsDoctor(doc)}
                          className="w-full text-brand-700 hover:text-brand-900 font-semibold text-xs uppercase tracking-wider py-1.5 transition"
                        >
                          View Profile →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 bg-white/40 border border-dashed border-brand-200 rounded-3xl"
              >
                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6 text-brand-500" />
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-2">No Specialists Found</h4>
                <p className="text-ink-500 max-w-md mx-auto mb-6">
                  We couldn't find any doctor matching your criteria. Try resetting filters or using a different keyword.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-900 hover:bg-brand-800 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-md"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Doctor Details Modal */}
      <AnimatePresence>
        {detailsDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailsDoctor(null)}
              className="absolute inset-0 bg-brand-950/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-soft overflow-hidden border border-brand-100 z-10"
            >
              <button
                onClick={() => setDetailsDoctor(null)}
                className="absolute right-6 top-6 z-10 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-sm"
              >
                <X className="w-5 h-5 text-brand-900" />
              </button>
              <div className="grid sm:grid-cols-5 max-h-[85vh] overflow-y-auto">
                <div className="sm:col-span-2 bg-brand-50 relative aspect-[4/5] sm:aspect-auto">
                  <img
                    src={detailsDoctor.img}
                    alt={detailsDoctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="sm:col-span-3 p-7 md:p-9">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-600">
                    {detailsDoctor.specialty}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-900 mt-1.5">
                    {detailsDoctor.name}
                  </h3>
                  {detailsDoctor.nameAr && (
                    <p className="text-sm text-ink-500 mt-0.5" dir="rtl">{detailsDoctor.nameAr}</p>
                  )}
                  {detailsDoctor.role && (
                    <p className="text-sm font-semibold text-accent-600 mt-2">{detailsDoctor.role}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-ink-500 mt-3">
                    <MapPin className="w-3.5 h-3.5 text-accent-500" />
                    {detailsDoctor.branch}
                  </div>

                  {detailsDoctor.education?.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-900 mb-2">
                        Qualifications
                      </h4>
                      <ul className="space-y-1.5">
                        {detailsDoctor.education.map((e, i) => (
                          <li key={i} className="text-xs text-ink-700 flex gap-2">
                            <span className="text-accent-500 mt-0.5">•</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {detailsDoctor.languages?.length > 0 && (
                    <div className="mt-5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-brand-900 mb-2">
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {detailsDoctor.languages.map((l) => (
                          <span key={l} className="text-[11px] text-brand-700 bg-brand-50 px-2.5 py-1 rounded-md font-semibold">
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      const d = detailsDoctor;
                      setDetailsDoctor(null);
                      handleOpenBooking(d);
                    }}
                    className="mt-7 w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-soft"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Drawer / Modal */}
      <AnimatePresence>
        {bookingDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingDoctor(null)}
              className="absolute inset-0 bg-brand-950/45 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-soft overflow-hidden border border-brand-100 z-10"
            >
              
              {/* Header block with close btn */}
              <div className="relative bg-gradient-to-r from-brand-900 to-brand-800 p-6 md:p-8 text-white">
                <button
                  onClick={() => setBookingDoctor(null)}
                  className="absolute right-6 top-6 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <span className="text-[10px] uppercase tracking-widest text-accent-400 font-bold bg-white/10 px-2.5 py-1 rounded-md">
                  Consultation Request
                </span>
                <h3 className="font-display text-2xl font-bold mt-4">
                  Book Appointment
                </h3>
                <p className="text-brand-100/80 text-xs mt-1">
                  Secure your session in just 3 easy steps.
                </p>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
                {!isBooked ? (
                  <form onSubmit={handleConfirmBooking} className="space-y-6">
                    
                    {/* Step 1: Selected Doctor Info */}
                    <div className="flex items-center gap-4 bg-brand-50/40 p-4 rounded-2xl border border-brand-100/50">
                      <img
                        src={bookingDoctor.img}
                        alt={bookingDoctor.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-brand-900 text-base">{bookingDoctor.name}</h4>
                        <p className="text-xs text-brand-600 font-semibold uppercase tracking-wider">{bookingDoctor.role}</p>
                        <p className="text-[11px] text-ink-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-accent-500" /> {bookingDoctor.branch}
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Date Selector */}
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-brand-500" /> 1. Select Date
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                        {bookingDates.map((date) => (
                          <button
                            key={date.fullString}
                            type="button"
                            onClick={() => setSelectedDate(date.fullString)}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[70px] border transition cursor-pointer ${
                              selectedDate === date.fullString
                                ? "bg-brand-900 text-white border-brand-900 shadow-sm"
                                : "bg-white border-brand-100 hover:border-brand-500 text-ink-700"
                            }`}
                          >
                            <span className="text-[10px] uppercase font-semibold">{date.dayName}</span>
                            <span className="text-lg font-bold">{date.dayNum}</span>
                            <span className="text-[9px] uppercase font-semibold opacity-80">{date.month}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Time Slot Selector */}
                    <div>
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-brand-500" /> 2. Select Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition cursor-pointer ${
                              selectedTime === time
                                ? "bg-brand-900 text-white border-brand-900"
                                : "bg-white border-brand-100 hover:border-brand-500 text-ink-700"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 4: Patient Details */}
                    <div className="space-y-3.5">
                      <label className="block text-xs font-bold text-brand-900 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-4 h-4 text-brand-500" /> 3. Patient Information
                      </label>
                      
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full pl-4 pr-4 py-3 bg-brand-50/20 border border-brand-100 rounded-xl text-xs text-ink-700 placeholder-ink-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        />
                      </div>

                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number"
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          className="w-full pl-4 pr-4 py-3 bg-brand-50/20 border border-brand-100 rounded-xl text-xs text-ink-700 placeholder-ink-500/50 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <button
                      type="submit"
                      className="w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 px-4 rounded-xl text-sm transition shadow-soft flex items-center justify-center gap-2 mt-4"
                    >
                      Confirm Booking
                    </button>
                  </form>
                ) : (
                  /* Booking Confirmation Success Message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 px-4"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100 shadow-sm">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    
                    <h4 className="text-2xl font-bold text-brand-900 mb-2">Booking Confirmed!</h4>
                    <p className="text-sm text-ink-500 mb-6">
                      Your consultation request with <strong className="text-brand-900 font-semibold">{bookingDoctor.name}</strong> has been successfully placed.
                    </p>

                    {/* Summary Card */}
                    <div className="bg-brand-50/60 border border-brand-100/50 rounded-2xl p-4 text-left space-y-2 mb-8">
                      <div className="flex justify-between text-xs">
                        <span className="text-ink-500">Date:</span>
                        <span className="font-semibold text-brand-900">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-ink-500">Time:</span>
                        <span className="font-semibold text-brand-900">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-ink-500">Clinic Branch:</span>
                        <span className="font-semibold text-brand-900">{bookingDoctor.branch}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-ink-500">Patient:</span>
                        <span className="font-semibold text-brand-900">{patientName}</span>
                      </div>
                      <div className="flex justify-between text-xs pt-2 border-t border-brand-100/50">
                        <span className="text-ink-500">Booking Ref:</span>
                        <span className="font-bold text-accent-600 uppercase">AUR-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingDoctor(null)}
                      className="bg-brand-900 hover:bg-brand-850 text-white font-semibold px-8 py-3 rounded-xl text-sm transition shadow-md"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
