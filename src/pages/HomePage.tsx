import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Search, X, Calendar, Share2, ChevronRight, Megaphone, UserPlus } from 'lucide-react';
import { NEWS_DATA, SERVICES_DATA, NewsItem } from '@/src/constants';
import * as Icons from 'lucide-react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/src/context/AuthContext';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter(news => 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleShare = (news: NewsItem) => {
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-primary text-white p-6 pt-12 rounded-b-[2rem] shadow-lg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <p className="text-blue-200 text-sm">Selamat Datang,</p>
            <h1 className="text-2xl font-bold">{user ? user.name : 'Warga DUN Galas'}</h1>
          </div>
          <div className="flex gap-3">
            {!user && (
              <Link 
                to="/register"
                className="bg-secondary text-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10"
              >
                <UserPlus size={16} />
                Daftar Ahli
              </Link>
            )}
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 bg-white/10 rounded-full relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-primary rounded-full" />
            </button>
          </div>
        </div>
        
        <div className="relative z-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
          <input 
            type="text" 
            placeholder="Cari berita atau servis..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 placeholder:text-blue-200 focus:outline-none focus:bg-white/20 transition-all"
          />
        </div>
      </header>

      {/* Quick Actions */}
      <section className="px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-4 gap-4">
          {SERVICES_DATA.slice(0, 4).map((service, idx) => {
            const IconComponent = (Icons as any)[service.icon];
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary mb-2 border border-slate-100 active:scale-90 transition-transform">
                  <IconComponent size={24} />
                </div>
                <span className="text-[10px] font-semibold text-center text-slate-600 leading-tight">
                  {service.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Banner/Announcement */}
      <section className="px-6 mt-8">
        {!user && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary p-6 rounded-3xl text-white mb-6 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Daftar Ahli Sekarang!</h3>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Nikmati akses penuh kepada semua perkhidmatan digital DUN Galas dengan mendaftar sebagai ahli.
              </p>
              <Link 
                to="/register"
                className="inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
              >
                <UserPlus size={20} />
                Daftar Ahli
              </Link>
            </div>
          </motion.div>
        )}

        <motion.div 
          whileTap={{ scale: 0.98 }}
          className="bg-secondary/20 border border-secondary/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer"
        >
          <div className="bg-secondary p-2 rounded-xl text-primary">
            <Megaphone size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-primary">Hebahan Terkini</h3>
            <p className="text-xs text-slate-600">Pendaftaran Bantuan Bakul Makanan dibuka!</p>
          </div>
          <ChevronRight size={16} className="text-primary" />
        </motion.div>
      </section>

      {/* News Section */}
      <section className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Berita & Aktiviti</h2>
          <button className="text-primary text-sm font-semibold">Lihat Semua</button>
        </div>
        
        <div className="space-y-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
              <motion.div 
                key={news.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedNews(news)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex cursor-pointer"
              >
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-24 h-24 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                      {news.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{news.date}</span>
                  </div>
                  <h3 className="text-sm font-bold line-clamp-2 leading-tight mb-1">
                    {news.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {news.summary}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-400 text-sm">Tiada berita ditemui.</p>
            </div>
          )}
        </div>
      </section>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
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
              <div className="relative h-64">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md text-white rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-primary bg-blue-50 px-3 py-1 rounded-full uppercase">
                    {selectedNews.category}
                  </span>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar size={14} />
                    <span>{selectedNews.date}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-4 leading-tight">
                  {selectedNews.title}
                </h2>
                
                <div className="prose prose-sm text-slate-600 leading-relaxed mb-8">
                  <p>{selectedNews.summary}</p>
                  <p className="mt-4">
                    Kandungan berita penuh akan dipaparkan di sini. Pusat Khidmat DUN Galas sentiasa komited dalam menyampaikan maklumat yang tepat dan terkini kepada semua penduduk.
                  </p>
                  <p className="mt-2">
                    Untuk maklumat lanjut mengenai program ini, sila hubungi pejabat kami atau layari laman media sosial rasmi kami.
                  </p>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <button 
                    onClick={() => handleShare(selectedNews)}
                    className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Share2 size={18} />
                    Kongsi
                  </button>
                  <button 
                    onClick={() => setSelectedNews(null)}
                    className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications Drawer */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="bg-white w-full max-w-[85%] h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 pt-12 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold">Notifikasi</h2>
                <button onClick={() => setShowNotifications(false)} className="p-2 text-slate-400">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {[
                  { title: 'Bantuan Bakul Makanan', desc: 'Permohonan anda telah diterima.', time: '2 jam yang lalu', unread: true },
                  { title: 'Hebahan Program', desc: 'Jualan Rahmah akan bermula esok jam 8 pagi.', time: '5 jam yang lalu', unread: true },
                  { title: 'Aduan Selesai', desc: 'Aduan kerosakan lampu jalan di Kg. Baru telah diselesaikan.', time: '1 hari yang lalu', unread: false },
                ].map((notif, i) => (
                  <div key={i} className={cn(
                    "p-4 rounded-2xl border transition-colors",
                    notif.unread ? "bg-blue-50 border-blue-100" : "bg-white border-slate-100"
                  )}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm">{notif.title}</h4>
                      {notif.unread && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{notif.desc}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-slate-100">
                <button className="w-full text-primary text-sm font-bold">Tandakan semua sebagai dibaca</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

