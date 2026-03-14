"use client"
import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { HiCode, HiSparkles, HiChip } from 'react-icons/hi'
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDocker, FaAws, FaPhp } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiGraphql, SiNextdotjs, SiTailwindcss, SiFigma, SiTerraform, SiKubernetes, SiFlutter, SiDjango, SiFlask, SiTensorflow } from 'react-icons/si'
import { cn } from '@/lib/utils'

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
        500px circle at ${mouseX}px ${mouseY}px,
        rgba(139, 92, 246, 0.15),
        transparent 70%
    )`

    const border = useMotionTemplate`radial-gradient(
        350px circle at ${mouseX}px ${mouseY}px,
        rgba(139, 92, 246, 0.5),
        transparent 70%
    )`

    return (
        <div
            ref={cardRef}
            onMouseMove={onMouseMove}
            className={`relative ${colSpan === 2 ? 'md:col-span-2' : ''}`}
            style={{
                minHeight: '260px',
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
                background: 'rgba(23, 23, 23, 0.9)',
                borderRadius: '15px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                padding: '1.75rem',
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
                    opacity: 0.04,
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    pointerEvents: 'none'
                }} />

                {children}
            </div>
        </div>
    )
}

// Technology categories with different styling
const techCategories = [
    {
        title: "Frontend Mastery",
        icon: <SiNextdotjs className="w-8 h-8" />,
        colSpan: 2,
        technologies: [
            { name: "Next.js 14", icon: <SiNextdotjs />, level: "Expert" },
            { name: "React", icon: <FaReact />, level: "Expert" },
            { name: "TypeScript", icon: <SiTypescript />, level: "Advanced" },
            { name: "Tailwind", icon: <SiTailwindcss />, level: "Expert" },
        ]
    },
    {
        title: "Backend Power",
        icon: <FaNodeJs className="w-8 h-8" />,
        colSpan: 1,
        technologies: [
            { name: "Node.js", icon: <FaNodeJs />, level: "Expert" },
            { name: "Python", icon: <FaPython />, level: "Advanced" },
            { name: "Django", icon: <SiDjango />, level: "Advanced" },
        ]
    },
    {
        title: "Database Solutions",
        icon: <SiMongodb className="w-8 h-8" />,
        colSpan: 1,
        technologies: [
            { name: "MongoDB", icon: <SiMongodb />, level: "Expert" },
            { name: "PostgreSQL", icon: <SiPostgresql />, level: "Advanced" },
            { name: "Redis", icon: <SiRedis />, level: "Intermediate" },
        ]
    },
    {
        title: "AI & ML",
        icon: <SiTensorflow className="w-8 h-8" />,
        colSpan: 1,
        technologies: [
            { name: "TensorFlow", icon: <SiTensorflow />, level: "Intermediate" },
            { name: "Flask", icon: <SiFlask />, level: "Advanced" },
            { name: "Pandas", icon: <span className="text-xs">🐼</span>, level: "Intermediate" },
        ]
    },
    {
        title: "Mobile Development",
        icon: <SiFlutter className="w-8 h-8" />,
        colSpan: 1,
        technologies: [
            { name: "Flutter", icon: <SiFlutter />, level: "Advanced" },
            { name: "Dart", icon: <span className="text-xs">🎯</span>, level: "Advanced" },
        ]
    },
    {
        title: "DevOps & Cloud",
        icon: <FaDocker className="w-8 h-8" />,
        colSpan: 2,
        technologies: [
            { name: "Docker", icon: <FaDocker />, level: "Advanced" },
            { name: "AWS", icon: <FaAws />, level: "Intermediate" },
            { name: "Kubernetes", icon: <SiKubernetes />, level: "Beginner" },
            { name: "Terraform", icon: <SiTerraform />, level: "Beginner" },
        ]
    }
]

function TechCategoryCard({ category }) {
    return (
        <SpotlightCard colSpan={category.colSpan}>
            <div className="h-full flex flex-col relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-white">
                            {category.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                            {category.title}
                        </h3>
                    </div>
                    <HiSparkles className="text-purple-400/60 w-6 h-6" />
                </div>

                {/* Technology Grid */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    {category.technologies.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-white/90 w-5 h-5 flex items-center justify-center">
                                    {tech.icon}
                                </div>
                                <span className="text-sm font-medium text-white/90">
                                    {tech.name}
                                </span>
                            </div>
                            
                            {/* Proficiency Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ 
                                        width: tech.level === 'Expert' ? '95%' : 
                                               tech.level === 'Advanced' ? '85%' : 
                                               tech.level === 'Intermediate' ? '70%' : '50%' 
                                    }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                                    className="h-full bg-gradient-to-r from-purple-500/80 to-purple-500 rounded-full"
                                />
                            </div>
                            
                            <div className="mt-1.5 text-[10px] text-white/50 text-right">
                                {tech.level}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SpotlightCard>
    )
}

export default function TechStackDeliveringExcellence() {
    return (
        <section id="tech-stack" className="py-24 bg-black relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
            
            <div className="container mx-auto px-6 relative z-10">
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

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {techCategories.map((category, index) => (
                        <TechCategoryCard key={index} category={category} />
                    ))}
                </div>

                {/* Additional Skills Tags */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16 pt-8 border-t border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white/80 mb-6 text-center">
                        Also experienced with
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { name: "GraphQL", icon: <SiGraphql /> },
                            { name: "Figma", icon: <SiFigma /> },
                            { name: "Git", icon: <FaGithub /> },
                            { name: "JavaScript", icon: <SiJavascript /> },
                            { name: "PHP", icon: <FaPhp /> },
                            { name: "MySQL", icon: <span className="text-xs">🗄️</span> },
                            { name: "Firebase", icon: <span className="text-xs">🔥</span> },
                            { name: "C/C++", icon: <span className="text-xs">⚡</span> },
                        ].map((skill, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + idx * 0.05 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/70 text-sm backdrop-blur-sm hover:border-purple-500/30 hover:text-white transition-all duration-300 cursor-default flex items-center gap-2"
                            >
                                <span className="w-4 h-4 flex items-center justify-center">{skill.icon}</span>
                                {skill.name}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
