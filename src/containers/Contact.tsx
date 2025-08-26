'use client'

import SectionTitle from '@/components/SectionTitle'
import ButtonGlow from '@/components/UI/ButtonGlow'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault()
    const mail = 'mrtycoonshrinidhi.6@gmail.com'
    const subject = encodeURIComponent(`Portfolio Message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <motion.form
        onSubmit={sendMail}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.6 }}
        className={`
          relative max-w-2xl w-full p-8 rounded-2xl overflow-hidden
          bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg
          group flex flex-col items-center
        `}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-400/20 via-brand-500/20 to-brand-600/20" />

        {/* Glass triangles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-brand-400/20 to-brand-600/20 opacity-40 blur-lg clip-triangle rotate-12 transition-all duration-500 group-hover:opacity-70" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-brand-400/20 to-brand-600/20 opacity-40 blur-lg clip-triangle -rotate-12 transition-all duration-500 group-hover:opacity-70" />

        {/* Content */}
        <div className="relative z-10 w-full">
          <div className="flex justify-center mb-6">
            <SectionTitle 
              title="Contact" 
              subtitle="Have an idea or opportunity? Let’s talk." 
              centered
            />
          </div>

          <div className="space-y-4 w-full">
            <div>
              <label className="block text-sm text-white/70 mb-1">Name</label>
              <input 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-brand-400" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-brand-400" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-1">Message</label>
              <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                rows={5} 
                className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-brand-400" 
                required 
              />
            </div>
            <div className="pt-2 flex justify-center">
              <ButtonGlow>Send Message</ButtonGlow>
            </div>
          </div>
        </div>
      </motion.form>
    </div>
  )
}
