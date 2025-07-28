const express = require('express')
const { PrismaClient } = require('@prisma/client')
const auth = require('../middleware/auth')

const router = express.Router()
const prisma = new PrismaClient()

// Listar tokens
router.get('/', async (req, res) => {
  try {
    const tokens = await prisma.token.findMany({
      include: {
        greenArea: true,
        property: true
      }
    })

    res.json({
      success: true,
      data: tokens,
      message: 'Tokens listados com sucesso'
    })
  } catch (error) {
    console.error('Erro ao listar tokens:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Obter token por ID
router.get('/:id', async (req, res) => {
  try {
    const token = await prisma.token.findUnique({
      where: { id: req.params.id },
      include: {
        greenArea: true,
        property: true
      }
    })

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Token não encontrado'
      })
    }

    res.json({
      success: true,
      data: token,
      message: 'Token encontrado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao buscar token:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Listar token holders (detentores de tokens)
router.get('/holders', auth, async (req, res) => {
  try {
    const tokenHolders = await prisma.tokenHolder.findMany({
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
      data: tokenHolders,
      message: 'Token holders listados com sucesso'
    })
  } catch (error) {
    console.error('Erro ao listar token holders:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Comprar tokens
router.post('/buy', auth, async (req, res) => {
  try {
    const { tokenId, quantity } = req.body
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

    // Verificar se o token está ativo
    if (token.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: 'Token não está disponível para compra'
      })
    }

    // Calcular valor total
    const totalAmount = quantity * token.price

    // Criar transação
    const transaction = await prisma.transaction.create({
      data: {
        type: 'BUY',
        amount: totalAmount,
        quantity,
        status: 'COMPLETED',
        userId,
        tokenId
      }
    })

    // Atualizar ou criar token holder
    const existingHolder = await prisma.tokenHolder.findUnique({
      where: {
        userId_tokenId: {
          userId,
          tokenId
        }
      }
    })

    if (existingHolder) {
      await prisma.tokenHolder.update({
        where: {
          userId_tokenId: {
            userId,
            tokenId
          }
        },
        data: {
          quantity: existingHolder.quantity + quantity
        }
      })
    } else {
      await prisma.tokenHolder.create({
        data: {
          quantity,
          userId,
          tokenId
        }
      })
    }

    res.json({
      success: true,
      data: transaction,
      message: 'Compra realizada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao comprar token:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

module.exports = router 