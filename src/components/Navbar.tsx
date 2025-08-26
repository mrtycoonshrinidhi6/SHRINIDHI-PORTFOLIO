'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ButtonGlow from './UI/ButtonGlow'
import profilePic from '@/assets/profile.jpg'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false) // close menu on click
  }

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-0 w-full z-40 px-4"
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-2xl px-6 py-3 backdrop-blur-md border ${
          scrolled ? 'bg-white/10 border-white/20' : 'bg-white/5 border-white/10'
        }`}
      >
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">
          <Image
            src={profilePic}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-white/90">Shrinidhi H V</span>
        </div>

        {/* Center: Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right: CTA on desktop / toggle on mobile */}
        <div className="flex items-center">
          {/* Desktop CTA */}
          <div className="hidden md:block">
            <ButtonGlow href="mailto:mrtycoonshrinidhi.6@gmail.com">
              Get In Touch
            </ButtonGlow>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl flex flex-col items-center gap-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md py-4 px-6">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {l.label}
            </button>
          ))}

          <ButtonGlow href="mailto:mrtycoonshrinidhi.6@gmail.com">
            Get In Touch
          </ButtonGlow>
        </div>
      )}
    </motion.header>
  )
}
