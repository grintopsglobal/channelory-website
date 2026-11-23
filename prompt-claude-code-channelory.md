# Prompt Claude Code: website Channelory

Turunan dari `prompt-template-web-astro-decap.md`. Isinya sudah diisi untuk Channelory dan ditambah Bagian A, yang mengatur supaya website sama dengan mockup landing page.

**Cara pakai**

1. Isi baris `[ISI]` di blok Variabel, terutama `DOMAIN` dan `REPO_GITHUB`.
2. Ekstrak zip ini ke root repo. Folder `referensi/` sudah berisi:

   ```
   referensi/
   ├── mockup/channelory_landing_page.html     (SUMBER UTAMA desain + copy)
   ├── logo/channelory_logo.jpeg               (logo lengkap + slogan, raster)
   └── template/prompt-template-web-astro-decap.md   (template asli, hanya arsip)
   ```

3. Buka Claude Code di root repo, lalu ketik: *"Baca `prompt-claude-code-channelory.md` dan jalankan mulai dari bagian Prompt. Mulai dari Fase 0."*

---

## Variabel

```yaml
NAMA_BRAND: "Channelory"
TAGLINE: "Unifying partners, optimizing networks."   # dari mockup (bahasa Inggris, dipakai apa adanya)
DOMAIN: "channelory.my.id"          # dikonfirmasi pemilik 2026-11-23 (mockup memakai channelory.com)
REPO_GITHUB: "grintopsglobal/channelory-website"   # git@github.com:grintopsglobal/channelory-website.git
BAHASA: [id]                       # mockup hanya bahasa Indonesia; canonical mockup sudah memakai prefix /id
WARNA_BRAND:                       # dari mockup
  navy: "#13294B"                  # warna utama, teks judul, sidebar mockup
  navyDark: "#0D1D36"              # footer
  sky: "#00A3E0"                   # aksen, CTA
  skyHover: "#008EC4"
  slateBg: "#F8FAFC"
  teks: "#0F172A"
FONT:
  heading: "Inter"                 # 800 untuk judul
  body: "Inter"                    # 400–800
  angka: "JetBrains Mono"          # 500–700, kelas .font-mono-num
IKON: "SVG inline dari mockup"     # mockup tidak memakai pustaka ikon; SVG-nya disalin jadi komponen
LOGO:
  sumber: "SVG inline di header mockup"   # heksagon C navy + panah sky + 2 titik, viewBox 0 0 48 48
  gelap: "varian footer"                  # heksagon putih + panah sky, tanpa titik
  referensi_jpg: "referensi/logo/channelory_logo.jpeg"   # versi lengkap, detailnya sedikit beda (lihat A7)
KONTAK:
  email: ""                        # tidak ada di mockup
  whatsapp: "6281234567890"        # dari mockup, KEMUNGKINAN DUMMY: wajib diganti sebelum rilis
  sosmed: {instagram: "", linkedin: "", youtube: "", tiktok: ""}   # tidak ada di mockup
KOLEKSI: [manfaat, modul, paket, faq]
MODUL_OPSIONAL:
  form_kontak_sheets: false        # semua CTA ke WhatsApp
  sub_layanan: false
  our_works: false
  pricing_gate: false              # harga tampil terbuka
  video_hero: false
  tracking: true
  blog: false                      # tidak ada di mockup; koleksi `insights` template tidak dibuat
REFERENSI_LOKAL: /Users/andreasabipermana/Documents/Work/Grintec/web
MOCKUP: "referensi/mockup/channelory_landing_page.html"
```

---

## Prompt

Bangun website marketing statis untuk **Channelory** ("Unifying partners, optimizing networks."), platform SaaS manajemen kemitraan penjualan hybrid: afiliasi digital, reseller stokis, agen berjenjang, dan franchise, yang terintegrasi dengan WooCommerce, Shopify, Odoo, dan ERPNext.

**Desain dan copy sudah final dalam bentuk mockup**: `referensi/mockup/channelory_landing_page.html`. Tugasmu adalah memindahkan mockup itu ke Astro + Decap CMS **semirip mungkin**, sehingga semua teksnya bisa diedit lewat CMS. Ini bukan pekerjaan mendesain ulang.

Arsitektur teknis mengikuti website GRINTEC (Bagian B, berasal dari template yang sudah berjalan di produksi). **Bagian A mengalahkan Bagian B bila bertentangan.** Secara khusus:

- Aturan Bagian B §11 "desain dibuat baru" dan "ikon custom" tidak berlaku. Desain dan ikon mengikuti mockup.
- Bagian B §6 diganti oleh A2.
- Bagian B §9, §10, dan §15 tidak dipakai atau diganti oleh A.

**Kalau `DOMAIN` atau `REPO_GITHUB` masih kosong, kerjakan Fase 0–3 seperti biasa, lalu berhenti sebelum langkah deploy di Fase 4 dan tanyakan.**

Baca blok Variabel dan seluruh file mockup (HTML, CSS, JSON-LD, dan JavaScript-nya) sebelum menulis kode.

## Bagian A: Kesesuaian dengan mockup

### A1. Sumber kebenaran

1. **Mockup adalah spesifikasi.** Yang harus sama dengan mockup:
   - Layout, urutan section, warna latar tiap section (putih dan `#F8FAFC` berselang), jarak, ukuran font, radius, border, bayangan, ikon SVG, animasi, dan perilaku responsif di setiap breakpoint.
   - Semua teks, persis, termasuk istilah Inggris di layar perangkat (Dashboard, Partners, Payouts). Ketidakkonsistenan cukup dicatat sebagai pertanyaan, jangan diperbaiki diam-diam.
   - Pemakaian kelas Tailwind dari mockup. Salin kelasnya, jangan menafsirkan ulang.
