const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Verificar e executar seed se necessário
async function checkAndSeedDatabase() {
  try {
    // Primeiro, garantir que as tabelas existem
    console.log('🔧 Verificando estrutura do banco...')
    await prisma.$executeRaw`SELECT 1`
    console.log('✅ Conexão com banco estabelecida')
    
    const userCount = await prisma.user.count()
    if (userCount === 0) {
      console.log('🌱 Banco vazio detectado. Executando seed...')
      const { main } = require('./config/seed-complete')
      await main()
    } else {
      console.log('✅ Banco já possui dados.')
    }
  } catch (error) {
    console.error('❌ Erro ao verificar/executar seed:', error)
    console.error('Detalhes do erro:', error.message)
  }
}

// Rotas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/properties', require('./routes/properties'))
app.use('/api/tokens', require('./routes/tokens'))
app.use('/api/transactions', require('./routes/transactions'))

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'TokenVerde API', 
    version: '1.0.0',
    status: 'running'
  })
})

// Inicializar servidor
async function startServer() {
  try {
    // Verificar e executar seed se necessário
    await checkAndSeedDatabase()
    
    app.listen(PORT, () => {
      console.log(`🚀 TokenVerde API running on port ${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error)
    process.exit(1)
  }
}

startServer()

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('🔄 SIGINT received, shutting down gracefully')
  await prisma.$disconnect()
  process.exit(0)
}) 