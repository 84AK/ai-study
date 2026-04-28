'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  PlusCircle, 
  Link as LinkIcon, 
  Trash2, 
  LogOut, 
  LayoutDashboard, 
  FileText,
  ExternalLink,
  ChevronRight,
  Pencil,
  Home as HomeIcon,
  X
} from 'lucide-react';
import Background from '@/components/Background';
import Link from 'next/link';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('기초');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 초기 데이터 로딩
  useEffect(() => {
    if (isLoggedIn) {
      fetchMaterials();
    }
  }, [isLoggedIn]);

  const fetchMaterials = async () => {
    const res = await fetch('/api/materials');
    const data = await res.json();
    setMaterials(data.materials || []);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password }),
    });

    if (res.ok) {
      setIsLoggedIn(true);
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
    setLoading(false);
  };

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    setLoading(true);
    
    const method = editingId ? 'PUT' : 'POST';
    const payload = editingId 
      ? { id: editingId, title: newTitle, url: newUrl, category: newCategory, password }
      : { title: newTitle, url: newUrl, category: newCategory, password };

    const res = await fetch('/api/materials', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setNewTitle('');
      setNewUrl('');
      setNewCategory('기초');
      setEditingId(null);
      fetchMaterials();
      alert(editingId ? '자료가 성공적으로 수정되었습니다!' : '자료가 성공적으로 등록되었습니다!');
    } else {
      alert('저장에 실패했습니다.');
    }
    setLoading(false);
  };

  const handleEditStart = (mat: any) => {
    setEditingId(mat.id);
    setNewTitle(mat.title);
    setNewUrl(mat.url);
    setNewCategory(mat.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewTitle('');
    setNewUrl('');
    setNewCategory('기초');
  };

  const handleDelete = async (matId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const res = await fetch('/api/materials', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: matId, password }),
    });

    if (res.ok) {
      fetchMaterials();
    } else {
      alert('삭제에 실패했습니다.');
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="premium-container flex items-center justify-center min-h-screen p-4">
        <Background />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card max-w-md w-full p-8"
          style={{ backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-indigo-500/10 rounded-2xl mb-4 border border-indigo-500/20">
              <Lock size={32} className="text-indigo-500" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Admin Login</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">관리자 계정으로 로그인해 주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">ID</label>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="아이디를 입력하세요"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button 
              type="submit"
              className="glow-button w-full py-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              로그인
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="premium-container min-h-screen p-6 md:p-12">
      <Background />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <LayoutDashboard size={24} className="text-indigo-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Material Manager</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">수업 자료를 실시간으로 관리합니다.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800/50 hover:bg-indigo-500/10 hover:text-indigo-500 text-slate-700 dark:text-slate-400 rounded-lg border border-slate-300 dark:border-slate-700 transition-all text-sm font-bold shadow-sm"
            >
              <HomeIcon size={16} /> 홈으로
            </Link>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-red-500/10 hover:text-red-500 text-slate-700 dark:text-slate-400 rounded-lg border border-slate-300 dark:border-slate-700 transition-all text-sm font-bold"
            >
              <LogOut size={16} /> 로그아웃
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form (Bento Large Card) */}
          <motion.section 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 premium-card p-8 h-fit border-2 transition-all ${editingId ? 'border-indigo-500 shadow-indigo-500/10' : 'border-transparent'}`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {editingId ? <Pencil size={20} className="text-indigo-500" /> : <PlusCircle size={20} className="text-indigo-500" />}
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editingId ? '자료 수정하기' : '새 자료 추가'}
                </h2>
              </div>
              {editingId && (
                <button onClick={handleCancelEdit} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>
            
            <form onSubmit={handleAddMaterial} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">자료 제목</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  placeholder="예: 1차시 수업 가이드"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">노션 URL</label>
                <div className="relative">
                  <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="url" 
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl pl-11 pr-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 mb-2 block">카테고리</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none"
                >
                  <option value="기초">기초</option>
                  <option value="심화">심화</option>
                  <option value="실습">실습</option>
                  <option value="참고">참고 자료</option>
                </select>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className={`glow-button w-full py-4 font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 ${editingId ? 'bg-indigo-600 shadow-indigo-500/20' : 'bg-slate-900 dark:bg-indigo-600 shadow-slate-500/20'}`}
              >
                {loading ? '저장 중...' : (editingId ? '수정 완료' : '자료 등록하기')}
              </button>
            </form>
          </motion.section>

          {/* List Section (Bento Multi-column) */}
          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-indigo-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">현재 등록된 수업 자료 ({materials.length})</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {materials.map((mat) => (
                  <motion.div 
                    key={mat.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="premium-card p-5 group relative overflow-hidden"
                    style={{ border: '1px solid rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 text-[10px] font-black uppercase tracking-tighter rounded-full border border-indigo-500/20">
                        {mat.category}
                      </span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditStart(mat)}
                          className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                        >
                          <Pencil size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(mat.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 line-clamp-1">{mat.title}</h3>
                    <p className="text-slate-600 dark:text-slate-500 text-xs mb-4 flex items-center gap-1">
                      <LinkIcon size={10} /> {mat.url.substring(0, 30)}...
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-slate-600 text-[10px] font-medium">{mat.createdAt}</span>
                      <a 
                        href={mat.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-indigo-400 text-xs font-bold hover:text-indigo-300 transition-colors"
                      >
                        확인하기 <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {materials.length === 0 && (
                <div className="col-span-full py-20 text-center premium-card border-dashed">
                  <p className="text-slate-500 font-medium">등록된 수업 자료가 없습니다.</p>
                </div>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
