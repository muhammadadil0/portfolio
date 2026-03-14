"use client"
import { useRef, useState, useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { HiCode, HiSparkles, HiChip } from 'react-icons/hi'
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDocker, FaAws } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiGraphql, SiNextdotjs, SiTailwindcss, SiFigma, SiTerraform, SiKubernetes } from 'react-icons/si'
import { cn } from '@/lib/utils'

// Data for "Delivering Excellence" style cards (Spotlight effect)
const excellenceStack = [
    {
        icon: <SiNextdotjs className="w-8 h-8" />,
        name: "Next.js",
        description: "Full-stack React applications with SSR & SSG",
        colSpan: 2
    },
    {
        icon: <FaReact className="w-8 h-8" />,
        name: "React",
        description: "Component-based UI development",
        colSpan: 1
    },
    {
        icon: <SiTypescript className="w-8 h-8" />,
        name: "TypeScript",
        description: "Type-safe JavaScript development",
        colSpan: 1
    },
    {
        icon: <SiTailwindcss className="w-8 h-8" />,
        name: "Tailwind CSS",
        description: "Utility-first styling",
        colSpan: 1
    },
    {
        icon: <SiMongodb className="w-8 h-8" />,
        name: "MongoDB",
        description: "NoSQL database solutions",
        colSpan: 1
    },
    {
        icon: <SiPostgresql className="w-8 h-8" />,
        name: "PostgreSQL",
        description: "Relational database architecture",
        colSpan: 1
    },
    {
        icon: <SiRedis className="w-8 h-8" />,
        name: "Redis",
        description: "Caching & real-time data",
        colSpan: 1
    }
]

// Data for "From Concept to Reality" style (Horizontal scroll)
const workflowStack = [
    {
        number: "01",
        icon: <HiCode className="w-16 h-16" />,
        title: "Frontend",
        description: "Building responsive, performant user interfaces with modern frameworks and best practices.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
    },
    {
        number: "02",
        icon: <FaNodeJs className="w-16 h-16" />,
        title: "Backend",
        description: "Developing robust APIs and server-side logic with scalable architecture.",
        technologies: ["Node.js", "Express", "Python", "GraphQL"]
    },
    {
        number: "03",
        icon: <SiMongodb className="w-16 h-16" />,
        title: "Database",
        description: "Designing efficient data models and optimizing database performance.",
        technologies: ["MongoDB", "PostgreSQL", "Redis", "Prisma"]
    },
    {
        number: "04",
        icon: <FaDocker className="w-16 h-16" />,
        title: "DevOps",
        description: "Automating deployment pipelines and managing cloud infrastructure.",
        technologies: ["Docker", "Kubernetes", "AWS", "Terraform"]
    }
]

// Spotlight Card Component (Delivering Excellence style)
function SpotlightCard({ children, colSpan = 1 }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const cardRef = useRef(null)

    function onMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    const bg = useMotionTemplate`radial-gradient(
        600px circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.15),
        transparent 80%
    )`

    const border = useMotionTemplate`radial-gradient(
        400px circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.5),
        transparent 80%
    )`

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            className={`relative ${colSpan === 2 ? 'col-span-2' : ''}`}
            style={{
                minHeight: '280px',
                gridColumn: colSpan === 2 ? 'span 2' : 'span 1'
            }}
        >
            {/* Border Glow */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: border,
                    borderRadius: '16px',
                    zIndex: 1,
                    opacity: 0.6
                }}
            />

            {/* Card Background & Content */}
            <div style={{
                position: 'absolute',
                inset: '1px',
                background: 'rgba(23, 23, 23, 0.8)',
                borderRadius: '15px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem',
                overflow: 'hidden',
                backdropFilter: 'blur(20px)'
            }}>
                {/* Spotlight on Background */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: bg,
                        opacity: 0,
                        zIndex: -1,
                    }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Grain Texture */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.05,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none'
                }} />

                {children}
            </div>
        </div>
    )
}

