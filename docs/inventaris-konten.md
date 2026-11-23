# Inventaris konten mockup

Sumber: `referensi/mockup/channelory_landing_page.html`. Teks ditulis persis seperti di mockup, termasuk em dash (lihat catatan ⚠ R-02 di bawah). Kolom kiri adalah usulan path field CMS sesuai A5.

Singkatan: `home` = `src/content/pages/id/home.yml`, `settings` = `src/content/settings/id/site.yml`, `ui` = `src/i18n/ui.ts` (teks aksesibilitas, tidak masuk CMS).

Tanda:

- ⚠ R-02: mengandung em dash (`—`), menunggu keputusan pemilik.
- ⚠ Klaim: klaim yang butuh dasar (A7.4).
- ➕ Baru: teks yang tidak ada di mockup, usulan agent, butuh persetujuan.

---

## 0. Meta & SEO (`settings.seo`)

| Field | Teks |
|---|---|
| `seo.title` | Channelory — Platform Manajemen Afiliasi, Reseller, Agen & Franchise Hybrid ⚠ R-02 |
| `seo.description` | Satukan afiliasi digital, reseller, agen berjenjang, dan jaringan franchise dalam satu platform SaaS. Terintegrasi penuh dengan WooCommerce, Shopify, Odoo, dan ERPNext. |
| `seo.keywords` | software manajemen agen, aplikasi reseller, platform afiliasi indonesia, sistem manajemen franchise, software distributor, integrasi odoo woocommerce shopify, channelory |
| `seo.ogTitle` | Channelory — Unifying partners, optimizing networks. ⚠ R-02 |
| `seo.ogDescription` | Satu command center untuk mengelola afiliasi online, reseller stokis, agen multi-tier, dan royalti franchise. Terhubung langsung dengan e-commerce dan ERP Anda. |
| `seo.author` | Channelory |
| JSON-LD `description` (`settings.seo.appDescription`) | Platform SaaS manajemen kemitraan penjualan hybrid untuk afiliasi digital, reseller, agen berjenjang, dan franchise yang terintegrasi dengan WooCommerce, Shopify, Odoo, dan ERPNext. |
| JSON-LD `slogan` | dari `TAGLINE` / `settings.tagline` |

Canonical mockup `https://channelory.com/id` diganti `https://channelory.my.id/id/`.

## 1. Header

| Field | Teks |
|---|---|
| `settings.tagline` | Unifying partners, optimizing networks. (dipakai di header, hero, footer, JSON-LD) |
| `home.menu[]` (label, anchor) | Manfaat `#manfaat` · Fitur `#fitur` · Harga `#harga` · Tentang `#tentang` · FAQ `#faq` |
| `home.header.cta` | Coba Sekarang |
| `home.header.ctaMobile` | Coba Sekarang via WhatsApp |
| `settings.pesanWa.header` (dipakai header desktop + mobile) | Halo tim Channelory, saya ingin mencoba demo dan konsultasi kebutuhan jaringan mitra bisnis saya. |
| `ui` | aria: "Beranda Channelory", "Logo Channelory", "Navigasi Utama", "Buka Menu Navigasi" |

Teks "CHANNELORY" di samping logo adalah wordmark, tetap di `Logo.astro`.

## 2. Hero

