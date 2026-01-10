'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiTerminal } from 'react-icons/hi';
import { FaPython } from 'react-icons/fa';
import { SiDjango, SiFlutter, SiMongodb, SiMysql, SiFirebase, SiTensorflow, SiJavascript } from 'react-icons/si';

const coreStack = [
    { name: 'Python', icon: FaPython },
    { name: 'Django', icon: SiDjango },
    { name: 'Flutter', icon: SiFlutter },
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'MySQL', icon: SiMysql },
    { name: 'Firebase', icon: SiFirebase },
    { name: 'TensorFlow', icon: SiTensorflow },
];

const codeLines = [
    { text: 'class FullStackDeveloper:', delay: 0.2 },
    { text: '    def __init__(self):', delay: 0.4 },
    { text: '        self.passion = "Building complete solutions"', delay: 0.6 },
    { text: '        self.stack = ["Flutter", "Django", "Python"]', delay: 0.8 },
    { text: '', delay: 1.0 },
    { text: '    def build(self, project):', delay: 1.2 },
    { text: '        frontend = craft_ui_with_flutter()', delay: 1.4 },
    { text: '        backend = architect_django_api()', delay: 1.6 },
    { text: '        deploy = ship_with_confidence(frontend, backend)', delay: 1.8 },
    { text: '        return production_ready(deploy)', delay: 2.0 },
    { text: '', delay: 2.2 },
    { text: '# Philosophy: Build it robust, keep it simple.', delay: 2.4 },
];

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const CodePhilosophy = () => {
    const [visibleLines, setVisibleLines] = useState([]);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const timers = codeLines.map((line, index) => {
            return setTimeout(() => {
                setVisibleLines(prev => [...prev, line]);
            }, line.delay * 1000);
        });

        // Blinking cursor
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            clearInterval(cursorInterval);
        };
    }, []);

    return (
        <section id="philosophy" className="py-24 relative">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto"
                >
                    {/* Left Side - Text Content */}
                    <motion.div variants={itemAnimation} className="space-y-6 lg:pr-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight">
                                More than just{' '}
                                <span className="text-primary bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    code.
                                </span>
                            </h2>
                            
                            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                                I&apos;m a full-stack engineer who thrives on building complete solutions. While I craft beautiful interfaces, I also obsess over what happens under the hood: API architecture, database optimization, and scalable system design.
                            </p>
                            
                            <div className="pt-4">
                                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                    My philosophy is simple:{' '}
                                    <span className="font-bold text-primary">
                                        Build it robust, keep it simple.
                                    </span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Core Stack */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="pt-6"
                        >
                            <h3 className="text-lg font-semibold text-primary mb-4 uppercase tracking-wide">
                                Core Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {coreStack.map((tech, index) => {
                                    const IconComponent = tech.icon;
                                    return (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.1 * index }}
                                            whileHover={{ scale: 1.05 }}
                                            className="group"
                                        >
                                            <div className="bg-secondary/50 border border-zinc-800/50 hover:border-primary/30 rounded-lg px-4 py-2.5 flex items-center gap-2 cursor-default transition-all duration-300 backdrop-blur-sm">
                                                <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                                <span className="text-sm font-medium text-primary">
                                                    {tech.name}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Code Terminal */}
                    <motion.div
                        variants={itemAnimation}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Terminal Window */}
                        <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Terminal Header */}
                            <div className="bg-zinc-800/80 border-b border-zinc-700/50 px-4 py-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <HiTerminal className="w-4 h-4 text-zinc-400" />
                                        <span className="text-xs text-zinc-400 font-mono">
                                            adil@dev:~/portfolio
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <HiCode className="w-4 h-4 text-zinc-400" />
                                </div>
                            </div>

                            {/* Terminal Content */}
                            <div className="p-6 font-mono text-sm">
                                <div className="space-y-1 text-zinc-300">
                                    <div className="text-green-400/80 mb-4">
                                        $ cat philosophy.py
                                    </div>
                                    
                                    {visibleLines.map((line, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="leading-relaxed"
                                        >
                                            {line.text ? (
                                                <span className={line.text.startsWith('#') ? 'text-blue-400/70' : 'text-zinc-300'}>
                                                    {line.text}
                                                </span>
                                            ) : (
                                                <br />
                                            )}
                                        </motion.div>
                                    ))}
                                    
                                    {visibleLines.length > 0 && (
                                        <motion.span
                                            animate={{ opacity: showCursor ? 1 : 0 }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            className="inline-block w-2 h-4 bg-primary ml-1"
                                        />
                                    )}
                                </div>

                                {visibleLines.length === 0 && (
                                    <div className="text-zinc-500 text-xs">
                                        Initializing code editor...
                                    </div>
                                )}
                            </div>

                            {/* Terminal Footer */}
                            <div className="bg-zinc-800/50 border-t border-zinc-700/50 px-4 py-2 text-xs text-zinc-500 font-mono flex items-center justify-between">
                                <span>Python 3.11</span>
                                <span className="text-green-400/60">Ready</span>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-4 -right-4 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CodePhilosophy;

