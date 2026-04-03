import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, FileText, Loader2, ArrowRight, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    icNumber: '',
    password: ''
  });
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.icNumber, formData.password);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Daftar Ahli</h1>
        <p className="text-slate-500">Sertai komuniti digital DUN Galas hari ini.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Nama Penuh</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Masukkan nama penuh"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">No. Kad Pengenalan</label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="800101-03-XXXX"
              value={formData.icNumber}
              onChange={(e) => setFormData({...formData, icNumber: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Alamat Emel</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="email" 
              placeholder="nama@contoh.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Kata Laluan</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Daftar Ahli
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm mb-4">Sudah mempunyai akaun?</p>
        <Link 
          to="/login"
          className="inline-flex items-center gap-2 text-primary font-bold"
        >
          <LogIn size={18} />
          Log Masuk
        </Link>
      </div>
    </div>
  );
};
