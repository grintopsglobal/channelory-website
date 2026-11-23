// Nama field di sini HARUS sama persis dengan public/admin/config.yml.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ID entry = path tanpa ekstensi, mis. "id/starter". Loader default memakai field `slug` sebagai ID dan bentrok antar bahasa.
const loader = (dir: string) => glob({ base: `./src/content/${dir}`, pattern: '**/*.yml', generateId: ({ entry }) => entry.replace(/\.ya?ml$/, '') });

// Decap menulis "" untuk field kosong, jadi string opsional selalu punya default "".
const str = z.string().nullish().transform((v) => v ?? '');
const list = <T extends z.ZodType>(item: T) => z.array(item).nullish().transform((v) => v ?? []);
// ID tracking disisipkan ke script inline, jadi formatnya dikunci ketat (atau kosong).
const trackingId = (re: RegExp, hint: string) =>
  z.string().nullish().transform((v) => (v ?? '').trim()).refine((v) => v === '' || re.test(v), { message: `Format tidak valid, contoh: ${hint}` });

export const IKON = ['jam', 'kubus', 'perisai', 'tren'] as const;
const anchor = z.object({ label: z.string(), anchor: z.string().regex(/^[a-z0-9-]+$/) });
const section = z.object({ eyebrow: z.string(), judul: z.string(), paragraf: str });

const manfaat = defineCollection({
  loader: loader('manfaat'),
  schema: z.object({ order: z.number(), ikon: z.enum(IKON), angka: z.string(), judul: z.string(), deskripsi: z.string() }),
});

const modul = defineCollection({
  loader: loader('modul'),
  schema: z.object({
    order: z.number(),
    nomor: z.string(),
    label: z.string(),
    ikon: z.enum(IKON).or(z.literal('')).nullish().transform((v) => v ?? ''),
    judul: z.string(),
    deskripsi: z.string(),
    poin: list(z.string()),
  }),
});

const harga = z.object({
  harga: z.string(),
  hargaAngka: z.number().int().nonnegative(),
  satuan: z.string(),
  catatan: str,
  fiturTambahan: str,
  pesanWa: z.string(),
});

const paket = defineCollection({
  loader: loader('paket'),
  schema: z.object({
    key: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number(),
    nama: z.string(),
    badge: str,
    gaya: z.enum(['standar', 'sorot', 'lembut']),
    kategori: z.enum(['saas', 'enterprise']),
    deskripsi: z.string(),
    fitur: list(z.string()),
    cta: z.string(),
    mode: z.object({ bulanan: harga, tahunan: harga, sekaliBayar: harga }),
  }),
});

const faq = defineCollection({
  loader: loader('faq'),
  schema: z.object({ order: z.number(), terbuka: z.boolean().default(false), pertanyaan: z.string(), jawaban: z.string() }),
});

// Halaman singleton disimpan sebagai folder collection pages/<bahasa>/<type>.yml (Decap `files` tidak mendukung multiple_folders).
const home = z.object({
  type: z.literal('home'),
  menu: list(anchor),
  header: z.object({ cta: z.string(), ctaMobile: z.string() }),
  hero: z.object({
    judul: z.string(),
    judulSorot: str,
    paragraf: z.string(),
    ctaUtama: z.string(),
    ctaHarga: z.string(),
    integrasiJudul: str,
    integrasi: list(z.string()),
    adegan: z.array(z.string()).length(3),
    autoPreview: z.string(),
    autoPreviewJeda: z.string(),
    ilustrasiCatatan: str,
  }),
  manfaat: section,
  fitur: section,
  harga: section.extend({
    filterBulanan: z.string(),
    filterTahunan: z.string(),
    filterTahunanBadge: str,
    filterSekaliBayar: z.string(),
    filterSekaliBayarBadge: str,
    filterSkemaLabel: z.string(),
    filterSemua: z.string(),
    filterSaas: z.string(),
    filterEnterprise: z.string(),
  }),
  tentang: section.omit({ paragraf: true }).extend({
    paragraf1: z.string(),
    paragraf2: str,
    pilar: list(z.object({ label: z.string(), judul: z.string(), deskripsi: z.string() })),
  }),
  faq: section.omit({ paragraf: true }),
  banner: section.extend({ cta: z.string() }),
  footer: z.object({
    navigasiJudul: z.string(),
    navigasi: list(anchor),
    integrasiJudul: z.string(),
    integrasi: list(z.string()),
    kontakLabel: z.string(),
  }),
  melayang: z.object({ label: z.string() }),
});

const pages = defineCollection({ loader: loader('pages'), schema: z.discriminatedUnion('type', [home]) });

const settings = defineCollection({
  loader: loader('settings'),
  schema: z.object({
    tagline: z.string(),
    whatsapp: z.string().regex(/^\d{8,15}$/, 'Nomor WhatsApp: angka saja dengan kode negara, mis. 6285161364811'),
    email: str,
    sosmed: z.object({ instagram: str, linkedin: str, youtube: str, tiktok: str }),
    pesanWa: z.object({ pembuka: str, header: z.string(), hero: z.string(), banner: z.string(), footer: z.string(), melayang: z.string() }),
    footer: z.object({ deskripsi: z.string(), kreditAwal: str, kreditNama: str, kreditUrl: str, copyright: z.string() }),
    seo: z.object({ title: z.string(), description: z.string(), keywords: str, ogTitle: str, ogDescription: str, appDescription: z.string() }),
    tracking: z.object({
      gscVerification: trackingId(/^[A-Za-z0-9_-]{10,100}$/, 'kode dari content="..." Search Console'),
      gtmId: trackingId(/^GTM-[A-Z0-9]{4,12}$/, 'GTM-ABC1234'),
      ga4Id: trackingId(/^G-[A-Z0-9]{4,15}$/, 'G-ABC123XYZ'),
      metaPixelId: trackingId(/^\d{10,20}$/, '1234567890123456'),
      metaTags: list(z.object({ name: z.string().regex(/^[A-Za-z0-9:._-]{1,80}$/), content: z.string().max(300) })),
    }),
  }),
});

export const collections = { manfaat, modul, paket, faq, pages, settings };
