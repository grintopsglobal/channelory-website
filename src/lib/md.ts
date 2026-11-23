const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Markdown satu baris dari CMS: hanya **tebal** dan *miring* / _miring_ (format tulisan editor Decap). Teks di-escape dulu. */
export function inlineMd(s: string): string {
  // Karakter yang di-escape Decap (\* \_ dst.) disimpan dulu sebagai kode agar tidak dibaca sebagai format.
  const hold = s.trim().replace(/\\([\\*_[\]()#+.!-])/g, (_, c: string) => `${c.charCodeAt(0)}`);
  return escape(hold)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/(^|[^\w])_(.+?)_(?=[^\w]|$)/g, '$1<em>$2</em>')
    .replace(/(\d+)/g, (_, n: string) => String.fromCharCode(Number(n)));
}

/** Teks polos dari markdown satu baris, untuk JSON-LD. */
export function plainMd(s: string): string {
  return inlineMd(s).replace(/<[^>]+>/g, '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
