// Bandingkan mockup dengan hasil build (A8). Jalankan: npm run build && npm run bandingkan
// Playwright dipasang sekali ke .cache/pw (bukan dependensi situs) dan memakai Google Chrome yang terpasang.
// Hasil: docs/perbandingan/<nama>.png = [mockup | build | diff]; ringkasan selisih di konsol.
// Butuh internet: mockup memuat Tailwind CDN dan Google Fonts.
import { execSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(import.meta.dirname, '..');
const PW_DIR = resolve(ROOT, '.cache/pw');
if (!existsSync(resolve(PW_DIR, 'node_modules/playwright'))) {
  execSync(`npm i --prefix "${PW_DIR}" --no-save --no-audit --no-fund playwright@1.65.0`, { stdio: 'inherit' });
}
const { chromium } = createRequire(resolve(PW_DIR, 'package.json'))('playwright');

const OUT = resolve(ROOT, 'docs/perbandingan');
mkdirSync(OUT, { recursive: true });
const MOCKUP = pathToFileURL(resolve(ROOT, 'referensi/mockup/channelory_landing_page.html')).href;
const PORT = 4329;
const BUILD = `http://localhost:${PORT}/id/`;
const WIDTHS = [1440, 1024, 768, 390, 360];

// Opsi warna CTA (A4). b = default di global.css (dipilih pemilik).
const CTA = {
  a: ':root{--color-cta:#0077A8;--color-cta-hover:#00648D;--color-cta-ink:#fff}',
  c: ':root{--color-cta:#00A3E0;--color-cta-hover:#008EC4;--color-cta-ink:#fff;--color-sky-text:#00A3E0}',
};

const preview = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
const browser = await chromium.launch({ channel: 'chrome' });
const ctx = await browser.newContext({ reducedMotion: 'reduce', deviceScaleFactor: 1 });

async function waitServer() {
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(BUILD)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('astro preview tidak menyala. Sudah `npm run build`?');
}

// Bekukan halaman: tanpa animasi/transisi, rotasi hero berhenti di adegan 0, harga Bulanan/Semua.
async function open(kind, width, height = 900, css = '') {
  const page = await ctx.newPage();
  await page.setViewportSize({ width, height });
  await page.goto(kind === 'mockup' ? MOCKUP : BUILD, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: `*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}${css}` });
  if (kind === 'mockup') await page.evaluate(() => { clearInterval(sceneAutoTimer); setDeviceScene(0); });
  else await page.click('[data-scene-btn="0"]');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  return page;
}

const actions = {
  scene1: { mockup: (p) => p.evaluate(() => setDeviceScene(1)), build: (p) => p.click('[data-scene-btn="1"]') },
  scene2: { mockup: (p) => p.evaluate(() => setDeviceScene(2)), build: (p) => p.click('[data-scene-btn="2"]') },
  tahunan: { mockup: (p) => p.evaluate(() => setPricingFilter('annual')), build: (p) => p.click('[data-bill="tahunan"]') },
  onetime: { mockup: (p) => p.evaluate(() => setPricingFilter('onetime')), build: (p) => p.click('[data-bill="sekaliBayar"]') },
  saas: { mockup: (p) => p.evaluate(() => setCategoryFilter('saas')), build: (p) => p.click('[data-cat="saas"]') },
  faq: { mockup: (p) => p.evaluate(() => toggleFaq(1)), build: (p) => p.locator('[data-faq]').nth(1).click() },
  menu: { mockup: (p) => p.evaluate(() => toggleMobileNav()), build: (p) => p.click('#mobile-nav-btn') },
};

async function shot(kind, { width, height, action, selector, viewportOnly, css }) {
  const page = await open(kind, width, height, css);
  if (action) {
    await actions[action][kind](page);
    await page.waitForTimeout(500);
  }
  const png = selector
    ? await page.locator(selector).first().screenshot()
    : await page.screenshot({ fullPage: !viewportOnly });
  await page.close();
  return png;
}

