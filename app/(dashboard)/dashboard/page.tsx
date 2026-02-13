"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity, TrendingDown, Zap, Target, Calendar, ChevronRight,
    Scale, Smartphone, Heart, Footprints, Droplets, Trophy, ArrowUpRight,
    ShieldCheck, X, Loader2, Settings2, Check, ArrowRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, YAxis, XAxis } from 'recharts';
import Link from 'next/link';
import AnimatedNumber from '@/components/AnimatedNumber';

// --- TYPES ---
interface UserData {
    gender: 'homme' | 'femme';
    weight: number;
    height: number;
    age: number;
    activity: number;
    lastResult?: {
        calories: number;
        date: string;
    };
}

// --- DONNÉES SIMULÉES (Fallback) ---
const weightData = [
    { day: 'L', weight: 80.5 }, { day: 'M', weight: 80.2 },
    { day: 'M', weight: 79.9 }, { day: 'J', weight: 80.1 },
    { day: 'V', weight: 79.6 }, { day: 'S', weight: 79.4 },
    { day: 'D', weight: 79.2 },
];

export default function DashboardPage() {
    // États de navigation et synchronisation
    const [syncTarget, setSyncTarget] = useState<null | 'apple' | 'samsung'>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // État de visibilité des composants (Modularité)
    const [visibleWidgets, setVisibleWidgets] = useState({
        progression: true,
        graphique: true,
        calories: true,
        macros: true,
        activite: true,
        eau: true
    });

    // Chargement des données OXYN Memory
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('oxyn_tdee_data');
                if (saved) {
                    setUserData(JSON.parse(saved));
                }
            } catch (e) {
                console.error("Failed to load OXYN data", e);
            }
            setIsLoading(false);
        }
    }, []);

    // Simulation de synchronisation
    const handleSync = () => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setSyncTarget(null);
        }, 3500); // 3.5 secondes de "handshake"
    };

    const toggleWidget = (key: keyof typeof visibleWidgets) => {
        setVisibleWidgets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Calculs dérivés des données
    const hasData = userData && userData.lastResult;
    const calories = hasData ? userData.lastResult!.calories : 0;

    // Macros (30% Prot, 25% Lip, 45% Glu)
    const macros = hasData ? {
        prot: Math.round((calories * 0.30) / 4),
        lip: Math.round((calories * 0.25) / 9),
        glu: Math.round((calories * 0.45) / 4)
    } : { prot: 0, lip: 0, glu: 0 };

    // Hydratation (Poids * 35ml)
    const waterTarget = userData ? (userData.weight * 0.035).toFixed(1) : "0";

    return (
        <main className="min-h-screen pt-28 pb-40 px-4 md:px-6 bg-[#020617] text-white overflow-x-hidden">
            <div className="max-w-6xl mx-auto">

                {/* --- HEADER --- */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                                    {hasData ? "Suivi OXYN Actif" : "En attente de données"}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                            Mon <span className="text-cyan-400 text-glow">Dashboard</span>
                        </h1>
                    </div>

                    {/* Bouton de configuration du Hub */}
                    <button
                        onClick={() => setShowConfig(!showConfig)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all font-black uppercase italic text-[10px] tracking-widest ${showConfig ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}
                    >
                        <Settings2 size={16} /> {showConfig ? 'Fermer Config' : 'Configurer Hub'}
                    </button>
                </header>

                {!hasData && !isLoading ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-[2.5rem] bg-slate-900/50 border border-dashed border-white/20 text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Target size={32} className="text-slate-500" />
                        </div>
                        <h3 className="text-xl font-black italic uppercase text-white mb-2">Aucune donnée détectée</h3>
                        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">Veuillez effectuer votre première analyse TDEE pour débloquer votre tableau de bord intelligent.</p>
                        <Link href="/tdee" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-slate-950 rounded-xl font-black uppercase italic tracking-widest text-xs hover:bg-cyan-400 transition-colors">
                            Lancer le calculateur <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* --- CONFIGURATION PANEL (MODULARITÉ) --- */}
                        <AnimatePresence>
                            {showConfig && (
                                <motion.section
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="mb-10 p-6 bg-slate-900/50 border border-white/10 rounded-[2.5rem] overflow-hidden"
                                >
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 px-2">Affichage des modules</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                        {Object.keys(visibleWidgets).map((key) => (
                                            <button
                                                key={key}
                                                onClick={() => toggleWidget(key as any)}
                                                className={`p-3 rounded-xl border text-[9px] font-black uppercase italic tracking-tighter transition-all flex items-center justify-between ${visibleWidgets[key as keyof typeof visibleWidgets] ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-950 border-white/5 text-slate-600'}`}
                                            >
                                                {key} {visibleWidgets[key as keyof typeof visibleWidgets] ? <Check size={12} /> : <X size={12} />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>

                        {/* --- GRID BENTO MODULAIRE --- */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

                            {/* Module Calories (Mis en avant) */}
                            {visibleWidgets.calories && (
                                <motion.div className="md:col-span-2 p-8 rounded-[2.5rem] bg-cyan-500 text-slate-950 flex flex-col justify-between group overflow-hidden relative">
                                    <Zap size={32} className="relative z-10 text-slate-950" />
                                    <div className="relative z-10 mt-6 md:mt-0">
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Objectif Quotidien</div>
                                        <div className="text-6xl font-black italic tracking-tighter leading-none flex items-baseline">
                                            <AnimatedNumber value={calories} />
                                            <span className="text-xl ml-2 opacity-50 not-italic">kcal</span>
                                        </div>
                                    </div>
                                    <Activity size={180} className="absolute -right-10 -bottom-10 opacity-10 text-black rotate-12" />
                                </motion.div>
                            )}

                            {/* Module Macros */}
                            {visibleWidgets.macros && (
                                <BentoCard colSpan={2} title="Cibles & Macros" icon={<Target size={18} />}>
                                    <div className="space-y-5 mt-2">
                                        <MacroBar label="Protéines" value={`${macros.prot}g`} percentage="30%" color="bg-blue-500" />
                                        <MacroBar label="Glucides" value={`${macros.glu}g`} percentage="45%" color="bg-cyan-500" />
                                        <MacroBar label="Lipides" value={`${macros.lip}g`} percentage="25%" color="bg-indigo-500" />
                                    </div>
                                </BentoCard>
                            )}

                            {/* Module Activité/Métabolisme */}
                            {visibleWidgets.activite && (
                                <BentoCard title="Métabolisme" icon={<Activity size={18} />}>
                                    <div className="text-4xl font-black italic tracking-tighter">
                                        x{userData?.activity}
                                    </div>
                                    <p className="text-[10px] uppercase text-slate-500 font-bold mt-1 tracking-wider">Facteur d&apos;activité</p>
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-[9px] text-slate-500 uppercase font-bold">MB Est.</span>
                                            <span className="text-lg font-black italic text-cyan-400">
                                                {/* Estimation MB reverse du Mifflin simplifiée ou recalculée */}
                                                {userData && Math.round(calories / userData.activity)}
                                            </span>
                                        </div>
                                    </div>
                                </BentoCard>
                            )}

                            {/* Module Eau */}
                            {visibleWidgets.eau && (
                                <BentoCard title="Hydratation" icon={<Droplets size={18} />}>
                                    <div className="text-4xl font-black italic tracking-tighter flex items-baseline gap-1">
                                        {waterTarget} <span className="text-[10px] uppercase text-slate-500 not-italic">Litres</span>
                                    </div>
                                    <p className="text-[10px] uppercase text-slate-500 font-bold mt-1 tracking-wider">Cible journalière</p>
                                    <div className="h-1.5 w-full bg-slate-950 rounded-full mt-4 overflow-hidden"><div className="h-full w-[60%] bg-blue-500" /></div>
                                </BentoCard>
                            )}

                            {/* Module Graphique (Poids) */}
                            {visibleWidgets.graphique && (
                                <BentoCard colSpan={2} title="Trajectoire (Démo)" icon={<TrendingDown size={18} />}>
                                    <div className="h-40 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={weightData}>
                                                <defs><linearGradient id="wG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} /><stop offset="95%" stopColor="#22d3ee" stopOpacity={0} /></linearGradient></defs>
                                                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} hide />
                                                <Area type="monotone" dataKey="weight" stroke="#22d3ee" strokeWidth={3} fill="url(#wG)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </BentoCard>
                            )}

                        </div>
                    </>
                )}
            </div>

            {/* --- MODALE DE SYNCHRONISATION AVEC LOADER --- */}
            <AnimatePresence>
                {syncTarget && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={!isSyncing ? () => setSyncTarget(null) : undefined} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />

                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[3rem] p-10 overflow-hidden shadow-2xl">

                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${syncTarget === 'apple' ? 'from-pink-500 to-red-500' : 'from-blue-500 to-cyan-500'}`} />

                            <AnimatePresence mode="wait">
                                {isSyncing ? (
                                    <motion.div key="syncing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center py-10">
                                        <div className="relative mb-8">
                                            <Loader2 size={64} className="text-cyan-400 animate-spin" />
                                            <div className="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full" />
                                        </div>
                                        <h3 className="text-xl font-black italic uppercase tracking-widest mb-2 italic">Synchronisation...</h3>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Récupération des paquets biométriques</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                                        <div className="flex justify-between items-center mb-8">
                                            <div className={`p-4 rounded-2xl ${syncTarget === 'apple' ? 'bg-pink-500/10 text-pink-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                {syncTarget === 'apple' ? <Heart size={32} fill="currentColor" /> : <Activity size={32} fill="currentColor" />}
                                            </div>
                                            <button onClick={() => setSyncTarget(null)} className="p-2 text-slate-500 hover:text-white"><X size={24} /></button>
                                        </div>
                                        <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Lier <span className={syncTarget === 'apple' ? 'text-pink-500' : 'text-blue-500'}>{syncTarget === 'apple' ? 'Apple Santé' : 'Samsung Health'}</span></h2>
                                        <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Permettre à OXYN d'importer vos données d'activité pour ajuster vos besoins caloriques en temps réel.</p>
                                        <button onClick={handleSync} className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black uppercase italic text-xs tracking-[0.2em] shadow-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3">
                                            Autoriser le flux <ShieldCheck size={18} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}

// --- SOUS-COMPOSANTS ---

function SyncButton({ brand, icon, gradient, textColor, onClick }: any) {
    return (
        <button onClick={onClick} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 transition-all group overflow-hidden relative">
            <div className="flex items-center gap-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>{icon}</div>
                <div className="text-left">
                    <p className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1 opacity-60 ${textColor}`}>Sync. Biométrique</p>
                    <p className="text-lg font-black text-white italic uppercase tracking-tighter">{brand}</p>
                </div>
            </div>
            <div className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all relative z-10"><ArrowUpRight size={18} /></div>
        </button>
    );
}

function BentoCard({ children, colSpan, title, icon }: any) {
    return (
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${colSpan ? `md:col-span-${colSpan}` : ''} p-8 rounded-[3rem] bg-slate-900/40 backdrop-blur-md border border-white/5 flex flex-col`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/5 rounded-xl text-slate-300 border border-white/5">{icon}</div>
                <h3 className="text-sm font-black uppercase italic tracking-widest text-white">{title}</h3>
            </div>
            {children}
        </motion.div>
    );
}

function MacroBar({ label, percentage, value, color }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-end">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
                <div className="text-xs font-black italic text-white">{value} <span className="text-[9px] text-slate-600 font-bold not-italic ml-1">{percentage}</span></div>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <motion.div initial={{ width: 0 }} animate={{ width: percentage }} transition={{ duration: 1.5 }} className={`h-full ${color}`} />
            </div>
        </div>
    );
}