| Field | Teks |
|---|---|
| `home.hero.label` | UNIFYING PARTNERS, OPTIMIZING NETWORKS. (di mockup ditulis kapital langsung, bukan lewat CSS) |
| `home.hero.judul` | Satu Command Center untuk Afiliasi, Reseller, Agen & Franchise Anda. |
| `home.hero.judulSorot` | Afiliasi, Reseller, Agen & Franchise (potongan judul yang diberi warna aksen; harus ada persis di `judul`) |
| `home.hero.paragraf` (markdown) | Tinggalkan pelacakan afiliasi konvensional yang terbatas pada tautan referral. Channelory menyatukan pemasaran afiliasi digital dengan jaringan distribusi fisik—lengkap dengan hierarki agen berjenjang, kontrol stok, royalti franchise, serta sinkronisasi langsung ke **WooCommerce, Shopify, Odoo, dan ERPNext**. ⚠ R-02 |
| `home.hero.ctaUtama` | Coba Sekarang via WhatsApp |
| `settings.pesanWa.hero` | Halo Channelory, saya tertarik Coba Sekarang dan jadwalkan demo platform untuk bisnis saya. |
| `home.hero.ctaHarga` | Lihat Paket Harga (ke `#harga`) |
| `home.hero.integrasiJudul` | Siap Terintegrasi dengan Ekosistem Bisnis Anda: |
| `home.hero.integrasi[]` | WooCommerce · Shopify Plus ⚠ Klaim · Odoo ERP · ERPNext |
| `home.hero.adegan[]` | 1. Command Center Dashboard · 2. Multi-Tier Agen & Stok · 3. Royalti & Payouts |
| `home.hero.autoPreview` | Auto-Preview Aktif |
| `home.hero.autoPreviewJeda` ➕ Baru | Auto-Preview Dijeda (label saat tombol jeda ditekan, A1) |
| `ui` | aria wrapper perangkat ➕ Baru: "Ilustrasi aplikasi Channelory: dasbor web dan aplikasi mitra di ponsel" |

### Isi layar perangkat (tetap di komponen, tidak masuk CMS, A2)

Tiga adegan dari `deviceScenes`. Teks bingkai yang selalu tampil:

- Sidebar laptop: CHANNELORY / COMMAND CENTER, ACTIVE ENTITY "GRINTEC GLOBAL - Main" (A7.6), 8 modul: Dashboard, Partners, Products & Catalog, Commission & Rules, Orders & Inventory, Payouts & Royalties, Integrations, Settings; kaki: "Odoo Synced", "v2.4".
- Bar atas: "Channelory / {breadcrumb}", "Quick search...", avatar "OW".
- Subheader: judul, subjudul, tombol "+ Create Partner", tab "Ringkasan / Overview", "Channel Analytics", "Live Activity".
- Ponsel: "21:05", "5G • 98%", "CHANNELORY PARTNER", nama mitra, "APP".

| Adegan | Breadcrumb | Judul | Subjudul | Mitra di ponsel |
|---|---|---|---|---|
| 0 | Dashboard / Ringkasan | Dashboard | Unified partner revenue, multi-tier channel performance, and stock distribution. | Nadia Kusuma Studio |
| 1 | Partners / Multi-Tier Network | Partners & Hierarchy | Nested L1–L3 agent trees, territory locks, and reseller stock allocation. | PT Nusantara Distribusi (L1) |
| 2 | Payouts & Royalties / Ledger | Payouts & Royalties | Two-way ledger for outgoing partner commissions and incoming franchise royalties. | Flagship Kemang (Franchise) |

Catatan: HTML awal mockup menulis subjudul adegan 0 sebagai "…multi-tier channel performance & stock.", tetapi JS langsung menimpanya saat load. Yang dipakai adalah versi `deviceScenes` di atas.

Nama orang/usaha di data demo: Nadia Kusuma Studio, PT Nusantara Distribusi, Dimas Saputra (Network), Aurelia Beauty Hub, Scentanica Flagship Kemang, HQ "GRINTEC GLOBAL (Pusat)", produk "Oud", "Elixir", "Botanical Elixir". Lihat pertanyaan di laporan Fase 0.

## 3. Manfaat (`#manfaat`)

| Field | Teks |
|---|---|
| `home.manfaat.eyebrow` | Manfaat Bisnis |
| `home.manfaat.judul` | Dirancang untuk Brand & Principal yang Ingin Tumbuh Tanpa Kekacauan Operasional |
| `home.manfaat.paragraf` | Mengelola puluhan hingga ribuan mitra penjualan dengan spreadsheet manual memicu salah hitung komisi, kebocoran harga grosir, dan stok yang tidak terlacak. Channelory mengotomatiskan seluruh alur tersebut. |

Koleksi `manfaat` (`src/content/manfaat/id/*.yml`):

