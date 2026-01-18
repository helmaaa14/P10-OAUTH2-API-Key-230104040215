// seeders/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const ApiKey = require('../models/ApiKey');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI;

// --- Data Inisialisasi ---
const products = [
  { name: 'Laptop Gaming Pro', price: 15000000, stock: 10, description: 'Laptop performa tinggi.' },
  { name: 'Monitor 4K Ultra', price: 5000000, stock: 25, description: 'Monitor dengan resolusi terbaik.' },
  { name: 'Keyboard Mekanik', price: 1500000, stock: 50, description: 'Keyboard dengan switch tactile.' },
  { name: 'Mouse Wireless Ergonomis', price: 500000, stock: 80, description: 'Mouse nyaman untuk pemakaian lama.' },
];

const users = [
  { username: 'admin', password: 'password123', role: 'admin' },
  { username: 'userbiasa', password: 'userpass', role: 'user' },
];

const apiKeys = [
  { key: 'PRACTICUM_API_KEY_A_1234567890', owner: 'Public App Client A', status: 'active' },
  { key: 'PUBLIC_VIEW_ONLY_KEY_B_ABCDEFG', owner: 'Public App Client B', status: 'active' },
];

// --- Fungsi Seeder Utama ---
const seedDB = async () => {
  try {
    // 1. Koneksi ke Database
    await mongoose.connect(MONGODB_URI);
    console.log('--- Koneksi MongoDB Berhasil ---');

    // 2. Hapus Data Lama
    await Product.deleteMany();
    await User.deleteMany();
    await ApiKey.deleteMany();
    console.log('--- Data Lama (Products, Users, API Keys) Berhasil Dihapus ---');

    // 3. Masukkan Data Produk
    await Product.insertMany(products);
    console.log(`[+] Produk (${products.length} item) berhasil dimasukkan.`);

    // 4. Masukkan Data User (Memastikan Hashing Terjadi menggunakan .save())
    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // PENTING: .save() akan memicu hook pre('save')
    }
    console.log(`[+] User (${users.length} item) berhasil dimasukkan (Password telah di-hash).`);

    // 5. Masukkan Data API Key
    await ApiKey.insertMany(apiKeys);
    console.log(`[+] API Key (${apiKeys.length} item) berhasil dimasukkan.`);

    console.log('\n✅ Proses Seeding Database Berhasil! Semua data siap. ✅');

  } catch (error) {
    console.error('\n❌ GAGAL dalam proses Seeding:', error.message);
    console.error('Penyebab: Periksa URI di .env, atau masalah di hook User Model (next is not a function).');
    process.exit(1);
  } finally {
    // 6. Tutup koneksi
    await mongoose.connection.close();
  }
};

seedDB();