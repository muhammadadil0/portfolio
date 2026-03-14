"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiTerminal, HiX } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { config } from "@/config";

export default function Terminal() {
    const [isOpen, setIsOpen] = useState(false); // Terminal closed by default
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "system", text: "Welcome to Muhammad Adil's Portfolio Terminal v1.0" },
        { type: "system", text: "Type 'help' to see available commands" },
    ]);
    const [cardY, setCardY] = useState(-300);
    const [cardLanded, setCardLanded] = useState(false);
    const inputRef = useRef(null);
    const historyRef = useRef(null);
    const cardAnimationRef = useRef(null);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    // Card falling animation - only when terminal is open
    useEffect(() => {
        if (isOpen) {
            const targetY = 20; // Card stops higher up to connect with hook
            const animate = () => {
                setCardY(prev => {
                    if (prev < targetY && !cardLanded) {
                        return prev + 3;
                    } else if (prev >= targetY && !cardLanded) {
                        setCardLanded(true);
                        return targetY;
                    }
                    return prev;
                });
                if (!cardLanded) {
                    cardAnimationRef.current = requestAnimationFrame(animate);
                }
            };
            cardAnimationRef.current = requestAnimationFrame(animate);
        } else {
            // Reset card position when terminal closes
            setCardY(-300);
            setCardLanded(false);
        }
        return () => {
            if (cardAnimationRef.current) {
                cancelAnimationFrame(cardAnimationRef.current);
            }
        };
    }, [cardLanded, isOpen]);

    const commands = {
        help: () => ({
            type: "output",
            text: `Available commands:
  help              - Show this help message
  about             - About Muhammad Adil
  skills            - List all skills
  projects          - List all projects
  project [name]    - Search for a specific project
  skill [name]      - Search for a specific skill
  education         - Show education background
  contact           - Show contact information
  clear             - Clear terminal
  github            - Open GitHub profile
  linkedin          - Open LinkedIn profile`
        }),

        about: () => ({
            type: "output",
            text: `Muhammad Adil - Software Engineering Student
7th Semester at FAST NUCES Peshawar
Specializing in Flutter, Django, and AI-powered applications
Passionate about building innovative mobile and web solutions`
        }),

        skills: () => {
            const allSkills = config.skills.flatMap(category =>
                category.skills.map(skill => skill.name)
            );
            return {
                type: "output",
                text: `Skills:\n${allSkills.map((skill, i) => `  ${i + 1}. ${skill}`).join('\n')}`
            };
        },

        projects: () => {
            return {
                type: "output",
                text: `Projects:\n${config.projects.map((project, i) =>
                    `  ${i + 1}. ${project.title}`
                ).join('\n')}`
            };
        },

        education: () => {
            return {
                type: "output",
                text: `Education:
  • Bachelor of Software Engineering
    FAST NUCES University (2022-2026)
    Peshawar, Pakistan
    
  • FSc Pre-Engineering
    University College For Boys (2020-2022)
    Peshawar, Pakistan`
            };
        },

        contact: () => {
            return {
                type: "output",
                text: `Contact Information:
  Email: adilraxiq64@gmail.com
  GitHub: @muhammadadil0
  LinkedIn: muhammad-adil-42677b307
  Location: Peshawar, Pakistan`
            };
        },

        clear: () => {
            setHistory([]);
            return null;
        },

        github: () => {
            window.open("https://github.com/muhammadadil0", "_blank");
            return { type: "output", text: "Opening GitHub profile..." };
        },

        linkedin: () => {
            window.open("https://www.linkedin.com/in/muhammad-adil-42677b307", "_blank");
            return { type: "output", text: "Opening LinkedIn profile..." };
        }
    };

    const handleCommand = (cmd) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const [command, ...args] = trimmedCmd.split(" ");

        // Add command to history
        setHistory(prev => [...prev, { type: "command", text: `$ ${cmd}` }]);

        if (!command) return;

        // Handle project search
        if (command === "project" && args.length > 0) {
            const searchTerm = args.join(" ");
            const project = config.projects.find(p =>
                p.title.toLowerCase().includes(searchTerm)
            );

            if (project) {
                setHistory(prev => [...prev, {
                    type: "output",
                    text: `Project: ${project.title}\n${project.description}\nTechnologies: ${project.technologies.join(", ")}`
                }]);
            } else {
                setHistory(prev => [...prev, {
                    type: "error",
                    text: `Project not found: ${searchTerm}`
                }]);
            }
            return;
        }

        // Handle skill search
        if (command === "skill" && args.length > 0) {
            const searchTerm = args.join(" ");
            let found = false;

            config.skills.forEach(category => {
                const skill = category.skills.find(s =>
                    s.name.toLowerCase().includes(searchTerm)
                );
                if (skill) {
                    setHistory(prev => [...prev, {
                        type: "output",
                        text: `Skill: ${skill.name}\nCategory: ${category.title}\nLevel: ${skill.level}`
                    }]);
                    found = true;
                }
            });

            if (!found) {
                setHistory(prev => [...prev, {
                    type: "error",
                    text: `Skill not found: ${searchTerm}`
                }]);
            }
            return;
        }

        // Handle regular commands
        if (commands[command]) {
            const result = commands[command]();
            if (result) {
                setHistory(prev => [...prev, result]);
            }
        } else {
            setHistory(prev => [...prev, {
                type: "error",
                text: `Command not found: ${command}. Type 'help' for available commands.`
            }]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    return (
        <>
            {/* Floating Terminal Icon Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-[70] w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 group"
                >
                    <HiTerminal className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </motion.button>
            )}

            {/* Terminal Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 right-4 z-[70] w-[85vw] max-w-4xl h-[500px] bg-black/95 backdrop-blur-md border-2 border-green-500/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Terminal Header */}
                        <div className="bg-green-600/20 border-b border-green-500/50 px-3 py-1.5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HiTerminal className="w-3 h-3 text-green-400" />
                                <span className="text-green-400 font-mono text-[10px]">terminal@portfolio</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-green-400 hover:text-red-400 transition-colors"
                            >
                                <HiX className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Terminal Content */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* Left Side - Card Area */}
                            <div className="w-[320px] border-r border-green-500/30 p-8 relative overflow-hidden">
                                {/* Centered container for card and line */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Dotted line from top through hook to card */}
                                        {cardY > 0 && (
                                            <svg
                                                className="absolute left-1/2 -translate-x-1/2"
                                                style={{
                                                    top: '-150px',
                                                    height: `${150 + cardY + 5}px`,
                                                    width: '2px'
                                                }}
                                            >
                                                <line
                                                    x1="1"
                                                    y1="0"
                                                    x2="1"
                                                    y2={150 + cardY + 5}
                                                    stroke="rgba(6, 182, 212, 0.5)"
                                                    strokeWidth="2"
                                                    strokeDasharray="8,8"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        )}

                                        {/* GitHub icon at top */}
                                        {cardY > 0 && (
                                            <div className="absolute left-1/2 -translate-x-1/2 top-[-140px]">
                                                <div className="w-8 h-8 rounded-full bg-zinc-900/90 border-2 border-zinc-700/50 flex items-center justify-center">
                                                    <FaGithub className="w-4 h-4 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Card Handle/Hook at top */}
                                        {cardY > 0 && (
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 z-30"
                                                style={{ top: '-5px' }}
                                            >
                                                {/* Hook/Handle */}
                                                <div className="relative">
                                                    {/* Curved hook shape */}
                                                    <svg width="40" height="20" viewBox="0 0 40 20" className="drop-shadow-lg">
                                                        {/* Hook body */}
                                                        <path
                                                            d="M 20 0 Q 15 5, 15 10 L 15 15 Q 15 18, 18 18 L 22 18 Q 25 18, 25 15 L 25 10 Q 25 5, 20 0"
                                                            fill="rgba(6, 182, 212, 0.3)"
                                                            stroke="rgba(6, 182, 212, 0.8)"
                                                            strokeWidth="1.5"
                                                        />
                                                        {/* Glow effect */}
                                                        <circle cx="20" cy="2" r="3" fill="rgba(6, 182, 212, 0.5)" className="animate-pulse" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}

                                        {/* The Card - Futuristic Hologram Style */}
                                        <motion.div
                                            style={{
                                                y: cardY,
                                                opacity: cardY < 0 ? 0 : 1
                                            }}
                                            className="relative w-[180px] h-[280px] bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-purple-950/40 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden border border-cyan-500/30 backdrop-blur-xl"
                                        >
                                            {/* Animated gradient background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>

                                            {/* Grid pattern overlay */}
                                            <div className="absolute inset-0 opacity-20" style={{
                                                backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
                                                backgroundSize: '20px 20px'
                                            }}></div>

                                            {/* Top Status Bar */}
                                            <div className="absolute top-0 left-0 right-0 z-20 p-3 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                                                    <span className="text-cyan-400 text-[9px] font-mono uppercase tracking-wider">Online</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FaGithub className="w-3.5 h-3.5 text-cyan-400/80" />
                                                    <span className="text-cyan-300/70 text-[8px] font-mono">@muhammadadil</span>
                                                </div>
                                            </div>

                                            {/* Profile Image - Hexagon Shape */}
                                            <div className="absolute inset-0 flex items-center justify-center p-8 pt-16 pb-20">
                                                <div className="relative w-full h-full">
                                                    {/* Hexagon border glow */}
                                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-xl"></div>

                                                    {/* Main image container */}
                                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                                                        <img
                                                            src="/adil_profile.jpeg"
                                                            alt="Muhammad Adil"
                                                            className="w-full h-full object-cover"
                                                            draggable="false"
                                                        />
                                                        {/* Hologram scan line effect */}
                                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>

                                                        {/* Corner accents */}
                                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Info Panel */}
                                            <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-black/80 via-black/60 to-transparent">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-cyan-300 text-[10px] font-bold tracking-wide">MUHAMMAD ADIL</span>
                                                    <span className="text-cyan-400/60 text-[8px] font-mono">Software Engineer</span>
                                                </div>
                                            </div>

                                            {/* Floating particles effect */}
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                                                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                                                <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Terminal Content */}
                            <div className="flex-1 flex flex-col">
                                <div
                                    ref={historyRef}
                                    className="flex-1 overflow-y-auto p-2 font-mono text-[10px] space-y-1"
                                >
                                    {history.map((entry, index) => (
                                        <div key={index} className="whitespace-pre-wrap">
                                            {entry.type === "command" && (
                                                <div className="text-green-400">{entry.text}</div>
                                            )}
                                            {entry.type === "output" && (
                                                <div className="text-gray-300">{entry.text}</div>
                                            )}
                                            {entry.type === "error" && (
                                                <div className="text-red-400">{entry.text}</div>
                                            )}
                                            {entry.type === "system" && (
                                                <div className="text-blue-400">{entry.text}</div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Terminal Input */}
                                <form onSubmit={handleSubmit} className="border-t border-green-500/50 p-2 flex items-center gap-1.5">
                                    <span className="text-green-400 font-mono text-[10px]">$</span>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className="flex-1 bg-transparent text-green-400 font-mono outline-none text-[10px]"
                                        placeholder="Type command..."
                                        autoComplete="off"
                                    />
                                </form>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
