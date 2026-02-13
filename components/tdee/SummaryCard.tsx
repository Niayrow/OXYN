import React from 'react';

interface SummaryCardProps {
    label: string;
    value: React.ReactNode | string;
    unit: string;
    highlight?: boolean;
}

export default function SummaryCard({ label, value, unit, highlight }: SummaryCardProps) {
    return (
        <div className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/5">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-1">{label}</p>
            <div className={`text-xl font-black italic ${highlight ? 'text-cyan-400' : 'text-white'}`}>
                {value}<span className={`text-[9px] ml-0.5 not-italic ${highlight ? 'text-cyan-600' : 'text-slate-500'}`}>{unit}</span>
            </div>
        </div>
    );
}
