/** Link WhatsApp. Pembuka (nama produk) ditaruh di baris pertama karena nomor dipakai bersama GRINTEC. */
export function waLink(nomor: string, pesan: string, pembuka = ''): string {
  const text = [pembuka, pesan].filter(Boolean).join('\n');
  return `https://wa.me/${nomor.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}
