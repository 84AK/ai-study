'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, BookOpen, GraduationCap, Atom, Sparkles } from 'lucide-react';

const icons = [
    { Icon: Brain, color: '#6366f1', size: 40, top: '15%', left: '10%', delay: 0 },
    { Icon: Cpu, color: '#f43f5e', size: 32, top: '40%', right: '15%', delay: 2 },
    { Icon: BookOpen, color: '#10b981', size: 36, bottom: '20%', left: '25%', delay: 4 },
    { Icon: GraduationCap, color: '#f59e0b', size: 44, top: '10%', right: '25%', delay: 1 },
    { Icon: Atom, color: '#0ea5e9', size: 30, bottom: '15%', right: '10%', delay: 3 },
    { Icon: Sparkles, color: '#a855f7', size: 28, top: '50%', left: '5%', delay: 5 },
];

export default function Background() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Floating Icons */}
            {icons.map(({ Icon, color, size, top, left, right, bottom, delay }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.1, 0],
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        rotate: [0, 15, -15, 0]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top,
                        left,
                        right,
                        bottom,
                    } as any}
                >
                    <Icon size={size} color={color} strokeWidth={1.2} />
                </motion.div>
            ))}

            {/* Soft Animated Blobs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%',
                    width: '50%',
                    height: '50%',
                    borderRadius: '50%',
                    background: 'rgba(99, 102, 241, 0.08)',
                    filter: 'blur(120px)',
                }}
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 120, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    position: 'absolute',
                    bottom: '-10%',
                    right: '-10%',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: 'rgba(244, 63, 94, 0.08)',
                    filter: 'blur(150px)',
                }}
            />
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '40%',
                    height: '40%',
                    borderRadius: '50%',
                    background: 'rgba(16, 185, 129, 0.08)',
                    filter: 'blur(100px)',
                }}
            />

            {/* Texture / Noise Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.012,
                pointerEvents: 'none',
                backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
            }} />
        </div>
    );
}
