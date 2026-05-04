'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PlusCircle, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { iconMap } from '@/lib/icons';

interface HomeClientProps {
  initialProjects: any[];
  gasUrl: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function HomeClient({ initialProjects, gasUrl }: HomeClientProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [isReady, setIsReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    icon: 'Sparkles',
    accentColor: '#6366f1',
    category: 'AI Project'
  });

  useEffect(() => {
    setIsReady(true);
  }, []);

  const normalizeData = (data: any[]) => {
    return data.map(item => {
      const newItem: any = {};
      Object.keys(item).forEach(key => {
        const cleanKey = key.toLowerCase().trim();
        if (cleanKey === 'accentcolor') newItem['accentColor'] = item[key];
        else if (cleanKey === 'createdat') newItem['createdAt'] = item[key];
        else newItem[cleanKey] = item[key];
      });
      if (newItem.icon) {
        newItem.icon = newItem.icon.charAt(0).toUpperCase() + newItem.icon.slice(1).toLowerCase();
      }
      return newItem;
    });
  };

  const refreshProjects = async () => {
    try {
      const res = await fetch(`${gasUrl}?t=${Date.now()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(normalizeData(data));
      }
    } catch (error) {
      console.error('Failed to refresh projects:', error);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(gasUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
      });
      setIsModalOpen(false);
      setFormData({ title: '', description: '', url: '', icon: 'Sparkles', accentColor: '#6366f1', category: 'AI Project' });
      
      // GAS 반영 및 캐시 갱신을 기다린 후 새로고침
      setTimeout(refreshProjects, 1500);
    } catch (error) {
      console.error('Failed to add project:', error);
      alert('저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate={isReady ? "visible" : "hidden"}
        id="projects"
        className="bento-shell"
      >
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
            fontSize: '1.8rem',
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
          <motion.div key={`${project.title}-${index}`} variants={itemVariants}>
            <ProjectCard
              {...project}
              icon={iconMap[project.icon] || Sparkles}
              className=""
            />
          </motion.div>
        ))}

        <motion.div
          variants={itemVariants}
          className="premium-card cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px dashed var(--card-border)',
            background: 'var(--card-bg)',
            boxShadow: 'none',
            minHeight: '320px'
          }}
          whileHover={{ borderColor: 'var(--color-primary)', backgroundColor: 'rgba(79, 70, 229, 0.02)' }}
        >
          <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-all">
            <PlusCircle size={48} className="text-slate-400 group-hover:text-indigo-500 transition-all" />
          </div>
          <p style={{
            marginTop: '1.5rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            fontWeight: '600',
          }}>
            새로운 발자취 추가하기
          </p>
        </motion.div>
      </motion.section>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(2, 6, 23, 0.7)',
                backdropFilter: 'blur(8px)'
              }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '540px',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(40px) saturate(200%)',
                border: '1px solid var(--card-border)',
                borderRadius: '3rem',
                padding: '3.5rem',
                boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
                zIndex: 10000
              }}
            >
              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1.2rem' }}>
                  <PlusCircle size={28} color="#6366f1" />
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  새로운 프로젝트 추가
                </h2>
              </div>

              <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                    사이트 이름
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.5rem',
                      borderRadius: '1.5rem',
                      background: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    placeholder="예: My Cool Project"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                    설명
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.5rem',
                      borderRadius: '1.5rem',
                      background: 'rgba(0, 0, 0, 0.03)',
                      border: '1px solid var(--card-border)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem',
                      fontWeight: '500',
                      outline: 'none',
                      minHeight: '120px',
                      resize: 'none',
                      transition: 'all 0.3s'
                    }}
                    placeholder="프로젝트에 대해 짧게 소개해 주세요."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                      URL 주소
                    </label>
                    <input
                      required
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.03)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        outline: 'none',
                        transition: 'all 0.3s'
                      }}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                      카테고리
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.03)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        outline: 'none',
                        appearance: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="바이브 코딩 센터">바이브 코딩 센터</option>
                      <option value="성장 대시보드">성장 대시보드</option>
                      <option value="마케팅 자동화">마케팅 자동화</option>
                      <option value="AI 체험실">AI 체험실</option>
                      <option value="AI 학습 센터">AI 학습 센터</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                      아이콘 선택
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.03)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        outline: 'none',
                        appearance: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.keys(iconMap).map(iconName => (
                        <option key={iconName} value={iconName}>{iconName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', marginLeft: '0.5rem' }}>
                      강조 색상
                    </label>
                    <select
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '1.2rem 1.5rem',
                        borderRadius: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.03)',
                        border: '1px solid var(--card-border)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem',
                        fontWeight: '500',
                        outline: 'none',
                        appearance: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="#8b5cf6">Violet (바이브코딩)</option>
                      <option value="#6366f1">Indigo (성장)</option>
                      <option value="#f43f5e">Rose (마케팅)</option>
                      <option value="#10b981">Emerald (체험)</option>
                      <option value="#f59e0b">Amber (학습)</option>
                      <option value="#0ea5e9">Cyan (기술)</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: '1.2rem',
                      borderRadius: '1.5rem',
                      fontWeight: '800',
                      color: 'var(--text-secondary)',
                      background: 'transparent',
                      border: '1px solid var(--card-border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                  >
                    취소
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    style={{
                      padding: '1.2rem',
                      borderRadius: '1.5rem',
                      fontWeight: '800',
                      color: '#fff',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                      transition: 'all 0.3s',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                  >
                    {isSubmitting ? '저장 중...' : '프로젝트 저장'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
