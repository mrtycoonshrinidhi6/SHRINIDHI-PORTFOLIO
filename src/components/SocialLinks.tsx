'use client'
import React from 'react'

export default function SocialLinks() {
  const socials = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mr-tycoon-shrinidhi/',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/mrtycoonshrinidhi6',
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      name: 'Twitter',
      href: 'https://x.com/mr_tycoon006',
      gradient: 'from-sky-400 to-blue-600',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h2 className="text-3xl font-semibold text-white mb-6">Connect with me</h2>
      <div className="flex flex-wrap gap-6">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md hover:bg-gradient-to-r ${s.gradient} text-white font-semibold shadow-lg transition-transform transform hover:scale-105`}
          >
            {s.name}
          </a>
        ))}
      </div>
    </div>
  )
}
