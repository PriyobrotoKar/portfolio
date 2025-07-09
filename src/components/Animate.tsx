import React from 'react'
import { motion, type MotionProps } from 'framer-motion'

interface AnimateProps extends MotionProps {
  children?: React.ReactNode
  className?: string
}

const Animate = ({ children, className, ...props }: AnimateProps) => {
  return (
    <motion.div
      viewport={{
        once: true
      }}
      {...props}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default Animate
