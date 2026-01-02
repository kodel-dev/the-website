# Introduksi

Project ini merupakan hasil kontribusi bersama para engineer di komunitas **Vincoo**.

👉 [https://discord.com/invite/5brkcMzhRX](https://discord.com/invite/5brkcMzhRX)

Repository ini bersifat **open-source**. Siapa pun dipersilakan menambahkan fitur, perbaikan bug, atau peningkatan UI/UX melalui mekanisme **Pull Request**.

👉 [https://github.com/vincoodev/the-website/pulls](https://github.com/vincoodev/the-website/pulls)

---

## 🔐 Konfigurasi Environment (.env)

Project ini menggunakan **Groq API** untuk fitur **AI Copilot / Chat** serta beberapa konfigurasi lokal lainnya.

### Opsi A — Menggunakan `.env.example` (Direkomendasikan)

Jika tersedia file `.env.example`, kamu **tidak perlu membuat `.env` dari awal**. Cukup salin file contoh berikut:

```bash
cp .env.example .env
```

Kemudian sesuaikan nilai variabel di dalamnya (terutama `GROQ_API_KEY`).

### Opsi B — Membuat `.env` manual

Jika file `.env.example` belum tersedia, buat file `.env` di root project:

```bash
touch .env
```

Isi dengan konfigurasi berikut:

```env
DATABASE_URL="file:./rent-femboy.db"
uwu=1
JWT_SECRET=LICK_ASTOLFO_ARMPITS
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_API_URL="http://localhost:3000/api/ayuAtama/rent-femboy"
NEXT_PUBLIC_FEM_RENT_URL="/ayuAtama/rent-femboy"
GROQ_API_KEY="your_groq_api_key_here"
```

Ganti `your_groq_api_key_here` dengan API Key Groq milik kamu.

### Cara mendapatkan GROQ API Key

1. Buka [https://console.groq.com](https://console.groq.com)
2. Login atau daftar akun Groq
3. Masuk ke menu **API Keys**
4. Buat API Key baru
5. Salin API Key tersebut ke file `.env`

> [!IMPORTANT]
> Jangan pernah melakukan commit file `.env` ke repository publik.

---

## Cara Berkontribusi

> [!NOTE]
> Pastikan kamu sudah menginstall **Node.js versi terbaru** dan menggunakan **npm** (bukan yarn atau pnpm).

Alur kontribusi menggunakan metode **Fork → Branch → Pull Request**.

1. **Fork repository ini** ke akun GitHub kamu
2. Clone repository hasil fork ke lokal:

```bash
git clone https://github.com/<username-kamu>/the-website.git
```

3. Masuk ke folder project dan install dependency:

```bash
cd the-website
npm install
```

4. Jalankan setup awal (database & Prisma):

```bash
npm run ayuAtama
```

5. Buat branch baru untuk fitur atau perbaikan kamu:

```bash
git checkout -b feature/nama-fitur-kamu
```

6. Jalankan project secara lokal:

```bash
npm run dev
```

7. Tambahkan fitur atau perbaikan (UI, API, AI, dsb)

8. Tambahkan perubahan ke staging:

```bash
git add .
```

9. Commit perubahan:

```bash
git commit -m "feat: deskripsi singkat perubahan"
```

10. Push branch ke repository fork kamu:

```bash
git push origin feature/nama-fitur-kamu
```

11. Buat **Pull Request** ke repository utama:
    👉 [https://github.com/vincoodev/the-website/pulls](https://github.com/vincoodev/the-website/pulls)

12. Tunggu proses review dan approval dari admin

---

## Cara Menjalankan Website (29 December 2025)

> [!IMPORTANT]
> Kamu **WAJIB** menggunakan npm agar lockfile tetap tersinkronisasi.

1. `git clone https://github.com/vincoodev/the-website.git`
2. `npm install`
3. `npm run ayuAtama`
4. `npm run dev`
5. Buka browser dan akses `http://localhost:3000`
