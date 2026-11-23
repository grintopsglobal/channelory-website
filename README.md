# Website Channelory

Situs marketing statis untuk **Channelory** ("Unifying partners, optimizing networks."). Desain dan copy berasal dari mockup `referensi/mockup/channelory_landing_page.html`; semua teks di luar layar ilustrasi hero bisa diedit lewat Decap CMS.

- Domain: `https://channelory.my.id/` (beranda kanonik `/id/`)
- Repo: `grintopsglobal/channelory-website`
- Stack: Astro 7.4.7 (statis), Tailwind CSS 4.3.5, Decap CMS 3.17.3, hosting GitHub Pages

## Syarat sebelum rilis

Klaim berikut masih tampil sesuai mockup dan **harus punya dasar** (UU Perlindungan Konsumen, UU PDP untuk klaim keamanan) sebelum situs dipublikasikan. Ganti atau hapus lewat CMS bila belum bisa dibuktikan.

| Klaim | Lokasi di CMS |
|---|---|
| "85% Lebih Cepat", "100% Terpantau", "Zero Kebocoran" | Manfaat Bisnis |
| "SLA 99.9%" | Paket & Harga > Enterprise > Tahunan > Fitur kelima |
| "Dari 10 ke 10.000+ Mitra" | Halaman: Beranda > Section Tentang > Kartu pilar |
| Plugin/app resmi WooCommerce dan Shopify | Fitur (Modul 06), FAQ "Bagaimana cara kerja integrasi…" |
| Badge "Shopify Plus" | Halaman: Beranda > Hero > Badge integrasi |
| Integrasi SAP dan Accurate | Paket & Harga > Custom Whitelabel > Fitur |
| Aplikasi mobile mitra Android/iOS | Paket & Harga > Custom Whitelabel > Fitur |
| "Zero Conflict Verified", data demo di layar perangkat hero | `src/components/HeroDevices.astro` (ilustrasi, bukan CMS) |

Keputusan pemilik yang sudah diambil tercatat di `docs/keputusan.md`.

## Menjalankan di komputer

Butuh Node 22.22+ (GitHub Actions memakai Node 24).

```bash
npm install
npm run dev          # situs di http://localhost:4321/id/ (port lain bila 4321 terpakai)
npm run build        # hasil di dist/
npm run preview      # cek hasil build
```

### CMS lokal (tanpa login)

```bash
npm run dev          # terminal 1
npm run cms          # terminal 2: decap-server di port 8081
```

Buka `http://localhost:<port>/admin/index.html` (di server dev, `/admin/` saja belum tentu terbuka; di situs produksi `/admin/` jalan), klik **Login**. Perubahan langsung ditulis ke file di `src/content/`, lalu commit dan push seperti biasa.

### Pemeriksaan

```bash
node oauth-proxy/test.mjs        # Worker OAuth
node src/lib/md.test.mjs         # markdown satu baris dari CMS
npm run build && npm run bandingkan   # bandingkan dengan mockup (lihat bawah)
```

`npm run bandingkan` memotret mockup dan hasil build di lebar 1440, 1024, 768, 390, dan 360 px, plus adegan hero, filter harga, FAQ terbuka, dan menu mobile, lalu menyimpan `[mockup | build | diff]` di `docs/perbandingan/` (tidak di-commit). Script memasang Playwright sekali ke `.cache/pw/` (bukan dependensi situs), memakai Google Chrome yang terpasang, dan butuh internet karena mockup memuat Tailwind CDN dan Google Fonts.

## Struktur folder

```
src/
  components/      Header, Footer, HomePage (semua section), HeroDevices (panggung laptop + ponsel),
                   Pricing (filter harga), Logo, Icon, SEO, Tracking
  content/         isi CMS: manfaat/, modul/, paket/, faq/, pages/id/home.yml, settings/id/site.yml
  content.config.ts  schema Zod (nama field = public/admin/config.yml)
  i18n/            ui.ts (teks aksesibilitas & 404), utils.ts
  layouts/BaseLayout.astro
  lib/             content.ts (ambil data), wa.ts (link WhatsApp), md.ts (markdown satu baris), url.ts
  pages/           index.astro (root = beranda), [lang]/index.astro, 404.astro, sitemap.xml.ts, robots.txt.ts
  styles/global.css  token warna, font, animasi
public/            admin/ (Decap), CNAME, favicon, apple-touch-icon
oauth-proxy/       Cloudflare Worker untuk login CMS
scripts/           bandingkan-mockup.mjs
referensi/         mockup, logo, template asli (arsip)
docs/              inventaris-konten.md, keputusan.md
```

## Mengelola konten