2. **Penyimpangan yang diizinkan hanya ini:**
   - **Port teknis.** Tailwind CDN diganti Tailwind 4 build. Warna arbitrary (`bg-[#13294B]`) diganti token tema (`bg-navy`) di semua tempat, dengan hasil visual identik. Konten yang di mockup diisi lewat JavaScript (`deviceScenes`, `pricingMatrixData`) di-render oleh Astro, dan JS hanya mengganti tampilan, tidak memakai `innerHTML`.
   - **Aksesibilitas tanpa mengubah tampilan default:**
     - Animasi float dan auto-rotasi hero berhenti saat `prefers-reduced-motion`.
     - Label "Auto-Preview Aktif" dijadikan tombol jeda/lanjut, karena konten yang berganti sendiri tiap 4,5 detik wajib bisa dihentikan (WCAG 2.2.2).
     - Tombol pemilih adegan dan filter harga memakai `aria-pressed`, dan accordion memakai `aria-expanded`.
     - Isi layar perangkat di hero diberi `aria-hidden="true"`, dan wrapper-nya diberi label deskriptif.
     - Fokus keyboard terlihat.
     - Warna sky untuk teks/tombol di atas latar terang digelapkan sesuai A4.
   - **Penambahan teknis:** halaman 404, `/admin/`, sitemap, robots, dan JSON-LD yang dirakit dari data CMS (A6).
   - Untuk penyimpangan lain, tanya dulu.

### A2. Struktur situs

**Beranda (`/` dan `/id/`)** adalah replika satu halaman mockup dengan anchor yang sama: `#manfaat`, `#fitur`, `#harga`, `#tentang`, `#faq`. Urutan section:

1. **Header fixed.**
   - Tinggi `h-20`, `bg-white/95 backdrop-blur-md`, border bawah.
   - Logo SVG + "CHANNELORY" + slogan kecil uppercase.
   - Menu: Manfaat, Fitur, Harga, Tentang, FAQ.
   - Tombol "Coba Sekarang" dengan ikon WA.
   - Hamburger + dropdown di bawah `lg`, dan dropdown tertutup setelah link diklik.
   - `scroll-margin-top: 84px` untuk section.
2. **Hero (latar `#F8FAFC`).**
   - **Kiri:** label slogan, H1, paragraf, CTA "Coba Sekarang via WhatsApp" + "Lihat Paket Harga", baris badge integrasi (WooCommerce, Shopify Plus, Odoo ERP, ERPNext).
   - **Kanan:** panggung dua perangkat.
     - Pemilih 3 adegan: Command Center Dashboard, Multi-Tier Agen & Stok, Royalti & Payouts.
     - Bingkai laptop CSS berisi UI web app: sidebar navy dengan 8 modul, kotak "ACTIVE ENTITY", breadcrumb, judul, tab, dan isi adegan.
     - Bingkai ponsel Android CSS yang menumpuk di kanan bawah, berisi app mitra.
     - Adegan berganti otomatis tiap 4,5 detik dengan efek fade 150 ms. Klik tombol adegan menghentikan rotasi.
     - Isi ketiga adegan (`deviceScenes`) adalah ilustrasi dengan data demo. Isi ini tetap di komponen, tidak masuk CMS. Render ketiganya di HTML lalu tampilkan yang aktif.
     - Bingkai perangkat hanya CSS. Jangan menambahkan logo Apple atau gambar perangkat bermerek.
3. **Manfaat Bisnis (`#manfaat`).** Header section + 4 kartu manfaat (ikon, angka besar, judul, deskripsi).
4. **Fitur Utama (`#fitur`).** Header section + 6 kartu modul (nomor modul, label, judul, deskripsi, 2 poin).
5. **Harga (`#harga`).**
   - Header section.
   - **Filter utama:** Bulanan (SaaS) / Tahunan "Hemat 20%" / One-Time License "Sekali Bayar". Filter ini mengganti harga, satuan, catatan, fitur terakhir, dan pesan WA di keempat kartu.
   - **Filter skema:** Semua Paket (4) / Cloud SaaS Ready / Enterprise & Whitelabel. Filter ini menyembunyikan kartu sesuai kategori, dengan animasi seperti `animateIsotopeCards`.
   - **4 kartu:** Starter, Business "Paling Populer" (gaya sorot), Enterprise "Multi-Branch", Custom Whitelabel "100% Brand Anda".
   - **Tanpa JS**, tampilan default (Bulanan, Semua) harus sudah lengkap di HTML.
6. **Tentang (`#tentang`).** Header, 2 paragraf, 4 kartu pilar (Visi Produk, Arsitektur Terbuka, Keamanan Enterprise, Skalabilitas).
7. **FAQ (`#faq`).** 4 pertanyaan. Accordion bisa membuka beberapa item sekaligus, sama seperti mockup.
8. **Banner CTA** latar navy.
9. **Footer `#0D1D36`.** Logo varian gelap, deskripsi, kolom Navigasi, kolom Integrasi & Kontak, baris copyright.
10. **Tombol WhatsApp melayang** "Coba Sekarang (WA)".

Halaman tambahan hanya `404` (memakai header dan footer yang sama, dengan link menu `/id/#harga` dan seterusnya). Tidak ada blog, halaman produk, atau halaman kontak.

### A3. Detail implementasi yang sering meleset