| order | ikon | angka | judul | deskripsi |
|---|---|---|---|---|
| 1 | `jam` | 85% Lebih Cepat ⚠ Klaim | Rekap Komisi & Override Otomatis | Hitung komisi CPA afiliasi, selisih margin reseller, hingga bonus override agen Level 1–3 secara instan setiap kali pesanan selesai. |
| 2 | `kubus` | 100% Terpantau ⚠ Klaim | Visibilitas Stok di Gudang Mitra | Pantau alokasi stok yang dipegang distributor, stokis, dan outlet franchise Anda, lengkap dengan pemesanan ulang (PO restock) terhubung ke ERP. |
| 3 | `perisai` | Zero Kebocoran ⚠ Klaim | Proteksi Wilayah & Matriks Harga | Kunci harga beli grosir dan Minimum Order Quantity (MOQ) sesuai jenjang mitra sehingga tidak terjadi perang harga antar kanal. |
| 4 | `tren` | 1 Sistem Terpadu | Siap Ekspansi ke Skema Franchise | Mulai dari program afiliasi ringan lalu kembangkan ke keagenan dan waralaba tanpa perlu migrasi ke software terpisah. |

Nama kunci ikon (`jam`, `kubus`, `perisai`, `tren`) adalah usulan untuk `Icon.astro`; SVG-nya disalin dari mockup.

## 4. Fitur (`#fitur`)

| Field | Teks |
|---|---|
| `home.fitur.eyebrow` | Fitur Lengkap Enterprise |
| `home.fitur.judul` | Infrastruktur Lengkap untuk Mengelola Setiap Model Kemitraan Penjualan |
| `home.fitur.paragraf` | Dari atribusi link konten kreator hingga penagihan royalti bulanan outlet franchise, seluruh modul bekerja dalam satu alur data terpusat. |

Koleksi `modul` (`src/content/modul/id/*.md`, `deskripsi` di body markdown atau field markdown). Mockup tidak memakai ikon di kartu modul, jadi field `ikon` dari A5 dibuat opsional dan dikosongkan (lihat laporan).

| order | nomor | label | judul | deskripsi (markdown) | poin |
|---|---|---|---|---|---|
| 1 | Modul 01 | HYBRID CRM | Manajemen Mitra Hybrid & Hierarki | Kelola empat jenis mitra sekaligus—**Afiliator, Reseller Stokis, Agen Multi-Tier, dan Franchisee**—lengkap dengan pohon jaringan upline/downline dan pembagian teritori wilayah. ⚠ R-02 | Portal onboarding & KYC mitra mandiri · Visualisasi struktur jaringan L1, L2, hingga L3 |
| 2 | Modul 02 | RULE ENGINE | Mesin Komisi, Override & Royalti | Atur skema komisi fleksibel: persentase CPA, kupon referral unik, durasi cookie, bonus override berjenjang untuk leader agen, hingga royalti omzet kotor franchise. | Aturan komisi khusus per kategori atau SKU · Simulator pembagian komisi real-time |
| 3 | Modul 03 | B2B PRICING | Katalog Produk & Harga Berjenjang | Sinkronkan katalog SKU master dan terapkan matriks harga beli otomatis berbeda untuk Retail, Reseller, Master Agent, dan Franchise lengkap dengan syarat MOQ. | Kontrol kelayakan komisi per produk · Harga paket bundling & suplai B2B |
| 4 | Modul 04 | INVENTORY & PO | Kontrol Stok & Restock Mitra | Kelola pesanan restock grosir (Purchase Order) dari reseller dan outlet franchise dengan persetujuan satu klik yang langsung memotong stok gudang pusat. | Pelacakan stok konsinyasi & stok putus · Notifikasi batas minimum stok mitra |
| 5 | Modul 05 | 2-WAY LEDGER | Payout Komisi & Penagihan Royalti | Buku besar keuangan dua arah: kelola pencairan komisi keluar (outgoing payouts) kepada afiliator/agen sekaligus tagihan royalti masuk (incoming invoices) dari franchisee. | Rekonsiliasi periode pencairan otomatis · Ekspor massal pembayaran & bukti potong |
| 6 | Modul 06 | PLUG & PLAY API | Integrasi E-Commerce & ERP Native | Hubungkan toko online **WooCommerce & Shopify** untuk pelacakan konversi real-time, serta sinkronkan akuntansi dan inventori dengan **Odoo & ERPNext**. | Plugin resmi & webhook dua arah ⚠ Klaim · Kontrol akses tim berbasis RBAC & 2FA |

## 5. Harga (`#harga`)

