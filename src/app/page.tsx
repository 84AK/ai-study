'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Instagram, Sparkles, PlusCircle, GraduationCap } from 'lucide-react';
import Background from '@/components/Background';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    title: 'Activity Log',
    description: 'AI와 함께 걸어온 발자취를 소중히 담았습니다. 우리의 성장 과정과 학습 기록들을 차곡차곡 모아놓은 대시보드예요.',
    url: 'https://activity-log-six.vercel.app/',
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function Home() {
  return (
    <main className="premium-container">
      <Background />
      <div className="mesh-gradient" />

      {/* Header Section */}
      <motion.header
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '14rem', textAlign: 'center' }}
      >
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            fontWeight: '950',
            lineHeight: 1.1,
            marginBottom: '3rem',
            letterSpacing: '-0.05em',
            filter: 'drop-shadow(0 0 20px rgba(79, 70, 229, 0.15))'
          }}
          className="gradient-text"
        >
          AI Study <br /> Universe
        </motion.h1>

        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto 5rem auto',
            fontWeight: '500',
            lineHeight: '2',
            letterSpacing: '-0.01em'
          }}
        >
          우리가 함께 만든 인공지능 결과물들을 한곳에 모았습니다. ✨ <br />
          더 따뜻하고 친근한 AI 세상을 꿈꾸는 우리의 여정에 함께해 주세요.
        </motion.p>

        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <a href="https://litt.ly/aklabs" target="_blank" className="glow-button">
            AKLABS 공식 홈페이지
          </a>
        </motion.div>
      </motion.header>

      {/* 수업 준비 섹션 (Class Prep Section) */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ marginBottom: '8rem', display: 'flex', justifyContent: 'center' }}
      >
        <motion.div
          variants={itemVariants}
          className="premium-card"
          style={{
            maxWidth: '800px',
            width: '100%',
            textAlign: 'center',
            padding: '3.5rem 2rem',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            position: 'relative',
          }}
        >
          <div style={{
            display: 'inline-flex',
            padding: '1.2rem',
            background: 'var(--accent-glow, rgba(79, 70, 229, 0.1))',
            borderRadius: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(79, 70, 229, 0.15)'
          }}>
            <GraduationCap size={40} color="#4f46e5" />
          </div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '900',
            marginBottom: '1rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            🎓 수업 준비 안내
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            fontWeight: '500',
            maxWidth: '500px',
            margin: '0 auto 2.5rem auto',
            lineHeight: '1.6'
          }}>
            원활한 수업 진행을 위해 필요한 계정 생성 및 <br /> 사전 준비 사항을 확인해 보세요.
          </p>
          <div>
            <a
              href="https://ai-student-id.vercel.app/"
              target="_blank"
              className="glow-button"
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1.2rem 3rem'
              }}
            >
              계정 준비하기
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Bento Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="bento-shell"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}

        {/* Playful Placeholder */}
        <motion.div
          variants={itemVariants}
          className="premium-card"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px dashed var(--card-border)',
            background: 'var(--card-bg)',
            boxShadow: 'none',
            minHeight: '320px'
          }}
        >
          <PlusCircle size={48} color="#94a3b8" />
          <p style={{
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600',
          }}>
            더 멋진 발자취가 곧 추가될 예정이에요
          </p>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          marginTop: '18rem',
          paddingTop: '5rem',
          borderTop: '1px solid var(--card-border)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '1rem'
        }}
      >
        <p>© 2026 AI Study Class. Crafting Future Intelligence with Love.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>Designed by AK Labs Universe</p>
      </motion.footer>
    </main>
  );
}
