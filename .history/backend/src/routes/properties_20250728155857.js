const express = require('express')
const router = express.Router()
const multer = require('multer')
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth')

const prisma = new PrismaClient()

// Aplicar middleware de autenticação em todas as rotas
// router.use(authMiddleware) // Temporarily commented out for debugging

// Test route to verify routing is working
router.get('/test', (req, res) => {
  res.json({ message: 'Properties route is working' })
})

// Configuração do Multer para upload de PDFs (memória)
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Apenas arquivos PDF são permitidos'), false)
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
})

// Listar propriedades
router.get('/', async (req, res) => {
  try {
    const { status, ownerId } = req.query
    
    // Construir filtros
    const where = {}
    if (status) where.status = status
    if (ownerId) where.ownerId = ownerId

    const properties = await prisma.property.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        greenAreas: true,
        tokens: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({
      success: true,
      data: properties
    })
  } catch (error) {
    console.error('Erro ao listar propriedades:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Obter propriedade por ID
router.get('/:id', async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        greenAreas: true,
        tokens: true
      }
    })

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propriedade não encontrada'
      })
    }

    res.json({
      success: true,
      data: property
    })
  } catch (error) {
    console.error('Erro ao buscar propriedade:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Criar propriedade com upload de PDFs
router.post('/', upload.fields([
  { name: 'matriculaImovel', maxCount: 1 },
  { name: 'car', maxCount: 1 },
  { name: 'georreferenciamento', maxCount: 1 }
]), [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('address').notEmpty().withMessage('Endereço é obrigatório'),
  body('latitude').isFloat().withMessage('Latitude deve ser um número'),
  body('longitude').isFloat().withMessage('Longitude deve ser um número'),
  body('area').isFloat().withMessage('Área deve ser um número'),
  body('ownerId').notEmpty().withMessage('ID do proprietário é obrigatório')
], async (req, res) => {
  try {
    // Validar dados de entrada
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      })
    }

    const { name, description, address, latitude, longitude, area, ownerId } = req.body

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: ownerId }
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Usuário proprietário não encontrado'
      })
    }

    // Processar arquivos PDF como Base64
    const files = req.files
    const matriculaImovel = files.matriculaImovel ? files.matriculaImovel[0].buffer.toString('base64') : null
    const car = files.car ? files.car[0].buffer.toString('base64') : null
    const georreferenciamento = files.georreferenciamento ? files.georreferenciamento[0].buffer.toString('base64') : null

    // Criar propriedade
    const property = await prisma.property.create({
      data: {
        name,
        description,
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        area: parseFloat(area),
        matriculaImovel,
        car,
        georreferenciamento,
        ownerId
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    res.status(201).json({
      success: true,
      message: 'Propriedade criada com sucesso',
      data: property
    })

  } catch (error) {
    console.error('Erro ao criar propriedade:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Atualizar status da propriedade (apenas admin)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const propertyId = req.params.id

    // Verificar se o usuário é admin
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas administradores podem alterar status.'
      })
    }

    // Verificar se a propriedade existe
    const existingProperty = await prisma.property.findUnique({
      where: { id: propertyId }
    })

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Propriedade não encontrada'
      })
    }

    // Atualizar status
    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: { status },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    res.json({
      success: true,
      data: updatedProperty,
      message: `Status da propriedade atualizado para ${status}`
    })
  } catch (error) {
    console.error('Erro ao atualizar status da propriedade:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Atualizar propriedade
router.put('/:id', upload.fields([
  { name: 'matriculaImovel', maxCount: 1 },
  { name: 'car', maxCount: 1 },
  { name: 'georreferenciamento', maxCount: 1 }
]), async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, address, latitude, longitude, area } = req.body

    // Verificar se a propriedade existe
    const existingProperty = await prisma.property.findUnique({
      where: { id }
    })

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: 'Propriedade não encontrada'
      })
    }

    // Processar arquivos PDF como Base64 (apenas se enviados)
    const files = req.files
    const updateData = {
      name,
      description,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      area: parseFloat(area)
    }

    if (files.matriculaImovel) {
      updateData.matriculaImovel = files.matriculaImovel[0].buffer.toString('base64')
    }
    if (files.car) {
      updateData.car = files.car[0].buffer.toString('base64')
    }
    if (files.georreferenciamento) {
      updateData.georreferenciamento = files.georreferenciamento[0].buffer.toString('base64')
    }

    const property = await prisma.property.update({
      where: { id },
      data: updateData,
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    res.json({
      success: true,
      message: 'Propriedade atualizada com sucesso',
      data: property
    })

  } catch (error) {
    console.error('Erro ao atualizar propriedade:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Deletar propriedade
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // Verificar se a propriedade existe
    const property = await prisma.property.findUnique({
      where: { id }
    })

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Propriedade não encontrada'
      })
    }

    // Deletar propriedade (PDFs são deletados automaticamente com o registro)
    await prisma.property.delete({
      where: { id }
    })

    res.json({
      success: true,
      message: 'Propriedade deletada com sucesso'
    })

  } catch (error) {
    console.error('Erro ao deletar propriedade:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

module.exports = router 