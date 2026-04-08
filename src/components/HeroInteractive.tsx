'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Brain, Rocket, Sparkles, Cpu, Bot, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any },
  },
};

export default function HeroInteractive() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 패럴랙스를 위한 마우스 위치 상태
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 스프링 물리 효과 적용 (부드러운 움직임)
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // 중심값을 0으로 기준 삼고 -1~1 로 정규화
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // 배경에 둥둥 떠다닐 3D 분위기 아이콘들 설정
  const icons = [
    { Icon: Rocket, size: 54, color: '#f43f5e', top: '15%', left: '15%', delay: 0, dur: 4, multiX: 40, multiY: 30 },
    { Icon: Brain, size: 70, color: '#4f46e5', top: '25%', left: '80%', delay: 1, dur: 5, multiX: -50, multiY: -40 },
    { Icon: Sparkles, size: 45, color: '#eab308', top: '65%', left: '10%', delay: 0.5, dur: 3.5, multiX: 30, multiY: -20 },
    { Icon: Bot, size: 60, color: '#10b981', top: '70%', left: '75%', delay: 1.5, dur: 4.5, multiX: -35, multiY: 35 },
    { Icon: Cpu, size: 48, color: '#0ea5e9', top: '5%', left: '50%', delay: 2, dur: 6, multiX: 20, multiY: 40 },
  ];

  return (
    <motion.header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        position: 'relative',
        marginBottom: '4rem', 
        textAlign: 'center',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        // 모바일에서도 넘치지 않도록 제한
        overflow: 'hidden' 
      }}
    >
      {/* 1. Floating Interactive Background Icons */}
      {icons.map((item, idx) => {
        // 아이콘마다 마우스 이동에 따른 반응 계수를 다르게 설정하여 패럴랙스 느낌 강화
        const xTransform = useTransform(smoothX, [-1, 1], [-item.multiX, item.multiX]);
        const yTransform = useTransform(smoothY, [-1, 1], [-item.multiY, item.multiY]);

        return (
          <motion.div
            key={idx}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              x: xTransform,
              y: yTransform,
              zIndex: 0,
            }}
          >
            {/* 지속적인 떠다님 효과(오르내리기 및 회전) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 0.2, // 은은하게 렌더링
                scale: 1,
                y: [0, -15, 0],
                rotate: [0, 8, -8, 0]
              }}
              transition={{
                y: { duration: item.dur, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
                rotate: { duration: item.dur * 1.5, repeat: Infinity, ease: 'easeInOut', delay: item.delay },
                opacity: { duration: 1.5 },
                scale: { duration: 1.5, ease: 'easeOut' }
              }}
              style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }}
            >
              <item.Icon size={item.size} color={item.color} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* 2. Main Hero Content (글자와 버튼 유지) */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <motion.h1
          variants={itemVariants}
          style={{
            fontSize: 'clamp(3rem, 10vw, 6.5rem)',
            fontWeight: '950',
            lineHeight: 1.1,
            marginBottom: '2rem',
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
            margin: '0 auto 4rem auto',
            fontWeight: '500',
            lineHeight: '1.8',
            letterSpacing: '-0.01em'
          }}
        >
          우리가 함께 만든 인공지능 결과물들을 한곳에 모았습니다. ✨ <br />
          더 따뜻하고 친근한 AI 세상을 꿈꾸는 우리의 여정에 함께해 주세요.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            pointerEvents: 'auto',
            marginTop: '2rem' 
          }}
        >
          <motion.button
            onClick={() => {
              const element = document.getElementById('projects');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: 'transparent',
              border: '1px solid var(--card-border)',
              borderRadius: '50%',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              scale: 1.1, 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'var(--color-primary)',
              color: 'var(--color-primary)'
            }}
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </div>
    </motion.header>
  );
}
