import React, { useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedNumber from '../AnimatedNumber';

interface InputControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    unit: string;
    onChange: (value: number) => void;
    icon: React.ReactNode;
}

export default function InputControl({ label, value, min, max, unit, onChange, icon }: InputControlProps) {
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const updateValue = (delta: number) => {
        const newValue = Math.min(Math.max(value + delta, min), max);
        onChange(newValue);
    };

    const startContinuousUpdate = (delta: number) => {
        updateValue(delta);
        intervalRef.current = setInterval(() => updateValue(delta), 100);
    };

    const stopContinuousUpdate = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end px-1">
                <div className="flex items-center gap-2 text-slate-500 uppercase font-black text-[10px] tracking-widest italic">
                    {icon} {label}
                </div>
                <div className="text-3xl font-black text-white italic tracking-tighter flex items-baseline">
                    <AnimatedNumber value={value} />
                    <span className="text-[10px] text-cyan-400 ml-1 uppercase not-italic">{unit}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onMouseDown={() => startContinuousUpdate(-1)}
                    onMouseUp={stopContinuousUpdate}
                    onMouseLeave={stopContinuousUpdate}
                    onTouchStart={() => startContinuousUpdate(-1)}
                    onTouchEnd={stopContinuousUpdate}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <Minus size={16} />
                </motion.button>

                <input
                    type="range" min={min} max={max} value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 touch-none"
                />

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onMouseDown={() => startContinuousUpdate(1)}
                    onMouseUp={stopContinuousUpdate}
                    onMouseLeave={stopContinuousUpdate}
                    onTouchStart={() => startContinuousUpdate(1)}
                    onTouchEnd={stopContinuousUpdate}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <Plus size={16} />
                </motion.button>
            </div>
        </div>
    );
}
