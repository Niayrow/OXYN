"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Dna,
  Activity,
  ShieldCheck,
  Microscope,
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans">

      {/* 1. HERO : L'ENTRÉE DU PROTOCOLE */}
      <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto border-x border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Activity size={14} /> Rapport de précision 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8 uppercase"
            >
              LA DATA AU SERVICE <br />
              <span className="text-white/40 italic">DE VOTRE CORPS.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 text-lg md:text-xl max-w-lg mb-12 font-medium leading-relaxed"
            >
              OXYN est un hub biométrique qui transforme vos paramètres en trajectoires de santé réelles. Simple, clinique, sans compromis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/tdee" className="group flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-5 rounded-xl font-black uppercase italic tracking-tighter hover:bg-cyan-400 transition-all active:scale-95 shadow-xl">
                Initialiser l'analyse <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* VISUEL "LAB" SOBRE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden lg:block relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem]"
          >
            <div className="bg-[#020617] rounded-[2.4rem] p-10 border border-white/5">
              <div className="flex items-center justify-between mb-10">
                <Microscope className="text-cyan-500" size={32} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calculateur de trajectoire</span>
              </div>
              <div className="space-y-6">
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-cyan-500 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Précision</div>
                    <div className="text-xl font-black italic">99.8%</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Standard</div>
                    <div className="text-xl font-black italic text-cyan-400">ISO</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. BENTO LAB : LES OUTILS RÉELS */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-x border-white/5 border-t">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Card: Algorithme */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-slate-900/30 border border-white/5 flex flex-col justify-between group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-20 group-hover:scale-110 transition-transform">
              <Dna size={28} />
            </div>
            <div>
              <h3 className="text-3xl font-black italic uppercase mb-3">Mifflin-St Jeor</h3>
              <p className="text-slate-500 text-sm font-medium">L'algorithme de référence utilisé par les nutritionnistes du monde entier pour une précision chirurgicale.</p>
            </div>
          </div>

          {/* Card: Projection */}
          <div className="p-10 rounded-[2.5rem] bg-slate-900/30 border border-white/5 flex flex-col items-center justify-center text-center">
            <Calendar size={48} className="text-slate-600 mb-6" />
            <h4 className="text-lg font-black italic uppercase mb-2">Planification</h4>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Projection de dates réelles sur 12 semaines.</p>
          </div>

          {/* Card: Sécurité */}
          <div className="p-10 rounded-[2.5rem] bg-cyan-500 text-slate-950 flex flex-col items-center justify-center text-center">
            <ShieldCheck size={48} className="mb-6" />
            <h4 className="text-lg font-black italic uppercase">Intégrité</h4>
            <p className="text-[10px] font-black uppercase opacity-60">Zéro bullshit, que des faits.</p>
          </div>

          {/* Bottom Banner : Mobile focused CTA */}
          <Link href="/tdee" className="md:col-span-4 p-8 rounded-[2.5rem] bg-white text-slate-950 flex flex-col md:flex-row items-center justify-between group hover:bg-cyan-400 transition-all">
            <div className="flex items-center gap-6 mb-6 md:mb-0">
              <div className="p-4 bg-slate-950 rounded-2xl text-white group-hover:bg-slate-900 transition-colors">
                <ArrowRight size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black italic uppercase">Lancer l'analyse mobile</h3>
                <p className="font-bold text-sm opacity-60 italic">Interface optimisée pour vos paramètres biométriques.</p>
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              Statut : En ligne <ChevronRight size={14} />
            </div>
          </Link>

        </div>
      </section>

      {/* FOOTER : SOBRE & CLEAN */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em] italic">
          OXYN precision health tech — 2026
        </p>
      </footer>
    </main>
  );
}