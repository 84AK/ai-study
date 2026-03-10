'use client';

import { ClipboardList, Instagram, Sparkles, PlusCircle } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    title: 'Activity Log',
    description: 'AI와 함께 걸어온 발자취를 소중히 담았습니다. 우리의 성장 과정과 학습 기록들을 차곡차곡 모아놓은 대시보드예요.',
    url: 'https://84ak.github.io/activity_log/',
    icon: ClipboardList,
    accentColor: '#6366f1', // Indigo
    category: '성장 대시보드',
  },
  {
    title: 'Sellstagram',
    description: '마케팅의 새로운 물결을 경험해 보세요! AI로 인스타그램 마이 채널을 똑똑하게 키워가는 자동화 비법을 나눕니다.',
    url: 'https://sellstagram.vercel.app/',
    icon: Instagram,
    accentColor: '#f43f5e', // Rose
    category: '마케팅 자동화',
  },
  {
    title: 'Playgrounds',
    description: '호기심 가득한 눈으로 세상을 바라보는 시간! 다양한 AI 모델들과 신나게 장난치며 지능의 매력을 발견해 봐요.',
    url: 'https://ai-playgrounds.vercel.app/',
    icon: Sparkles,
    accentColor: '#10b981', // Emerald
    category: 'AI 체험실',
  },
];

export default function Home() {
  return (
    <main className="premium-container">
      {/* Header Section */}
      <header style={{ marginBottom: '12rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
          fontWeight: '900',
          lineHeight: 1.2,
          marginBottom: '2.5rem',
          letterSpacing: '-0.04em'
        }} className="gradient-text">
          AI Study <br /> Universe
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
          color: '#64748b',
          maxWidth: '750px',
          margin: '0 auto 4.5rem auto',
          fontWeight: '500',
          lineHeight: '1.8'
        }}>
          우리가 함께 만든 인공지능 결과물들을 한곳에 모았습니다. ✨ <br />
          더 따뜻하고 친근한 AI 세상을 꿈꾸는 우리의 여정에 함께해 주세요.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="https://litt.ly/aklabs" target="_blank" className="glow-button">
            AKLABS 공식 홈페이지
          </a>
        </div>
      </header>

      {/* Bento Grid */}
      <section className="bento-shell">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}

        {/* Playful Placeholder */}
        <div className="premium-card" style={{
          justifyContent: 'center',
          alignItems: 'center',
          border: '3px dashed #e2e8f0',
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: 'none',
          minHeight: '320px'
        }}>
          <PlusCircle size={48} color="#cbd5e1" />
          <p style={{
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            color: '#94a3b8',
            fontWeight: '600',
          }}>
            더 멋진 발자취가 곧 추가될 예정이에요
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: '18rem',
        paddingTop: '5rem',
        borderTop: '1px solid #e2e8f0',
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: '1rem'
      }}>
        <p>© 2026 AI Study Class. Crafting Future Intelligence with Love.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>Designed by AK Labs Universe</p>
      </footer>
    </main>
  );
}
