# P10-OAUTH2-API-Key-230104040215
P10-WSE-230104040215

# Simulasi Keamanan API: API Key & OAuth 2.0 (JWT)

Proyek ini adalah implementasi sistem manajemen produk sederhana yang menerapkan dua level keamanan: **API Key** untuk akses publik (Read-Only) dan **JWT (JSON Web Token)** untuk simulasi alur otorisasi privat (CRUD) berbasis peran (*Role-Based Access Control*).

## 👤 Informasi Penulis

* **Nama:** Helma Afifah
* **NIM:** 230104040215
* **Mata Kuliah:** Web Service Engineering (P10)

---

## 🚀 Fitur Utama

1. **Akses Publik (API Key):** Memungkinkan aplikasi pihak ketiga untuk melihat daftar produk menggunakan header `x-api-key`.
2. **Akses Privat (OAuth 2.0/JWT):** Mengamankan operasi sensitif (Tambah, Edit, Hapus) menggunakan *Bearer Token*.
3. **Otorisasi Berbasis Peran:** Membedakan hak akses antara `admin` (akses penuh) dan `user` biasa (akses terbatas).
4. **Keamanan Password:** Implementasi *hashing* otomatis menggunakan `bcryptjs` sebelum data disimpan ke database.

---

## 🛠️ Teknologi yang Digunakan

* **Runtime:** Node.js 
* **Framework:** Express.js 
* **Database:** MongoDB Atlas (Mongoose ODM) 
* **Autentikasi:** JSON Web Tokens (JWT) & API Key 
* **Security:** bcryptjs (Password Hashing) 

---

## 📂 Struktur Proyek

```text
├── controllers/      # Logika handler untuk auth dan produk 
├── middleware/       # Validasi API Key dan JWT
├── models/           # Skema Mongoose (User, Product, ApiKey)
├── routes/           # Definisi endpoint API
├── seeders/          # Script untuk mengisi data awal database
├── utils/            # Fungsi utilitas (Generate Token)
├── .env              # Konfigurasi variabel lingkungan
└── server.js          # Entry point aplikasi utama