- **Token tema.** Buat `@theme` dengan `navy`, `navy-dark`, `sky`, `sky-hover`, `sky-text` (A4), dan `slate-bg`, lalu ganti seluruh warna hex arbitrary di mockup ke token. Warna yang muncul di mockup tetapi bukan token brand (emerald, amber, sky-50, slate) tetap memakai palet bawaan Tailwind.
- **Font.** Bobot persis seperti URL Google Fonts di mockup. Kelas `.font-mono-num` dipakai untuk semua angka.
- **Logo.** SVG header dijadikan `Logo.astro` dengan varian `terang` (heksagon `#13294B`, panah `#00A3E0`, 2 titik) dan `gelap` (heksagon putih, panah sky, tanpa titik, sesuai footer). Favicon dan apple-touch-icon dibuat dari SVG yang sama.
- **Keyframes.** `floatMac` (6 detik) dan `floatAndroid` (5 detik, delay 1,2 detik) disalin persis.
- **Ikon.** Semua ikon (WA, centang, chevron, ikon manfaat dan modul) disalin dari SVG inline mockup ke `Icon.astro`. Jangan mengganti dengan pustaka ikon lain.
- **Data harga.** Satu-satunya sumber data harga adalah koleksi `paket` (A5). JS membaca data dari atribut `data-*` atau `<script type="application/json">` yang dirender Astro, bukan dari objek yang ditulis ulang manual di JS.
- **Teks hitungan.** "Semua Paket (4)" dihitung dari jumlah entri, bukan angka tetap.

### A4. Token dan kontras (sudah dihitung, verifikasi ulang dan catat di README)

| Token | Hex | Kontras | Catatan |
|---|---|---|---|
| navy | `#13294B` | 14,5:1 vs putih | aman |
| navyDark | `#0D1D36` | 16,9:1 vs putih | aman; `slate-400` di atasnya juga aman |
| **sky** | `#00A3E0` | **2,9:1 vs putih** | **gagal AA** untuk teks putih di tombol "Coba Sekarang" dan untuk teks sky di atas putih/`sky-50` (±2,7:1) |
| sky di atas navy | `#00A3E0` | 5,1:1 vs `#13294B`, 5,9:1 vs `#0D1D36` | aman, tetap dipakai |
| skyHover | `#008EC4` | 3,7:1 vs putih | masih gagal untuk teks |

Usulan default:

- Tambah token `sky-text: #0077A8` (5,0:1 vs putih) untuk latar tombol CTA dan teks sky di atas latar terang, dengan hover `#00648D` (6,6:1).
- `#00A3E0` tetap dipakai di atas latar navy, untuk ikon, garis, progress bar, titik, dan elemen dekoratif.
- Isi layar perangkat di hero adalah ilustrasi (`aria-hidden`), jadi warnanya tetap persis mockup.

Ini perubahan yang paling terlihat dari mockup, karena tombol CTA menjadi biru lebih gelap. Di laporan Fase 1, tampilkan perbandingan tiga opsi berikut, lalu tunggu pilihan pemilik:

- (a) usulan default di atas;
- (b) tombol tetap `#00A3E0` dengan teks navy (5,1:1);
- (c) persis mockup, dengan risiko kontras dicatat.

### A5. Konten ke CMS

Setiap teks di luar layar perangkat hero harus bisa diedit di Decap. Nilai awalnya diisi persis dari mockup.

- **Koleksi `manfaat`** (4 entri). Field: `order`, `ikon` (pilihan dari ikon yang ada), `angka` ("85% Lebih Cepat"), `judul`, `deskripsi`.
- **Koleksi `modul`** (6 entri). Field: `order`, `nomor` ("Modul 01"), `label` ("HYBRID CRM"), `ikon`, `judul`, `deskripsi` (markdown untuk teks tebal), `poin` (list).
- **Koleksi `paket`** (4 entri: starter, business, enterprise, whitelabel). Field:
  - `key`, `order`, `nama`, `badge` ("UMKM & D2C", "Paling Populer", dst.), `sorot` (boolean), `kategori` (`saas`|`perpetual`, sesuai `data-category` di mockup), `deskripsi`
  - `fitur` (list 4 item tetap)
  - `mode`: objek `bulanan`, `tahunan`, `sekaliBayar`. Masing-masing berisi `harga`, `satuan`, `catatan`, `fiturTambahan`, `pesanWa`. Isi awal diambil dari `pricingMatrixData`.
- **Koleksi `faq`.** Field: `order`, `pertanyaan`, `jawaban` (markdown).
- **Singleton `pages/id/home.yml`.** Berisi:
  - Hero: label, H1, paragraf, label CTA, judul dan daftar badge integrasi.
  - Header tiap section (eyebrow, judul, paragraf).
  - Label filter harga, termasuk "Hemat 20%" dan "Sekali Bayar".
  - Tentang: 2 paragraf + 4 kartu.
  - Banner CTA.
  - Label menu dan footer.
- **Singleton `settings`.** Berisi:
  - Nomor WhatsApp, email, sosmed.
  - Deskripsi dan copyright footer.
  - Template pesan WA umum (header, hero, banner, footer, tombol melayang, sesuai teks masing-masing di mockup).
  - SEO & tracking (Bagian B §8). `<title>`, meta description, dan og tags awal diambil dari mockup.

### A6. CTA WhatsApp dan JSON-LD

- Semua CTA mengarah ke `https://wa.me/<settings.whatsapp>?text=<pesan>`, dengan pesan sama persis seperti mockup. Satu helper `waLink(pesan)` di `src/lib/`.
- Pesan per kartu harga diambil dari `paket.mode.<aktif>.pesanWa` dan ikut berganti saat filter diubah.
- `npm run build` menampilkan **peringatan** selama nomor masih `6281234567890`, dan README mencantumkannya sebagai syarat rilis.
- **JSON-LD dari data CMS.** Angka di JSON-LD mockup tidak cocok dengan tabel harga (`lowPrice 799000`, `highPrice 5999000`, padahal harga terendah Rp 792rb/bulan tahunan dan tertinggi Rp 145jt). Jadi:
  - `SoftwareApplication` + `AggregateOffer` dihitung dari koleksi `paket`.
  - Tambahkan `FAQPage` dari koleksi `faq`, karena komentar di mockup menyebutnya tetapi skemanya belum ada.
  - Catat perbedaan angka ini di laporan.