| Field | Teks |
|---|---|
| `home.harga.eyebrow` | Paket & Harga Transparan |
| `home.harga.judul` | Investasi Fleksibel: Langganan SaaS atau Lisensi Sekali Bayar (One-Time) |
| `home.harga.paragraf` (markdown) | Gunakan filter di bawah untuk membandingkan biaya langganan bulanan, tahunan, maupun pembelian lisensi permanen **One-Time License** untuk setiap skala jaringan Anda. |
| `home.harga.filterBulanan` | Bulanan (SaaS) |
| `home.harga.filterTahunan` / `filterTahunanBadge` | Tahunan / Hemat 20% |
| `home.harga.filterSekaliBayar` / `filterSekaliBayarBadge` | One-Time License / Sekali Bayar |
| `home.harga.filterSkemaLabel` | Filter Skema: |
| `home.harga.filterSemua` | Semua Paket (jumlah "(4)" dihitung dari entri, A3) |
| `home.harga.filterSaas` | Cloud SaaS Ready |
| `home.harga.filterEnterprise` | Enterprise & Whitelabel |
| `ui` | aria: "Filter Model Pembayaran", "Filter Kategori Skema" |

Label `pricingMatrixData.*.label` ("Bulanan (SaaS)", "Tahunan (Hemat 20%)", "One-Time License (Sekali Bayar)") tidak pernah ditampilkan di mockup, jadi tidak dibuat field.

### Koleksi `paket` (`src/content/paket/id/<key>.yml`)

Field tambahan di luar A5: `cta` (label tombol), karena label tombol kartu tidak seragam ("— Whitelabel", bukan "— Custom Whitelabel"). Lihat laporan.

**starter** · order 1 · kategori `saas` · sorot false

- nama: Starter · badge: UMKM & D2C
- deskripsi: Untuk brand yang baru membangun program afiliasi & reseller dasar.
- fitur: Hingga **100 Mitra Aktif** (Afiliasi & Reseller) · Pelacakan link referral & kupon promo · Komisi 1 tingkat (Direct CPA / Margin) · Integrasi WooCommerce atau Shopify
- cta: Coba Sekarang — Starter ⚠ R-02

**business** · order 2 · kategori `saas` · sorot true

- nama: Business · badge: Paling Populer ⚠ Klaim (lihat laporan)
- deskripsi: Untuk brand berkembang dengan agen berjenjang & kontrol stok reseller.
- fitur: Hingga **1.000 Mitra Aktif** (Semua Track) · Hierarki Agen Multi-Tier (L1–L3 Override) · Matriks Harga Grosir, MOQ & Stok Mitra · Integrasi Odoo / ERPNext + E-Commerce
- cta: Coba Sekarang — Business ⚠ R-02

**enterprise** · order 3 · kategori `perpetual` · sorot false

- nama: Enterprise · badge: Multi-Branch
- deskripsi: Untuk prinsipal distribusi nasional & jaringan waralaba multi-cabang.
- fitur: **Mitra & Outlet Tanpa Batas** (Unlimited) · Modul Royalti Franchise & Marketing Fund · Multi-Entity Workspace & Proteksi Teritori · RBAC Granular, Audit Log & Wajib 2FA
- cta: Coba Sekarang — Enterprise ⚠ R-02

**whitelabel** · order 4 · kategori `perpetual` · sorot false

- nama: Custom Whitelabel · badge: 100% Brand Anda
- deskripsi: Platform siap pakai dengan identitas merek penuh, server terdedikasi, dan alur kustom.
- fitur: **Full Whitelabel UI** (Logo, Warna, Domain & Email) · Aplikasi Mobile Mitra (Android/iOS) opsional ⚠ Klaim · Kustomisasi skema komisi, pajak & e-Wallet payout · Integrasi ERP / POS internal kustom (SAP, Accurate, dll.) ⚠ Klaim
- cta: Coba Sekarang — Whitelabel ⚠ R-02

### `paket.mode` (dari `pricingMatrixData`)

