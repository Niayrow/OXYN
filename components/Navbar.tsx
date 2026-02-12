"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import {
    Activity,
    LayoutDashboard,
    Calculator,
    BookOpen,
    Home,
    User
} from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Accueil', href: '/', icon: <Home size={20} /> },
        { name: 'Calcul', href: '/tdee', icon: <Calculator size={20} /> },
        { name: 'Suivi', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Blog', href: '/blog', icon: <BookOpen size={20} /> },
    ];

    // Correction TypeScript : Utilisation de Variants et "as const"
    const logoPulse: Variants = {
        animate: {
            color: ["#22d3ee", "#3b82f6", "#22d3ee"],
            textShadow: [
                "0 0 8px rgba(34, 211, 238, 0.2)",
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 8px rgba(34, 211, 238, 0.2)"
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        }
    };

    return (
        <>
            {/* DESKTOP DOCK (Top Centered) */}
            <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center px-6">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
                >
                    <Link href="/" className="flex items-center gap-2 px-4 border-r border-white/10 mr-2 group">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="bg-cyan-500/20 p-1.5 rounded-lg text-cyan-400"
                        >
                            <Activity size={20} />
                        </motion.div>
                        <motion.span
                            variants={logoPulse}
                            animate="animate"
                            className="font-black italic uppercase tracking-tighter text-xl"
                        >
                            Oxyn
                        </motion.span>
                    </Link>

                    <div className="flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                    ${isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"}
                  `}
                                >
                                    {link.icon}
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="ml-4 pl-4 border-l border-white/10">
                        <Link href="/login" className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            <User size={18} /> Connexion
                        </Link>
                    </div>
                </motion.nav>
            </div>

            {/* MOBILE DOCK (Bottom Centered) */}
            <div className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
                <motion.nav
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-sm flex items-center justify-around p-3 bg-slate-900/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl"
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 p-2 transition-all ${isActive ? "text-cyan-400" : "text-slate-500"}`}
                            >
                                <div className={`p-2 rounded-2xl ${isActive ? "bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : ""}`}>
                                    {link.icon}
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
                            </Link>
                        );
                    })}
                    <Link href="/login" className="flex flex-col items-center gap-1 p-2 text-white">
                        <div className="p-2 bg-white/10 rounded-2xl border border-white/10">
                            <User size={20} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Log</span>
                    </Link>
                </motion.nav>
            </div>
        </>
    );
}