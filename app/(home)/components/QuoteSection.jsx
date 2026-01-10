'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiLightBulb } from 'react-icons/hi';

const QuoteSection = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || typeof window === 'undefined') return;

        const ctx = canvas.getContext('2d');
        const dots = [];

        // Set canvas size and initialize
        const initCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width || 800;
            canvas.height = rect.height || 400;
            
            // Clear and regenerate dots based on new size
            dots.length = 0;
            
            // Create dots in vertical lines pattern
            const columns = 15;
            const rows = 10;
            for (let col = 0; col < columns; col++) {
                for (let row = 0; row < rows; row++) {
                    dots.push({
                        x: (col / columns) * canvas.width + (canvas.width / columns) / 2,
                        y: (row / rows) * canvas.height + (canvas.height / rows) / 2,
                        radius: Math.random() * 1.5 + 0.5,
                        opacity: Math.random() * 0.4 + 0.3,
                        pulseSpeed: Math.random() * 0.02 + 0.01,
                        pulsePhase: Math.random() * Math.PI * 2
                    });
                }
            }

            // Add random dots for more organic feel
            for (let i = 0; i < 50; i++) {
                dots.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.3 + 0.2,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        };
        
        // Initial setup
        setTimeout(initCanvas, 100);
        
        const resizeCanvas = () => {
            initCanvas();
        };
        window.addEventListener('resize', resizeCanvas);

        let animationFrame;
        let startTime = Date.now();
        const animationDuration = 3000;

        const animate = () => {
            if (canvas.width === 0 || canvas.height === 0) {
                animationFrame = requestAnimationFrame(animate);
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % animationDuration) / animationDuration;
            
            dots.forEach(dot => {
                // Pulsing opacity
                dot.pulsePhase += dot.pulseSpeed;
                const currentOpacity = dot.opacity + Math.sin(dot.pulsePhase) * 0.2;
                
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${Math.max(0, Math.min(1, currentOpacity))})`; // cyan-400
                ctx.fill();
            });

            // Create radial burst effect on the right
            const centerX = canvas.width * 0.85;
            const centerY = canvas.height * 0.5;
            const burstRadius = (canvas.width * 0.25) * (Math.sin(progress * Math.PI * 2) * 0.5 + 0.5);
            
            for (let i = 0; i < 30; i++) {
                const angle = (i / 30) * Math.PI * 2 + progress * Math.PI * 2;
                const distance = burstRadius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(34, 211, 238, ${0.7 * (1 - (distance / (canvas.width * 0.25)))})`;
                    ctx.fill();
                }
            }

            animationFrame = requestAnimationFrame(animate);
        };

        // Start animation after initial setup
        setTimeout(() => {
            animate();
        }, 150);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [])

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Dark Panel with Animated Dots */}
                    <div className="relative bg-black rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-zinc-800/50 shadow-2xl min-h-[400px]">
                        {/* Animated Background Canvas */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ minHeight: '400px' }}
                        />

                        {/* Content */}
                        <div className="relative z-10 p-8 sm:p-12 md:p-16 min-h-[400px] flex items-center">
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                {/* Lightbulb Icon */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                                    className="relative"
                                >
                                    <div className="relative">
                                        <HiLightBulb className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.6, 1, 0.6]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl -z-10"
                                        />
                                    </div>
                                </motion.div>

                                {/* Quote Text */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="space-y-4 max-w-2xl"
                                >
                                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed">
                                        Success seems to be connected with<br />
                                        action. Successful people keep<br />
                                        moving.
                                    </p>
                                </motion.div>

                                {/* Attribution */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex items-center gap-2 text-right self-end mt-4"
                                >
                                    <div className="h-px w-12 bg-cyan-400/50"></div>
                                    <p className="text-sm sm:text-base text-cyan-400/80 font-medium">
                                        — Conrad Hilton
                                    </p>
                                </motion.div>

                                {/* Decorative Circle */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="absolute top-8 right-8 sm:top-12 sm:right-12 w-16 h-16 sm:w-20 sm:h-20 border-2 border-cyan-400/30 rounded-full"
                                >
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-full h-full border-2 border-cyan-400/20 rounded-full"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default QuoteSection;

