// controllers/productController.js
const Product = require('../models/Product');

// =============================================================
// 1. HANDLER PUBLIK (API Key Protected)
//    GET /api/v1/products/public
// =============================================================
const getPublicProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-__v'); // Hilangkan field __v

        // Data API Key disematkan di req.apiKey dari middleware (Langkah 3)
        // Periksa keberadaan req.apiKey untuk menghindari error jika middleware diabaikan
        const keyOwner = req.apiKey ? req.apiKey.owner : 'N/A';

        res.status(200).json({
            message: `Daftar Produk berhasil diambil. Akses: API Key (${keyOwner})`,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching public products:', error.message);
        res.status(500).json({ message: 'Gagal mengambil data produk publik.' });
    }
};

// =============================================================
// 2. HANDLER PRIVAT (JWT Protected & Role Based)
// =============================================================

/**
 * Handler untuk membuat produk baru (Akses Privat).
 * POST /api/v1/products/private
 */
const createProduct = async (req, res) => {
    // Data user yang terotentikasi dari token disematkan di req.user (Langkah 5)
    const { id, role } = req.user;

    // Otorisasi Berbasis Peran: Hanya Admin yang Boleh Membuat
    if (role !== 'admin') {
        return res.status(403).json({
            message: `Akses Ditolak: Anda (${role}) tidak memiliki izin untuk membuat produk.`
        });
    }

    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            message: `Produk berhasil dibuat oleh ${role} (ID: ${id})`,
            data: newProduct,
        });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).json({ message: 'Gagal membuat produk.', details: error.message });
    }
};

/**
 * Handler untuk memperbarui produk (Akses Privat).
 * PUT /api/v1/products/private/:id
 */
const updateProduct = async (req, res) => {
    // Otorisasi Berbasis Peran: Hanya Admin yang Boleh Mengedit
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: `Akses Ditolak: Anda (${req.user.role}) tidak memiliki izin untuk mengedit produk.`
        });
    }

    const { id } = req.params;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        }).select('-__v');

        if (!updatedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

        res.status(200).json({
            message: 'Produk berhasil diperbarui.',
            data: updatedProduct
        });
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(400).json({ message: 'Gagal memperbarui produk.', details: error.message });
    }
};

/**
 * Handler untuk menghapus produk (Akses Privat).
 * DELETE /api/v1/products/private/:id
 */
const deleteProduct = async (req, res) => {
    // Otorisasi Berbasis Peran: Hanya Admin yang Boleh Menghapus
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: `Akses Ditolak: Anda (${req.user.role}) tidak memiliki izin untuk menghapus produk.`
        });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Produk tidak ditemukan.' });

        res.status(200).json({ message: 'Produk berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Gagal menghapus produk.' });
    }
};

module.exports = {
    getPublicProducts,
    createProduct,
    updateProduct,
    deleteProduct
};