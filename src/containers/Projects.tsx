'use client'
import SectionTitle from '@/components/SectionTitle'
import { motion } from 'framer-motion'
import ButtonGlow from '@/components/UI/ButtonGlow'

// Project list with GitHub links
const projects = [
  {
    title: 'AI-Powered Image Captioning',
    desc: 'Deep learning model that automatically generates descriptive captions for images using advanced computer vision and NLP techniques.',
    tags: ['TensorFlow', 'Computer Vision', 'NLP', 'Python'],
    code: 'https://github.com/mrtycoonshrinidhi6/ai-image-captioning',
    live: '#', // replace with live URL if available
  },
  {
    title: 'LangChain Conversational Chatbot',
    desc: 'Intelligent chatbot built with LangChain framework, featuring conversation memory and context-aware responses.',
    tags: ['LangChain', 'OpenAI', 'Python', 'Streamlit'],
    code: 'https://github.com/mrtycoonshrinidhi6/langchain-chatbot',
    live: '#',
  },
  {
    title: 'Deepfake Detection',
    desc: 'Advanced ML model for detecting deepfake videos and images using state-of-the-art detection algorithms.',
    tags: ['PyTorch', 'Computer Vision', 'Deep Learning', 'OpenCV'],
    code: 'https://github.com/mrtycoonshrinidhi6/deepfake-detection',
    live: '#',
  },
  {
    title: 'Gemini Video Summarizer',
    desc: 'AI-powered video summarization tool that extracts key insights and generates concise summaries from video content.',
    tags: ['Gemini API', 'Video Processing', 'NLP', 'React'],
    code: 'https://github.com/mrtycoonshrinidhi6/gemini-video-summarizer',
    live: '#',
  },
]

// Random gradient pool for hover overlays
const gradients = [
  'from-green-500/20 to-emerald-500/20',
  'from-indigo-500/20 to-purple-500/20',
  'from-pink-500/20 to-rose-500/20',
  'from-sky-500/20 to-cyan-500/20',
  'from-yellow-500/20 to-orange-500/20',
]

export default function Projects() {
  return (
    <div className="container py-12">
      <SectionTitle
        title="Featured Projects"
        subtitle="Innovative AI/ML and web applications showcasing cutting-edge technology"
      />

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {projects.map((p, i) => {
          const gradient = gradients[i % gradients.length]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="relative group card p-6 flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer"
              onClick={() => window.open(p.code, '_blank')}
            >
              {/* Hover gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Decorative dots */}
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/40" />
              <span className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-white/40" />

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-white/70 mt-2">{p.desc}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t, ti) => (
                    <span
                      key={ti}
                      className="px-2.5 py-1 text-xs rounded bg-white/10 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-5 flex gap-3">
                  <ButtonGlow href={p.code}>View Code</ButtonGlow>
                  <ButtonGlow href={p.live}>Live Demo</ButtonGlow>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
