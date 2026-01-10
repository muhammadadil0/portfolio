'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCode } from 'react-icons/hi';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('INITIALIZING');
    const [version] = useState('V1.0.0');
    const [isVisible, setIsVisible] = useState(true);
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        // Prevent body scroll while loading
        if (typeof window !== 'undefined') {
            document.body.style.overflow = 'hidden';
        }
        
        let progressInterval;
        let completionTimeout;
        
        // Animate progress from 0 to 100
        progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    // Wait a bit before hiding
                    completionTimeout = setTimeout(() => {
                        setIsVisible(false);
                        if (typeof window !== 'undefined') {
                            document.body.style.overflow = '';
                        }
                    }, 500);
                    return 100;
                }
                
                // Update loading text based on progress
                if (prev < 30) {
                    setLoadingText('LOADING');
                } else if (prev < 60) {
                    setLoadingText('PROCESSING');
                } else if (prev < 90) {
                    setLoadingText('FINALIZING');
                } else {
                    setLoadingText('COMPLETE');
                }
                
                // Variable speed: slower at start, faster in middle, slower at end
                let increment = 1;
                if (prev < 30) {
                    increment = 0.8;
                } else if (prev < 70) {
                    increment = 1.5;
                } else if (prev < 90) {
                    increment = 0.6;
                } else {
                    increment = 0.3;
                }
                
                return Math.min(prev + increment, 100);
            });
        }, 30); // Update every 30ms

        // Animate dots
        const dotInterval = setInterval(() => {
            setDotCount(prev => (prev + 1) % 4);
        }, 500);

        return () => {
            if (progressInterval) clearInterval(progressInterval);
            if (completionTimeout) clearTimeout(completionTimeout);
            clearInterval(dotInterval);
            if (typeof window !== 'undefined') {
                document.body.style.overflow = '';
            }
        };
    }, []);

    const dots = '.'.repeat(dotCount);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
                >
                    <div className="flex flex-col items-center justify-center space-y-8 px-6">
                        {/* Logo/Initial */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                            className="relative"
                        >
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                                <HiCode className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                            </div>
                            {/* Glow effect */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl -z-10"
                            />
                        </motion.div>

                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-center space-y-1"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                                Muhammad{' '}
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Adil
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                codewithadil
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: '100%' }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="w-full max-w-md space-y-3"
                        >
                            <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1, ease: "linear" }}
                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg"
                                >
                                    <motion.div
                                        animate={{
                                            x: ['-100%', '100%']
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                    />
                                </motion.div>
                            </div>
                            
                            {/* Percentage and Status */}
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="font-medium">{loadingText}</span>
                                    <span className="text-xs">{version}</span>
                                    <span className="text-blue-500 w-4 text-left">
                                        {dots}
                                    </span>
                                </div>
                                <motion.span
                                    key={Math.floor(progress)}
                                    initial={{ scale: 1.2 }}
                                    animate={{ scale: 1 }}
                                    className="text-primary font-semibold tabular-nums"
                                >
                                    {Math.floor(progress)}%
                                </motion.span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;

