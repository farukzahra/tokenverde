const express = require('express')
const { PrismaClient } = require('@prisma/client')
const router = express.Router()

const prisma = new PrismaClient()

// Rota para criar tabelas (sem autenticação)
router.post('/create-tables', async (req, res) => {
  try {
    console.log('🔧 Iniciando criação das tabelas...')
    
    // Criar ENUMs
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "UserRole" AS ENUM ('ADMIN', 'INVESTIDOR', 'PROPERTY_OWNER')`
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "PropertyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE')`
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "GreenAreaStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_AUDIT')`
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "TokenStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PAUSED')`
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "TransactionType" AS ENUM ('BUY', 'SELL', 'TRANSFER')`
    await prisma.$executeRaw`CREATE TYPE IF NOT EXISTS "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED')`
    
    console.log('✅ ENUMs criados')
    
    // Criar tabela users
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
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
    
    res.json({
      success: true,
      message: '✅ Tabelas criadas com sucesso!',
      details: {
        enums: ['UserRole', 'PropertyStatus', 'GreenAreaStatus', 'TokenStatus', 'TransactionType', 'TransactionStatus'],
        tables: ['users', 'properties', 'green_areas', 'tokens', 'token_holders', 'transactions', 'environmental_reports'],
        indexes: ['users_email_key', 'token_holders_userId_tokenId_key'],
        foreignKeys: 'Todas as chaves estrangeiras configuradas'
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

module.exports = router 