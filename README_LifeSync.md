
# 🌐 LifeSync – Asisten Digital Pribadi


**LifeSync** adalah aplikasi web interaktif yang dirancang untuk membantu pengguna dalam mengatur aktivitas harian secara efisien.  
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
- Input jumlah air yang diminum (Pergelas).  
- Progress bar menunjukkan target harian (misalnya 8 Gelas atau 2000ml).  
- Pengingat otomatis setiap 2 jam.  
- Reset otomatis setiap tengah malam.

### 🌦️ 4. Informasi Cuaca
Membantu pengguna mempersiapkan diri sesuai kondisi lingkungan:
- Dapat mencari cuaca berdasarkan **nama kota**.  
- Menampilkan suhu, kecepatan angin, dan kode cuaca.  
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
├── index.html   # Halaman utama (Dashboard)
|                # Halaman To-Do List
|                # Halaman Pengingat Minum Air
|                # Halaman Cuaca
│
├── style.css    # Gaya umum & layout utama
│                # Tema dark mode
│                # Dukungan untuk perangkat kecil
│
└── script.js    # Logika dashboard & navigasi
                 # Fitur daftar tugas
                 # Fitur minum air
                 # Fitur cuaca (API)
                 # Sistem dark mode

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
| **HTML** | Struktur halaman dan konten |
| **CSS** | Desain responsif dan animasi |
| **JavaScript** | Logika interaktif, DOM, dan penyimpanan data |
| **LocalStorage API** | Menyimpan data tugas dan pengaturan pengguna |
| **Open-Meteo API** | Mengambil data cuaca berdasarkan lokasi |
| **Font Awesome 6** | Ikon navigasi dan simbol UI |
| **GitHub Pages** | Hosting gratis untuk publikasi proyek |

---

## 🔔 Cara Menggunakan Fitur

| Fitur | Langkah Penggunaan |
|--------|-------------------|
| **To-Do List** | Ketik tugas di kolom input → Tekan Tambah → Klik centang jika selesai. |
| **Pengingat Minum Air** | Tekan tombol “+ 1 gelas" setiap kali minum → Bar akan naik. |
| **Cuaca** | Masukkan nama kota → Klik “Cari” → Data otomatis muncul. |
| **Dark Mode** | Klik ikon bulan/matahari di pojok kanan atas. |

---
