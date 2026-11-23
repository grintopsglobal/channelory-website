# Keputusan pemilik

Nomor mengacu ke laporan Fase 0 (A7 + temuan tambahan). Dicatat 2026-11-23.

| No | Topik | Keputusan |
|---|---|---|
| 1 | Domain & repo | `channelory.my.id`, `grintopsglobal/channelory-website`. `www` dialihkan ke apex. |
| 2 | Kontak | Sama dengan GRINTEC: WhatsApp `6285161364811`, email `info@grintecs.com`. Email tampil di kolom "Integrasi & Kontak" footer. |
| 3 | Logo | SVG dari mockup. |
| 4 | Klaim | Teks tetap untuk sementara. Semua klaim di A7.4 masuk daftar syarat rilis di README sampai ada dasarnya. |
| 5 | Pesaing di FAQ 1 | Nama Tapfiliate/Partnero disamarkan jadi "software afiliasi pada umumnya". |
| 6 | Data demo hero | Tetap seperti mockup (ilustrasi `aria-hidden`). |
| 7 | Kunci kategori | `perpetual` diganti `enterprise`; label tidak berubah. |
| 8 | Bahasa Inggris | Nanti. Struktur i18n disiapkan. |
| 9 | Em dash | Diganti: koma/titik dua/kurung di kalimat, tombol kartu jadi "Coba Sekarang: <Paket>". |
| 10 | Kontras tambahan | Teks `slate-400` di latar terang jadi `slate-500`; tombol WA melayang `emerald-700` (hover `emerald-800`). |
| 11 | Badge Business | "Paling Populer" diganti "Rekomendasi Kami" (belum ada data popularitas). |
| 12 | Pesan WA Bulanan | Versi `pricingMatrixData` (dengan harga) dipakai juga untuk tampilan awal. |
| 13 | Ikon tombol header | Panah, sesuai mockup. |
| 14 | Field & teks tambahan | Disetujui: `paket.cta`, `mode.*.hargaAngka`, `faq.terbuka`, `hero.judulSorot`, `modul.ikon` opsional, teks "Auto-Preview Dijeda". |
| 15 | JSON-LD | Dihitung dari koleksi `paket` (A6). |
| + | Kredit footer | Baris copyright jadi "Dirancang, dikembangkan oleh Grintec. © 2026 Channelory. Hak cipta dilindungi undang-undang." "Grintec" ditautkan ke `https://grintecs.com`, buka tab baru. Tahun dari waktu build. |
| 16 | Pembuka pesan WA | Nomor WA dipakai bersama GRINTEC, jadi setiap pesan diawali `settings.pesanWa.pembuka` = "Halo, saya lihat di website & tertarik dengan Channelory." lalu baris baru dan pesan spesifik. Sapaan "Halo (tim) Channelory," di pesan mockup dihapus agar tidak dobel. Digabung oleh `waLink()`. |
| 17 | Warna CTA (A4) | Opsi b: tombol `#00A3E0` dengan teks navy (5,1:1). Hover `#38BDF8` (6,8:1), bukan `#008EC4` seperti mockup, karena navy di atas `#008EC4` hanya 3,9:1. |
| 18 | Script Playwright | Disimpan untuk diff piksel; pengujian interaktif memakai Chrome langsung. |
| 19 | Pemeriksaan antislop-ui (2026-11-23) | Dikerjakan: caption "Ilustrasi tampilan aplikasi dengan data contoh." di bawah perangkat hero (`hero.ilustrasiCatatan`); badge tagline di atas H1 dihapus (field `hero.label` dihapus); label section, label pilar, judul footer, dan badge kartu harga tidak lagi kapital berspasi lebar; warna sky hanya untuk tombol CTA dan potongan H1; panah hanya di CTA hero; animasi melayang perangkat dihapus (titik "Auto-Preview Aktif" tetap karena menandai status); label modul pakai Inter, huruf biasa; CTA "Coba Sekarang" diganti "Hubungi Sales", "Jadwalkan Demo via WhatsApp", "Konsultasi via WhatsApp", "Tanya Paket <Nama>", "Chat WhatsApp", dan pesan WA terkait disesuaikan. Ditunda: variasi kartu (6), ritme section (11), kolom navigasi footer (13). |