- `canonical`, `og:url`, dan `og:locale` memakai `DOMAIN`. `meta keywords` boleh dipertahankan dari mockup.

### A7. Pertanyaan untuk pemilik (laporkan di Fase 0, jangan diputuskan sendiri)

1. **Domain dan repo.** `DOMAIN` dan `REPO_GITHUB` belum diisi. Mockup memakai `channelory.com`.
2. **Nomor WhatsApp** `6281234567890` tampak dummy. Email tidak ada di mockup.
3. **Logo.** SVG di mockup adalah versi sederhana dari `channelory_logo.jpeg`. Apakah ada file SVG resmi? Default: ikuti mockup.
4. **Klaim yang perlu dasar sebelum tayang** (UU Perlindungan Konsumen; klaim keamanan terkait UU PDP).
   - "85% Lebih Cepat", "100% Terpantau", "Zero Kebocoran", "Zero Conflict Verified".
   - "SLA 99.9%".
   - "Dari 10 ke 10.000+ Mitra".
   - "Plugin/app resmi" WooCommerce dan Shopify: apakah sudah terbit di marketplace masing-masing?
   - Badge "Shopify Plus": apakah sudah benar-benar mendukung Shopify Plus?
   - Integrasi SAP dan Accurate.
   - Aplikasi Android/iOS mitra.
   - Agent tidak mengubah teks ini. Cukup daftar apa yang perlu dikonfirmasi.
5. **Perbandingan dengan pesaing.** FAQ 1 menyebut Tapfiliate dan Partnero, dan menyatakan software afiliasi tradisional "hanya melacak klik tautan dan kupon". Pernyataan perbandingan harus akurat. Tetap dengan nama pesaing, atau disamarkan menjadi "software afiliasi pada umumnya"?
6. **Konsistensi data demo hero.**
   - Layar laptop memakai USD (`$148,920`) dan label Inggris, sedangkan ponsel memakai Rupiah dan bahasa Indonesia. Apakah aplikasinya memang berbahasa Inggris dengan mata uang campuran?
   - "GRINTEC GLOBAL - Main" muncul sebagai entitas aktif. Boleh tampil di situs publik?
7. **Nama kategori harga.** Filter "Enterprise & Whitelabel" memakai kunci `perpetual`, padahal opsi One-Time tersedia di semua paket. Kunci internal boleh diganti `enterprise` tanpa mengubah label?
8. **Bahasa Inggris.** Tagline sudah Inggris. Situs versi Inggris dibuat sekarang atau nanti?

### A8. Bukti kesesuaian (wajib di tiap laporan fase)

- Script `scripts/bandingkan-mockup.mjs` (Playwright lewat `npx`, bukan dependensi situs). Script ini memotret mockup dan hasil build (`npm run preview`) di lebar 1440, 1024, 768, 390, dan 360 px, full page.
- Saat memotret: animasi dan auto-rotasi dimatikan, adegan hero di-set ke 0, dan filter harga di-set ke Bulanan/Semua.
- Tambah potret khusus untuk:
  - adegan hero 1 dan 2;
  - filter harga Tahunan dan One-Time;
  - filter skema "Cloud SaaS Ready";
  - satu FAQ terbuka;
  - menu mobile terbuka.
- Hasilnya disimpan berdampingan, plus gambar diff piksel, di `docs/perbandingan/` (folder ini di-`.gitignore`). Mockup memuat Tailwind dan Google Fonts dari CDN, jadi perbandingan butuh internet.
- Laporkan selisih yang terlihat per section dan perbaiki sebelum lanjut. Selisih yang diizinkan hanya yang ada di A1 poin 2 dan A4.
- Cek juga dengan keyboard (menu, pemilih adegan, tombol jeda, filter, accordion), console bersih, dan tidak ada scroll horizontal di 360 px. Perhatikan bahwa ponsel di hero menumpuk keluar bingkai.

### A9. Urutan kerja (menggantikan Bagian B §15)

0. **Persiapan.**
   - Salin file infrastruktur yang diizinkan dari `REFERENSI_LOKAL` (Bagian B §0, kecuali Apps Script, PricingGate, Works, dan halaman insights).
   - Inventaris semua teks mockup ke `docs/inventaris-konten.md`, dikelompokkan per section dan dipetakan ke field CMS di A5.
   - Jawab daftar pertanyaan A7.
   - **Berhenti dan laporkan.**
1. **Scaffold dan statis.**
   - Scaffold Astro + Tailwind 4 + token + font + `Logo.astro` + `Icon.astro`.
   - Bangun beranda **statis** (teks hardcoded), termasuk hero dua perangkat dan filter harga, sampai perbandingan A8 lolos.
   - Sertakan tiga opsi warna CTA (A4).
   - **Berhenti dan laporkan** dengan gambar perbandingannya.
2. **Konten ke CMS.** Pindahkan teks ke content collections + schema (A5), termasuk data harga per mode. Hasil perbandingan A8 harus tetap sama.
3. **Decap.**
   - `config.yml` harus cocok dengan schema, termasuk widget `object` untuk `mode` di `paket`.
   - Uji `npm run dev` + `npm run cms`.
   - Ubah satu harga Tahunan, lalu cek kartu, pesan WA, dan JSON-LD ikut berubah.
