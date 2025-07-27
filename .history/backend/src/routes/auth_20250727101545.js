const express = require('express')
const router = express.Router()

// Rota de teste
router.get('/test', (req, res) => {
  res.json({ 
    message: 'TokenVerde API - Rota de autenticação funcionando!',
    timestamp: new Date().toISOString()
  })
})

// Rota de login (placeholder)
router.post('/login', (req, res) => {
  res.json({ 
    message: 'Login endpoint - em desenvolvimento',
    timestamp: new Date().toISOString()
  })
})

// Rota de registro (placeholder)
router.post('/register', (req, res) => {
  res.json({ 
    message: 'Register endpoint - em desenvolvimento',
    timestamp: new Date().toISOString()
  })
})

module.exports = router 