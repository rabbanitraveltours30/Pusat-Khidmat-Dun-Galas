import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, FileText, CheckCircle2, Clock, XCircle, Info } from 'lucide-react';
import { MOCK_APPLICATIONS } from '@/src/constants';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const application = MOCK_APPLICATIONS.find(app => app.id === id);

  if (!application) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Permohonan tidak ditemui</h2>
        <button 
          onClick={() => navigate('/profile')}
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold"
        >
          Kembali ke Profil
        </button>
      </div>
    );
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Diluluskan': return { bg: 'bg-green-50', text: 'text-green-600', icon: CheckCircle2 };
      case 'Ditolak': return { bg: 'bg-red-50', text: 'text-red-600', icon: XCircle };
      default: return { bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock };
    }
  };

  const statusStyle = getStatusStyles(application.status);
  const StatusIcon = statusStyle.icon;

  return (
    <div className="pb-24">
      <header className="p-6 pt-12 bg-white border-b border-slate-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-xl text-slate-600">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Butiran Permohonan</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* Status Card */}
        <div className={`${statusStyle.bg} p-6 rounded-3xl border border-white/20 flex items-center gap-4 shadow-sm`}>
          <div className={`${statusStyle.text} bg-white p-3 rounded-2xl shadow-sm`}>
            <StatusIcon size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status Semasa</p>
            <h3 className={`text-lg font-bold ${statusStyle.text}`}>{application.status}</h3>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No. Rujukan</p>
              <p className="font-bold text-slate-800">{application.referenceNo}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0">
              <Info size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jenis Perkhidmatan</p>
              <p className="font-bold text-slate-800">{application.serviceTitle}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center shrink-0">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tarikh Permohonan</p>
              <p className="font-bold text-slate-800">{application.date}</p>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h4 className="text-sm font-bold text-slate-800 mb-3">Keterangan Permohonan</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            {application.description}
          </p>
        </div>

        {/* Timeline/Note */}
        <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl">
          <h4 className="text-sm font-bold text-primary mb-2">Nota Pejabat</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {application.status === 'Dalam Proses' 
              ? 'Permohonan anda sedang disemak oleh pegawai bertugas. Sila tunggu maklum balas dalam masa 3-5 hari bekerja.'
              : 'Permohonan ini telah selesai diproses. Sila hubungi pejabat jika anda mempunyai sebarang pertanyaan lanjut.'}
          </p>
        </div>
      </div>
    </div>
  );
};
