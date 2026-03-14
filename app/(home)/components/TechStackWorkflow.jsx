"use client"
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiCode, HiSparkles, HiChip } from 'react-icons/hi'
import { FaPython, FaReact, FaNodeJs, FaGithub, FaDocker, FaAws } from 'react-icons/fa'
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiRedis, SiGraphql, SiNextdotjs, SiTailwindcss, SiFigma, SiTerraform, SiKubernetes } from 'react-icons/si'

// Tech Stack Journey Data
const techJourney = [
    {
        number: "01",
        icon: <SiNextdotjs className="w-20 h-20" />,
        title: "Frontend",
        description: "Creating beautiful, responsive, and performant user interfaces with modern React ecosystems.",
        technologies: [
            { name: "Next.js 14", icon: <SiNextdotjs />, color: "text-white" },
            { name: "React", icon: <FaReact />, color: "text-blue-400" },
            { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
            { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-400" },
            { name: "Framer Motion", icon: <span className="text-2xl">🎬</span>, color: "text-purple-400" },
        ]
    },
    {
        number: "02",
        icon: <FaNodeJs className="w-20 h-20" />,
        title: "Backend",
        description: "Building scalable APIs and robust server-side architectures with Node.js and Python.",
        technologies: [
            { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
            { name: "Express", icon: <span className="text-2xl">🚂</span>, color: "text-gray-400" },
            { name: "Python", icon: <FaPython />, color: "text-yellow-400" },
            { name: "Django", icon: <span className="text-2xl">🎸</span>, color: "text-green-600" },
            { name: "GraphQL", icon: <SiGraphql />, color: "text-pink-500" },
        ]
    },
    {
        number: "03",
        icon: <SiMongodb className="w-20 h-20" />,
        title: "Database",
        description: "Designing efficient data models and optimizing queries for performance at scale.",
        technologies: [
            { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
            { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
            { name: "Redis", icon: <SiRedis />, color: "text-red-500" },
            { name: "Prisma", icon: <span className="text-2xl">⚡</span>, color: "text-cyan-500" },
        ]
    },
    {
        number: "04",
        icon: <FaDocker className="w-20 h-20" />,
        title: "DevOps",
        description: "Automating deployment pipelines and managing cloud infrastructure for seamless operations.",
        technologies: [
            { name: "Docker", icon: <FaDocker />, color: "text-blue-500" },
            { name: "AWS", icon: <FaAws />, color: "text-orange-400" },
            { name: "Kubernetes", icon: <SiKubernetes />, color: "text-blue-400" },
            { name: "Terraform", icon: <SiTerraform />, color: "text-purple-500" },
            { name: "GitHub Actions", icon: <FaGithub />, color: "text-white" },
        ]
    },
    {
        number: "05",
        icon: <HiCode className="w-20 h-20" />,
        title: "Tools & More",
        description: "Additional technologies and tools that enhance development workflow and productivity.",
        technologies: [
            { name: "Git", icon: <FaGithub />, color: "text-orange-500" },
            { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
            { name: "Figma", icon: <SiFigma />, color: "text-purple-400" },
            { name: "VS Code", icon: <span className="text-2xl">💻</span>, color: "text-blue-400" },
        ]
    }
]

export default function TechStackWorkflow() {
    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

    // Opacity fade effect
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

    return (
        <section 
            ref={targetRef} 
            className="relative h-[400vh]"
            id="tech-stack-workflow"
        >
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Static Header */}
                <div className="absolute top-[10vh] left-[5vw] z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 rounded-full text-primary backdrop-blur-sm mb-4"
                    >
                        <HiChip className="w-4 h-4 text-primary" />
                        <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            Tech Stack Journey
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white"
                    >
                        From Concept to Reality
                    </motion.h2>
                </div>

                {/* Horizontal Scrolling Cards */}
                <motion.div 
                    style={{ 
                        x, 
                        display: 'flex', 
                        gap: '4rem', 
                        paddingLeft: '50vw' 
                    }}
                    className="items-center"
                >
                    {techJourney.map((step, index) => (
                        <div
                            key={index}
                            className="relative w-[85vw] md:w-[70vw] lg:w-[60vw] h-[70vh] lg:h-[65vh] flex-shrink-0"
                        >
                            <div className="w-full h-full bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm flex flex-col justify-center relative overflow-hidden">
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5" />
                                
                                {/* Number Background */}
                                <span className="absolute -top-4 -right-4 text-[12rem] md:text-[18rem] font-black text-white/[0.02] select-none leading-none">
                                    {step.number}
                                </span>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                        whileInView={{ opacity: 0.9, scale: 1, rotateY: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="text-white mb-8"
                                    >
                                        {step.icon}
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h3 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight"
                                    >
                                        {step.title}
                                    </motion.h3>

                                    {/* Description */}
                                    <motion.p 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mb-10"
                                    >
                                        {step.description}
                                    </motion.p>

                                    {/* Technology Tags with Icons */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 }}
                                        className="flex flex-wrap gap-4"
                                    >
                                        {step.technologies.map((tech, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.5 + idx * 0.08 }}
                                                whileHover={{ 
                                                    scale: 1.05, 
                                                    y: -4,
                                                    borderColor: 'rgba(139, 92, 246, 0.5)'
                                                }}
                                                className="group px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md hover:bg-purple-500/10 transition-all duration-300 cursor-default flex items-center gap-3"
                                            >
                                                <div className={`w-6 h-6 flex items-center justify-center ${tech.color}`}>
                                                    {tech.icon}
                                                </div>
                                                <span className="text-sm font-medium text-white/90 group-hover:text-white">
                                                    {tech.name}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
