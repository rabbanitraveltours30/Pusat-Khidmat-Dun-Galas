import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Users, FileText, MessageSquare, 
  ChevronRight, ArrowUpRight, ArrowDownRight, 
  Clock, CheckCircle2, XCircle, Search, Filter,
  LayoutDashboard, Settings, Bell, Megaphone,
  Plus, X, Image as ImageIcon, Tag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS, NEWS_DATA, NewsItem } from '@/src/constants';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'complaints' | 'news'>('overview');
  const [showAddNews, setShowAddNews] = useState(false);
  const [newsList, setNewsList] = useState<NewsItem[]>(NEWS_DATA);
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'Berita' as NewsItem['category'],
    summary: '',
    image: 'https://picsum.photos/seed/new/800/400'
  });

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const item: NewsItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newNews.title,
      category: newNews.category,
      summary: newNews.summary,
      image: newNews.image,
      date: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setNewsList([item, ...newsList]);
    setShowAddNews(false);
    setNewNews({ title: '', category: 'Berita', summary: '', image: 'https://picsum.photos/seed/new/800/400' });
  };

  const handleDeleteNews = (id: string) => {
    setNewsList(newsList.filter(news => news.id !== id));
  };

  const stats = [
    { label: 'Jumlah Ahli', value: '1,284', icon: Users, color: 'bg-blue-500', trend: '+12%', up: true },
    { label: 'Permohonan Baru', value: '42', icon: FileText, color: 'bg-amber-500', trend: '+5%', up: true },
    { label: 'Aduan Aktif', value: '18', icon: MessageSquare, color: 'bg-red-500', trend: '-2%', up: false },
    { label: 'Kadar Kelulusan', value: '85%', icon: BarChart3, color: 'bg-green-500', trend: '+3%', up: true },
  ];

  const recentActivities = [
    { id: 1, user: 'Ahmad Fauzi', action: 'Menghantar permohonan bantuan', time: '10 minit yang lalu', type: 'application' },
    { id: 2, user: 'Siti Aminah', action: 'Melaporkan kerosakan jalan', time: '25 minit yang lalu', type: 'complaint' },
    { id: 3, user: 'Robert Lim', action: 'Mendaftar sebagai ahli baru', time: '1 jam yang lalu', type: 'user' },
    { id: 4, user: 'Zulkifli Ali', action: 'Mengemaskini profil', time: '2 jam yang lalu', type: 'user' },
  ];

  return (
    <div className="pb-24 bg-slate-50 min-h-screen">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white p-6 pt-12 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Panel Admin</h1>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mt-1">Pusat Khidmat DUN Galas</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/10 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 bg-white/10 rounded-xl">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-3xl"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`${stat.color} p-2 rounded-xl text-white`}>
                  <stat.icon size={18} />
                </div>
                <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend}
                  {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                </div>
              </div>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-xl font-bold mt-1">{stat.value}</h3>
            </motion.div>
          ))}
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="px-6 mt-8">
        <div className="bg-white p-1 rounded-2xl border border-slate-200 flex shadow-sm overflow-x-auto no-scrollbar">
          {(['overview', 'applications', 'complaints', 'news'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-primary text-white shadow-md' : 'text-slate-500'
              }`}
            >
              {tab === 'overview' ? 'Ringkasan' : tab === 'applications' ? 'Permohonan' : tab === 'complaints' ? 'Aduan' : 'Berita'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Recent Activity */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">Aktiviti Terkini</h2>
                <button className="text-primary text-xs font-bold">Lihat Semua</button>
              </div>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {recentActivities.map((activity, idx) => (
                  <div key={activity.id} className="p-4 flex items-center gap-4 border-b border-slate-50 last:border-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activity.type === 'application' ? 'bg-amber-50 text-amber-600' : 
                      activity.type === 'complaint' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {activity.type === 'application' ? <FileText size={18} /> : 
                       activity.type === 'complaint' ? <MessageSquare size={18} /> : <Users size={18} />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">{activity.user}</h4>
                      <p className="text-[11px] text-slate-500">{activity.action}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-primary/5 border border-primary/10 p-6 rounded-[2.5rem]">
              <h3 className="text-sm font-bold text-primary mb-4">Tindakan Pantas</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { setActiveTab('news'); setShowAddNews(true); }}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                    <Megaphone size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Berita Baru</span>
                </button>
                <button className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center gap-2 active:scale-95 transition-all">
                  <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700">Luluskan Semua</span>
                </button>
              </div>
            </section>
          </>
        )}

        {activeTab === 'news' && (
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Urus Berita</h2>
              <button 
                onClick={() => setShowAddNews(true)}
                className="bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20"
              >
                <Plus size={16} />
                Tambah Berita
              </button>
            </div>

            <div className="space-y-4">
              {newsList.map((news) => (
                <div key={news.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex gap-3">
                  <img src={news.image} alt={news.title} className="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                        {news.category}
                      </span>
                      <button 
                        onClick={() => handleDeleteNews(news.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-1">{news.title}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{news.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'applications' && (
          <section className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Cari permohonan..." 
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-3">
              {MOCK_APPLICATIONS.map((app) => (
                <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{app.serviceTitle}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{app.referenceNo}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      app.status === 'Diluluskan' ? 'text-green-600 bg-green-50' : 
                      app.status === 'Ditolak' ? 'text-red-600 bg-red-50' : 'text-blue-600 bg-blue-50'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                      WA
                    </div>
                    <span className="text-xs text-slate-600 font-medium">Warga Awam</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary text-white py-2 rounded-xl text-[10px] font-bold">Luluskan</button>
                    <button className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-[10px] font-bold">Butiran</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'complaints' && (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
            <MessageSquare className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-slate-800 font-bold">Modul Aduan</h3>
            <p className="text-slate-500 text-xs mt-1">Sedang dikemaskini oleh sistem.</p>
          </div>
        )}
      </div>

      {/* Add News Modal */}
      <AnimatePresence>
        {showAddNews && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                <h2 className="text-xl font-bold">Tambah Berita Baru</h2>
                <button onClick={() => setShowAddNews(false)} className="p-2 text-white/60 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleAddNews} className="p-6 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Tajuk Berita</label>
                  <input 
                    type="text" 
                    value={newNews.title}
                    onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                    placeholder="Masukkan tajuk berita"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Kategori</label>
                  <div className="flex gap-2">
                    {(['Berita', 'Hebahan', 'Program'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewNews({...newNews, category: cat})}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                          newNews.category === cat ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ringkasan</label>
                  <textarea 
                    rows={3}
                    value={newNews.summary}
                    onChange={(e) => setNewNews({...newNews, summary: e.target.value})}
                    placeholder="Masukkan ringkasan berita..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">URL Gambar (Opsional)</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      value={newNews.image}
                      onChange={(e) => setNewNews({...newNews, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                >
                  Terbitkan Berita
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
