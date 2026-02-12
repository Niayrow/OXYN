"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    ArrowUpRight,
    Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { posts } from './data';

export default function BlogPage() {
    return (
        <main className="min-h-screen pt-32 pb-40 px-6 bg-[#020617] text-white">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6"
                    >
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest italic">OXYN Intelligence</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
                        Archives <br /><span className="text-cyan-400">Scientifiques</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-lg">
                        Des articles courts, sourcés et sans détour pour maîtriser votre biologie.
                    </p>
                </header>

                {/* ARTICLES GRID */}
                <div className="grid grid-cols-1 gap-6">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/blog/${post.id}`} className="group block">
                                <article className={`relative p-8 rounded-[2.5rem] bg-gradient-to-br ${post.color} to-transparent border border-white/5 hover:border-white/20 transition-all overflow-hidden`}>

                                    {/* Background Icon Décoratif corrigé pour TypeScript */}
                                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:scale-110 group-hover:opacity-[0.07] transition-all duration-500">
                                        <post.Icon size={200} />
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-slate-400">
                                                    {post.category}
                                                </span>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase">
                                                    <Clock size={12} /> {post.time}
                                                </div>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-3 group-hover:text-cyan-400 transition-colors">
                                                {post.title}
                                            </h2>
                                            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                                                {post.desc}
                                            </p>
                                        </div>

                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all self-end md:self-center">
                                            <ArrowUpRight size={24} />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}