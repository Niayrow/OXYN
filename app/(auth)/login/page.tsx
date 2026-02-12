"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Mail, Lock, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col justify-center px-6 relative overflow-hidden">

            {/* EFFET DE LUMIÈRE EN ARRIÈRE-PLAN */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full mx-auto relative z-10">

                {/* RETOUR ACCUEIL */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-[10px] font-black uppercase tracking-widest italic">
                        <ChevronLeft size={14} /> Retour au portail
                    </Link>
                </motion.div>

                {/* HEADER DE CONNEXION */}
                <header className="mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                    >
                        <Fingerprint size={32} className="animate-pulse" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black italic uppercase tracking-tighter"
                    >
                        Accès au <span className="text-cyan-400 text-glow">Protocole</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-sm font-medium mt-2"
                    >
                        Identifiez-vous pour synchroniser vos données biométriques.
                    </motion.p>
                </header>

                {/* FORMULAIRE CLINIQUE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">ID Utilisateur / Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="nom@exemple.com"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Clé d'accès</label>
                            <Link href="#" className="text-[9px] font-bold text-cyan-400/50 hover:text-cyan-400 uppercase tracking-widest">Oubliée ?</Link>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <button className="w-full mt-6 flex items-center justify-between bg-white text-slate-950 p-1 pl-6 rounded-2xl font-black italic uppercase text-xs tracking-tighter hover:bg-cyan-400 transition-all active:scale-[0.98] group">
                        Initialiser la session
                        <div className="bg-slate-950 text-white p-4 rounded-xl group-hover:bg-slate-900 transition-colors">
                            <ArrowRight size={18} />
                        </div>
                    </button>
                </motion.div>

                {/* FOOTER DE CONNEXION */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 text-center"
                >
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Nouveau sujet ? <Link href="/register" className="text-cyan-400 hover:underline">Créer un profil</Link>
                    </p>
                </motion.footer>

            </div>
        </main>
    );
}