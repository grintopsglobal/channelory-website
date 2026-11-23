export const languages = { id: 'Indonesia' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'id';
export const locales = Object.keys(languages) as Lang[];

// Teks aksesibilitas dan UI statis yang tidak perlu diedit lewat CMS.
export const ui = {
  id: {
    'nav.skip': 'Lewati ke konten utama',
    'nav.primary': 'Navigasi Utama',
    'nav.open': 'Buka Menu Navigasi',
    'nav.close': 'Tutup Menu Navigasi',
    'brand.home': 'Beranda Channelory',
    'brand.logo': 'Logo Channelory',
    'common.newTab': '(tab baru)',
    'hero.devices': 'Ilustrasi aplikasi Channelory: dasbor web dan aplikasi mitra di ponsel',
    'hero.scenes': 'Pilih tampilan ilustrasi',
    'price.billing': 'Filter Model Pembayaran',
    'price.scheme': 'Filter Kategori Skema',
    'wa.float': 'Chat WhatsApp dengan Tim Channelory',
    '404.title': 'Halaman tidak ditemukan',
    '404.text': 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
    '404.home': 'Kembali ke beranda',
  },
} as const;

export type UIKey = keyof (typeof ui)['id'];