| Menu CMS | Isi |
|---|---|
| Manfaat Bisnis | 4 kartu di section Manfaat (ikon, angka, judul, deskripsi) |
| Fitur (Modul) | 6 kartu modul |
| Paket & Harga | 4 paket; tiap paket punya harga Bulanan, Tahunan, Sekali Bayar |
| FAQ | pertanyaan dan jawaban; "Terbuka saat halaman dimuat" untuk item yang langsung terbuka |
| Halaman: Beranda | menu, hero, judul tiap section, label filter harga, Tentang, banner, footer |
| Pengaturan Situs | nomor WhatsApp, email, pesan WhatsApp, footer, SEO, tracking |

Catatan untuk editor:

- **Urutan** menentukan posisi kartu. Jumlah paket di filter "Semua Paket (4)" dihitung otomatis.
- **Harga angka** harus sesuai harga tampil. Angka ini dipakai Google (data terstruktur), bukan ditampilkan.
- Teks bertanda **tebal** ditulis `**seperti ini**` (di field markdown cukup pakai tombol B). Hanya satu paragraf per field yang ditampilkan.
- **Pesan WhatsApp**: semua pesan otomatis diawali "Kalimat pembuka" dari Pengaturan Situs ("Halo, saya lihat di website & tertarik dengan Channelory."), karena nomor WhatsApp dipakai bersama GRINTEC. Di WhatsApp, `*teks*` menjadi tebal.
- **Gaya kartu** paket: Standar (putih), Sorot (navy, untuk satu paket unggulan), Lembut (abu muda).
- Isi layar laptop dan ponsel di hero adalah ilustrasi dengan data demo dan sengaja tidak masuk CMS. Ubah di `src/components/HeroDevices.astro`.
- Kalimat dengan `: ` di YAML harus dikutip. CMS mengurus ini otomatis; perhatikan bila mengedit file langsung.

## Deploy ke GitHub Pages

Setiap push ke `main` (termasuk commit dari CMS) menjalankan `.github/workflows/deploy.yml`: build dengan `withastro/action`, lalu `actions/deploy-pages`.

Domain `channelory.my.id` harus sama persis di tempat berikut:

1. `public/CNAME`
2. `SITE` di `astro.config.mjs`
3. `site_url` dan `display_url` di `public/admin/config.yml`
4. `ALLOWED_ORIGINS` di `oauth-proxy/wrangler.toml` (apex, `www`, dan `http://localhost:4321`)
5. Homepage URL di GitHub OAuth App
6. `canonical`, `og:url`, dan JSON-LD (otomatis dari `SITE`)

`www.channelory.my.id` hanya dialihkan ke apex oleh GitHub Pages.

## Checklist manual pemilik

Langkah ini tidak bisa dilakukan agent.

**1. DNS di panel registrar `channelory.my.id`**

- A record `@` ke `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- AAAA record `@` ke `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- CNAME `www` ke `grintopsglobal.github.io`
- Hapus record parkir atau forwarding bawaan registrar

**2. Verifikasi domain di GitHub** (Settings organisasi `grintopsglobal` > Pages > Add a verified domain, lewat TXT record) agar domain tidak bisa diambil repo lain.

**3. Repo > Settings > Pages**: Source **GitHub Actions**, Custom domain `channelory.my.id`. Setelah sertifikat terbit, centang **Enforce HTTPS**. Cek dengan `dig channelory.my.id +short` dan `dig www.channelory.my.id +short`; propagasi DNS bisa beberapa jam.

**4. Worker login CMS**

```bash
cd oauth-proxy
npx wrangler login
npx wrangler deploy        # catat URL-nya, mis. https://channelory-decap-oauth.grintopsglobal.workers.dev
```

**5. GitHub OAuth App** (Settings organisasi > Developer settings > OAuth Apps > New):

- Homepage URL: `https://channelory.my.id/`
- Authorization callback URL: `<URL Worker>/callback`

Lalu simpan rahasianya ke Worker (jangan pernah di repo atau chat):

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

**6. `base_url`** di `public/admin/config.yml` diisi URL Worker bila berbeda dari `https://channelory-decap-oauth.grintopsglobal.workers.dev`, lalu commit dan push.

**7. Search Console**: verifikasi lewat CMS (Pengaturan Situs > Tracking > Google Search Console), lalu kirim `https://channelory.my.id/sitemap.xml`.

Login CMS di produksi: buka `https://channelory.my.id/admin/`, klik **Login with GitHub**. Akun harus punya akses tulis ke repo.

## SEO & tracking

