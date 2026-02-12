"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    ArrowLeft,
    Clock,
    Sparkles,
    BookOpen,
    Quote,
    BarChart3 as BarChartIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { posts, ContentBlock, ChartDataPoint } from '../data';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell,
    AreaChart, Area,
    ResponsiveContainer,
} from 'recharts';

/* ─── Animation variants ────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: 0.1 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
};

/* ─── Tip variant colors ────────────────────────────────────── */
const tipColors = {
    cyan: {
        bg: 'bg-cyan-500/5',
        border: 'border-cyan-500/20',
        icon: 'bg-cyan-500/10 text-cyan-400',
        title: 'text-cyan-400',
        glow: 'shadow-cyan-500/5',
    },
    blue: {
        bg: 'bg-blue-500/5',
        border: 'border-blue-500/20',
        icon: 'bg-blue-500/10 text-blue-400',
        title: 'text-blue-400',
        glow: 'shadow-blue-500/5',
    },
    amber: {
        bg: 'bg-amber-500/5',
        border: 'border-amber-500/20',
        icon: 'bg-amber-500/10 text-amber-400',
        title: 'text-amber-400',
        glow: 'shadow-amber-500/5',
    },
    green: {
        bg: 'bg-emerald-500/5',
        border: 'border-emerald-500/20',
        icon: 'bg-emerald-500/10 text-emerald-400',
        title: 'text-emerald-400',
        glow: 'shadow-emerald-500/5',
    },
};

