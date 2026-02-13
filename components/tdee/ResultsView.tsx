import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Sparkles,
    BarChart3,
    Scale,
    Target,
    TrendingDown,
    Flame,
    Award,
    Calculator
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
    BarChart, Bar
} from 'recharts';
import SummaryCard from './SummaryCard';
import AnimatedNumber from '../AnimatedNumber';

const COLORS = {
    cyan: '#22d3ee',
    blue: '#3b82f6',
    indigo: '#6366f1',
    purple: '#8b5cf6',
    amber: '#f59e0b',
    green: '#10b981',
    red: '#ef4444',
    slate: '#475569',
};

interface ResultsViewProps {
    calories: number;
    mb: number;
    weight: number;
    height: number;
    age: number;
    gender: string;
    activity: number;
    onBack: () => void;
}

export default function ResultsView({ calories, mb, weight, height, age, gender, activity, onBack }: ResultsViewProps) {
    const [selectedDeficit, setSelectedDeficit] = useState(0.8);

    // ── Computed values ────────────────────────────────
    const dailyDeficitKcal = calories * (1 - selectedDeficit);
    const weeklyLossKg = (dailyDeficitKcal * 7) / 7700;
    const targetCalories = Math.round(calories * selectedDeficit);

    // Chart data: 12-week weight projection
    const chartData = Array.from({ length: 13 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + (i * 7));
        return {
            name: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
            fullDate: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }),
            poids: parseFloat((weight - (i * weeklyLossKg)).toFixed(1)),
        };
    });

    // Macros (Prot: 30%, Lip: 25%, Glu: 45%)
    const macros = {
        prot: { g: Math.round((targetCalories * 0.30) / 4), kcal: Math.round(targetCalories * 0.30), pct: 30 },
        lip: { g: Math.round((targetCalories * 0.25) / 9), kcal: Math.round(targetCalories * 0.25), pct: 25 },
        glu: { g: Math.round((targetCalories * 0.45) / 4), kcal: Math.round(targetCalories * 0.45), pct: 45 },
    };

    // TDEE breakdown (estimated)
    const neat = Math.round((calories - mb) * 0.55);
    const eat = Math.round((calories - mb) * 0.30);
    const tef = Math.round((calories - mb) * 0.15);
    const tdeeBreakdown = [
        { name: 'Métabolisme Basal', value: mb, color: COLORS.cyan },
        { name: 'NEAT (quotidien)', value: neat, color: COLORS.blue },
        { name: 'Sport (EAT)', value: eat, color: COLORS.indigo },
        { name: 'Digestion (TEF)', value: tef, color: COLORS.purple },
    ];

    const macroPieData = [
        { name: 'Protéines', value: macros.prot.pct, color: COLORS.blue },
        { name: 'Lipides', value: macros.lip.pct, color: COLORS.amber },
        { name: 'Glucides', value: macros.glu.pct, color: COLORS.green },
    ];

    // Calorie zone data
    const calorieZones = [
        { name: 'Sèche agressive', value: Math.round(calories * 0.7), color: COLORS.red },
        { name: 'Sèche modérée', value: Math.round(calories * 0.8), color: COLORS.amber },
        { name: 'Sèche douce', value: Math.round(calories * 0.9), color: COLORS.cyan },
        { name: 'Maintien', value: calories, color: COLORS.green },
        { name: 'Prise de masse', value: Math.round(calories * 1.15), color: COLORS.blue },
    ];

    const totalWeightLoss = parseFloat((12 * weeklyLossKg).toFixed(1));

    const strategies = [
        { key: 0.9, label: "OXYN SOFT", desc: "Doux & durable", pct: "-10%", color: "cyan", recommended: false },
        { key: 0.8, label: "OXYN OPTIMAL", desc: "Recommandé", pct: "-20%", color: "cyan", recommended: true },
        { key: 0.7, label: "OXYN AGGRESSIVE", desc: "Court terme uniquement", pct: "-30%", color: "amber", recommended: false },
    ] as const;

    return (
        <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-6"
        >

            {/* ─── Back Button ─────────────────────────────── */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="group flex items-center gap-3 text-slate-500 hover:text-cyan-400 transition-all text-sm font-bold uppercase tracking-wider"
            >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:border-cyan-500/30 transition-all">
                    <ArrowLeft size={14} />
                </span>
                Retour au laboratoire
            </motion.button>

            {/* ═══ SECTION 1: Hero Result Card ═══════════════ */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-white/5 overflow-hidden"
            >
                <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]" />
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 italic">Résultat OXYN Intelligence</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Ton TDEE (Maintenance)</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-6xl md:text-7xl font-black italic tracking-tighter bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                    <AnimatedNumber value={calories} />
                                </span>
                                <span className="text-sm font-bold uppercase text-cyan-400">kcal/jour</span>
                            </div>
                        </div>
                        <div className="flex gap-6 text-right">
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">MB</p>
                                <p className="text-xl font-black italic text-slate-400">
                                    <AnimatedNumber value={mb} />
                                    <span className="text-[9px] ml-0.5 not-italic text-slate-600"> kcal</span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Multiplicateur</p>
                                <p className="text-xl font-black italic text-slate-400">×{activity}</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile summary */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {[
                            `${gender === 'homme' ? '♂' : '♀'} ${gender}`,
                            `${age} ans`,
                            `${height} cm`,
                            `${weight} kg`,
                        ].map((tag) => (
                            <span key={tag} className="text-[9px] px-3 py-1 bg-white/5 rounded-full text-slate-400 font-bold uppercase tracking-widest border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ═══ SECTION 2: TDEE Breakdown Pie ═════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
            >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <BarChart3 size={14} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase italic text-white">Décomposition du TDEE</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Où passent tes {calories} kcal/jour</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/2 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={tdeeBreakdown}
                                    cx="50%" cy="50%"
                                    innerRadius="55%" outerRadius="80%"
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1200}
                                >
                                    {tdeeBreakdown.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (!active || !payload?.length) return null;
                                        const d = payload[0];
                                        return (
                                            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{(d.payload as any).name}</p>
                                                <p className="text-lg font-black text-white">{d.value} kcal</p>
                                            </div>
                                        );
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 space-y-3">
                        {tdeeBreakdown.map((item) => (
                            <div key={item.name} className="flex items-center gap-3 group">
                                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs font-bold text-slate-300 truncate">{item.name}</span>
                                        <span className="text-xs font-mono font-bold text-slate-400 ml-2">{item.value} kcal</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.value / calories) * 100}%` }}
                                            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ═══ SECTION 3: Calorie Zones Bar Chart ════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Scale size={14} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase italic text-white">Zones Caloriques</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Tes plages selon ton objectif</p>
                    </div>
                </div>
                <div className="h-[260px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={calorieZones} margin={{ top: 10, right: 10, left: -15, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                tickLine={false}
                            />
                            <YAxis tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    return (
                                        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{(payload[0].payload as any).name}</p>
                                            <p className="text-lg font-black text-white">{payload[0].value} kcal</p>
                                        </div>
                                    );
                                }}
                                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1200}>
                                {calorieZones.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* ═══ SECTION 4: Deficit Strategy Selector ══════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Target size={14} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase italic text-white">Choisis ta Stratégie</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Sélectionne l&apos;intensité de ton déficit</p>
                    </div>
                </div>

                <div className="space-y-3">
                    {strategies.map((s) => {
                        const isActive = selectedDeficit === s.key;
                        const cal = Math.round(calories * s.key);
                        const monthlyLoss = ((calories * (1 - s.key) * 7 / 7700) * 4).toFixed(1);
                        return (
                            <motion.button
                                key={s.key}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedDeficit(s.key)}
                                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all text-left group relative overflow-hidden ${isActive
                                    ? "bg-white text-slate-950 border-white shadow-[0_10px_40px_rgba(255,255,255,0.08)]"
                                    : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/10"
                                    }`}
                            >
                                {s.recommended && (
                                    <div className={`absolute top-0 right-0 px-3 py-0.5 rounded-bl-xl text-[8px] font-black uppercase tracking-widest ${isActive ? 'bg-cyan-400 text-slate-950' : 'bg-cyan-500/20 text-cyan-400'}`}>
                                        <Award size={8} className="inline mr-1" />Recommandé
                                    </div>
                                )}
                                <div>
                                    <div className="font-black italic uppercase text-[12px] tracking-tight">{s.label}</div>
                                    <div className={`text-[10px] font-bold mt-0.5 ${isActive ? "opacity-60" : "text-slate-600"}`}>
                                        {s.desc} · ~{monthlyLoss}kg/mois
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-mono font-black text-xl leading-none">{cal}</div>
                                    <div className={`text-[8px] font-black uppercase tracking-widest ${isActive ? "opacity-50" : "opacity-30"}`}>
                                        kcal/jour ({s.pct})
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* ═══ SECTION 5: Weight Projection Chart ════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
            >
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                            <TrendingDown size={14} className="text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase italic text-white">Projection 12 Semaines</h3>
                            <p className="text-[10px] text-slate-500 font-medium">
                                {chartData[0].fullDate} → {chartData[12].fullDate}
                            </p>
                        </div>
                    </div>
                    <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Objectif</span>
                        <span className="text-xl font-black italic text-cyan-400">{chartData[12].poids}<span className="text-[10px] ml-0.5">kg</span></span>
                    </div>
                </div>

                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Départ</p>
                        <p className="text-lg font-black italic">{weight}<span className="text-[9px] text-slate-500 ml-0.5">kg</span></p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Perte totale</p>
                        <p className="text-lg font-black italic text-cyan-400">-{totalWeightLoss}<span className="text-[9px] text-cyan-600 ml-0.5">kg</span></p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Par semaine</p>
                        <p className="text-lg font-black italic">-{weeklyLossKg.toFixed(2)}<span className="text-[9px] text-slate-500 ml-0.5">kg</span></p>
                    </div>
                </div>

                <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                            <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                            <XAxis
                                dataKey="name" stroke="#64748b" fontSize={11} fontWeight={500}
                                axisLine={false} tickLine={false} interval={2}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (!active || !payload?.length) return null;
                                    return (
                                        <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{(payload[0].payload as any).fullDate}</p>
                                            <p className="text-xl font-black italic text-cyan-400">{payload[0].value} <span className="text-[10px] uppercase">kg</span></p>
                                        </div>
                                    );
                                }}
                            />
                            <Area
                                type="monotone" dataKey="poids" stroke="#22d3ee" strokeWidth={3}
                                fill="url(#weightGrad)" animationDuration={1200}
                                dot={{ fill: '#020617', stroke: '#22d3ee', strokeWidth: 2, r: 3 }}
                                activeDot={{ fill: '#22d3ee', stroke: '#020617', strokeWidth: 2, r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* ═══ SECTION 6: Macros Panel ═══════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 md:p-8 overflow-hidden"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                        <Flame size={14} className="text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase italic text-white">Macronutriments</h3>
                        <p className="text-[10px] text-slate-500 font-medium">Répartition pour {targetCalories} kcal/jour</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Pie Chart */}
                    <div className="w-full md:w-2/5 h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={macroPieData}
                                    cx="50%" cy="50%"
                                    innerRadius="55%" outerRadius="80%"
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1200}
                                >
                                    {macroPieData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Macro Cards */}
                    <div className="w-full md:w-3/5 space-y-3">
                        {[
                            { label: "Protéines", g: macros.prot.g, kcal: macros.prot.kcal, pct: macros.prot.pct, color: COLORS.blue, desc: "Construction musculaire" },
                            { label: "Lipides", g: macros.lip.g, kcal: macros.lip.kcal, pct: macros.lip.pct, color: COLORS.amber, desc: "Hormones & vitamines" },
                            { label: "Glucides", g: macros.glu.g, kcal: macros.glu.kcal, pct: macros.glu.pct, color: COLORS.green, desc: "Énergie & performance" },
                        ].map((m) => (
                            <div key={m.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all group">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: m.color + '20' }}>
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-sm font-bold text-white">{m.label}</span>
                                        <span className="text-lg font-black italic text-white">{m.g}<span className="text-[10px] text-slate-500 ml-0.5 not-italic">g</span></span>
                                    </div>
                                    <div className="flex items-center justify-between mt-0.5">
                                        <span className="text-[10px] text-slate-500">{m.desc}</span>
                                        <span className="text-[10px] text-slate-500 font-mono">{m.kcal} kcal · {m.pct}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${m.pct}%` }}
                                            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: m.color }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ═══ SECTION 7: Daily Summary Card ═════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative p-6 md:p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 overflow-hidden"
            >
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-[80px]" />
                <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-blue-500/10 blur-[60px]" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-5">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Résumé quotidien</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SummaryCard label="Objectif" value={<AnimatedNumber value={targetCalories} />} unit="kcal" />
                        <SummaryCard label="Déficit" value={<><span className="mr-0.5">-</span><AnimatedNumber value={Math.round(dailyDeficitKcal)} /></>} unit="kcal/j" highlight />
                        <SummaryCard label="Protéines" value={<AnimatedNumber value={macros.prot.g} />} unit="g/jour" />
                        <SummaryCard label="Perte/mois" value={`-${(weeklyLossKg * 4).toFixed(1)}`} unit="kg" highlight />
                    </div>
                </div>
            </motion.div>

            {/* ─── Recalculate CTA ────────────────────────── */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34,211,238,0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={onBack}
                className="w-full py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 rounded-3xl font-black uppercase italic shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all flex items-center justify-center gap-3"
            >
                <Calculator size={18} />
                Refaire le calcul
            </motion.button>

        </motion.div>
    );
}
