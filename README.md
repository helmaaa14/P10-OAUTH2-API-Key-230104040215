# P10-OAUTH2-API-Key-230104040222
P10-WSE-230104040222

# Simulasi Keamanan API: API Key & OAuth 2.0 (JWT)

Proyek ini adalah implementasi sistem manajemen produk sederhana yang menerapkan dua level keamanan: **API Key** untuk akses publik (Read-Only) dan **JWT (JSON Web Token)** untuk simulasi alur otorisasi privat (CRUD) berbasis peran (*Role-Based Access Control*).

## 👤 Informasi Penulis

* **Nama:** Achmad Fauzil 'Adhim
* **NIM:** 230104040222
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
└── server.js         # Entry point aplikasi utama

```

---

## ⚙️ Instalasi dan Persiapan

1. **Clone & Install Dependencies:**
```bash
npm install

```


2. **Konfigurasi Variabel Lingkungan (`.env`):**
Buat file `.env` di direktori root dan sesuaikan kredensial MongoDB Atlas kamu:


```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/p10_simulator_db
JWT_SECRET=rahasia-super-aman-simulasi-jwt

```


3. **Seeding Database:**
Jalankan perintah berikut untuk mengisi data awal (Admin, User, API Key, dan Produk):


```bash
node seeders/seed.js

```


4. **Menjalankan Server:**
```bash
node server.js

```



---

## 📑 Dokumentasi API

### 1. Akses Publik

| Method | Endpoint | Auth | Deskripsi |
| --- | --- | --- | --- |
| GET | `/api/v1/products/public` | API Key | Mengambil semua produk (Read-Only).|

### 2. Autentikasi (Token Grant)

| Method | Endpoint | Body (JSON) | Deskripsi |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/token` | `username`, `password` | Login untuk mendapatkan Access Token (JWT).|

### 3. Akses Privat (Otorisasi Admin)

| Method | Endpoint | Auth | Status Diharapkan |
| --- | --- | --- | --- |
| POST | `/api/v1/products/private` | Bearer Token | 201 Created (Hanya Admin).|
| PUT | `/api/v1/products/private/:id` | Bearer Token | 200 OK (Hanya Admin).|
| DELETE | `/api/v1/products/private/:id` | Bearer Token | 200 OK (Hanya Admin).|

---

## 🧪 Skenario Pengujian Menyeluruh

Berdasarkan hasil praktikum, sistem ini telah lolos pengujian skenario berikut:

* **Gagal (401 Unauthorized):** Akses publik tanpa API Key atau API Key palsu.


* **Gagal (403 Forbidden):** Akses privat tanpa Token, Token palsu, atau Login sebagai `userbiasa` saat mencoba operasi CRUD.


* **Sukses (200 OK / 201 Created):** Akses privat menggunakan Token Admin yang valid.
