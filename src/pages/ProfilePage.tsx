import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Shield, Bell, LogOut, ChevronRight, FileText, History, ChevronDown, ChevronUp, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '@/src/constants';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showApplications, setShowApplications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6">
          <User size={40} />
        </div>
        <h2 className="text-xl font-bold mb-2">Akses Terhad</h2>
        <p className="text-slate-500 mb-8">Sila log masuk untuk melihat profil anda dan sejarah permohonan.</p>
        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold mb-4"
        >
          Log Masuk
        </button>
        <p className="text-slate-500 text-sm">
          Belum ada akaun? {' '}
          <button 
            onClick={() => navigate('/register')}
            className="text-primary font-bold"
          >
            Daftar Sekarang
          </button>
        </p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diluluskan': return 'text-green-600 bg-green-50';
      case 'Ditolak': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-primary text-white rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20" />
        <div className="flex flex-col items-center relative z-10">
          <div className="w-24 h-24 rounded-3xl border-4 border-white/20 overflow-hidden bg-white/10 mb-4 shadow-xl">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-blue-200 text-sm">{user.email}</p>
          <div className="flex gap-2 mt-4">
            <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest">
              Warga DUN Galas
            </div>
            {user.role === 'admin' && (
              <div className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-900/20">
                Admin
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-6 mt-8 space-y-6">
        {user.role === 'admin' && (
          <motion.button 
            onClick={() => navigate('/admin')}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-900/20 flex items-center justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <LayoutDashboard size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Panel Admin</h3>
                <p className="text-slate-400 text-xs">Monitor & Urus Aplikasi</p>
              </div>
            </div>
            <ChevronRight size={24} className="text-slate-500 relative z-10" />
          </motion.button>
        )}

        {/* Menu Items */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Permohonan Saya Accordion */}
          <motion.button 
            onClick={() => setShowApplications(!showApplications)}
            whileTap={{ backgroundColor: '#f8fafc' }}
            className="w-full p-5 flex items-center justify-between border-b border-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
                <FileText size={20} />
              </div>
              <span className="font-bold text-slate-700">Permohonan Saya</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {MOCK_APPLICATIONS.length}
              </span>
              {showApplications ? <ChevronUp size={18} className="text-slate-300" /> : <ChevronDown size={18} className="text-slate-300" />}
            </div>
          </motion.button>

          <AnimatePresence>
            {showApplications && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-slate-50/50"
              >
                <div className="p-4 space-y-3">
                  {MOCK_APPLICATIONS.map((app) => (
                    <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-slate-800">{app.serviceTitle}</h4>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mb-3 line-clamp-1">{app.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-slate-400">{app.date}</span>
                        <button 
                          onClick={() => navigate(`/application/${app.id}`)}
                          className="text-xs font-bold text-primary flex items-center gap-1"
                        >
                          Lihat Butiran
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Other Menu Items */}
          {[
            { icon: History, label: 'Sejarah Aduan', count: 1 },
            { icon: Bell, label: 'Tetapan Notifikasi' },
            { icon: Shield, label: 'Keselamatan Akaun' },
            { icon: Settings, label: 'Tetapan Aplikasi' },
          ].map((item, idx) => (
            <motion.button 
              key={idx}
              whileTap={{ backgroundColor: '#f8fafc' }}
              className="w-full p-5 flex items-center justify-between border-b border-slate-50 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <span className="font-bold text-slate-700">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.count && (
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
                <ChevronRight size={18} className="text-slate-300" />
              </div>
            </motion.button>
          ))}
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 py-5 rounded-3xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all border border-red-100"
        >
          <LogOut size={20} />
          Log Keluar Akaun
        </button>

        <div className="text-center py-4">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Versi Aplikasi 1.0.2</p>
        </div>
      </div>
    </div>
  );
};
