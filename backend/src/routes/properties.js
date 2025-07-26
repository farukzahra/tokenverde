const express = require('express')
const router = express.Router()

// Listar propriedades
router.get('/', (req, res) => {
  res.json({ 
    message: 'Lista de propriedades - em desenvolvimento',
    data: [],
    timestamp: new Date().toISOString()
  })
})

// Obter propriedade por ID
router.get('/:id', (req, res) => {
  res.json({ 
    message: `Propriedade ${req.params.id} - em desenvolvimento`,
    data: {},
    timestamp: new Date().toISOString()
  })
})

module.exports = router 