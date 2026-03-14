"use client"
import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { config } from '@/config';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = config.NAV_ITEMS;

const NavLink = ({ href, label, isMobile = false }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className="relative"
        >
            <motion.span
                className={`relative ${isMobile ? 'px-4 py-3 text-base' : 'px-4 py-2.5 text-base'} text-gray-300 hover:text-white transition-colors ${isActive ? 'text-white font-medium' : ''} block`}
                whileHover={{ scale: isMobile ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {label}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-white/10 rounded-lg backdrop-blur-sm"
                        layoutId="activeNavBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        style={{
                            zIndex: -1
                        }}
                    />
                )}
            </motion.span>
        </Link>
    );
};

const Logo = ({ isMobile = false }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-90 transition-opacity"
        >
            <motion.div
                whileHover={{ opacity:0.5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-lg backdrop-blur-sm"
            >
                <span className="text-white font-bold text-xl">A</span>
            </motion.div>
            <motion.span
                className={`text-white font-semibold ${isMobile ? 'text-base' : 'text-base'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {config.developer.name}
            </motion.span>
        </Link>
    </motion.div>
);

const Navigation = ({ isMobile = false, onLinkClick }) => (
    <motion.nav
        className={isMobile ? "flex flex-col space-y-4" : "hidden lg:flex items-center space-x-1"}
        initial={isMobile ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isMobile ? 0 : 0.3, duration: 0.5 }}
    >
        {NAV_ITEMS.map((item, index) => (
            <motion.div
                key={item.href}
                initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: isMobile ? index * 0.1 : 0.1 * index }}
                onClick={onLinkClick}
            >
                <NavLink {...item} isMobile={isMobile} />
            </motion.div>
        ))}
    </motion.nav>
);

const ContactButton = ({ isMobile = false, onLinkClick }) => (
    <motion.div
        className={`flex items-center ${isMobile ? 'w-full justify-center mt-4' : ''}`}
        initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: isMobile ? 0.5 : 0.4, duration: 0.5 }}
        onClick={onLinkClick}
    >
        <a href="/Muhammad_Adil_Resume.pdf" download="Muhammad_Adil_Resume.pdf" className={isMobile ? 'w-full' : ''}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
            >
                <div className="absolute -inset-1 bg-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Button className={`${isMobile ? 'w-full' : ''} relative rounded-xl font-semibold bg-white text-black hover:bg-white/90 text-base px-6 py-2.5 flex items-center justify-center gap-2 transition-all shadow-lg`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume
                </Button>
            </motion.div>
        </a>
    </motion.div>
);

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                className="py-4 sm:py-5 z-50 text-white border-b border-zinc-800/50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Left: Logo */}
                        <div className="flex-shrink-0">
                            <Logo />
                        </div>
                        
                        {/* Center: Navigation */}
                        <div className="flex-1 flex justify-center">
                            <Navigation />
                        </div>
                        
                        {/* Right: Resume Button */}
                        <div className="flex-shrink-0 hidden md:block">
                            <ContactButton />
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <HiX className="w-6 h-6" />
                            ) : (
                                <HiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                            onClick={closeMobileMenu}
                        />
                        
                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-64 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col h-full p-6">
                                {/* Mobile Logo */}
                                <div className="mb-8">
                                    <Logo isMobile={true} />
                                </div>

                                {/* Mobile Navigation */}
                                <div className="flex-1">
                                    <Navigation isMobile={true} onLinkClick={closeMobileMenu} />
                                </div>

                                {/* Mobile Contact Button */}
                                <ContactButton isMobile={true} onLinkClick={closeMobileMenu} />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;