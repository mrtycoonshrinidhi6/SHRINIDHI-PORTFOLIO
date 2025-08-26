import { Variants } from 'framer-motion'


export const fadeInUp: Variants = {
hidden: { opacity: 0, y: 20 },
show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } }
}


export const staggerChildren: Variants = {
hidden: {},
show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}


export const popCard: Variants = {
hidden: { opacity: 0, scale: 0.95 },
show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}


export const blurReveal: Variants = {
hidden: { opacity: 0, filter: 'blur(8px)' },
show: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7 } }
}