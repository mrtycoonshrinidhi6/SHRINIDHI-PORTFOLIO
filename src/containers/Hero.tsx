'use client'
import { motion } from 'framer-motion'
import TextType from '@/components/TextType'
import ButtonGlow from '@/components/UI/ButtonGlow'
import CurvedLoop from '@/components/CurvedLoop'

export default function Hero() {
  return (
    <div className="container flex flex-col items-center justify-center text-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        Shrinidhi H V
      </motion.h1>

      <div className="mt-2 text-white/70 text-lg md:text-xl">
        ML Engineer • Full Stack Developer • Data Scientist
      </div>

      <div className="mt-6 text-2xl md:text-3xl font-semibold">
        <TextType
          text={["AI/ML Engineer", "Full Stack Developer", "Data Scientist"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor
          cursorCharacter="|"
          className="gradient-text"
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonGlow
          onClick={() =>
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          View Projects
        </ButtonGlow>

        {/* Direct link to resume file */}
        <ButtonGlow href="/resume.pdf">
          Download Resume
        </ButtonGlow>
      </div>

      {/* Scrolling marquee at the bottom */}
      <div className="mt-16 w-full">
        <CurvedLoop
          marqueeText="EAT ✦ CODE ✦ SLEEP ✦ "
          speed={2}
          curveAmount={500}
          direction="right"
          interactive
          className="drop-shadow"
        />
      </div>
    </div>
  )
}
