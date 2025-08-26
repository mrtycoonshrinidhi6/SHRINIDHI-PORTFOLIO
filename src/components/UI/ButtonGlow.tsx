'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const palettes = [
  ['#60a5fa','#1d4ed8'],
  ['#a78bfa','#6d28d9'],
  ['#f472b6','#be185d'],
  ['#34d399','#059669'],
  ['#f59e0b','#b45309']
]

interface ButtonGlowProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
}

export default function ButtonGlow({ children, href, onClick }: ButtonGlowProps) {
  const [gradient, setGradient] = useState<string | null>(null)

  useEffect(() => {
    // only set the random gradient after mount
    const i = Math.floor(Math.random() * palettes.length)
    const [from, to] = palettes[i]
    setGradient(`linear-gradient(90deg, ${from}, ${to})`)
  }, [])

  const btn = (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.25)' }}
      whileTap={{ scale: 0.98 }}
      className="px-5 py-2.5 rounded-xl font-medium text-white shadow-glow"
      style={{ background: gradient || '#6b7280' }} // fallback for server render
      onClick={onClick}
      type={onClick ? 'button' : 'submit'}
    >
      {children}
    </motion.button>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : '_self'}
        rel="noreferrer"
      >
        {btn}
      </a>
    )
  }

  return btn
}
