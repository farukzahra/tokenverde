const express = require('express')
const router = express.Router()

// Listar transações
router.get('/', (req, res) => {
  res.json({ 
    message: 'Lista de transações - em desenvolvimento',
    data: [],
    timestamp: new Date().toISOString()
  })
})

// Obter transação por ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Transação ${req.params.id} - em desenvolvimento`,
    data: {},
    timestamp: new Date().toISOString()
  })
})

module.exports = router 