4. **SEO, 404, dan deploy.**
   - SEO, JSON-LD (A6), sitemap, robots, tracking (Bagian B §8), dan 404.
   - Workflow deploy + `CNAME` (A10, Bagian B §12) dan Worker OAuth (Bagian B §5).
   - Berhenti dulu bila `DOMAIN` atau `REPO_GITHUB` masih kosong.
5. **README** lengkap (Bagian B §16, dengan bagian form, Apps Script, dan Turnstile dihapus).

### A10. Deploy: GitHub Pages di `{{DOMAIN}}`

- Domain kanonik adalah apex `https://{{DOMAIN}}/`. `www.{{DOMAIN}}` hanya dialihkan ke apex.
- Situs berjalan di root domain, jadi `base` di `astro.config.mjs` tetap `/`. `withBase()` tetap dipakai agar preview di `<owner>.github.io/<repo>/` juga tidak rusak.
- `{{DOMAIN}}` harus sama persis di semua tempat berikut, dan daftar ini ditulis di README:
  - `public/CNAME`
  - `site` di `astro.config.mjs`
  - `site_url` dan `display_url` di `public/admin/config.yml`
  - `ALLOWED_ORIGINS` di Worker, berisi apex, `www`, dan `http://localhost:4321`
  - Homepage URL di GitHub OAuth App
  - `canonical`, `og:url`, dan JSON-LD
