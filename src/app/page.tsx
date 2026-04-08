'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Instagram, Sparkles, PlusCircle, GraduationCap } from 'lucide-react';
import Background from '@/components/Background';
import ProjectCard from '@/components/ProjectCard';
import HeroInteractive from '@/components/HeroInteractive';

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

      <HeroInteractive />


      {/* Bento Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        id="projects"
        className="bento-shell"
      >
        {/* 그리드 첫 번째에 '수업 준비 안내' 통합 배치 (대형 배너 디자인) */}
        <motion.div
          variants={itemVariants}
          className="premium-card bento-span-2"
          style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
            border: '1px solid rgba(79, 70, 229, 0.12)',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
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
            fontSize: '1.8rem', /* 반응형 대비 살짝 조절 */
            fontWeight: '900',
            marginBottom: '0.8rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em'
          }}>
            🎓 수업 준비 안내
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontWeight: '500',
            maxWidth: '500px',
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
                padding: '1rem 2.5rem'
              }}
            >
              계정 준비하기
            </a>
          </div>
        </motion.div>

        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            {...project} 
            className="" /* 이제 1칸씩 균등 배치 */
          />
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
          marginTop: '12rem',
          paddingTop: '5rem',
          paddingBottom: '3rem',
          borderTop: '1px solid var(--card-border)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'center'
        }}
      >
        <a 
          href="https://litt.ly/aklabs" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="glow-button"
          style={{ marginBottom: '2rem' }}
        >
          AKLABS 공식 홈페이지
        </a>
        <p>© 2026 AI Study Class. Crafting Future Intelligence.</p>
        <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#cbd5e1' }}>
          Designed by <span style={{ color: 'var(--color-primary)' }}>AK Labs Universe</span>
        </p>
      </motion.footer>
    </main>
  );
}