// Excellence Grid Section
function ExcellenceGrid() {
    return (
        <div className="w-full mb-24">
            <style>{`
                .excellence-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 1.5rem;
                }
                @media (min-width: 768px) {
                    .excellence-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .excellence-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .col-span-2 {
                        grid-column: span 2;
                    }
                }
            `}</style>

            <div className="excellence-grid mt-12">
                {excellenceStack.map((service, index) => (
                    <SpotlightCard key={index} colSpan={service.colSpan}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: 'auto'
                        }}>
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '12px',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {service.icon}
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.3)' }}>
                                <HiSparkles size={24} />
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', position: 'relative', zIndex: 10 }}>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: 'white',
                                marginBottom: '0.75rem',
                                letterSpacing: '-0.02em',
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                            }}>
                                {service.name}
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                color: '#aaa',
                                lineHeight: 1.5,
                                maxWidth: '90%'
                            }}>
                                {service.description}
                            </p>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    )
}

// Horizontal Scroll Section (From Concept to Reality style)
function WorkflowStack() {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

    return (
        <section 
            ref={targetRef} 
            style={{ 
                position: 'relative', 
                height: '300vh',
                marginBottom: '6rem'
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                {/* Static Header */}
                <div style={{ 
                    position: 'absolute', 
                    top: '5vh', 
                    left: '5vw', 
                    zIndex: 10 
                }}>
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ 
                            textTransform: 'uppercase', 
                            color: '#666', 
                            fontSize: '1rem', 
                            letterSpacing: '0.1em', 
                            marginBottom: '1rem' 
                        }}
                    >
                        ( Tech Stack Journey )
                    </motion.h3>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ 
                            fontSize: 'clamp(2rem, 3vw, 3rem)', 
                            color: 'white', 
                            fontWeight: 300 
                        }}
                    >
                        From Concept to Reality
                    </motion.h2>
                </div>

                <motion.div 
                    style={{ 
                        x, 
                        display: 'flex', 
                        gap: '4rem', 
                        paddingLeft: '50vw' 
                    }}
                >
                    {workflowStack.map((step, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'relative',
                                width: '60vw',
                                height: '60vh',
                                flexShrink: 0,
                                perspective: '1000px'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                background: '#111',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '20px',
                                padding: '4rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}>
                                {/* Number Background */}
                                <span style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '2rem',
                                    fontSize: '15rem',
                                    fontWeight: 900,
                                    color: 'rgba(255,255,255,0.03)',
                                    lineHeight: 1,
                                    userSelect: 'none'
                                }}>
                                    {step.number}
                                </span>

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        style={{ 
                                            color: '#fff', 
                                            marginBottom: '2rem', 
                                            opacity: 0.8 
                                        }}
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <motion.h3 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        style={{ 
                                            fontSize: '4rem', 
                                            marginBottom: '1.5rem', 
                                            fontWeight: 600 
                                        }}
                                    >
                                        {step.title}
                                    </motion.h3>
                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        style={{ 
                                            fontSize: '1.5rem', 
                                            color: '#999', 
                                            lineHeight: 1.5, 
                                            maxWidth: '80%',
                                            marginBottom: '2rem'
                                        }}
                                    >
                                        {step.description}
                                    </motion.p>

                                    {/* Technology Tags */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-wrap gap-3"
                                    >
                                        {step.technologies.map((tech, idx) => (
                                            <div
                                                key={idx}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm backdrop-blur-sm"
                                            >
                                                {tech}
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

// Main Component
export default function TechStackCombined() {
    return (
        <section id="tech-stack" className="py-24 bg-black">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <motion.div className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm">
                        <HiChip className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">
                            Technologies I Work With
                        </span>
                    </motion.div>

                    <motion.h2 
                        className="text-4xl md:text-5xl font-bold text-primary"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Technical Expertise
                    </motion.h2>
                    
                    <motion.p 
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        A curated collection of modern technologies and tools that power my development workflow
                    </motion.p>
                </motion.div>

                {/* Part 1: Delivering Excellence Style */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                        Core Technologies
                    </h3>
                    <ExcellenceGrid />
                </motion.div>

                {/* Part 2: From Concept to Reality Style */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <WorkflowStack />
                </motion.div>
            </div>
        </section>
    )
}