- Tambahkan ke checklist manual pemilik di README. Agent tidak melakukannya sendiri.
  1. Di panel DNS registrar:
     - A record untuk `@` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
     - AAAA record untuk `@` ke `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
     - CNAME `www` ke `<owner>.github.io`.
     - Hapus record parkir atau forwarding bawaan registrar.
  2. Verifikasi domain di GitHub (Settings akun/organisasi pemilik repo > Pages > Add a verified domain, lewat TXT record) untuk mencegah domain diambil alih repo lain.
  3. Repo > Settings > Pages:
     - Source: GitHub Actions.
     - Custom domain: `{{DOMAIN}}`.
     - Setelah sertifikat terbit, centang **Enforce HTTPS**.
  4. Cek `dig {{DOMAIN}} +short` dan `dig www.{{DOMAIN}} +short`. Propagasi DNS bisa memakan beberapa jam.
- Remote git memakai SSH `git@github.com:{{REPO_GITHUB}}.git`. Cek dengan `git remote -v`, dan tanya dulu sebelum push.
- Sebelum DNS siap, pengujian memakai `npm run preview` lokal.

---

## Bagian B: Arsitektur teknis (dari template, berlaku kecuali diubah Bagian A)

Catatan: `form_kontak_sheets`, `pricing_gate`, dan `blog` bernilai false, jadi §9, §10, Apps Script, Turnstile, halaman insights, dan langkah manual nomor 5–6 di §16 dilewati. Koleksi di Bagian B (services, solutions, industries, insights) diganti koleksi di A5.

### 0. Referensi implementasi

Repo referensi ada di `{{REFERENSI_LOKAL}}`. Sebelum menulis kode, baca `README.md`, `src/content.config.ts`, `public/admin/config.yml`, dan `src/lib/content.ts` di sana.

File berikut **salin lalu sesuaikan** (ganti nama brand, domain, warna, dan teks). Jangan menulis ulang dari nol:

| File | Isi |
|---|---|
| `oauth-proxy/` (src/index.js, wrangler.toml, test.mjs) | Cloudflare Worker untuk login GitHub di Decap |
| `apps-script/Code.gs`, `apps-script/test.mjs` | Penerima form ke Google Sheet + verifikasi Turnstile |
| `.github/workflows/deploy.yml` | Build + deploy GitHub Pages |
| `src/lib/url.ts` | `withBase()`, `stripBase()`, `bodyHtml()` |
| `src/lib/content.ts` | `byLang`, `getPage`, `getSettings`, `keyOf`, `findByKey`, `alternatesFor` |
| `src/i18n/utils.ts`, struktur `src/i18n/ui.ts` | helper bahasa, `t()`, `localizePath()` |
| `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts`, `src/pages/index.astro` | alias sitemap, robots, root tanpa redirect |
| `src/components/SEO.astro`, `Tracking.astro`, `LanguageSwitcher.astro` | meta, hreflang, OG, tracking dari CMS |
| `public/admin/index.html`, `preview.css` | Decap dengan versi di-pin + preview bergaya situs |
| `src/components/PricingGate.astro` (bila `pricing_gate`) | tabel paket ber-mask + opt-in email |
| `src/components/WorksSection.astro`, `src/pages/[lang]/works/[slug].astro` (bila `our_works`) | portofolio |

Desain visual (warna, font, layout, ikon) **dibuat baru** sesuai brand ini. Jangan meniru tampilan GRINTEC.

### 1. Stack (pin versi persis, jangan pakai `^`)

- Astro 7.x, `output: 'static'`, `trailingSlash: 'always'`
- Tailwind CSS 4 lewat `@tailwindcss/vite` (tanpa `tailwind.config.js`; token warna di `@theme` pada `global.css`)
- `@astrojs/sitemap`
- Decap CMS 3.x dimuat dari unpkg dengan versi di-pin di `public/admin/index.html`; `decap-server` sebagai devDependency (`npm run cms`)
- Node 22.22+ lokal, Node 24 di GitHub Actions
- Hosting GitHub Pages lewat Actions, custom domain di `public/CNAME`, `public/.nojekyll`
- Tanpa framework UI (React/Vue). Interaksi kecil memakai `<script>` Astro biasa dan elemen native (`<dialog>`, `<details>`).

Cek versi stabil terbaru tiap paket yang setidaknya sudah dua minggu rilis, lalu pin. Kalau versi major berbeda dari referensi, catat perbedaannya di README.

### 2. i18n dan routing

- `i18n.locales = {{BAHASA}}`, `defaultLocale` = bahasa pertama, `prefixDefaultLocale: true`, `redirectToDefaultLocale: false`.
- Semua halaman di `src/pages/[lang]/...`. Root `/` **merender** homepage bahasa default secara langsung (GitHub Pages tidak punya redirect server).
- Teks UI statis (menu, tombol, label form, pesan error) di `src/i18n/ui.ts`, diakses lewat `t('kunci')`, fallback ke bahasa default.
- Konten per bahasa di `src/content/<koleksi>/<bahasa>/<file>.md|yml`.
- **Slug boleh berbeda per bahasa** (SEO tiap bahasa). Pasangan terjemahan dikaitkan lewat **nama file**, bukan slug. Nama file mengikuti slug bahasa default saat entry dibuat, dan relasi antar-entry menyimpan nama file itu (`keyOf()`).
- Language switcher dan hreflang memakai `alternatesFor()`. Kalau terjemahan belum ada, arahkan ke halaman listing bahasa itu, jangan 404.

### 3. Content collections (`src/content.config.ts`)

- Loader `glob` dengan `generateId` = path file tanpa ekstensi (mis. `en/erp-implementation`). **Wajib**: loader default memakai field `slug` sebagai ID dan akan bentrok antar bahasa.
- Decap menulis `""` untuk field kosong. Pakai helper:
  - `str = z.string().nullish().transform(v => v ?? '')`
  - `list(item) = z.array(item).nullish().transform(v => v ?? [])`
- Koleksi singleton (halaman beranda, tentang, kontak, pengaturan situs) disimpan sebagai folder collection `pages/<bahasa>/<type>.yml` dengan field `type` dan schema discriminated union. Alasannya: collection bertipe `files` di Decap hanya mendukung i18n `single_file`.
- Setiap koleksi punya `order` (urutan menu dan grid) dan, untuk artikel dan karya, `draft`.
- ID tracking dari CMS divalidasi regex di schema (GTM `GTM-XXXX`, GA4 `G-XXXX`, Pixel angka saja, Search Console token). Build gagal dengan pesan jelas bila format salah, karena nilainya disisipkan ke script inline.

### 4. Decap CMS (`public/admin/config.yml`)

- Nama field **harus sama persis** dengan schema Zod. Tulis komentar itu di baris pertama file.
- `backend: github`, `repo: {{REPO_GITHUB}}`, `branch: main`, `base_url` = URL Worker OAuth, `auth_endpoint: auth`.
- `commit_messages` berbahasa Indonesia, mis. `cms: ubah {{collection}} "{{slug}}"`.
- `local_backend: true` (lokal memakai `npx decap-server`, tanpa login).
- `media_folder: public/uploads`, `public_folder: /uploads`.
- `i18n: { structure: multiple_folders, locales: {{BAHASA}}, default_locale: <bahasa pertama> }`.
- Field `slug` per bahasa (`i18n: true`) dengan `pattern` huruf kecil-angka-tanda hubung, plus hint bahwa mengubah slug halaman yang sudah tayang membuat URL lama 404. Collection memakai `slug: '{{fields.slug}}'`.
- Anchor YAML untuk daftar ikon, slug, SEO, dan section agar tidak berulang.
- Halaman singleton: `folder` + `filter: { field: type, value: home }` + `create: false`.
- Label field dalam bahasa Indonesia untuk editor.
- `index.html`: versi Decap di-pin, `meta robots noindex`, `registerPreviewStyle` untuk font dan `preview.css` (versi ringkas global.css).

### 5. Login CMS: Cloudflare Worker OAuth (`oauth-proxy/`)

Salin dari referensi. Perilaku yang harus dipertahankan:

- `GET /auth` redirect ke GitHub authorize dengan `state` acak di cookie `HttpOnly; Secure; SameSite=Lax; Path=/callback; Max-Age=600`.
- `GET /callback` cek `state` sama dengan cookie, tukar `code` ke token, lalu render halaman handshake Decap (`authorizing:github` lalu `authorization:github:success:{...}`).
- Token **hanya** di-`postMessage` ke origin di `ALLOWED_ORIGINS` (`wrangler.toml` vars): `https://{{DOMAIN}}`, `http://{{DOMAIN}}`, `http://localhost:4321`.
- JSON di dalam `<script>` di-escape `<` menjadi `<`.
- `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` lewat `wrangler secret put`, tidak pernah di repo.
- `node oauth-proxy/test.mjs` tanpa dependensi.

### 6. Halaman dan komponen inti

- `BaseLayout` dengan `SEO` (title, description, canonical, hreflang, OG image dari hero halaman), `Tracking`, Header, Footer.
- Header dengan mega menu (layanan dan solusi) dan `MobileNav`; footer dengan logo putih, ikon kontak dan sosmed.
- Beranda: hero (poster dulu, video opsional), daftar layanan, solusi, industri, insight terbaru, CTA.
- Listing + detail untuk tiap koleksi. Detail layanan menampilkan ilustrasi header (`heroImage`) yang melebur ke halaman (latar putih, tepi memudar dengan mask, tanpa kotak).
- Insights: satu route `[...path].astro` untuk listing, kategori, dan pagination supaya semua kombinasi ter-generate statis.
- Halaman kontak: form + tombol WhatsApp (`wa.me/<nomor>?text=<template per bahasa>`). CTA dari halaman layanan membawa `?service=<judul>` dan memilih layanan otomatis di dropdown (optgroup per layanan induk).
- Satu halaman `404.astro` (GitHub Pages hanya memakai satu 404) dengan tautan ke beranda tiap bahasa.
- **Section yang datanya belum ada disembunyikan**, jangan diisi angka atau nama karangan (sejarah, tim, statistik, testimoni, logo klien, portofolio). Placeholder yang memang harus tampil ditandai `[REAL DATA]` dan dicatat di README.

