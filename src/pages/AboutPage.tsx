import React from 'react';
import { motion } from 'motion/react';
import { User, Award, History, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-bold">Mengenai DUN Galas</h1>
        <p className="text-slate-500 text-sm">Informasi wakil rakyat dan kawasan.</p>
      </header>

      <div className="p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8">
          <div className="h-32 bg-primary relative">
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-slate-200 shadow-md">
                <img 
                  src="https://picsum.photos/seed/adun/200/200" 
                  alt="ADUN Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
          <div className="pt-14 p-6">
            <h2 className="text-xl font-bold text-slate-800">YBS Mohd Syahbuddin Hashim</h2>
            <p className="text-primary font-bold text-sm mb-4">ADUN Galas</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              Berkhidmat untuk rakyat DUN Galas dengan penuh dedikasi sejak tahun 2018. Komited dalam membangunkan ekonomi dan kebajikan penduduk Gua Musang.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-3">
              <History size={20} />
            </div>
            <h4 className="font-bold text-sm mb-1">Visi</h4>
            <p className="text-[11px] text-slate-500">Membangunkan Galas sebagai hub ekonomi Gua Musang.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
              <Award size={20} />
            </div>
            <h4 className="font-bold text-sm mb-1">Misi</h4>
            <p className="text-[11px] text-slate-500">Memastikan kebajikan rakyat sentiasa diutamakan.</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Users size={20} className="text-primary" />
            Statistik Kawasan
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Jumlah Penduduk', value: '~45,000' },
              { label: 'Keluasan', value: '1,200 km²' },
              { label: 'Kampung/Taman', value: '54 Kawasan' },
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <span className="text-sm text-slate-600">{stat.label}</span>
                <span className="font-bold text-slate-800">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
