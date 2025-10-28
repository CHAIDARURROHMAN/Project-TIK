
# 🌐 LifeSync – Asisten Digital Pribadi

> *“Hidup lebih teratur, produktif, dan sehat — semua dalam satu aplikasi web sederhana.”*

**LifeSync** adalah aplikasi web interaktif yang dirancang untuk membantu pengguna dalam mengatur aktivitas harian mereka secara efisien.  
Aplikasi ini berfokus pada tiga aspek utama kehidupan sehari-hari: **produktivitas, kesehatan, dan kesadaran waktu**, melalui fitur **Dashboard Harian**, **To-Do List**, **Pengingat Minum Air**, dan **Informasi Cuaca**.  
Tampilan dibuat dengan gaya **modern, responsif, dan mendukung mode gelap (Dark Mode)** agar nyaman digunakan kapan pun.

---

## 🧠 Latar Belakang & Ide Proyek

Di era digital saat ini, banyak orang kesulitan menyeimbangkan aktivitas harian, menjaga kesehatan, serta mengelola waktu.  
**LifeSync** hadir sebagai solusi ringan berbasis web yang bisa diakses dari mana saja tanpa perlu instalasi aplikasi.  

Tujuan proyek ini:
- Membantu pengguna **mencatat dan menyelesaikan tugas** harian dengan lebih teratur.  
- Mendorong kebiasaan **minum air yang cukup** agar tetap sehat.  
- Memberikan **informasi cuaca real-time** agar pengguna bisa menyesuaikan aktivitas luar ruangan.  
- Menyediakan **dashboard personal** yang menyatukan semua fitur penting dalam satu tampilan intuitif.

---

## 🎯 Manfaat Aplikasi

1. **Produktivitas meningkat** karena tugas harian tercatat dan terpantau.  
2. **Kesehatan terjaga** lewat pengingat konsumsi air.  
3. **Efisiensi waktu** karena semua informasi penting tersedia dalam satu halaman.  
4. **Ramah pengguna dan ringan**, tanpa perlu login atau instalasi.  
5. **Privasi aman**, karena semua data disimpan di *localStorage* milik pengguna.

---

## 🧩 Fitur Utama

### 🏠 1. Dashboard Harian
Menampilkan ringkasan cepat aktivitas:
- Jumlah tugas yang selesai.
- Progres minum air.
- Suhu dan kondisi cuaca terkini.
- Tombol pintasan ke fitur utama.

### 📝 2. To-Do List
Kelola kegiatan harian dengan mudah:
- Tambah, edit, centang selesai, dan hapus tugas.  
- Data tersimpan otomatis di *localStorage*.  
- Animasi lembut saat menambah/menghapus tugas.  
- Filter tugas: semua, selesai, dan belum selesai.

### 💧 3. Pengingat Minum Air
Fitur untuk menjaga hidrasi tubuh:
- Input jumlah air yang diminum (ml).  
- Progress bar menunjukkan target harian (misalnya 2000ml).  
- Pengingat otomatis setiap 2 jam.  
- Reset otomatis setiap tengah malam.

### 🌦️ 4. Informasi Cuaca
Membantu pengguna mempersiapkan diri sesuai kondisi lingkungan:
- Dapat mencari cuaca berdasarkan **nama kota**.  
- Menampilkan suhu, kelembapan, dan kondisi langit.  
- Menggunakan **Open-Meteo API** yang gratis dan cepat.  
- Tampilan bergaya *card* dengan ikon cuaca otomatis.

### 🌙 5. Dark Mode
Mode tampilan yang nyaman untuk malam hari:
- Tombol toggle sederhana di pojok atas.  
- Warna, ikon, dan teks menyesuaikan otomatis.  
- Preferensi disimpan di *localStorage*, agar tetap aktif meski browser ditutup.

---

## 🧱 Struktur Proyek

