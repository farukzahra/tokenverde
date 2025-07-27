const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { body, validationResult } = require('express-validator')

const prisma = new PrismaClient()

// Rota de teste
router.get('/test', (req, res) => {
  res.json({ 
    message: 'TokenVerde API - Rota de autenticação funcionando!',
    timestamp: new Date().toISOString()
  })
})

// Rota de registro
router.post('/register', [
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('role').optional().isIn(['ADMIN', 'INVESTOR', 'PROPERTY_OWNER']).withMessage('Tipo de usuário inválido')
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

    const { name, email, password, role = 'INVESTOR' } = req.body

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email já cadastrado'
      })
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'tokenverde-super-secret-jwt-key-2024',
      { expiresIn: '7d' }
    )

    // Retornar resposta sem a senha
    const { password: _, ...userWithoutPassword } = user

    res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Erro no cadastro:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

// Rota de login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
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

    const { email, password } = req.body

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      })
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      })
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'tokenverde-super-secret-jwt-key-2024',
      { expiresIn: '7d' }
    )

    // Retornar resposta sem a senha
    const { password: _, ...userWithoutPassword } = user

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      token
    })

  } catch (error) {
    console.error('Erro no login:', error)
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    })
  }
})

module.exports = router 