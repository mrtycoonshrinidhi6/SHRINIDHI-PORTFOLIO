'use client'
import SectionTitle from '@/components/SectionTitle'
import Image from 'next/image'
import profile from '@/assets/profile.jpg'
import { motion } from 'framer-motion'
import { Brain, Code2, Cloud } from 'lucide-react'

export default function About() {
  const skills = [
    {
      title: 'AI/ML Enthusiast',
      desc: 'Passionate about machine learning, deep learning, and artificial intelligence solutions.',
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
    },
    {
      title: 'Full-Stack Developer',
      desc: 'Building end-to-end web applications with modern technologies and best practices.',
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: 'Cloud & DevOps',
      desc: 'Deploying scalable applications with cloud infrastructure and DevOps practices.',
      icon: <Cloud className="w-6 h-6 text-sky-400" />,
    },
  ]

  return (
    <div className="container flex flex-col items-center justify-center text-center">
      <SectionTitle
        title="About Me"
        subtitle="Passionate technologist specializing in AI/ML and full-stack development"
      />

      {/* Profile Picture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
        className="relative group mt-10"
      >
        <div className="rounded-full overflow-hidden border border-white/10 w-99 h-99 mx-auto transition-transform duration-500 group-hover:scale-110">
          <Image
            src={profile}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500"
          style={{
            boxShadow: '0 0 60px 15px rgba(99,102,241,0.4)',
          }}
        />
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-10"
      >
        <p className="text-3xl md:text-5xl text-white/80 leading-relaxed font-light transition-all duration-500 hover:scale-105 hover:font-bold hover:text-white hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20 rounded-2xl p-4">
          Building the Future with{' '}
          <span className="gradient-text font-semibold">AI & Technology</span>
        </p>

        <div className="mt-6 space-y-4 text-white/70 max-w-2xl mx-auto">
          <p>
            I'm a passionate technologist with expertise in artificial
            intelligence, machine learning, and full-stack development. I love
            creating innovative solutions that bridge the gap between complex AI
            algorithms and user-friendly applications.
          </p>
          <p>
            Currently pursuing my journey in data science and software
            engineering, I'm always eager to learn new technologies and
            contribute to impactful projects.
          </p>
        </div>
      </motion.div>

      {/* Skills */}
      <div className="mt-14 grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        {skills.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="card p-6 flex flex-col items-center justify-center text-center rounded-2xl border border-white/10 bg-white/5 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all duration-500"
          >
            <div className="mb-3">{c.icon}</div>
            <h3 className="text-lg font-semibold mb-2 transition-all duration-300 group-hover:font-bold">
              {c.title}
            </h3>
            <p className="text-white/70">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
