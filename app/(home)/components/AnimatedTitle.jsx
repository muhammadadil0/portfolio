"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const AnimatedTitle = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Transform values for smooth parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 1.2])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated Title */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-[15vw] leading-[0.85] tracking-[-0.05em] font-medium text-white text-center">
          Muhammad<br />
          <span className="text-white/60">Adil</span>
        </h1>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-white/50 rounded-full"
          />
        </motion.div>
        <p className="text-white/40 text-xs mt-4 text-center uppercase tracking-widest">
          Scroll to explore
        </p>
      </motion.div>
    </div>
  )
}

export default AnimatedTitle
