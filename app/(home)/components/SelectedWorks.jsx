"use client"
import React from 'react'
import { motion } from 'framer-motion'
import ProjectShowcase from '@/app/(projects)/projects/components/ProjectShowcase'

const SelectedWorks = () => {
    // Select top 3-4 projects to showcase
    const featuredProjects = [
        {
            id: 1,
            title: "Purescope — AI-Powered Food & Product Analysis",
            description: "AI-powered mobile app that scans food products and provides instant health analysis. Features OCR extraction, LLM-based ingredient analysis, personalized recommendations, and allergen detection.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
            category: "Mobile App & AI",
            technologies: ["Flutter", "Django", "Python", "OCR", "LLM"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 2,
            title: "Plant Disease Prediction App",
            description: "Mobile application for diagnosing plant diseases through leaf image analysis. Integrates TensorFlow Lite model for real-time image classification with instant predictions.",
            image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
            category: "Machine Learning",
            technologies: ["Flutter", "TensorFlow", "Python", "ML"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 3,
            title: "Chat Application",
            description: "Real-time messaging application with end-to-end encryption, group chats, media sharing, and online status indicators. Features message reactions and push notifications.",
            image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
            category: "Real-Time Communication",
            technologies: ["Flutter", "Firebase", "Socket.io", "Node.js"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        },
        {
            id: 4,
            title: "SpyGuard App",
            description: "Advanced security and monitoring application for device protection. Features app usage tracking, location monitoring, and real-time alerts for suspicious activities.",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
            category: "Security & Monitoring",
            technologies: ["Flutter", "Firebase", "Android", "Encryption"],
            github: "https://github.com/muhammadadil0",
            demo: "#"
        }
    ]

    return (
        <section id="selected-works" className="relative">
            {/* Section Header */}
            <div className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-[clamp(3rem,6vw,6rem)] font-light text-white mb-4 tracking-tight">
                        Selected Works
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-400 max-w-2xl"
                    >
                        A collection of my latest projects showcasing innovation across mobile, web, and AI technologies.
                    </motion.p>
                </motion.div>
            </div>

            {/* Projects Container - Full Screen Sticky */}
            <div style={{
                width: '100%',
                position: 'relative',
                padding: 0,
                margin: 0
            }}>
                {featuredProjects.map((project, index) => (
                    <ProjectShowcase
                        key={project.id}
                        project={project}
                        index={index}
                        totalProjects={featuredProjects.length}
                    />
                ))}
            </div>

            {/* View All Projects Button */}
            <div className="container mx-auto px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <a
                        href="/projects-showcase"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-white/90 text-black font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]"
                    >
                        <span>View All Projects</span>
                        <svg 
                            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default SelectedWorks
