"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-[#020617] text-white flex flex-col justify-center px-6 relative overflow-hidden">

            {/* EFFET DE LUMIÈRE DYNAMIQUE */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-md w-full mx-auto relative z-10 py-12">

                {/* RETOUR */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
                    <Link href="/login" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-[10px] font-black uppercase tracking-widest italic">
                        <ChevronLeft size={14} /> Déjà enrôlé ?
                    </Link>
                </motion.div>

                {/* HEADER D'ENRÔLEMENT */}
                <header className="mb-10">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                    >
                        <UserPlus size={32} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-black italic uppercase tracking-tighter"
                    >
                        Nouveau <span className="text-blue-400 text-glow">Sujet</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-500 text-sm font-medium mt-2 leading-tight"
                    >
                        Initialisez votre profil pour activer le suivi de vos paramètres.
                    </motion.p>
                </header>

                {/* FORMULAIRE D'ENRÔLEMENT */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Identifiant Public</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Ex: John Doe"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Email de contact</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="email"
                                placeholder="sujet@oxyn.com"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-1">Clé de sécurité</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="password"
                                placeholder="Minimum 8 caractères"
                                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all placeholder:text-slate-700"
                            />
                        </div>
                    </div>

                    <button className="w-full mt-6 flex items-center justify-between bg-white text-slate-950 p-1 pl-6 rounded-2xl font-black italic uppercase text-xs tracking-tighter hover:bg-blue-400 transition-all active:scale-[0.98] group">
                        Créer le profil
                        <div className="bg-slate-950 text-white p-4 rounded-xl group-hover:bg-slate-900 transition-colors">
                            <ArrowRight size={18} />
                        </div>
                    </button>
                </motion.div>

                <p className="mt-8 text-[9px] text-center text-slate-600 uppercase font-bold tracking-widest leading-relaxed">
                    En créant un compte, vous acceptez le protocole de traitement des données OXYN.
                </p>

            </div>
        </main>
    );
}