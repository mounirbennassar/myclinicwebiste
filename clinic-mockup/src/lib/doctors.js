import { doctorsData as rawDoctors } from "../doctors-data";

export const doctors = rawDoctors.map((d, i) => ({
  id: i + 1,
  slug: d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name: d.name,
  nameAr: d.nameAr,
  specialty: d.spec,
  role: d.title,
  roleAr: d.titleAr,
  branch: d.location,
  img: d.img,
  education: Array.isArray(d.education) ? d.education : (d.education ? [d.education] : []),
  educationAr: Array.isArray(d.educationAr) ? d.educationAr : (d.educationAr ? [d.educationAr] : []),
  languages: d.languages
    ? d.languages.split(",").map((s) => s.trim()).filter(Boolean)
    : [],
}));

export const allSpecialties = Array.from(new Set(doctors.map((d) => d.specialty))).sort();
export const allBranches = Array.from(new Set(doctors.map((d) => d.branch))).sort();

export const doctorsBySpecialty = allSpecialties.map((spec) => ({
  specialty: spec,
  count: doctors.filter((d) => d.specialty === spec).length,
}));

export const topSpecialties = [...doctorsBySpecialty]
  .sort((a, b) => b.count - a.count)
  .slice(0, 8);

export const PREFILL_EVENT = "doctors:prefill";

export function prefillDoctors({ specialty, branch, search } = {}) {
  window.dispatchEvent(
    new CustomEvent(PREFILL_EVENT, { detail: { specialty, branch, search } })
  );
  const el = document.getElementById("doctors");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
