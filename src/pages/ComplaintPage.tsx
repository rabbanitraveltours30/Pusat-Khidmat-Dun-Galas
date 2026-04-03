import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Send, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export const ComplaintPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Kerosakan Jalan',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-2xl font-bold mb-3">Aduan Diterima!</h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Terima kasih atas maklum balas anda. Nombor rujukan aduan anda ialah <span className="font-bold text-primary">#GLS-2026-001</span>. Kami akan menyemak aduan anda secepat mungkin.
        </p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setFormData({ type: 'Kerosakan Jalan', location: '', description: '' });
          }}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
        >
          Kembali ke Borang
        </button>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-bold">Sistem Aduan Rakyat</h1>
        <p className="text-slate-500 text-sm">Laporkan masalah atau kerosakan di kawasan anda.</p>
      </header>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Jenis Aduan</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            >
              <option>Kerosakan Jalan</option>
              <option>Lampu Jalan</option>
              <option>Masalah Air/Longkang</option>
              <option>Kebersihan/Sampah</option>
              <option>Lain-lain</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Lokasi Kejadian</label>
            <input 
              type="text" 
              placeholder="Contoh: Jalan Besar, Kg. Baru"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Keterangan Lanjut</label>
            <textarea 
              rows={4}
              placeholder="Terangkan masalah anda dengan jelas..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Gambar (Opsional)</label>
            <div className="grid grid-cols-3 gap-3">
              <button type="button" className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all active:scale-95">
                <Camera size={24} className="mb-1" />
                <span className="text-[10px] font-bold">Ambil Foto</span>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex gap-3">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-xs text-amber-700 leading-relaxed">
              Sila pastikan maklumat yang diberikan adalah benar. Aduan palsu boleh dikenakan tindakan.
            </p>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Menghantar...
              </>
            ) : (
              <>
                <Send size={20} />
                Hantar Aduan
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

