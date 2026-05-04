import { motion } from 'framer-motion';
import Background from '@/components/Background';
import HeroInteractive from '@/components/HeroInteractive';
import HomeClient from '@/components/HomeClient';

const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || '';

async function getProjects() {
  if (!GAS_URL) return [];
  
  try {
    // ISR 적용: 60초마다 데이터 갱신
    const res = await fetch(GAS_URL, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!Array.isArray(data)) return [];

    // 서버 사이드 데이터 정규화
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
  } catch (error) {
    console.error('Failed to fetch projects on server:', error);
    return [];
  }
}

export default async function Home() {
  const initialProjects = await getProjects();

  return (
    <main className="premium-container">
      <Background />
      <div className="mesh-gradient" />

      <HeroInteractive />

      <HomeClient initialProjects={initialProjects} gasUrl={GAS_URL} />

      {/* Footer */}
      <footer
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
      </footer>
    </main>
  );
}
