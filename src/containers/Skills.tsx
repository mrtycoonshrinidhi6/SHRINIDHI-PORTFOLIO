'use client'
import SectionTitle from '@/components/SectionTitle'
import { motion } from 'framer-motion'
import { Brain, Code2, Cloud, Database } from 'lucide-react'

const groups = [
  {
    name: 'AI / ML',
    icon: <Brain className="w-6 h-6 text-indigo-400" />,
    items: ['TensorFlow', 'PyTorch', 'LangChain', 'Transformers'],
  },
  {
    name: 'Web & Backend',
    icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    items: ['React', 'Node.js', 'FastAPI', 'Spring Boot'],
  },
  {
    name: 'Cloud & DevOps',
    icon: <Cloud className="w-6 h-6 text-sky-400" />,
    items: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    name: 'Databases',
    icon: <Database className="w-6 h-6 text-pink-400" />,
    items: ['MySQL', 'MongoDB'],
  },
]

export default function Skills() {
  return (
    <div className="container relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient opacity-50 rounded-3xl blur-3xl" />

      <SectionTitle
        title="Skills & Technologies"
        subtitle="Expertise across the full technology stack"
      />

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {groups.map((g, gi) => (
          <motion.div
            key={gi}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.06 }}
            className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5 
                       hover:border-indigo-400/40 transition-all duration-500 shadow-lg animate-float"
          >
            {/* Subtle animated overlay inside each card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-20 transition duration-700 pointer-events-none" />

            {/* Group title with icon */}
            <div className="flex items-center gap-3 mb-4">
              {g.icon}
              <h3 className="text-xl font-bold text-white">{g.name}</h3>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-3 relative z-10">
              {g.items.map((i, ii) => (
                <span
                  key={ii}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/90 
                             hover:scale-110 hover:bg-gradient-to-r hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-300"
                >
                  {i}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
