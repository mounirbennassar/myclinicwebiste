import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        findDoctor: 'find-a-doctor.html',
        doctorDetails: 'doctor-details.html',
        programs: 'programs.html',
        programDetails: 'program-details.html',
        specialties: 'specialties.html',
        specialtyDetails: 'specialty-details.html',
        newsDetails: 'news-details.html',
        telemedicine: 'telemedicine.html',
        homeHealthcare: 'home-healthcare.html',
      },
    },
  },
})
