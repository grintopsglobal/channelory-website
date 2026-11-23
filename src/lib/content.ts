import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

const DUMMY_WA = '6281234567890';

type Ordered = 'manfaat' | 'modul' | 'paket' | 'faq';

/** Entry satu bahasa, diurutkan menurut field `order`. */
export async function byLang<C extends Ordered>(collection: C, lang: Lang) {
  const items = (await getCollection(collection, (e) => e.id.startsWith(`${lang}/`))) as CollectionEntry<C>[];
  return items.sort((a, b) => a.data.order - b.data.order);
}

type PageData = CollectionEntry<'pages'>['data'];

export async function getPage<T extends PageData['type']>(lang: Lang, type: T) {
  const entry = await getEntry('pages', `${lang}/${type}`);
  if (!entry || entry.data.type !== type) throw new Error(`Konten halaman "${lang}/${type}" tidak ditemukan.`);
  return entry.data as Extract<PageData, { type: T }>;
}

export async function getSettings(lang: Lang) {
  const entry = await getEntry('settings', `${lang}/site`);
  if (!entry) throw new Error(`Pengaturan situs "${lang}/site" tidak ditemukan.`);
  if (entry.data.whatsapp === DUMMY_WA) console.warn(`\n⚠ Nomor WhatsApp masih dummy (${DUMMY_WA}). Ganti di CMS > Pengaturan Situs sebelum rilis.\n`);
  return entry.data;
}

export type Settings = Awaited<ReturnType<typeof getSettings>>;
export type Home = Awaited<ReturnType<typeof getPage<'home'>>>;
export type Paket = CollectionEntry<'paket'>['data'];
export type Mode = keyof Paket['mode'];