| Paket | Mode | harga | satuan | catatan | fiturTambahan |
|---|---|---|---|---|---|
| starter | bulanan | Rp 990rb | / bulan | Ditagih bulanan • Opsi One-Time Rp 14,9jt | 2 Akun Admin Internal |
| starter | tahunan | Rp 792rb | / bulan | Ditagih Rp 9,5jt/tahun (Hemat Rp 2,37jt) | 2 Akun Admin Internal + Gratis Setup |
| starter | sekaliBayar | Rp 14,9jt | sekali bayar | Lisensi Permanen (Perpetual) • Update & Support 1 Tahun | Self-Hosted / Private Cloud Deployment + Lisensi Seumur Hidup |
| business | bulanan | Rp 2,49jt | / bulan | Ditagih bulanan • Opsi One-Time Rp 34,9jt | Custom Domain Portal Mitra (partners.brand.id) |
| business | tahunan | Rp 1,99jt | / bulan | Ditagih Rp 23,9jt/tahun (Hemat Rp 5,97jt) | Custom Domain Portal Mitra + Priority Onboarding |
| business | sekaliBayar | Rp 34,9jt | sekali bayar | Lisensi Permanen (Perpetual) • Update & Support 1 Tahun | Full Database Ownership + Integrasi ERP/E-Commerce Permanen |
| enterprise | bulanan | Rp 5,99jt | / bulan | Ditagih bulanan • Opsi One-Time Rp 79,0jt | Dedicated Account Manager & API Webhook |
| enterprise | tahunan | Rp 4,79jt | / bulan | Ditagih Rp 57,5jt/tahun (Hemat Rp 14,3jt) | Dedicated Account Manager & SLA 99.9% ⚠ Klaim |
| enterprise | sekaliBayar | Rp 79,0jt | sekali bayar | Lisensi Permanen Multi-Branch • Update & Support 1 Tahun | On-Premise / VPC Deployment + Unlimited Mitra Seumur Hidup |
| whitelabel | bulanan | Rp 12,5jt | / bulan | Managed Cloud • Opsi One-Time Mulai Rp 145jt | Dedicated Cloud Instance & Tim Engineer |
| whitelabel | tahunan | Rp 10,0jt | / bulan | Ditagih Rp 120jt/tahun (Hemat Rp 30jt) | Dedicated Cloud Instance & Custom Domain Penuh |
| whitelabel | sekaliBayar | Rp 145jt | sekali bayar | Full Whitelabel & Source Deployment • Update 1 Tahun | 100% Hak Kepemilikan Brand, Custom Source & Tim Implementasi |

Untuk JSON-LD (A6) butuh angka, jadi tiap mode juga diberi field `hargaAngka` (rupiah, integer). Usulan isi: 990000, 792000, 14900000, 2490000, 1990000, 34900000, 5990000, 4790000, 79000000, 12500000, 10000000, 145000000.

### `paket.mode.*.pesanWa`

Mockup punya **dua versi** pesan untuk mode Bulanan: `href` di HTML (tampil saat halaman pertama dibuka) dan `pricingMatrixData` (tampil setelah filter diklik). Lihat laporan.

| Paket | Bulanan, versi HTML awal | Bulanan, versi `pricingMatrixData` |
|---|---|---|
| starter | Halo Channelory, saya ingin Coba Sekarang paket \*Starter (Bulanan)\* untuk bisnis saya. | Halo Channelory, saya ingin Coba Sekarang paket \*Starter (Bulanan - Rp 990rb/bln)\* untuk bisnis saya. |
| business | Halo Channelory, saya ingin Coba Sekarang paket \*Business (Bulanan)\* untuk mengelola afiliasi dan agen berjenjang. | Halo Channelory, saya ingin Coba Sekarang paket \*Business (Bulanan - Rp 2,49jt/bln)\* untuk bisnis saya. |
| enterprise | Halo Channelory, saya ingin Coba Sekarang paket \*Enterprise (Bulanan)\* untuk distribusi dan franchise perusahaan kami. | Halo Channelory, saya ingin Coba Sekarang paket \*Enterprise (Bulanan - Rp 5,99jt/bln)\* untuk perusahaan kami. |
| whitelabel | Halo Channelory, saya ingin Coba Sekarang paket \*Custom Whitelabel (Bulanan)\* untuk platform kemitraan kami. | Halo Channelory, saya ingin Coba Sekarang paket \*Custom Whitelabel (Managed Bulanan)\* untuk perusahaan kami. |

Tahunan dan Sekali Bayar (hanya ada satu versi):