### 7. Media dan performa

- Gambar CMS di `public/uploads/`, dirender dengan `<img>` biasa + `width`/`height` + `loading="lazy"` di bawah fold + `withBase()`. Jangan pakai `astro:assets` untuk media CMS (Decap menyimpan path publik absolut).
- `bodyHtml()` menambahkan base path ke `src`/`href` `/uploads/` di body markdown.
- Gambar diunggah sekitar 1600 px, WebP, di bawah ~200 KB. Kompres sebelum commit.
- Font non-blocking (preconnect + `display=swap`), logo header responsif.
- Video hero dimuat lewat script, tidak dengan atribut `autoplay`, dan **tidak** dimuat bila `prefers-reduced-motion` atau `navigator.connection.saveData`. Poster tampil dulu (LCP).
- Turnstile dan script pihak ketiga lain dimuat saat dibutuhkan.

### 8. SEO dan tracking

- `@astrojs/sitemap` dengan `filter` hanya halaman berbahasa, **tanpa** opsi i18n (slug beda per bahasa membuat hreflang di sitemap salah). hreflang dipasang di `<head>` tiap halaman.
- Endpoint `/sitemap.xml` sebagai alias `sitemap-index.xml`. `robots.txt` dengan `Disallow: /admin/` dan baris `Sitemap:`.
- Tracking dari CMS (Pengaturan Situs > SEO & Tracking): Search Console, GTM, GA4, Meta Pixel, meta tag tambahan. Field kosong tidak memuat apa pun. README menjelaskan: pilih GTM **atau** GA4/Pixel langsung, jangan keduanya.

### 9. Form kontak ke Google Sheets (bila `form_kontak_sheets`)

Salin `apps-script/Code.gs`. Perilaku yang harus dipertahankan:

