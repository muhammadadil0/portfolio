"use client";

import { useEffect, useState, useRef } from "react";
import { FaGithub } from "react-icons/fa";

export default function FallingCards() {
    const [card, setCard] = useState({ y: -400, landed: false });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 200, y: -400 });
    const animationRef = useRef(null);

    const targetY = 300; // Where card will land
    const lineStartY = 80; // Where dotted line starts (navbar height)

    useEffect(() => {
        // Animation loop for falling
        const animate = () => {
            setCard(prev => {
                if (!prev.landed && prev.y < targetY) {
                    const newY = prev.y + 3;
                    setPosition(p => ({ ...p, y: newY }));
                    return { y: newY, landed: false };
                } else if (!prev.landed) {
                    setPosition(p => ({ ...p, y: targetY }));
                    return { y: targetY, landed: true };
                }
                return prev;
            });
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const handleMouseDown = (e) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
            setCard({ y: e.clientY - dragOffset.y, landed: true });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, dragOffset]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
            {/* Dotted line from navbar to card */}
            {position.y > lineStartY && (
                <svg 
                    className="absolute pointer-events-none"
                    style={{
                        left: `${position.x + 125}px`,
                        top: `${lineStartY}px`,
                        height: `${position.y - lineStartY + 20}px`,
                        width: '2px'
                    }}
                >
                    <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2={position.y - lineStartY + 20}
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="2"
                        strokeDasharray="8,8"
                        strokeLinecap="round"
                    />
                </svg>
            )}

            {/* GitHub icon at top of line */}
            {position.y > lineStartY && (
                <div 
                    className="absolute pointer-events-none"
                    style={{
                        left: `${position.x + 115}px`,
                        top: `${lineStartY - 20}px`
                    }}
                >
                    <div className="w-10 h-10 rounded-full bg-zinc-900/90 border-2 border-zinc-700/50 flex items-center justify-center">
                        <FaGithub className="w-5 h-5 text-white" />
                    </div>
                </div>
            )}

            {/* The Card */}
            <div
                onMouseDown={handleMouseDown}
                style={{
                    position: 'absolute',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: isDragging ? 'scale(1.02) rotate(1deg)' : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.3s',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    pointerEvents: 'auto',
                    opacity: position.y < 0 ? 0 : 1
                }}
                className="w-[250px] bg-zinc-950/95 backdrop-blur-xl border border-zinc-800/80 rounded-3xl shadow-2xl overflow-hidden hover:border-zinc-700/80 transition-all"
            >
                {/* Card Header with GitHub icon */}
                <div className="relative h-24 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border-b border-zinc-800/50 flex items-center justify-center">
                    <FaGithub className="w-8 h-8 text-zinc-600" />
                </div>
                
                {/* Card content */}
                <div className="p-6 flex flex-col items-center -mt-12">
                    {/* Profile image */}
                    <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-zinc-900 mb-4 bg-zinc-900 shadow-xl">
                        <img 
                            src="/adil_profile.jpeg" 
                            alt="Muhammad Adil"
                            className="w-full h-full object-cover"
                            draggable="false"
                        />
                    </div>
                    
                    {/* Username */}
                    <div className="mb-3 text-right w-full pr-2">
                        <span className="text-zinc-500 text-sm font-mono">muhammadadil</span>
                    </div>
                    
                    {/* Decorative lines */}
                    <div className="w-full space-y-2 mb-6">
                        <div className="h-2 bg-zinc-800/50 rounded-full w-3/4"></div>
                        <div className="h-2 bg-zinc-800/50 rounded-full w-full"></div>
                        <div className="h-2 bg-zinc-800/50 rounded-full w-2/3"></div>
                        <div className="h-2 bg-zinc-800/50 rounded-full w-5/6"></div>
                    </div>
                </div>

                {/* Bottom badge */}
                <div className="absolute bottom-4 right-4">
                    <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-md">
                        <span className="text-emerald-400 text-xs font-mono">[Interactive 3D Card]</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
