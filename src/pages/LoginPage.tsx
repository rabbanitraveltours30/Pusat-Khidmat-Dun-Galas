import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2, ArrowRight, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
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
        className="mb-12 text-center"
      >
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-900/20">
          <Lock className="text-white" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Log Masuk</h1>
        <p className="text-slate-500">Sila masukkan butiran anda untuk terus menggunakan aplikasi.</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Alamat Emel</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="email" 
              placeholder="nama@contoh.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kata Laluan</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>
          <div className="text-right">
            <button type="button" className="text-xs font-bold text-primary">Lupa Kata Laluan?</button>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Log Masuk
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      <div className="mt-12 text-center">
        <p className="text-slate-500 text-sm mb-4">Belum mempunyai akaun?</p>
        <Link 
          to="/register"
          className="inline-flex items-center gap-2 text-primary font-bold"
        >
          <UserPlus size={18} />
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
};
