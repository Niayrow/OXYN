"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    Zap, Ruler, Weight, User, Activity as ActivityIcon,
    Flame, Calculator, Footprints, ChevronRight, Sparkles, Clock
} from 'lucide-react';
import InputControl from '@/components/tdee/InputControl';
import AnimatedNumber from '@/components/AnimatedNumber';

// Lazy loading du composant ResultsView (qui contient les graphiques Recharts lourds)
const ResultsView = dynamic(() => import('@/components/tdee/ResultsView'), {
    loading: () => (
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500 animate-pulse">
                Analyse des données biométriques...
            </p>
        </div>
    ),
    ssr: false // Recharts ne supporte pas bien le SSR, donc on le désactive pour ce composant
});

// Type pour la persistance des données
type UserData = {
    gender: 'homme' | 'femme';
    weight: number;
    height: number;
    age: number;
    activity: number;
    lastResult?: {
        calories: number;
        date: string;
    };
};

// --- COMPOSANT PRINCIPAL ---
export default function TDEEPage() {
    const [showResults, setShowResults] = useState(false);
    const [gender, setGender] = useState<'homme' | 'femme'>('homme');
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [age, setAge] = useState(25);
    const [activity, setActivity] = useState(1.55);
    const [mb, setMb] = useState(0);
    const [calories, setCalories] = useState(0);
    const [lastHistory, setLastHistory] = useState<UserData['lastResult'] | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Chargement des données au démarrage (OXYN Memory)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('oxyn_tdee_data');
                if (saved) {
                    const data: UserData = JSON.parse(saved);
                    if (data.gender) setGender(data.gender);
                    if (data.weight) setWeight(data.weight);
                    if (data.height) setHeight(data.height);
                    if (data.age) setAge(data.age);
                    if (data.activity) setActivity(data.activity);
                    if (data.lastResult) setLastHistory(data.lastResult);
                }
            } catch (e) {
                console.error("Erreur de chargement OXYN Memory", e);
            }
            setIsLoaded(true);
        }
    }, []);

    // Sauvegarde automatique des inputs (Debounce 800ms)
    useEffect(() => {
        if (!isLoaded) return;
        const timer = setTimeout(() => {
            const currentData: UserData = {
                gender, weight, height, age, activity,
                lastResult: lastHistory || undefined
            };
            localStorage.setItem('oxyn_tdee_data', JSON.stringify(currentData));
        }, 800);
        return () => clearTimeout(timer);
    }, [gender, weight, height, age, activity, lastHistory, isLoaded]);

    // Moteur de calcul Mifflin-St Jeor
    useEffect(() => {
        let basalRate = (10 * weight) + (6.25 * height) - (5 * age);
        basalRate = gender === 'homme' ? basalRate + 5 : basalRate - 161;
        setMb(Math.round(basalRate));
        setCalories(Math.round(basalRate * activity));
    }, [gender, weight, height, age, activity]);

    const handleGenerate = () => {
        // Sauvegarde explicite du résultat
        const newHistory = {
            calories,
            date: new Date().toISOString()
        };
        setLastHistory(newHistory);

        // Force save immédiat
        const currentData: UserData = {
            gender, weight, height, age, activity,
            lastResult: newHistory
        };
        localStorage.setItem('oxyn_tdee_data', JSON.stringify(currentData));

        setShowResults(true);
    };

    const activityLevels = [
        { label: "Sédentaire", value: 1.2, desc: "Bureau / Pas de sport", icon: User },
        { label: "Légèrement actif", value: 1.375, desc: "1-3 sessions / semaine", icon: Footprints },
        { label: "Modérément actif", value: 1.55, desc: "3-5 sessions / semaine", icon: ActivityIcon },
        { label: "Très actif", value: 1.725, desc: "6-7 sessions / semaine", icon: Flame },
        { label: "Athlète", value: 1.9, desc: "Entraînement intense bi-quotidien", icon: Zap },
    ];

    return (
        <main className="min-h-screen pt-28 pb-40 px-6 bg-[#020617] text-white relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-xl mx-auto relative">

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            {/* HEADER */}
                            <header className="mb-12">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                        <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                            <Calculator size={14} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest">OXYN Protocol Laboratory</span>
                                    </div>

                                    {/* History Badge */}
                                    {lastHistory && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
                                        >
                                            <Clock size={12} className="text-slate-500" />
                                            <span className="text-[9px] font-bold text-slate-400">
                                                Dernier: <span className="text-cyan-400">{lastHistory.calories} kcal</span>
                                            </span>
                                        </motion.div>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
                                    Analyse <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">TDEE</span>
                                </h1>
                                <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                                    Calcule ta Dépense Énergétique Totale avec la formule <strong className="text-slate-300">Mifflin-St Jeor</strong>, la plus précise selon la recherche scientifique.
                                </p>
                            </header>

                            {/* FORMULAIRE */}
                            <div className="space-y-8">
                                {/* Gender selector */}
                                <div className="grid grid-cols-2 gap-4">
                                    {(['homme', 'femme'] as const).map((g) => (
                                        <motion.button
                                            key={g}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setGender(g)}
                                            className={`relative py-5 rounded-2xl font-black uppercase tracking-tighter transition-all border overflow-hidden ${gender === g
                                                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                                                : "bg-white/[0.02] text-slate-500 border-white/5 hover:border-white/10"
                                                }`}
                                        >
                                            {gender === g && (
                                                <motion.div
                                                    layoutId="genderGlow"
                                                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                                                />
                                            )}
                                            <span className="relative z-10">{g}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Sliders */}
                                <div className="space-y-10">
                                    <InputControl label="Âge" value={age} min={15} max={80} unit="ans" onChange={setAge} icon={<User size={16} />} />
                                    <InputControl label="Taille" value={height} min={140} max={220} unit="cm" onChange={setHeight} icon={<Ruler size={16} />} />
                                    <InputControl label="Poids" value={weight} min={40} max={200} unit="kg" onChange={setWeight} icon={<Weight size={16} />} />
                                </div>

                                {/* Activity Level */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1 flex items-center gap-2">
                                        <ActivityIcon size={12} /> Niveau d&apos;activité
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {activityLevels.map((lvl) => {
                                            const LvlIcon = lvl.icon;
                                            return (
                                                <motion.button
                                                    key={lvl.value}
                                                    whileHover={{ x: 4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setActivity(lvl.value)}
                                                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${activity === lvl.value
                                                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-500/5"
                                                        : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/10"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity === lvl.value ? 'bg-cyan-500/20' : 'bg-white/5'}`}>
                                                            <LvlIcon size={14} />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="font-bold text-sm">{lvl.label}</div>
                                                            <div className="text-[10px] opacity-60">{lvl.desc}</div>
                                                        </div>
                                                    </div>
                                                    {activity === lvl.value && (
                                                        <motion.div
                                                            layoutId="activityCheck"
                                                            className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]"
                                                        />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Live Preview */}
                                <motion.div
                                    layout
                                    className="relative p-6 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 overflow-hidden"
                                >
                                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-[60px]" />
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Estimation en temps réel</span>
                                            <div className="text-3xl md:text-4xl font-black italic tracking-tighter mt-1 flex items-baseline">
                                                <AnimatedNumber value={calories} />
                                                <span className="text-sm text-cyan-400 ml-1.5 not-italic">kcal/jour</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">MB</span>
                                            <div className="text-lg font-bold text-slate-500 italic flex items-baseline justify-end">
                                                <AnimatedNumber value={mb} />
                                                <span className="ml-1">kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent z-50 md:relative md:bg-none md:p-0 md:z-auto"
                                    initial={{ y: 100 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34,211,238,0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleGenerate}
                                        className="w-full py-6 md:py-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 rounded-3xl font-black uppercase italic shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all flex items-center justify-center gap-3 backdrop-blur-md"
                                    >
                                        <Sparkles size={18} />
                                        Générer l&apos;Analyse Expert
                                        <ChevronRight size={18} />
                                    </motion.button>
                                </motion.div>

                                {/* Spacer for mobile sticky button */}
                                <div className="h-24 md:hidden" />
                            </div>
                        </motion.div>
                    ) : (
                        <ResultsView
                            calories={calories}
                            mb={mb}
                            weight={weight}
                            height={height}
                            age={age}
                            gender={gender}
                            activity={activity}
                            onBack={() => setShowResults(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}