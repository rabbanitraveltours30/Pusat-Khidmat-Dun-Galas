import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Facebook, Globe, MessageCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contacts = [
    { icon: Phone, label: 'Pejabat', value: '09-912 1234', color: 'bg-blue-100 text-blue-600' },
    { icon: MessageCircle, label: 'WhatsApp', value: '012-345 6789', color: 'bg-green-100 text-green-600' },
    { icon: Mail, label: 'Email', value: 'khidmat.galas@gmail.com', color: 'bg-red-100 text-red-600' },
    { icon: Facebook, label: 'Facebook', value: 'Pusat Khidmat DUN Galas', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-primary text-white rounded-b-[2rem]">
        <h1 className="text-2xl font-bold">Hubungi Kami</h1>
        <p className="text-blue-200 text-sm">Kami sedia membantu anda.</p>
      </header>

      <div className="p-6 -mt-4">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Alamat Pejabat</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Lot 123, Bangunan Pusat Khidmat,<br />
                Bandar Baru Gua Musang,<br />
                18300 Gua Musang, Kelantan.
              </p>
            </div>
          </div>

          <div className="h-40 w-full bg-slate-100 rounded-2xl overflow-hidden relative">
             <img 
              src="https://picsum.photos/seed/map/600/400" 
              alt="Map Placeholder" 
              className="w-full h-full object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-white px-4 py-2 rounded-full shadow-md text-primary font-bold text-sm flex items-center gap-2">
                <Globe size={16} />
                Buka Google Maps
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {contacts.map((contact, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${contact.color} rounded-xl flex items-center justify-center`}>
                <contact.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{contact.label}</p>
                <p className="font-bold text-slate-800">{contact.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <h3 className="font-bold text-primary mb-2">Waktu Operasi</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Ahad - Rabu</span>
              <span className="font-bold">8:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Khamis</span>
              <span className="font-bold">8:00 AM - 3:30 PM</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Jumaat - Sabtu</span>
              <span className="font-bold">Tutup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
