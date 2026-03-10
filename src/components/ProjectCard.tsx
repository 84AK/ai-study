'use client';

import { motion } from 'framer-motion';
import { ExternalLink, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    url: string;
    icon: LucideIcon;
    className?: string;
    category?: string;
    accentColor?: string; // e.g., #6366f1
}

export default function ProjectCard({
    title,
    description,
    url,
    icon: Icon,
    className = '',
    category = 'AI Project',
    accentColor = '#4f46e5',
}: ProjectCardProps) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1] as any
                    }
                }
            }}
            whileHover={{
                y: -16,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any }
            }}
            className={`premium-card group ${className}`}
            style={{ '--accent-color': accentColor } as any}
        >
            {/* Glossy Overlay Effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${accentColor}05 0%, transparent 100%)`,
                pointerEvents: 'none'
            }} />

            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                        padding: '1.5rem',
                        background: `${accentColor}10`,
                        borderRadius: '2rem',
                        display: 'inline-flex',
                        boxShadow: `0 10px 30px -5px ${accentColor}20`
                    }}
                >
                    <Icon size={36} color={accentColor} strokeWidth={2.5} />
                </motion.div>
                <div style={{
                    fontSize: '0.85rem',
                    fontWeight: '800',
                    padding: '0.6rem 1.5rem',
                    background: `${accentColor}08`,
                    borderRadius: '999px',
                    color: accentColor,
                    letterSpacing: '0.04em',
                    border: `1px solid ${accentColor}15`,
                    backdropFilter: 'blur(10px)'
                }}>
                    {category}
                </div>
            </div>

            <div style={{ flexGrow: 1, position: 'relative' }}>
                <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '3rem',
                    fontWeight: '500',
                    lineHeight: '1.8',
                    letterSpacing: '-0.01em'
                }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: 'auto', position: 'relative' }}>
                <Link
                    href={url}
                    target="_blank"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        fontSize: '1.1rem',
                        fontWeight: '800',
                        color: accentColor,
                        textDecoration: 'none',
                        transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.gap = '1.5rem')}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.gap = '0.8rem')}
                >
                    체험하기 <ExternalLink size={20} />
                </Link>
            </div>

            {/* Dynamic Glow Accent */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: '-40px',
                    right: '-40px',
                    width: '180px',
                    height: '180px',
                    background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                    pointerEvents: 'none'
                }}
            />
        </motion.div>
    );
}
