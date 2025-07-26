const express = require('express')
const router = express.Router()

// Listar usuários
router.get('/', (req, res) => {
  res.json({ 
    message: 'Lista de usuários - em desenvolvimento',
    data: [],
    timestamp: new Date().toISOString()
  })
})

// Obter usuário por ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Usuário ${req.params.id} - em desenvolvimento`,
    data: {},
    timestamp: new Date().toISOString()
  })
})

module.exports = router 