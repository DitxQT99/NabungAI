# Ventx Tabung AI

Website mobile-first untuk tabungan dan manajemen uang dengan:
- Dashboard saldo + cash/bank/e-money
- Transaksi pemasukan/pengeluaran/transfer
- Target tabungan + hitungan kebutuhan harian
- Budget per kategori
- Analitik 7 hari dan komposisi pengeluaran
- Dompet/rekening
- Tagihan rutin
- Konverter USD → IDR
- Ventx AI memakai endpoint Faa yang sama: `https://api-faa.my.id/faa/ai-promt`
- Data aplikasi tersimpan lokal di browser (localStorage)

## Deploy

Upload folder ini ke Vercel. `api/ai-chat.js` menjadi proxy same-origin ke endpoint Faa, dan `api/rate.js` mengambil kurs USD/IDR untuk dashboard.

Catatan: AI hanya menerima ringkasan context keuangan yang dibangun oleh frontend; bukan seluruh isi localStorage mentah.