- `<title>`, meta description, keywords, og:title/description diedit di Pengaturan Situs > SEO.
- JSON-LD dirakit dari CMS: `SoftwareApplication` + `AggregateOffer` (harga terendah dan tertinggi dari semua mode semua paket, saat ini 792.000 sampai 145.000.000, 12 penawaran) dan `FAQPage` dari koleksi FAQ. Mockup menulis `799000–5999000`, yang tidak cocok dengan tabel harga.
- Sitemap: `/sitemap.xml` (alias dari `sitemap-index.xml`). `robots.txt` menolak `/admin/`.
- Tracking (Pengaturan Situs > Tracking): Search Console, GTM, GA4, Meta Pixel, meta tag tambahan. Field kosong tidak memuat apa pun. Pilih **GTM atau** GA4/Pixel langsung, jangan keduanya, agar data tidak tercatat dua kali. Format ID divalidasi saat build; build gagal dengan pesan jelas bila salah.
- Halaman 404 memakai header dan footer yang sama, dengan `noindex`.

## Warna dan kontras (A4, diverifikasi ulang)

| Pasangan | Rasio | Status |
|---|---|---|
| Navy `#13294B` vs putih | 14,5:1 | lolos |
| Navy dark `#0D1D36` vs putih | 16,9:1 | lolos |
| Sky `#00A3E0` vs putih (teks) | 2,9:1 | gagal, tidak dipakai untuk teks di latar terang |
| Sky `#00A3E0` di atas navy / navy dark | 5,1:1 / 5,9:1 | lolos, tetap dipakai |
| Tombol CTA: navy di atas sky `#00A3E0` | 5,1:1 | lolos (opsi b) |
| Hover CTA: navy di atas `#38BDF8` | 6,8:1 | lolos (hover mockup `#008EC4` hanya 3,9:1) |
| `sky-text` `#0077A8` vs putih / `sky-50` | 5,0:1 / 4,7:1 | lolos, untuk teks sky di latar terang |
| `slate-500` vs putih / `#F8FAFC` | 4,8:1 / 4,6:1 | lolos (menggantikan `slate-400`, 2,6:1) |
| Putih di atas `emerald-700` (tombol WA melayang) | 5,5:1 | lolos (`emerald-600` mockup 3,8:1) |

Isi layar perangkat di hero adalah ilustrasi (`aria-hidden`), jadi warnanya tetap persis mockup.

## Keputusan teknis dan alasannya

- **Tailwind 4, bukan CDN Tailwind 3 seperti mockup.** Kelas mockup disalin apa adanya dengan warna hex diganti token (`bg-navy`, `text-sky-text`). Tiga perbedaan Tailwind 3 ke 4 ditangani agar tampilan identik: warna border default (di-set ke `gray-200` di `global.css`), `shadow-sm` mockup = `shadow-xs` di v4, dan `sm:text-*` di v3 ikut mengganti line-height (ditiru dengan `sm:leading-*`).
- **Tiga adegan hero dirender di HTML.** JS hanya menukar adegan yang tampil (atribut `hidden`), tanpa `innerHTML`. Rotasi otomatis 4,5 detik bisa dijeda (WCAG 2.2.2) dan mati saat `prefers-reduced-motion`. Titik penanda modul aktif di sidebar laptop ikut berpindah (di mockup tertinggal di modul pertama).
- **Data harga satu sumber.** Koleksi `paket` dirender Astro, termasuk `<script type="application/json">` berisi teks dan link WhatsApp tiap mode; JS filter hanya membaca JSON itu. Tanpa JS, tampilan Bulanan/Semua sudah lengkap.
- **Status tombol lewat `aria-pressed` / `aria-expanded`.** Gaya aktif memakai varian Tailwind atribut, jadi JS cukup mengubah atribut.
- **Markdown satu baris sendiri (`src/lib/md.ts`)**, bukan pustaka markdown: field CMS hanya butuh tebal dan miring.
- **Satu bahasa (`id`)** dengan struktur i18n tetap disiapkan (`/id/`, `i18n` di Decap). Root `/` merender beranda langsung karena GitHub Pages tidak punya redirect server.
- **Versi di-pin persis** (rilis stabil minimal dua minggu saat dibuat): astro 7.4.7, @astrojs/sitemap 3.7.4, tailwindcss & @tailwindcss/vite 4.3.5, decap-server 3.11.6, decap-cms 3.17.3. Major Astro sama dengan repo referensi GRINTEC (7.x).
- **Tidak dipakai dari template GRINTEC**: form kontak + Apps Script + Turnstile, pricing gate, portofolio, insights, language switcher.

## Data yang masih perlu diisi

| Data | Status |
|---|---|
| Dasar klaim (tabel "Syarat sebelum rilis") | menunggu pemilik |
| Media sosial | kosong, belum ditampilkan |
| Gambar OG (pratinjau saat dibagikan) | belum ada; meta `og:image` tidak dipasang sampai ada |
| Logo SVG resmi | memakai SVG versi mockup |
| Versi bahasa Inggris | nanti |