| Paket | tahunan | sekaliBayar |
|---|---|---|
| starter | Halo Channelory, saya ingin Coba Sekarang paket \*Starter (Tahunan - Hemat 20%)\* untuk bisnis saya. | Halo Channelory, saya tertarik membeli \*One-Time License (Sekali Bayar - Rp 14,9jt)\* paket \*Starter\*. |
| business | Halo Channelory, saya ingin Coba Sekarang paket \*Business (Tahunan - Hemat 20%)\* untuk bisnis saya. | Halo Channelory, saya tertarik membeli \*One-Time License (Sekali Bayar - Rp 34,9jt)\* paket \*Business\*. |
| enterprise | Halo Channelory, saya ingin Coba Sekarang paket \*Enterprise (Tahunan - Hemat 20%)\* untuk perusahaan kami. | Halo Channelory, saya tertarik membeli \*One-Time License (Sekali Bayar - Rp 79,0jt)\* paket \*Enterprise\*. |
| whitelabel | Halo Channelory, saya ingin Coba Sekarang paket \*Custom Whitelabel (Tahunan - Hemat 20%)\* untuk perusahaan kami. | Halo Channelory, saya tertarik konsultasi \*One-Time License (Sekali Bayar - Mulai Rp 145jt)\* paket \*Custom Whitelabel\*. |

## 6. Tentang (`#tentang`)

| Field | Teks |
|---|---|
| `home.tentang.eyebrow` | Tentang Channelory |
| `home.tentang.judul` | Menjembatani Dunia Afiliasi Digital dan Distribusi Fisik dalam Satu Arsitektur Modern |
| `home.tentang.paragraf1` (markdown) | Banyak platform pelacakan afiliasi global hanya berhenti pada tautan referral digital. Padahal di dunia nyata, pertumbuhan brand modern bertumpu pada kombinasi **konten kreator online, jaringan reseller yang menyetok barang, agen daerah berjenjang, hingga gerai franchise**. |
| `home.tentang.paragraf2` (markdown) | **Channelory** dibangun dengan prinsip *"Unifying partners, optimizing networks."*—memberikan satu pusat kendali bagi pemilik merek dan tim operasional untuk merancang aturan komisi, mengawasi pergerakan inventori, dan menghubungkan data penjualan langsung ke sistem akuntansi maupun ERP perusahaan. ⚠ R-02 |

`home.tentang.pilar[]` (label, judul, deskripsi):

| label | judul | deskripsi |
|---|---|---|
| Visi Produk | Omnichannel Partner Infrastructure | Menghilangkan sekat antara tim digital marketing (afiliasi) dan tim sales distribusi (agen/franchise). |
| Arsitektur Terbuka | Storefront & ERP Native | Dirancang agar mudah dipasang di WooCommerce/Shopify sekaligus siap terhubung ke Odoo dan ERPNext. |
| Keamanan Enterprise | RBAC & Audit Trail Lengkap | Pemisahan hak akses ketat antara tim operasional mitra, bagian gudang, dan tim keuangan pencairan. |
| Skalabilitas | Dari 10 ke 10.000+ Mitra ⚠ Klaim | Struktur database hierarki yang tetap responsif menghitung komisi berjenjang secara real-time. |

## 7. FAQ (`#faq`)

| Field | Teks |
|---|---|
| `home.faq.eyebrow` | Pertanyaan Umum (FAQ) |
| `home.faq.judul` | Hal yang Sering Ditanyakan Sebelum Memulai |

Koleksi `faq` (`src/content/faq/id/*.md`). Item 1 terbuka saat halaman dimuat (ikon sudah `rotate-180`, jawaban tidak `hidden`); usulan field `terbuka` (boolean).

