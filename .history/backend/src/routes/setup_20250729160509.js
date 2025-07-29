const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()

const prisma = new PrismaClient()

// Função para executar seed
async function runSeed() {
  try {
    console.log('🌱 Executando seed...')
    const { main } = require('../config/seed-complete')
    await main()
    console.log('✅ Seed concluído com sucesso!')
    return true
  } catch (error) {
    console.error('❌ Erro durante seed:', error)
    return false
  }
}

// Rota para criar tabelas (sem autenticação)
router.post('/create-tables', async (req, res) => {
  try {
    console.log('🔧 Iniciando criação das tabelas...')
    
    // Verificar se tabelas já existem
    const existingTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('users', 'properties', 'green_areas', 'tokens', 'token_holders', 'transactions', 'environmental_reports')
    `
    
    if (existingTables.length > 0) {
      console.log('✅ Tabelas já existem, pulando criação...')
      const seedSuccess = await runSeed()
      return res.json({
        success: true,
        message: '✅ Tabelas já existem!',
        seedSuccess,
        details: {
          existingTables: existingTables.map(t => t.table_name),
          seed: seedSuccess ? '✅ Dados inseridos com sucesso' : '❌ Erro ao inserir dados'
        }
      })
    }
    
    // Criar ENUMs
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'INVESTIDOR', 'PROPERTY_OWNER'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "PropertyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "GreenAreaStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_AUDIT'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "TokenStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PAUSED'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "TransactionType" AS ENUM ('BUY', 'SELL', 'TRANSFER'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    await prisma.$executeRaw`DO $$ BEGIN CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'); EXCEPTION WHEN duplicate_object THEN null; END $$`
    
    console.log('✅ ENUMs criados')
    
    // Criar tabela users
    await prisma.$executeRaw`
      CREATE TABLE "users" (
        "id" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "password" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'INVESTIDOR',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "users_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela properties
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "properties" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "address" TEXT NOT NULL,
        "latitude" DOUBLE PRECISION NOT NULL,
        "longitude" DOUBLE PRECISION NOT NULL,
        "area" DOUBLE PRECISION NOT NULL,
        "matriculaImovel" TEXT,
        "car" TEXT,
        "georreferenciamento" TEXT,
        "status" "PropertyStatus" NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "ownerId" TEXT NOT NULL,
        CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela green_areas
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "green_areas" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "description" TEXT,
        "area" DOUBLE PRECISION NOT NULL,
        "coordinates" JSONB NOT NULL,
        "status" "GreenAreaStatus" NOT NULL DEFAULT 'ACTIVE',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "propertyId" TEXT NOT NULL,
        CONSTRAINT "green_areas_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela tokens
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "tokens" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "symbol" TEXT NOT NULL,
        "totalSupply" INTEGER NOT NULL,
        "price" DOUBLE PRECISION NOT NULL,
        "status" "TokenStatus" NOT NULL DEFAULT 'ACTIVE',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "greenAreaId" TEXT,
        "propertyId" TEXT NOT NULL,
        CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela token_holders
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "token_holders" (
        "id" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "userId" TEXT NOT NULL,
        "tokenId" TEXT NOT NULL,
        CONSTRAINT "token_holders_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela transactions
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "transactions" (
        "id" TEXT NOT NULL,
        "type" "TransactionType" NOT NULL,
        "amount" DOUBLE PRECISION NOT NULL,
        "quantity" INTEGER NOT NULL,
        "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "userId" TEXT NOT NULL,
        "tokenId" TEXT NOT NULL,
        CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
      )
    `
    
    // Criar tabela environmental_reports
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "environmental_reports" (
        "id" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "data" JSONB NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "greenAreaId" TEXT NOT NULL,
        "authorId" TEXT NOT NULL,
        CONSTRAINT "environmental_reports_pkey" PRIMARY KEY ("id")
      )
    `
    
    console.log('✅ Tabelas criadas')
    
    // Criar índices únicos
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email")`
    await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "token_holders_userId_tokenId_key" ON "token_holders"("userId", "tokenId")`
    
    console.log('✅ Índices únicos criados')
    
    // Criar chaves estrangeiras
    await prisma.$executeRaw`ALTER TABLE "properties" ADD CONSTRAINT IF NOT EXISTS "properties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "green_areas" ADD CONSTRAINT IF NOT EXISTS "green_areas_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "tokens" ADD CONSTRAINT IF NOT EXISTS "tokens_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "green_areas"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "tokens" ADD CONSTRAINT IF NOT EXISTS "tokens_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "token_holders" ADD CONSTRAINT IF NOT EXISTS "token_holders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "token_holders" ADD CONSTRAINT IF NOT EXISTS "token_holders_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "transactions" ADD CONSTRAINT IF NOT EXISTS "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "transactions" ADD CONSTRAINT IF NOT EXISTS "transactions_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "environmental_reports" ADD CONSTRAINT IF NOT EXISTS "environmental_reports_greenAreaId_fkey" FOREIGN KEY ("greenAreaId") REFERENCES "green_areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    await prisma.$executeRaw`ALTER TABLE "environmental_reports" ADD CONSTRAINT IF NOT EXISTS "environmental_reports_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE`
    
    console.log('✅ Chaves estrangeiras criadas')
    
    // Executar seed após criar tabelas
    const seedSuccess = await runSeed()
    
    res.json({
      success: true,
      message: '✅ Tabelas criadas com sucesso!',
      seedSuccess,
      details: {
        enums: ['UserRole', 'PropertyStatus', 'GreenAreaStatus', 'TokenStatus', 'TransactionType', 'TransactionStatus'],
        tables: ['users', 'properties', 'green_areas', 'tokens', 'token_holders', 'transactions', 'environmental_reports'],
        indexes: ['users_email_key', 'token_holders_userId_tokenId_key'],
        foreignKeys: 'Todas as chaves estrangeiras configuradas',
        seed: seedSuccess ? '✅ Dados inseridos com sucesso' : '❌ Erro ao inserir dados'
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao criar tabelas:', error)
    res.status(500).json({
      success: false,
      message: '❌ Erro ao criar tabelas',
      error: error.message
    })
  }
})

// Rota para criar apenas o admin
router.post('/create-admin', async (req, res) => {
  try {
    console.log('👤 Criando usuário admin...')
    
    const bcrypt = require('bcryptjs')
    
    // Função para gerar CUID (como o Prisma)
    function generateCUID() {
      const timestamp = Date.now().toString(36)
      const random = Math.random().toString(36).substring(2, 10)
      const counter = Math.floor(Math.random() * 10000).toString(36).padStart(4, '0')
      return `c${timestamp}${counter}${random}`
    }
    
    // Verificar se admin já existe
    const existingAdmin = await prisma.user.findFirst({
      where: { email: 'admin@tokenverde.com' }
    })
    
    if (existingAdmin) {
      return res.json({
        success: true,
        message: '✅ Admin já existe!',
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name,
          role: existingAdmin.role
        }
      })
    }
    
    // Criar admin
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.create({
      data: {
        id: generateCUID(),
        email: 'admin@tokenverde.com',
        password: hashedPassword,
        name: 'Administrador',
        role: 'ADMIN'
      }
    })
    
    console.log('✅ Admin criado com sucesso!')
    
    res.json({
      success: true,
      message: '✅ Admin criado com sucesso!',
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
      credentials: {
        email: 'admin@tokenverde.com',
        password: 'admin123'
      }
    })
    
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error)
    res.status(500).json({
      success: false,
      message: '❌ Erro ao criar admin',
      error: error.message
    })
  }
})

// Rota para verificar status das tabelas
router.get('/check-tables', async (req, res) => {
  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `
    
    const enums = await prisma.$queryRaw`
      SELECT typname 
      FROM pg_type 
      WHERE typtype = 'e'
      ORDER BY typname
    `
    
    res.json({
      success: true,
      tables: tables.map(t => t.table_name),
      enums: enums.map(e => e.typname),
      totalTables: tables.length,
      totalEnums: enums.length
    })
    
  } catch (error) {
    console.error('❌ Erro ao verificar tabelas:', error)
    res.status(500).json({
      success: false,
      message: '❌ Erro ao verificar tabelas',
      error: error.message
    })
  }
})

// Rota para executar apenas o seed
router.post('/run-seed', async (req, res) => {
  try {
    console.log('🌱 Executando seed via rota...')
    const seedSuccess = await runSeed()
    
    if (seedSuccess) {
      res.json({
        success: true,
        message: '✅ Seed executado com sucesso!',
        details: {
          users: '5 usuários criados (admin, investidores, proprietários)',
          properties: '2 propriedades com PDFs',
          greenAreas: '4 áreas verdes',
          tokens: '4 tokens conectados',
          transactions: '8 transações',
          reports: '4 relatórios ambientais'
        }
      })
    } else {
      res.status(500).json({
        success: false,
        message: '❌ Erro ao executar seed'
      })
    }
  } catch (error) {
    console.error('❌ Erro na rota de seed:', error)
    res.status(500).json({
      success: false,
      message: '❌ Erro ao executar seed',
      error: error.message
    })
  }
})

module.exports = router 