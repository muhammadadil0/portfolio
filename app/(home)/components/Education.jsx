"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap } from 'react-icons/hi';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

const Education = () => {
    const education = [
        {
            degree: "Bachelor of Software Engineering",
            institution: "FAST NUCES University",
            period: "Aug 2022 - Jun 2026",
            location: "Peshawar, Pakistan",
            description: "Currently in 7th semester, pursuing Bachelor's degree in Software Engineering with focus on full-stack development, mobile applications, and machine learning."
        },
        {
            degree: "FSc Pre-Engineering",
            institution: "University College For Boys (UCB)",
            period: "2020 - 2022",
            location: "Peshawar, Pakistan",
            description: "Completed intermediate education with focus on Mathematics, Physics, and Computer Science."
        },
        {
            degree: "Matriculation (FA)",
            institution: "Al Muslim Public School (APS)",
            period: "2019 - 2020",
            location: "Shergarh, Mardan, Pakistan",
            description: "Completed secondary education with strong foundation in science and mathematics."
        }
    ];

    return (
        <section className="py-24" id="education">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {/* Section Header */}
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <motion.div
                            variants={itemAnimation}
                            className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-5 py-2.5 rounded-full text-primary backdrop-blur-sm"
                        >
                            <HiAcademicCap className="w-6 h-6 text-primary" />
                            <span className="text-base font-semibold text-primary">Education</span>
                        </motion.div>

                        <motion.div variants={itemAnimation} className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Academic Background
                            </h2>
                        </motion.div>
                    </div>

                    {/* Education Items */}
                    <motion.div
                        variants={containerAnimation}
                        className="max-w-4xl mx-auto space-y-6"
                    >
                        {education.map((edu, index) => (
                            <motion.div
                                key={index}
                                variants={itemAnimation}
                                className="relative group"
                            >
                                <div className="bg-black border border-white/30 p-6 rounded-xl backdrop-blur-md cursor-default relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                    </div>
                                    
                                    <div className="relative z-10 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                            <span className="text-sm text-gray-400">{edu.period}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <span className="font-semibold">{edu.institution}</span>
                                            <span className="text-gray-500">•</span>
                                            <span className="text-gray-400">{edu.location}</span>
                                        </div>
                                        
                                        <p className="text-gray-300 leading-relaxed">
                                            {edu.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
