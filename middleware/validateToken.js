const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateToken = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      next();
    } catch (error) {
      console.error('Token Verification Error:', error.message);
      return res.status(403).json({
        message: 'Akses Ditolak: Token tidak valid atau kedaluwarsa.'
      });
    }
  } else {
    return res.status(403).json({
      message: 'Akses Ditolak: Tidak ada Token Bearer yang ditemukan.'
    });
  }
};

module.exports = validateToken;