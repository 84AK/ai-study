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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`premium-card group ${className}`}
            style={{ '--accent-color': accentColor } as any}
        >
            <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '1.25rem',
                    background: `${accentColor}15`, // 15% opacity
                    borderRadius: '1.5rem',
                    display: 'inline-flex'
                }}>
                    <Icon size={32} color={accentColor} strokeWidth={2} />
                </div>
                <div style={{
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    padding: '0.5rem 1.25rem',
                    background: `${accentColor}08`, // 8% opacity
                    borderRadius: '999px',
                    color: accentColor,
                    letterSpacing: '0.02em',
                    border: `1px solid ${accentColor}15`
                }}>
                    {category}
                </div>
            </div>

            <div style={{ flexGrow: 1 }}>
                <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    marginBottom: '1.25rem',
                    color: '#1e293b',
                    lineHeight: 1.3
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: '1.05rem',
                    color: '#64748b',
                    marginBottom: '2.5rem',
                    fontWeight: '450',
                    lineHeight: '1.8'
                }}>
                    {description}
                </p>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Link
                    href={url}
                    target="_blank"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: accentColor,
                        textDecoration: 'none',
                        transition: '0.3s'
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.gap = '1.25rem')}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.gap = '0.75rem')}
                >
                    여정 시작하기 <ExternalLink size={18} />
                </Link>
            </div>

            {/* Dynamic Glow Accent */}
            <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-20px',
                width: '120px',
                height: '120px',
                background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
}
