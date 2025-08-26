'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Linkedin, Github, Twitter } from 'lucide-react'

export default function LanyardBadge() {
  // small drag constraints box (px)
  const constraints = { top: -40, left: -40, right: 40, bottom: 40 }

  return (
    <div className="w-full flex justify-center items-center py-12">
      <motion.div
        // overall floating bob (y oscillation)
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Lanyard strap (top) */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-20 h-6 rounded-t-full bg-gradient-to-r from-emerald-400/55 to-green-500/50 shadow-sm" />
        </div>

        {/* Badge (glass card) */}
        <motion.div
          drag
          dragConstraints={constraints}
          dragElastic={0.1}
          whileTap={{ scale: 0.985, rotate: -1 }}
          whileHover={{ scale: 1.03 }}
          onDragEnd={() => { /* allowed to drop anywhere inside constraint */ }}
          className="relative w-72 md:w-80 h-96 rounded-2xl bg-white/6 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* soft inner glow (visible on hover) */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 bg-gradient-to-br from-emerald-400/12 via-emerald-300/8 to-transparent opacity-0 rounded-2xl"
            />
          </div>

          {/* accent glow ring */}
          <div className="absolute -inset-px rounded-2xl pointer-events-none">
            <div className="w-full h-full rounded-2xl blur-xl opacity-20 bg-gradient-to-br from-emerald-400/8 to-transparent" />
          </div>

          {/* content */}
          <div className="relative z-10 flex flex-col items-center text-center p-6 h-full">
            {/* subtle badge top notch */}
            <div className="w-14 h-2 rounded-full bg-white/8 mb-2" />

            {/* avatar */}
            <div className="w-28 h-28 rounded-full overflow-hidden border border-white/10 bg-white/3 shadow-md">
              <Image
                src="/avatar.jpg"
                alt="Shrinidhi H V"
                width={112}
                height={112}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* name and title */}
            <h3 className="mt-4 text-xl md:text-2xl font-semibold text-white">
              Shrinidhi H V
            </h3>
            <p className="mt-1 text-sm text-white/70 max-w-[12rem]">
              ML Engineer • Full Stack Developer • Data Scientist
            </p>

            {/* contact CTA */}
            <button
              onClick={() => (window.location.href = 'mailto:mrtycoonshrinidhi.6@gmail.com')}
              className="mt-5 px-5 py-2 rounded-full text-sm font-semibold bg-white/6 border border-white/10 hover:bg-gradient-to-r hover:from-emerald-400/25 hover:to-green-500/25 transition"
              aria-label="Contact me"
            >
              Contact Me
            </button>

            {/* divider */}
            <div className="mt-5 w-24 h-[1px] bg-white/8" />

            {/* social icons */}
            <div className="mt-4 flex gap-5">
              <Link
                href="https://www.linkedin.com/in/mr-tycoon-shrinidhi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn - Shrinidhi"
                className="p-2 rounded-lg bg-white/3 border border-white/8 hover:bg-gradient-to-r hover:from-blue-500/18 hover:to-cyan-400/18 transition"
              >
                <Linkedin className="w-5 h-5 text-white/85" />
              </Link>

              <Link
                href="https://github.com/mrtycoonshrinidhi6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub - Shrinidhi"
                className="p-2 rounded-lg bg-white/3 border border-white/8 hover:bg-gradient-to-r hover:from-gray-700/18 hover:to-gray-900/18 transition"
              >
                <Github className="w-5 h-5 text-white/85" />
              </Link>

              <Link
                href="https://x.com/mr_tycoon006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X - Shrinidhi"
                className="p-2 rounded-lg bg-white/3 border border-white/8 hover:bg-gradient-to-r hover:from-sky-400/18 hover:to-blue-600/18 transition"
              >
                <Twitter className="w-5 h-5 text-white/85" />
              </Link>
            </div>

            {/* subtle footer text */}
            <div className="mt-auto text-xs text-white/50 pb-3">
              Click & drag • Hover for glow
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