// Gabung [mockup | build | diff] di canvas browser dan hitung persen piksel berbeda.
async function compose(a, b) {
  const page = await ctx.newPage();
  const res = await page.evaluate(async ([a, b]) => {
    const load = (src) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = src; });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const w = Math.max(ia.width, ib.width), h = Math.max(ia.height, ib.height);
    const px = (img) => { const c = new OffscreenCanvas(w, h); const x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0); return x.getImageData(0, 0, w, h); };
    const da = px(ia), db = px(ib);
    const diff = new ImageData(w, h);
    let n = 0;
    for (let i = 0; i < da.data.length; i += 4) {
      const d = Math.abs(da.data[i] - db.data[i]) + Math.abs(da.data[i + 1] - db.data[i + 1]) + Math.abs(da.data[i + 2] - db.data[i + 2]);
      const bad = d > 48;
      if (bad) n++;
      const g = 255 - (da.data[i] + da.data[i + 1] + da.data[i + 2]) / 12;
      diff.data.set(bad ? [230, 30, 60, 255] : [g, g, g, 255], i);
    }
    const gap = 16, out = new OffscreenCanvas(w * 3 + gap * 2, h), o = out.getContext('2d');
    o.fillStyle = '#94a3b8'; o.fillRect(0, 0, out.width, h);
    o.drawImage(ia, 0, 0); o.drawImage(ib, w + gap, 0); o.putImageData(diff, (w + gap) * 2, 0);
    const blob = await out.convertToBlob({ type: 'image/png' });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let bin = ''; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return { pct: (100 * n) / (w * h), size: `${ia.width}x${ia.height} vs ${ib.width}x${ib.height}`, png: btoa(bin) };
  }, [a, b].map((x) => `data:image/png;base64,${x.toString('base64')}`));
  await page.close();
  return res;
}

const jobs = [
  ...WIDTHS.map((width) => ({ name: `penuh-${width}`, width })),
  { name: 'hero-adegan1', width: 1440, action: 'scene1', selector: 'main > section' },
  { name: 'hero-adegan2', width: 1440, action: 'scene2', selector: 'main > section' },
  { name: 'harga-tahunan', width: 1440, action: 'tahunan', selector: '#harga' },
  { name: 'harga-onetime', width: 1440, action: 'onetime', selector: '#harga' },
  { name: 'harga-saas', width: 1440, action: 'saas', selector: '#harga' },
  { name: 'faq-terbuka', width: 1440, action: 'faq', selector: '#faq' },
  { name: 'menu-mobile', width: 390, height: 640, action: 'menu', viewportOnly: true },
];

await waitServer();
const only = process.argv[2];
for (const job of jobs.filter((j) => !only || j.name.includes(only))) {
  const [m, b] = [await shot('mockup', job), await shot('build', job)];
  const r = await compose(m, b);
  writeFileSync(resolve(OUT, `${job.name}.png`), Buffer.from(r.png, 'base64'));
  console.log(`${job.name.padEnd(16)} ${r.pct.toFixed(2).padStart(6)}% beda   (${r.size})`);
}

// Tiga opsi warna CTA (A4), hanya build: hero + harga di 1440.
if (!only || only === 'cta') {
  for (const [opsi, css] of [['a', CTA.a], ['b', ''], ['c', CTA.c]]) {
    for (const selector of ['main > section', '#harga']) {
      const png = await shot('build', { width: 1440, selector, css });
      writeFileSync(resolve(OUT, `cta-${opsi}-${selector === '#harga' ? 'harga' : 'hero'}.png`), png);
    }
  }
  console.log('cta-a/b/c        tersimpan');
}

// Cek scroll horizontal di 360 px.
const p = await open('build', 360);
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
console.log(`scroll horizontal 360px: ${overflow > 0 ? `ADA (${overflow}px)` : 'tidak ada'}`);

await browser.close();
preview.kill();
