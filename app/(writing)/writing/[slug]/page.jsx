'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowLeft, HiCalendar, HiClock, HiPencil, HiLink, HiThumbUp } from 'react-icons/hi';
import { FaLinkedin, FaXTwitter, FaGithub } from 'react-icons/fa6';
import { articles } from '../articles-data';

const ArticlePage = () => {
    const params = useParams();
    const article = articles.find(a => a.slug === params.slug);
    const [reactions, setReactions] = useState(0);
    const [linkCopied, setLinkCopied] = useState(false);
    const [hasReacted, setHasReacted] = useState(false);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
                    <Link href="/writing" className="text-primary hover:underline">
                        Back to Articles
                    </Link>
                </div>
            </div>
        );
    }

    const articleUrl = typeof window !== 'undefined' ? `${window.location.origin}/writing/${article.slug}` : '';
    const articleTitle = article.title;
    const articleDescription = article.description;

    const handleShare = (platform) => {
        const url = encodeURIComponent(articleUrl);
        const title = encodeURIComponent(articleTitle);
        const text = encodeURIComponent(articleDescription);

        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(articleUrl);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const handleReaction = () => {
        if (!hasReacted) {
            setReactions(prev => prev + 1);
            setHasReacted(true);
        } else {
            setReactions(prev => Math.max(0, prev - 1));
            setHasReacted(false);
        }
    };

    return (
        <article className="min-h-screen py-12 sm:py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-3xl">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        href="/writing"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Articles</span>
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    {/* Date and Read Time */}
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-1.5">
                            <HiCalendar className="w-4 h-4" />
                            <time>{article.date}</time>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1.5">
                            <HiClock className="w-4 h-4" />
                            <span>{article.readTime} MIN READ</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {article.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1.5 bg-secondary/50 border border-zinc-800/50 rounded-full text-sm font-medium text-muted-foreground"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* Featured Image */}
                    {article.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-10"
                        >
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Article Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="prose prose-invert prose-lg max-w-none"
                >
                    {/* Introduction */}
                    <div className="bg-secondary/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 mb-8">
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {article.content.introduction}
                        </p>
                    </div>

                    {/* Main Content Sections */}
                    <div className="space-y-10">
                        {article.content.sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4 mt-10">
                                    {section.heading}
                                </h2>
                                <div className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4">
                                    {section.content.split('\n\n').map((paragraph, pIndex) => (
                                        paragraph.trim() && (
                                            <p key={pIndex} className="mb-4 last:mb-0">
                                                {paragraph.trim()}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Rule/Principle Box - for first article */}
                    {article.slug === 'building-scalable-systems' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-12 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-primary mb-1">The Rule:</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        If you can&apos;t explain why you&apos;re splitting a service, you shouldn&apos;t split it. Premature microservices are more dangerous than a well-designed monolith.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </motion.div>

                {/* Share This Article Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 pt-8 border-t border-zinc-800/50"
                >
                    <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                        SHARE THIS ARTICLE
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            <FaLinkedin className="w-5 h-5" />
                            <span>Share on LinkedIn</span>
                        </button>
                        <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-900 text-white rounded-lg font-medium transition-colors"
                        >
                            <FaXTwitter className="w-5 h-5" />
                            <span>Share on X</span>
                        </button>
                        <button
                            onClick={() => handleShare('copy')}
                            className="flex items-center gap-2 px-4 py-2.5 bg-secondary/50 hover:bg-secondary border border-zinc-800/50 text-primary rounded-lg font-medium transition-colors"
                        >
                            <HiLink className="w-5 h-5" />
                            <span>{linkCopied ? 'Link Copied!' : 'Copy Link'}</span>
                        </button>
                    </div>

                    {/* Suggest Edit */}
                    <button className="flex items-center gap-2 px-4 py-2 text-sm bg-secondary/30 hover:bg-secondary/50 border border-zinc-800/50 rounded-lg text-muted-foreground hover:text-primary transition-colors mb-6">
                        <HiPencil className="w-4 h-4" />
                        <span>Suggest Edit</span>
                    </button>

                    <p className="text-sm text-muted-foreground mb-8">
                        Found this helpful? Share it with your network!
                    </p>
                </motion.div>

                {/* Was This Helpful Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-12"
                >
                    <h3 className="text-lg font-semibold text-primary mb-2">
                        WAS THIS HELPFUL?
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Show your appreciation with a reaction
                    </p>
                    <button
                        onClick={handleReaction}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                            hasReacted
                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                : 'bg-secondary/30 border-zinc-800/50 text-muted-foreground hover:border-primary/30 hover:text-primary'
                        }`}
                    >
                        <HiThumbUp className="w-5 h-5" />
                        <span className="font-medium">{reactions} reactions</span>
                    </button>
                    <p className="text-xs text-muted-foreground mt-4">
                        Claps appreciated • Powered by GitHub Reactions
                    </p>
                </motion.div>

                {/* Comments Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12"
                >
                    <h3 className="text-lg font-semibold text-primary mb-6">
                        0 comments
                    </h3>
                    <div className="bg-secondary/30 border border-zinc-800/50 rounded-xl p-4">
                        <textarea
                            placeholder="Sign in to comment"
                            disabled
                            className="w-full h-24 bg-transparent text-muted-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none mb-4"
                        />
                        <div className="flex justify-end">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                                <FaGithub className="w-4 h-4" />
                                <span>Sign in with GitHub</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* More Writing Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="pt-8 border-t border-zinc-800/50"
                >
                    <h3 className="text-2xl font-bold text-primary mb-2">
                        More Writing
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Explore the full archive of thoughts.
                    </p>
                    <Link href="/writing">
                        <button className="px-6 py-3 bg-black hover:bg-zinc-900 text-white rounded-lg font-medium transition-colors">
                            View All Articles
                        </button>
                    </Link>
                </motion.div>
            </div>
        </article>
    );
};

export default ArticlePage;

