const express = require('express')
const router = express.Router()

// Listar tokens
router.get('/', (req, res) => {
  res.json({ 
    message: 'Lista de tokens - em desenvolvimento',
    data: [],
    timestamp: new Date().toISOString()
  })
})

// Obter token por ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Token ${req.params.id} - em desenvolvimento`,
    data: {},
    timestamp: new Date().toISOString()
  })
})

module.exports = router 