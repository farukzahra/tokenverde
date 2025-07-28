const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acesso não fornecido'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tokenverde-super-secret-jwt-key-2024')
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    })
  }
}

module.exports = authMiddleware 