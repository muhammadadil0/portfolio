"use client"
import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

export default function ProjectShowcase({ project, index = 0, totalProjects = 6 }) {
    const containerRef = useRef(null)
    const [zIndexValue, setZIndexValue] = useState(totalProjects - index)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Opacity animation for smooth fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    useEffect(() => {
        let lastZIndex = totalProjects - index

        const unsubscribe = scrollYProgress.on('change', (latest) => {
            let newZIndex
            if (latest >= 0.1 && latest <= 0.9) {
                newZIndex = totalProjects - index
            } else {
                newZIndex = Math.max(1, index)
            }

            if (newZIndex !== lastZIndex) {
                setZIndexValue(newZIndex)
                lastZIndex = newZIndex
            }
        })

        return () => unsubscribe()
    }, [scrollYProgress, index, totalProjects])

    return (
        <div style={{ 
            height: '200vh', 
            position: 'relative', 
            width: '100%', 
            marginTop: index === 0 ? 0 : '-100vh' 
        }}>
            <motion.div
                ref={containerRef}
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    height: '100vh',
                    zIndex: zIndexValue,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    willChange: 'opacity, transform',
                    opacity
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}
                >
                    {/* Project Image */}
                    <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            willChange: 'transform'
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)',
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Project Info */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '3rem',
                            left: '3rem',
                            right: '3rem',
                            color: 'white',
                            zIndex: 10
                        }}
                    >
                        <span style={{
                            fontSize: '0.85rem',
                            color: '#aaa',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            marginBottom: '0.5rem',
                            display: 'block'
                        }}>
                            {project.category || 'Project'}
                        </span>
                        <h3 style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 300,
                            marginBottom: '1rem',
                            lineHeight: 1.2,
                            letterSpacing: '-0.02em'
                        }}>
                            {project.title}
                        </h3>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#ccc',
                            lineHeight: 1.6,
                            marginBottom: '1rem',
                            maxWidth: '600px'
                        }}>
                            {project.description}
                        </p>
                        
                        {/* Technologies */}
                        <div style={{
                            display: 'flex',
                            gap: '0.75rem',
                            flexWrap: 'wrap',
                            marginBottom: '1.5rem'
                        }}>
                            {project.technologies.map((tech, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        fontSize: '0.85rem',
                                        color: '#fff',
                                        background: 'rgba(255,255,255,0.1)',
                                        padding: '0.4rem 0.9rem',
                                        borderRadius: '20px',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap'
                        }}>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        background: 'white',
                                        color: 'black',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)'
                                        e.target.style.boxShadow = '0 10px 20px rgba(255,255,255,0.2)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)'
                                        e.target.style.boxShadow = 'none'
                                    }}
                                >
                                    <FaExternalLinkAlt size={14} />
                                    Live Demo
                                </a>
                            )}
                            
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        background: 'rgba(255,255,255,0.1)',
                                        color: 'white',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.2)'
                                        e.target.style.transform = 'translateY(-2px)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.1)'
                                        e.target.style.transform = 'translateY(0)'
                                    }}
                                >
                                    <FaGithub size={16} />
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