| order | pertanyaan | jawaban (markdown) |
|---|---|---|
| 1 | Apa bedanya Channelory dibanding software afiliasi seperti Tapfiliate atau Partnero? (A7.5) | Software afiliasi tradisional hanya melacak klik tautan dan kupon referral digital. Channelory mencakup seluruh fitur afiliasi digital tersebut **ditambah** manajemen distribusi fisik: harga grosir bertingkat (MOQ), alokasi stok di gudang reseller, pohon hierarki agen berjenjang (L1–L3 override), hingga pencatatan royalti franchise yang terhubung ke sistem ERP. |
| 2 | Apakah bisa digunakan jika saat ini kami baru menjalankan program afiliasi saja? | Sangat bisa. Anda dapat memulai dari paket **Starter** untuk meluncurkan program afiliasi berbasis link dan kupon di WooCommerce atau Shopify. Ketika bisnis Anda mulai merekrut reseller stokis, distributor daerah, atau membuka kemitraan franchise, Anda cukup mengaktifkan modul terkait tanpa perlu memindahkan data mitra ke sistem lain. |
| 3 | Bagaimana cara kerja integrasi dengan WooCommerce, Shopify, Odoo, dan ERPNext? | Untuk **WooCommerce dan Shopify**, tersedia plugin/app resmi yang otomatis mencatat atribusi referral, kupon mitra, dan status pembayaran pesanan. ⚠ Klaim Untuk **Odoo dan ERPNext**, Channelory menggunakan konektor API dua arah untuk menyinkronkan master SKU, stok gudang pusat, Purchase Order (PO) restock reseller, serta jurnal tagihan royalti franchise. |
| 4 | Apa saja yang didapatkan pada paket Custom Whitelabel? | Pada paket **Custom Whitelabel**, seluruh antarmuka dasbor admin maupun portal mitra menggunakan logo, palet warna, domain penuh, dan notifikasi email perusahaan Anda sendiri tanpa mencantumkan nama Channelory. Paket ini juga mencakup opsi server terdedikasi (private cloud), kustomisasi alur pencairan dana lokal, serta integrasi ERP/POS internal perusahaan Anda. |

## 8. Banner CTA

| Field | Teks |
|---|---|
| `home.banner.eyebrow` | Siap Mengoptimalkan Jaringan Mitra Anda? |
| `home.banner.judul` | Konsultasikan Skema Afiliasi, Reseller, Agen, atau Franchise Anda Bersama Tim Kami |
| `home.banner.paragraf` | Dapatkan sesi demo langsung dan rekomendasi struktur komisi yang paling sesuai untuk model bisnis Anda via WhatsApp. |
| `home.banner.cta` | Coba Sekarang via WhatsApp |
| `settings.pesanWa.banner` | Halo tim Channelory, saya ingin Coba Sekarang dan konsultasi implementasi Channelory untuk bisnis kami. |

## 9. Footer

| Field | Teks |
|---|---|
| `settings.footer.deskripsi` | Unifying partners, optimizing networks. Platform manajemen kemitraan penjualan hybrid untuk afiliasi digital, reseller stokis, agen berjenjang, dan franchise. |
| `home.footer.navigasiJudul` | Navigasi |
| `home.footer.navigasi[]` (label, anchor) | Manfaat Bisnis `#manfaat` · Fitur Platform `#fitur` · Paket & Harga `#harga` · Tentang Kami `#tentang` · FAQ `#faq` |
| `home.footer.integrasiJudul` | Integrasi & Kontak |
| `home.footer.integrasi[]` | WooCommerce & Shopify · Odoo & ERPNext Connector |
| `home.footer.kontakLabel` | Hubungi WhatsApp Sales → (panah `&rarr;` bagian dari teks) |
| `settings.pesanWa.footer` | Halo Channelory, saya ingin bertanya seputar platform Channelory. |
| `settings.footer.copyright` | © 2026 Channelory. Hak Cipta Dilindungi Undang-Undang. (usulan: tahun dari build, editor menulis teks setelah tahun) |
| `settings.footer.slogan` | Unifying partners, optimizing networks. (= `settings.tagline`, tidak perlu field terpisah) |

## 10. Tombol WhatsApp melayang

| Field | Teks |
|---|---|
| `home.melayang.label` | Coba Sekarang (WA) (tersembunyi di bawah `sm`) |
| `settings.pesanWa.melayang` | Halo tim Channelory, saya ingin Coba Sekarang dan tanya informasi lebih lanjut. |
| `ui` | aria: "Chat WhatsApp dengan Tim Channelory" |

## 11. Kontak (`settings`)

| Field | Nilai |
|---|---|
| `whatsapp` | 6281234567890 (A7.2, kemungkinan dummy; build memberi peringatan) |
| `email` | (kosong, tidak ada di mockup) |
| `sosmed` | (kosong semua) |
