const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Listar transações
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        token: {
          include: {
            greenArea: true,
            property: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    res.json({
      success: true,
      data: transactions,
      message: 'Transações listadas com sucesso'
    })
  } catch (error) {
    console.error('Erro ao listar transações:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Obter transação por ID
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        token: {
          include: {
            greenArea: true,
            property: true
          }
        }
      }
    })

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transação não encontrada'
      })
    }

    res.json({
      success: true,
      data: transaction,
      message: 'Transação encontrada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao buscar transação:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Criar nova transação
router.post('/', auth, async (req, res) => {
  try {
    const { tokenId, type, quantity, amount } = req.body
    const userId = req.user.id

    // Verificar se o token existe
    const token = await prisma.token.findUnique({
      where: { id: tokenId }
    })

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token não encontrado'
      })
    }

    // Criar transação
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        quantity,
        status: 'COMPLETED',
        userId,
        tokenId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        token: {
          include: {
            greenArea: true,
            property: true
          }
        }
      }
    })

    res.json({
      success: true,
      data: transaction,
      message: 'Transação criada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao criar transação:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

module.exports = router 