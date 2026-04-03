export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  category: 'Berita' | 'Hebahan' | 'Program';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Program Jualan Rahmah DUN Galas',
    date: '2 April 2026',
    summary: 'Program jualan barangan asas dengan harga subsidi akan diadakan di Dataran Galas Sabtu ini.',
    image: 'https://picsum.photos/seed/galas1/800/400',
    category: 'Program'
  },
  {
    id: '2',
    title: 'Bantuan Persekolahan Sesi 2026/2027',
    date: '28 Mac 2026',
    summary: 'Pendaftaran bagi bantuan beg sekolah dan alat tulis kini dibuka untuk keluarga B40.',
    image: 'https://picsum.photos/seed/galas2/800/400',
    category: 'Hebahan'
  },
  {
    id: '3',
    title: 'Lawatan Kerja ADUN ke Kampung Orang Asli',
    date: '25 Mac 2026',
    summary: 'YBS ADUN Galas melawat projek bekalan air bersih di penempatan Pos Brooke.',
    image: 'https://picsum.photos/seed/galas3/800/400',
    category: 'Berita'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: '1',
    title: 'Aduan Rakyat',
    description: 'Salurkan aduan kerosakan infrastruktur atau masalah setempat.',
    icon: 'MessageSquare'
  },
  {
    id: '2',
    title: 'Bantuan Kebajikan',
    description: 'Permohonan bantuan makanan, perubatan dan kecemasan.',
    icon: 'Heart'
  },
  {
    id: '3',
    title: 'Khidmat Guaman',
    description: 'Konsultasi guaman percuma untuk warga DUN Galas.',
    icon: 'Scale'
  },
  {
    id: '4',
    title: 'Pendidikan',
    description: 'Bantuan biasiswa dan pendaftaran institusi pengajian tinggi.',
    icon: 'GraduationCap'
  }
];

export interface Application {
  id: string;
  serviceId: string;
  serviceTitle: string;
  status: 'Dalam Proses' | 'Diluluskan' | 'Ditolak';
  date: string;
  description: string;
  referenceNo: string;
}

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app1',
    serviceId: '2',
    serviceTitle: 'Bantuan Kebajikan',
    status: 'Dalam Proses',
    date: '1 April 2026',
    description: 'Permohonan bantuan bakul makanan untuk keluarga B40.',
    referenceNo: 'APP-2026-001'
  },
  {
    id: 'app2',
    serviceId: '4',
    serviceTitle: 'Pendidikan',
    status: 'Diluluskan',
    date: '15 Mac 2026',
    description: 'Permohonan biasiswa pengajian tinggi peringkat diploma.',
    referenceNo: 'APP-2026-002'
  }
];
