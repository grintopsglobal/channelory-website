// node --experimental-strip-types src/lib/md.test.mjs (Node 22.6+; otomatis di Node 23.6+)
import assert from 'node:assert';
const { inlineMd } = await import('./md.ts');
assert.equal(inlineMd('a **b** *c* <x>'), 'a <strong>b</strong> <em>c</em> &lt;x&gt;');
assert.equal(inlineMd('prinsip _"Unifying."_ ok'), 'prinsip <em>&quot;Unifying.&quot;</em> ok');
assert.equal(inlineMd('nama_file_x tetap'), 'nama_file_x tetap');
assert.equal(inlineMd('Harga \\*promo\\* 1\\. dua\n'), 'Harga *promo* 1. dua');
console.log('md ok');
const { plainMd } = await import('./md.ts');
assert.equal(plainMd('**A & B** _"c"_'), 'A & B "c"');
console.log('plain ok');
