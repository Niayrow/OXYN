"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface AnimatedNumberProps {
    value: number;
    className?: string;
    fontSize?: number; // Optional height override, usually controlled by CSS
}

function Digit({ digit, fontSize }: { digit: string, fontSize?: number }) {
    // If it's not a number (e.g. space, comma), just render it static
    if (isNaN(parseInt(digit))) {
        return <span className="inline-block">{digit}</span>;
    }

    const digitValue = parseInt(digit);
    const spring = useSpring(0, { stiffness: 60, damping: 15, mass: 0.8 });
    const y = useTransform(spring, (current) => {
        // We assume line-height is roughly 1em or controlled by parent
        // but for safety, '100%' translation per digit is best.
        return `-${current * 10}%`; // 10% because we have 10 numbers in the column (0-9)
    });

    useEffect(() => {
        spring.set(digitValue);
    }, [digitValue, spring]);

    return (
        <span className="relative inline-block overflow-hidden px-[1px]" style={{ height: '1.1em', verticalAlign: 'bottom' }}>
            <motion.span style={{ y }} className="flex flex-col items-center">
                {NUMBERS.map((n) => (
                    <span key={n} className="flex items-center justify-center leading-none" style={{ height: '1.1em' }}>
                        {n}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

export default function AnimatedNumber({ value, className = "" }: AnimatedNumberProps) {
    // Format number (e.g. 2500 -> "2 500")
    // We reverse the array so the index corresponds to the power of 10 (0 = units, 1 = tens, etc.)
    // This allows React to keep the component instance for "units" stable even if the total length changes.
    const digitsArray = value.toLocaleString('fr-FR').split('').reverse();

    return (
        <span className={`inline-flex flex-row-reverse items-baseline pr-1 ${className}`}>
            {digitsArray.map((d, i) => (
                <Digit key={i} digit={d} />
            ))}
        </span>
    );
}
