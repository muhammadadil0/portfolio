'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { articles } from './articles-data';

const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
        }
    }
};

const WritingPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = useMemo(() => {
        if (!searchQuery.trim()) return articles;
        
        const query = searchQuery.toLowerCase();
        return articles.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query) ||
            article.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    return (
        <div className="min-h-screen py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-4xl">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 sm:mb-16"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary mb-4">
                        Writing.
                        <span className="inline-block w-3 h-3 bg-blue-500 rounded-full ml-2"></span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                        Notes on software engineering, development practices, and building quality products.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </motion.div>

                {/* Articles List */}
                <motion.div
                    variants={containerAnimation}
                    initial="hidden"
                    animate="show"
                    className="space-y-8 sm:space-y-10"
                >
                    {filteredArticles.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <p className="text-muted-foreground text-lg">
                                No articles found matching &quot;{searchQuery}&quot;
                            </p>
                        </motion.div>
                    ) : (
                        filteredArticles.map((article, index) => (
                            <motion.article
                                key={article.slug}
                                variants={itemAnimation}
                                className="group"
                            >
                                <Link href={`/writing/${article.slug}`}>
                                    <div className="bg-secondary/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                                            {/* Article Image */}
                                            {article.image && (
                                                <div className="relative w-full sm:w-48 h-48 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            )}

                                            {/* Article Content */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <time>{article.date}</time>
                                                    <span>•</span>
                                                    <span>{article.readTime} MIN READ</span>
                                                </div>

                                                <h2 className="text-2xl sm:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                                                    {article.title}
                                                </h2>

                                                <p className="text-muted-foreground leading-relaxed">
                                                    {article.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {article.tags.map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="px-3 py-1 bg-secondary/50 border border-zinc-800/50 rounded-full text-xs font-medium text-muted-foreground"
                                                        >
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="pt-2">
                                                    <span className="text-sm text-primary font-medium group-hover:underline inline-flex items-center gap-1">
                                                        READ ARTICLE
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default WritingPage;

