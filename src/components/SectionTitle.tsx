import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface SectionTitleProps {
  title: string
  subtitle?: string
  centered?: boolean // <-- added
}

export default function SectionTitle({ title, subtitle, centered = false }: SectionTitleProps) {
  return (
    <div className={`container mb-10 ${centered ? 'text-center' : ''}`}>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-2 text-white/70"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
