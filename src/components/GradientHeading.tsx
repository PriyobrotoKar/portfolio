import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

const GradientHeading = ({
  className,
  text,
  children
}: {
  text?: string
  className?: string
  children?: ReactNode
}) => {
  return (
    <motion.h2
      initial={{ filter: 'blur(10px)', y: 8, opacity: 0 }}
      whileInView={{ opacity: 1, filter: 'blur(0)', y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={cn(
        'gradient-heading leading-tight w-fit mx-auto max-w-screen-lg bg-gradient-to-t from-neutral-600 to-white bg-clip-text text-transparent',
        className
      )}
    >
      {text ?? children}
    </motion.h2>
  )
}

export default GradientHeading
