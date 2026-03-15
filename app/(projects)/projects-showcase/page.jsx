"use client"
import React from 'react'
import BackgroundEffects from '@/components/ui/background-effects'
import { config } from '@/config'
import ProjectShowcase from '../projects/components/ProjectShowcase'
import SectionTitle from '../projects/components/SectionTitle'




const ProjectsShowcase = () => {
    const projects = config.projects
    
    return (
        <div style={{ 
            width: '100%', 
            position: 'relative',
            background: '#0a0a0a'
        }}>
            {/* Fixed Header with Title */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '2rem 3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                pointerEvents: 'none',
                mixBlendMode: 'difference',
                color: 'white'
            }}>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    lineHeight: 1
                }}>
                    Muhammad<br />Adil
                </div>
                <nav style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    Projects
                </nav>
            </header>

            {/* Projects Container */}
            <div style={{
                width: '100%',
                position: 'relative',
                padding: 0,
                margin: 0
            }}>
                {projects.map((project, index) => (
                    <ProjectShowcase
                        key={project.id}
                        project={project}
                        index={index}
                        totalProjects={projects.length}
                    />
                ))}
            </div>

            {/* Footer Section */}
            <footer style={{
                width: '100%',
                padding: '5rem 3rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.3)'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 300,
                        color: 'white',
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Interested in working together?
                    </h3>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#aaa',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}>
                        Let's build something amazing together. Get in touch and let's discuss how we can bring your ideas to life.
                    </p>
                    <a
                        href="/contact"
                        style={{
                            display: 'inline-block',
                            padding: '1rem 2.5rem',
                            background: 'white',
                            color: 'black',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
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
                        Get In Touch
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default ProjectsShowcase