- Browser mengirim JSON sebagai `text/plain` tanpa header custom (Apps Script tidak melayani preflight CORS).
- Verifikasi Turnstile ke `siteverify` + cek hostname terhadap `ALLOWED_HOSTNAMES`.
- Konfigurasi lewat Script Properties: `TURNSTILE_SECRET`, `SHEET_ID`, `SHEET_NAME`, `NOTIFY_EMAIL`, `ALLOWED_HOSTNAMES`.
- Tab dan baris header dibuat otomatis bila belum ada. `LockService` saat append.
- Batas panjang per field; nilai berawalan `=`, `+`, `-`, `@` diberi awalan `'` (cegah formula injection).
- URL `/exec` dan site key Turnstile diisi lewat CMS (Pengaturan Situs > Formulir). Selama kosong, tombol kirim nonaktif dan pengunjung diarahkan ke kontak alternatif.
- Kunci uji Turnstile untuk lokal: site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA` (melaporkan hostname `example.com`).
- `node apps-script/test.mjs` tanpa dependensi.

### 10. Modul opsional

**Sub-layanan** (bila `sub_layanan`): koleksi `subservices` dengan `parent` (kunci file layanan induk), URL `/services/<induk>/<slug>/`, tampil sebagai kartu "Layanan turunan" di halaman induk, tidak masuk mega menu. Field: excerpt, tagline, heroImage, process, deliverables, pricing, FAQ, ctaLabel. CTA membuka kontak dengan layanan terpilih.

**Our Works** (bila `our_works`): koleksi `works` dengan relasi ke services/subservices/solutions (kunci file), `/works/<slug>/`, section kartu di halaman yang ditautkan dan disembunyikan bila kosong. Entry baru default `draft: true`. Studi kasus klien wajib anonim (nama klien, URL, IP, nama orang, logo disamarkan) sebelum terbit.

**Pricing gate** (bila `pricing_gate`, butuh `form_kontak_sheets`):

- Flag `priceGate: true` di sub-layanan. Kartu paket dan cakupan **selalu tampil**, harga di-mask `Rp XXX.XXX`, ada skeleton loading selama data dimuat.
- Harga **tidak pernah** ada di HTML statis maupun markdown. Sumbernya tab `Prices` di Sheet (`Key | Bahasa | Paket | Harga | Cakupan | Urutan`), bisa diedit tanpa deploy.
- Action Apps Script `scopes` mengembalikan nama + cakupan dengan harga numerik dihapus. Label non-angka seperti "Hubungi kami" ikut terkirim.
- Action `pricing`: dialog native `<dialog>` di tengah layar (`showModal` + `m-auto`) berisi email + persetujuan + Turnstile (explicit render). Lead dicatat ke tab `PricingLeads` (`Waktu | Email | Layanan | Sub-layanan | Paket | Bahasa | Halaman`), lalu harga asli menggantikan mask.
- Validasi email di browser: typo domain populer, blokir email sekali pakai, cek MX lewat `dns.google`.
- Email disimpan di `localStorage` dan dipakai untuk prefill. Setelah harga terbuka, tombol jadi "Choose this service" dan mencatat enquiry (action `enquiry`, tab `Enquiry`) tanpa pindah halaman, lalu tampil pesan "tim kami akan segera menghubungi Anda". Paket Custom selalu berlabel "Let's Discuss".
- Fallback: bila endpoint belum punya action `scopes`, tampilkan caption + satu tombol "Lihat harga".
- Pemeriksaan wajib: `grep` harga di `dist/` harus kosong.

**Video hero** (bila `video_hero`): WebM + MP4 + poster dari CMS, di bawah 5 MB, 1080p, tanpa audio. Perintah ffmpeg ada di README referensi.

### 11. Aksesibilitas dan desain

- Warna tombol dan link harus lolos kontras WCAG AA 4.5:1 dengan teks putih. Bila warna primer brand gagal, pakai varian lebih gelap untuk teks/tombol dan simpan warna asli untuk ikon, garis, motif (batas 3:1). Hitung rasionya dan catat di README.
- Fokus keyboard terlihat, `alt` pada gambar konten, label pada semua input, target sentuh memadai, tidak ada scroll horizontal di lebar 360 px.
- Ikon custom satu gaya (bukan set ikon generik), daftar kuncinya di `Icon.astro` dan sama dengan `_icons` di `config.yml`.
- Tema terang saja kecuali logo mendukung latar gelap.

### 12. Deploy dan domain

- `.github/workflows/deploy.yml`: trigger push ke `main` (termasuk commit dari CMS) + `workflow_dispatch`, `withastro/action`, `actions/deploy-pages`, `concurrency: pages`.
- Domain dipakai di empat tempat yang harus selalu sinkron: `public/CNAME`, `SITE` di `astro.config.mjs`, `site_url`/`display_url` di `config.yml`, `ALLOWED_ORIGINS` di Worker. Tulis daftar ini di README.

### 13. Gotcha yang sudah pernah terjadi (jangan diulang)

1. Glob loader tanpa `generateId` membuat entry ID dan EN bentrok.
2. Field kosong dari Decap berupa `""`, bukan `undefined`. Schema harus menerimanya.
3. Collection `files` di Decap tidak mendukung `multiple_folders`.
4. Mengubah `Code.gs` harus di-deploy lewat **Manage deployments > Edit > Version: New version**. "New deployment" membuat URL baru dan situs tetap memanggil kode lama. Gejalanya: respons `{"error":"invalid"}`.
5. `curl` ke URL `/exec` mengembalikan halaman interstitial Google. Uji Apps Script dari browser.
6. Turnstile di dalam `<dialog>` harus explicit render setelah dialog dibuka. Token hanya berlaku sekali, jadi `turnstile.reset()` setelah submit.
7. Hreflang di sitemap salah bila slug beda per bahasa.
8. Atribut `autoplay` tetap mengunduh video walau pengguna memilih reduced motion.
9. Warna hijau brand terang di bawah teks putih gagal kontras.
10. Kalimat ber-": " di dalam YAML scalar biasa merusak frontmatter. Pakai tanda kutip.

### 14. Aturan kerja

- **Uji di Chrome** sebelum melapor selesai: halaman yang diubah, versi mobile (360 px), console bersih. `npm run build` harus lolos.
- Jangan mengarang data perusahaan: angka, klien, testimoni, sertifikasi, NDA, cara penanganan data. Bila copy butuh klaim seperti itu, tulis netral lalu daftarkan sebagai pertanyaan untuk pemilik bisnis.
- Copy bahasa Indonesia disunting dengan skill `humanizer-indonesia`, copy bahasa Inggris dengan `humanizer`. Tanpa em dash, tanpa pola "bukan X, melainkan Y".
- Nama brand ditulis sesuai `NAMA_BRAND` di semua teks; domain bukan nama brand.
- Rahasia (client secret, Turnstile secret) hanya lewat `wrangler secret` dan Script Properties. Jangan pernah di repo atau chat.
- Tanya dulu sebelum push. Commit message berbahasa Indonesia.
- Solusi paling sederhana yang benar. Tanpa dependensi baru kecuali benar-benar perlu.

### 15. Urutan kerja

Kerjakan per fase, build dan cek di Chrome di akhir tiap fase, lalu laporkan singkat sebelum lanjut:

1. Scaffold Astro + Tailwind + i18n + layout + `ui.ts` + token warna/font.
2. Schema koleksi + konten awal (dari `BAHAN_KONTEN`, atau draft netral yang ditandai) + halaman listing/detail.
3. Decap `config.yml` yang cocok dengan schema; uji lokal dengan `npm run dev` + `npm run cms`, buat dan ubah satu entry tiap koleksi.
4. SEO, sitemap, robots, tracking.
5. Workflow deploy + `CNAME`.
6. Worker OAuth (kode dan test saja; deploy dilakukan pemilik).
7. Form kontak + Apps Script.
8. Modul opsional yang dipilih.
9. README lengkap.

### 16. Yang harus diserahkan

- Repo yang build-nya lolos dan sudah diuji di Chrome.
- `README.md` berbahasa Indonesia: cara jalan lokal, CMS lokal, struktur folder, deploy, langkah login CMS, langkah form + Apps Script, SEO & tracking, cara menambah konten, domain (empat tempat), tabel data yang masih perlu diisi, dan bagian "Keputusan teknis dan alasannya".
- **Checklist langkah manual untuk pemilik** (agent tidak bisa melakukannya):
  1. Settings > Pages > Source: GitHub Actions; DNS domain ke GitHub Pages.
  2. `npx wrangler login` lalu `npx wrangler deploy` di `oauth-proxy/`; catat URL Worker.
  3. GitHub OAuth App: Homepage `https://{{DOMAIN}}/`, callback `<URL Worker>/callback`; simpan `GITHUB_CLIENT_ID` dan `GITHUB_CLIENT_SECRET` dengan `wrangler secret put`.
  4. Isi `base_url` di `config.yml`.
  5. Widget Turnstile (hostname `{{DOMAIN}}`), Apps Script + Script Properties, deploy sebagai Web app (Execute as Me, Anyone), isi URL `/exec` + site key di CMS.
  6. Bila `pricing_gate`: buat tab `Prices` di Sheet.
  7. Verifikasi Search Console, kirim `/sitemap.xml`.
