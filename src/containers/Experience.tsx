'use client'
import SectionTitle from '@/components/SectionTitle'
import { motion } from 'framer-motion'

const exp = [
  {
    role:'Data Science Intern',
    org:'Knowx Innovations',
    loc:'Bengaluru',
    time:'Nov 2024 – Apr 2025',
    desc:'Working on advanced data science projects, implementing machine learning algorithms, and developing data-driven solutions for business problems.',
    tags:['Python','Machine Learning','Data Analysis','TensorFlow','Pandas']
  },
  {
    role:'Java Full Stack Developer Intern',
    org:'Teachnook',
    loc:'Bengaluru',
    time:'May 2023 – Nov 2023',
    desc:'Developed full-stack web applications using Java Spring Boot and React. Collaborated with cross-functional teams to deliver scalable solutions.',
    tags:['Java','Spring Boot','React','MySQL','REST APIs']
  }
]

// animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 120, damping: 18, duration: 0.6 } 
  }
}

// matching pastel gradient palette
const gradients = [
  "from-green-400/30 via-emerald-400/20 to-teal-400/30",
  "from-blue-400/30 via-indigo-400/20 to-purple-400/30",
  "from-pink-400/30 via-rose-400/20 to-red-400/30",
  "from-orange-400/30 via-amber-400/20 to-yellow-400/30"
]

export default function Experience(){
  return (
    <div className="container">
      <SectionTitle 
        title="Experience" 
        subtitle="Professional journey in technology and innovation" 
      />

      <div className="grid md:grid-cols-2 gap-6">
        {exp.map((e,i)=> {
          const gradient = gradients[i % gradients.length]
          return (
            <motion.div 
              key={i} 
              className={`
                relative group overflow-hidden rounded-2xl border 
                border-white/10 bg-white/5 backdrop-blur-lg 
                p-6 shadow-lg transition-colors duration-500
              `}
              variants={cardVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once:true, amount:0.2 }}
            >
              {/* gradient overlay on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${gradient}`} />

              {/* TRIANGLE top-right */}
              <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${gradient} opacity-40 blur-lg clip-triangle rotate-12 transition-all duration-500 group-hover:opacity-70`} />
              {/* TRIANGLE bottom-left */}
              <div className={`absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br ${gradient} opacity-40 blur-lg clip-triangle -rotate-12 transition-all duration-500 group-hover:opacity-70`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    <div className="text-white/70">{e.org} • {e.loc}</div>
                  </div>
                  <div className="text-white/60 text-sm">{e.time}</div>
                </div>

                <p className="mt-3 text-white/80">{e.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((t,ti)=> (
                    <span 
                      key={ti} 
                      className="px-2.5 py-1 text-xs rounded bg-white/10 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
