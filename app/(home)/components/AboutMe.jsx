"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { HiUser, HiAcademicCap, HiCode, HiLightningBolt } from 'react-icons/hi';
import Image from 'next/image';

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

const AboutMe = () => {
    return (
        <section className="py-24" id="about">
            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-16"
                >
                    {/* Section Header */}
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <motion.div
                            variants={itemAnimation}
                            className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-5 py-2.5 rounded-full text-primary backdrop-blur-sm"
                        >
                            <HiUser className="w-6 h-6 text-primary" />
                            <span className="text-base font-semibold text-primary">About Me</span>
                        </motion.div>

                        <motion.div variants={itemAnimation} className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary">
                                Get to Know Me
                            </h2>
                        </motion.div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                        {/* Left side - Image */}
                        <motion.div
                            variants={itemAnimation}
                            className="relative"
                        >
                            <div className="relative w-full max-w-md mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                                <div className="relative rounded-3xl overflow-hidden border-2 border-zinc-800/50 bg-white/5 backdrop-blur-md aspect-square">
                                    <Image
                                        src="/adil_profile.jpeg"
                                        alt="Muhammad Adil"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right side - Content */}
                        <motion.div
                            variants={containerAnimation}
                            className="space-y-6"
                        >
                            <motion.div variants={itemAnimation} className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-bold text-white">
                                    Hello! I&apos;m Muhammad Adil
                                </h3>
                                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                    I am a 7th-semester Software Engineering student at FAST NUCES Peshawar. I specialize in mobile app development and web development, with hands-on experience building projects in Flutter and Django.
                                </p>
                                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                                    Currently, I am exploring freelancing opportunities while expanding my skills in AI, particularly working with AI agents and intelligent systems. I am passionate about combining software development with emerging technologies to create practical and innovative solutions.
                                </p>
                            </motion.div>

                            {/* Highlights */}
                            <motion.div variants={itemAnimation} className="grid sm:grid-cols-2 gap-4 pt-4">
                                <div className="relative group">
                                    <div className="bg-black border border-white/30 p-5 rounded-xl backdrop-blur-md cursor-default relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                        </div>
                                        <div className="relative z-10 flex items-start gap-4">
                                            <HiAcademicCap className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-white text-base mb-1">Education</h4>
                                                <p className="text-sm text-gray-300">7th Semester at FAST NUCES</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="bg-black border border-white/30 p-5 rounded-xl backdrop-blur-md cursor-default relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                        </div>
                                        <div className="relative z-10 flex items-start gap-4">
                                            <HiCode className="w-8 h-8 text-emerald-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-white text-base mb-1">Specialization</h4>
                                                <p className="text-sm text-gray-300">Flutter & Django Expert</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="bg-black border border-white/30 p-5 rounded-xl backdrop-blur-md cursor-default relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                        </div>
                                        <div className="relative z-10 flex items-start gap-4">
                                            <HiLightningBolt className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-white text-base mb-1">Focus Area</h4>
                                                <p className="text-sm text-gray-300">AI Agents & ML Systems</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="bg-black border border-white/30 p-5 rounded-xl backdrop-blur-md cursor-default relative overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                                        </div>
                                        <div className="relative z-10 flex items-start gap-4">
                                            <HiUser className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-semibold text-white text-base mb-1">Status</h4>
                                                <p className="text-sm text-gray-300">Open to Freelancing</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMe;
