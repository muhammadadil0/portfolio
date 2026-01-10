'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiLightBulb, HiCloudUpload, HiCube, HiBriefcase } from 'react-icons/hi';

const processSteps = [
    {
        id: 1,
        title: 'Discovery',
        description: 'Understanding the core problem. I ask the hard questions to ensure we build the right thing, not just valid code.',
        Icon: HiLightBulb,
        side: 'left'
    },
    {
        id: 2,
        title: 'Architecture',
        description: 'Designing scalable systems. I plan the data flow, API structure, and component hierarchy before writing a single line.',
        Icon: HiCube,
        side: 'right'
    },
    {
        id: 3,
        title: 'Execution',
        description: 'Building with precision. Clean code, efficient algorithms, and battle-tested patterns. I write code that humans can read.',
        Icon: HiCode,
        side: 'left'
    },
    {
        id: 4,
        title: 'Deployment',
        description: 'Shipping with confidence. Automated testing, CI/CD pipelines, and monitoring. Because done is better than perfect.',
        Icon: HiCloudUpload,
        side: 'right'
    }
];

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const itemAnimationRight = {
    hidden: { opacity: 0, x: 50 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const iconAnimation = {
    hidden: { opacity: 0, scale: 0 },
    show: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: 0.3,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const ProcessSection = () => {
    return (
        <section id="process" className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-primary backdrop-blur-sm shadow-lg mb-4"
                    >
                        <HiBriefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                            MY APPROACH
                        </span>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4"
                    >
                        The Process
                    </motion.h2>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        From chaotic ideas to structured reality. Here&apos;s how I ship.
                    </motion.p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden md:block" />
                    
                    {/* Process Steps */}
                    <motion.div
                        variants={containerAnimation}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="relative space-y-16 md:space-y-24"
                    >
                        {processSteps.map((step, index) => {
                            const isLeft = step.side === 'left';
                            const isLast = index === processSteps.length - 1;
                            
                            return (
                                <motion.div
                                    key={step.id}
                                    variants={isLeft ? itemAnimation : itemAnimationRight}
                                    className={`relative flex flex-col md:flex-row items-center ${
                                        isLeft ? 'md:flex-row-reverse' : ''
                                    } gap-8 md:gap-12`}
                                >
                                    {/* Content Card */}
                                    <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="bg-secondary/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 group"
                                        >
                                            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                                                {step.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Timeline Icon (Centered) */}
                                    <div className="relative z-10 flex-shrink-0 group">
                                        <motion.div
                                            variants={iconAnimation}
                                            className="relative"
                                        >
                                            {/* Outer glow ring */}
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                                className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors duration-300"
                                            />
                                            
                                            {/* Icon Circle */}
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-secondary border-2 border-primary rounded-full flex items-center justify-center shadow-lg group-hover:border-primary/60 group-hover:shadow-primary/20 transition-all duration-300 cursor-default">
                                                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                                                    <step.Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                                                </div>
                                                
                                                {/* Pulse animation */}
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 0, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                    className="absolute inset-0 bg-primary/30 rounded-full"
                                                />
                                            </div>
                                            
                                            {/* Connection line from icon to next step (mobile hidden) */}
                                            {!isLast && (
                                                <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/20 transform -translate-x-1/2" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Spacer for opposite side (maintains layout) */}
                                    <div className="hidden md:block w-5/12" />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;

