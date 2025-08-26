'use client'

import Navbar from '@/components/Navbar'
import ParticlesBG from '@/components/ParticlesBG'
import CursorTrail from '@/components/CursorTrail'
import Hero from '@/containers/Hero'
import About from '@/containers/About'
import Skills from '@/containers/Skills'
import Projects from '@/containers/Projects'
import Experience from '@/containers/Experience'
import ContactSection from '@/components/ContactSection' // updated import
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="relative">
      <ParticlesBG />
      <CursorTrail />
      <Navbar />

      <section id="home" className="section"><Hero /></section>
      <section id="contact" className="section"><ContactSection /></section> {/* updated */}
      <section id="about" className="section"><About /></section>
      <section id="skills" className="section"><Skills /></section>
      <section id="projects" className="section"><Projects /></section>
      <section id="experience" className="section"><Experience /></section>
      

      <Footer />
    </main>
  )
}