```
Project-TIK/
│
├── index.html             # Halaman utama (Dashboard)
├── todo.html              # Halaman To-Do List
├── water.html             # Halaman Pengingat Minum Air
├── weather.html           # Halaman Cuaca
│
├── css/
│   ├── style.css          # Gaya umum & layout utama
│   ├── darkmode.css       # Tema dark mode
│   └── responsive.css     # Dukungan untuk perangkat kecil
│
├── js/
│   ├── main.js            # Logika dashboard & navigasi
│   ├── todo.js            # Fitur daftar tugas
│   ├── water.js           # Fitur minum air
│   ├── weather.js         # Fitur cuaca (API)
│   └── theme.js           # Sistem dark mode
│
└── assets/
    ├── icons/             # Ikon dari Font Awesome
    ├── images/            # Screenshot & ilustrasi
    └── fonts/             # Font tambahan jika diperlukan
```

---

## 🖥️ Cara Menjalankan Aplikasi

### 🔹 Melalui Browser Online
Kunjungi:
> **https://chaidarurrohman.github.io/Project-TIK/**

### 🔹 Jalankan Secara Lokal
1. Unduh atau clone repository ini:
   ```bash
   git clone https://github.com/chaidarurrohman/Project-TIK.git
   ```
2. Buka folder `Project-TIK`.
3. Klik dua kali **index.html**.
4. Aplikasi akan berjalan otomatis di browser.

---

## ⚙️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|------------|------------|
| **HTML5** | Struktur halaman dan konten |
| **CSS3 (Flexbox + Grid)** | Desain responsif dan animasi |
| **JavaScript (Vanilla JS)** | Logika interaktif, DOM, dan penyimpanan data |
| **LocalStorage API** | Menyimpan data tugas dan pengaturan pengguna |
| **Open-Meteo API** | Mengambil data cuaca berdasarkan lokasi |
| **Font Awesome 6** | Ikon navigasi dan simbol UI |
| **GitHub Pages** | Hosting gratis untuk publikasi proyek |

---

## 📷 Dokumentasi Tampilan

### Dashboard
![Dashboard](57d657f2-9091-42fa-bb3e-a3455e9089ec.png)

### To-Do List
![To-Do List](92e50529-9745-42fe-bcdc-557858369a28.png)

### Pengingat Minum Air
![Minum Air](8db91ff9-41bc-40a4-b2cd-25a19c3cbd66.png)

### Informasi Cuaca
![Cuaca](aa9fda08-963c-40ad-858e-3b4de5d383c1.png)

---

## 🔔 Cara Menggunakan Fitur

| Fitur | Langkah Penggunaan |
|--------|-------------------|
| **To-Do List** | Ketik tugas di kolom input → Tekan Enter → Klik centang jika selesai. |
| **Pengingat Minum Air** | Tekan tombol “+250ml” setiap kali minum → Bar akan naik. |
| **Cuaca** | Masukkan nama kota → Klik “Cek Cuaca” → Data otomatis muncul. |
| **Dark Mode** | Klik ikon bulan/matahari di pojok kanan atas. |

---

## 🧩 Bahasa dan Mode

LifeSync mendukung dua bahasa:  
- 🇮🇩 **Bahasa Indonesia (id)**  
- 🇬🇧 **English (en)**  

Mode dapat diubah melalui tombol bahasa di bagian footer.

---

## 🧠 Rencana Pengembangan (Future Updates)

- [ ] Menambahkan sistem login pengguna.  
- [ ] Menyimpan data di database online (Firebase).  
- [ ] Menambahkan pengingat waktu sholat dan jadwal sekolah.  
- [ ] Integrasi dengan Google Calendar.  
- [ ] Notifikasi suara untuk pengingat minum air.

---

## 👨‍💻 Pengembang

| Nama | Peran | Tahun |
|-------|-------|--------|
| **Chaidarur Rohman** | Perancang, Programmer, dan Desainer UI | 2025 |

> Proyek ini dibuat sebagai bagian dari **Tugas Akhir Mata Pelajaran TIK – Kelas XI RPL**,  
> dengan tujuan meningkatkan kemampuan pembuatan aplikasi berbasis web interaktif.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](https://opensource.org/licenses/MIT).  
Artinya, kamu bebas menggunakan, memodifikasi, dan mendistribusikan ulang kode ini selama mencantumkan kredit pembuat asli.
