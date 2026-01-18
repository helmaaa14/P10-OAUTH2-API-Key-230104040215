// routes/productRoutes.js
const express = require('express');
const {
    getPublicProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Import Middlewares
const validateApiKey = require('../middleware/validateApiKey'); // Langkah 3
const validateToken = require('../middleware/validateToken'); // Langkah 5

const router = express.Router();

// --- ROUTE PUBLIK: Akses Read-Only (Dilindungi API Key) ---
// Endpoint: GET /api/v1/products/public
router.get('/public', validateApiKey, getPublicProducts);

// --- ROUTE PRIVAT: Akses CRUD (Dilindungi JWT / Bearer Token) ---
// Endpoint-endpoint ini memerlukan otentikasi (JWT) dan otorisasi (Role Admin, di dalam controller)

// CREATE Product
router.post('/private', validateToken, createProduct);

// UPDATE Product
router.put('/private/:id', validateToken, updateProduct);

// DELETE Product
router.delete('/private/:id', validateToken, deleteProduct);

module.exports = router;