/* ─── Block renderer ────────────────────────────────────────── */
function RenderBlock({ block, index }: { block: ContentBlock; index: number }) {
    switch (block.type) {
        case 'paragraph':
            return (
                <motion.p
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="text-slate-300 text-[15px] md:text-base leading-[1.85] tracking-wide"
                    dangerouslySetInnerHTML={{
                        __html: block.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                            .replace(/\n/g, '<br />')
                    }}
                />
            );

        case 'heading': {
            const HeadingIcon = block.icon;
            return (
                <motion.div
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex items-center gap-4 mt-6"
                >
                    {HeadingIcon && (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5 flex items-center justify-center shrink-0">
                            <HeadingIcon size={18} className="text-cyan-400" />
                        </div>
                    )}
                    <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight text-white">
                        {block.text}
                    </h2>
                </motion.div>
            );
        }

        case 'stats':
            return (
                <motion.div
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                    {block.items.map((stat, j) => {
                        const StatIcon = stat.icon;
                        return (
                            <motion.div
                                key={j}
                                custom={j}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03, y: -4 }}
                                className="relative group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-all duration-300 overflow-hidden cursor-default"
                            >
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                                        <StatIcon size={18} className="text-cyan-400" />
                                    </div>
                                    <p className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            );

        case 'tip': {
            const TipIcon = block.icon;
            const colors = tipColors[block.variant];
            return (
                <motion.div
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ x: 4 }}
                    className={`relative p-6 rounded-2xl ${colors.bg} border ${colors.border} shadow-lg ${colors.glow} overflow-hidden transition-all duration-300`}
                >
                    {/* Decorative gradient line */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${block.variant === 'cyan' ? 'from-cyan-400 to-cyan-600' :
                        block.variant === 'blue' ? 'from-blue-400 to-blue-600' :
                            block.variant === 'amber' ? 'from-amber-400 to-amber-600' :
                                'from-emerald-400 to-emerald-600'
                        }`} />

                    <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center shrink-0`}>
                            <TipIcon size={18} />
                        </div>
                        <div>
                            <p className={`text-xs font-black uppercase tracking-widest ${colors.title} mb-2`}>
                                {block.title}
                            </p>
                            <p className="text-slate-300 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            );
        }

        case 'list':
            return (
                <div className="space-y-3">
                    {block.items.map((item, j) => {
                        const ItemIcon = item.icon;
                        return (
                            <motion.div
                                key={j}
                                custom={index + j * 0.3}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-30px" }}
                                whileHover={{ x: 8, scale: 1.01 }}
                                className="group flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/15 hover:bg-white/[0.04] transition-all duration-300 cursor-default"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5 flex items-center justify-center shrink-0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all duration-300">
                                    <ItemIcon size={18} className="text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                                        {item.title}
                                    </p>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            );

        case 'quote':
            return (
                <motion.div
                    custom={index}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 border border-white/5"
                >
                    {/* Quote icon */}
                    <div className="absolute -top-4 left-8">
                        <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center">
                            <Quote size={14} className="text-slate-950" />
                        </div>
                    </div>

                    <p className="text-lg md:text-xl font-medium italic text-slate-200 leading-relaxed mt-2"
                        dangerouslySetInnerHTML={{
                            __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                        }}
                    />
                    {block.author && (
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mt-4">— {block.author}</p>
                    )}
                </motion.div>
            );

        case 'divider':
            return (
                <motion.div
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-center gap-4 py-4"
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </motion.div>
            );

        case 'chart':
            return <ChartBlock block={block} index={index} />;

        default:
            return null;
    }
}

/* ─── Custom Tooltip ────────────────────────────────────────── */
function CustomTooltip({ active, payload, unit }: { active?: boolean; payload?: Array<{ value: number; payload: ChartDataPoint }>; unit?: string }) {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{d.payload.name}</p>
            <p className="text-lg font-black text-white">{d.value}{unit || ''}</p>
        </div>
    );
}

/* ─── Chart Block Component ─────────────────────────────────── */
const CHART_COLORS_DEFAULT = ['#22d3ee', '#3b82f6', '#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

function ChartBlock({ block, index }: { block: Extract<ContentBlock, { type: 'chart' }>; index: number }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <motion.div
            custom={index}
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            onViewportEnter={() => setIsVisible(true)}
            className="relative rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden"
        >
            {/* Subtle glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

            {/* Header */}
            <div className="px-6 pt-6 pb-2 md:px-8 md:pt-8">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <BarChartIcon size={14} className="text-cyan-400" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-cyan-400">Graphique</p>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mt-2">{block.title}</h3>
                {block.subtitle && (
                    <p className="text-xs text-slate-500 mt-1 font-medium">{block.subtitle}</p>
                )}
            </div>

            {/* Chart */}
            <div className="px-2 pb-4 md:px-4 md:pb-6">
                <div className="h-[280px] md:h-[320px] w-full">
                    {block.chartType === 'bar' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={block.data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#475569', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip content={<CustomTooltip unit={block.unit} />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                <Bar
                                    dataKey="value"
                                    radius={[8, 8, 0, 0]}
                                    animationBegin={isVisible ? 0 : 99999}
                                    animationDuration={1200}
                                    animationEasing="ease-out"
                                >
                                    {block.data.map((entry, i) => (
                                        <Cell key={i} fill={entry.color || CHART_COLORS_DEFAULT[i % CHART_COLORS_DEFAULT.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {block.chartType === 'pie' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={block.data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="55%"
                                    outerRadius="80%"
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                    animationBegin={isVisible ? 0 : 99999}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                    label={({ name, value }) => `${value}${block.unit || ''}`}
                                >
                                    {block.data.map((entry, i) => (
                                        <Cell key={i} fill={entry.color || CHART_COLORS_DEFAULT[i % CHART_COLORS_DEFAULT.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip unit={block.unit} />} />
                            </PieChart>
                        </ResponsiveContainer>
                    )}

                    {block.chartType === 'area' && (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={block.data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fill: '#475569', fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={['dataMin - 50', 'dataMax + 50']}
                                />
                                <Tooltip content={<CustomTooltip unit={block.unit} />} cursor={{ stroke: 'rgba(34,211,238,0.3)' }} />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#22d3ee"
                                    strokeWidth={2.5}
                                    fill="url(#areaGradient)"
                                    animationBegin={isVisible ? 0 : 99999}
                                    animationDuration={1500}
                                    animationEasing="ease-out"
                                    dot={{ fill: '#020617', stroke: '#22d3ee', strokeWidth: 2, r: 5 }}
                                    activeDot={{ fill: '#22d3ee', stroke: '#020617', strokeWidth: 2, r: 7 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Legend for pie charts */}
            {block.chartType === 'pie' && (
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {block.data.map((entry, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color || CHART_COLORS_DEFAULT[i % CHART_COLORS_DEFAULT.length] }}
                                />
                                <span className="text-xs text-slate-400 font-medium">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function BlogArticlePage() {
    const params = useParams();
    const postId = Number(params.id);
    const post = posts.find(p => p.id === postId);

    // Reading progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    // Reading time tracker
    const [readPercent, setReadPercent] = useState(0);
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => setReadPercent(Math.round(v * 100)));
        return unsubscribe;
    }, [scrollYProgress]);

    if (!post) {
        return (
            <main className="min-h-screen pt-32 pb-40 px-6 bg-[#020617] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-black italic uppercase mb-4">Article introuvable</h1>
                    <p className="text-slate-500 mb-8">Cet article n&apos;existe pas ou a été supprimé.</p>
                    <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 transition-colors">
                        <ArrowLeft size={16} />
                        Retour aux articles
                    </Link>
                </div>
            </main>
        );
    }

    const PostIcon = post.Icon;

    return (
        <>
            {/* ─── Reading progress bar ─────────────────────────── */}
            <motion.div
                style={{ scaleX }}
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-[100]"
            />

            {/* ─── Floating reading indicator ───────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="fixed bottom-8 right-8 z-50 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
                <BookOpen size={14} className="text-cyan-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {readPercent}%
                </span>
                <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        style={{ width: `${readPercent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />
                </div>
            </motion.div>

            <main className="min-h-screen pt-32 pb-40 px-6 bg-[#020617] text-white relative overflow-hidden">

                {/* ─── Ambient background glows ─────────────────── */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-3xl mx-auto relative">

                    {/* ─── Back link ────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-10"
                    >
                        <Link
                            href="/blog"
                            className="group inline-flex items-center gap-3 text-slate-500 hover:text-cyan-400 transition-all text-sm font-bold uppercase tracking-wider"
                        >
                            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:border-cyan-500/30 transition-all">
                                <ArrowLeft size={14} />
                            </span>
                            Retour aux articles
                        </Link>
                    </motion.div>

                    {/* ─── Article hero header ──────────────────── */}
                    <motion.header
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-16"
                    >
                        {/* Category & time */}
                        <div className="flex items-center gap-3 mb-6">
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full text-slate-400 border border-white/10"
                            >
                                {post.category}
                            </motion.span>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.25 }}
                                className="flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase"
                            >
                                <Clock size={12} /> {post.time} de lecture
                            </motion.div>
                        </div>

                        {/* Hero card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative p-10 md:p-14 rounded-[2.5rem] bg-gradient-to-br ${post.color} to-transparent border border-white/5 overflow-hidden`}
                        >
                            {/* Animated background icon */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                                animate={{ opacity: 0.05, scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                                className="absolute -right-10 -bottom-10"
                            >
                                <PostIcon size={240} />
                            </motion.div>

                            {/* Grid pattern overlay */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                                    backgroundSize: '24px 24px'
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center gap-2 mb-6"
                                >
                                    <Sparkles size={14} className="text-cyan-400" />
                                    <span className="text-[10px] font-black uppercase tracking-widest italic text-cyan-400">OXYN Intelligence</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35, duration: 0.7 }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-[0.95]"
                                >
                                    {post.title}
                                </motion.h1>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-lg text-slate-400 leading-relaxed mt-8"
                        >
                            {post.desc}
                        </motion.p>
                    </motion.header>

                    {/* ─── Article content blocks ──────────────── */}
                    <div className="space-y-8">
                        {post.blocks.map((block, i) => (
                            <RenderBlock key={i} block={block} index={i} />
                        ))}
                    </div>

                    {/* ─── Bottom CTA ──────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-24"
                    >
                        <div className="relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-[80px]" />
                            <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-blue-500/10 blur-[60px]" />

                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles size={14} className="text-cyan-400" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Continue d&apos;apprendre</p>
                                    </div>
                                    <p className="text-slate-400 text-sm max-w-md">
                                        Découvrez les autres articles pour approfondir vos connaissances et maîtriser votre biologie.
                                    </p>
                                </div>
                                <Link
                                    href="/blog"
                                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-sm hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-500/20 transition-all whitespace-nowrap"
                                >
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                    Tous les articles
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </main>
        </>
    );
}
