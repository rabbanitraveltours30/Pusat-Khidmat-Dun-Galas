import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA, ServiceItem } from '@/src/constants';
import * as Icons from 'lucide-react';
import { X, CheckCircle2, FileText, User, Phone, UserPlus } from 'lucide-react';
import { useAuth } from '@/src/context/AuthContext';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const closeModals = () => {
    setSelectedService(null);
    setIsSuccess(false);
  };

  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-white border-b border-slate-100 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Perkhidmatan Kami</h1>
          <p className="text-slate-500 text-sm">Pelbagai bantuan dan khidmat untuk rakyat.</p>
        </div>
        {!user && (
          <Link 
            to="/register"
            className="bg-primary text-white p-3 rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            <UserPlus size={20} />
          </Link>
        )}
      </header>

      <div className="p-6 grid grid-cols-1 gap-4">
        {SERVICES_DATA.map((service, idx) => {
          const IconComponent = (Icons as any)[service.icon];
          return (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex gap-4 items-start"
            >
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <IconComponent size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 mb-1">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">
                  {service.description}
                </p>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="text-xs font-bold text-primary bg-blue-50 px-4 py-2 rounded-full active:scale-95 transition-transform"
                >
                  Mohon Sekarang
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="px-6 mt-4">
        <div className="bg-slate-900 text-white p-6 rounded-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Perlukan Bantuan Segera?</h3>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Pasukan khidmat kami sedia membantu anda 24/7 untuk kes-kes kecemasan di kawasan DUN Galas.
            </p>
            <a 
              href="tel:099121234"
              className="inline-block bg-secondary text-primary px-6 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-transform"
            >
              Hubungi Talian Hot-Line
            </a>
          </div>
          <Icons.ShieldAlert className="absolute -right-4 -bottom-4 text-white/5 w-32 h-32" />
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedService && !isSuccess && (
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
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-primary text-white">
                <div>
                  <h2 className="text-xl font-bold">Borang Permohonan</h2>
                  <p className="text-blue-200 text-xs">{selectedService.title}</p>
                </div>
                <button onClick={closeModals} className="p-2 text-white/60 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleApply} className="p-6 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nama Penuh</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Masukkan nama penuh anda"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">No. Kad Pengenalan</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Contoh: 800101-03-5566"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">No. Telefon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel" 
                      placeholder="Contoh: 012-3456789"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Sebab Permohonan</label>
                  <textarea 
                    rows={3}
                    placeholder="Nyatakan sebab atau butiran permohonan anda..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
                >
                  {isSubmitting ? 'Menghantar...' : 'Hantar Permohonan'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-xs rounded-3xl p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-xl font-bold mb-2">Berjaya Dihantar!</h2>
              <p className="text-slate-500 text-sm mb-8">
                Permohonan anda bagi <span className="font-bold text-slate-700">{selectedService?.title}</span> telah diterima. Kami akan menghubungi anda dalam masa terdekat.
              </p>
              <button 
                onClick={closeModals}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

