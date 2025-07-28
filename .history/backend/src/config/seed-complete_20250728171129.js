const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const prisma = new PrismaClient()

// Função para limpar todas as tabelas
async function clearDatabase() {
  console.log('🧹 Limpando banco de dados...')
  
  const tables = [
    'environmental_reports',
    'transactions', 
    'token_holders',
    'tokens',
    'green_areas',
    'properties',
    'users'
  ]

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`)
  }
  
  console.log('✅ Banco de dados limpo!')
}

// Criar usuários
async function createUsers() {
  console.log('👥 Criando usuários...')
  
  const users = [
    {
      name: process.env.ADMIN_NAME || 'Administrador TokenVerde',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'ADMIN'
    },
    {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      password: process.env.INVESTOR_PASSWORD || 'investor123',
      role: 'INVESTIDOR'
    },
    {
      name: 'Maria Santos',
      email: 'maria.santos@email.com', 
      password: process.env.OWNER_PASSWORD || 'owner123',
      role: 'PROPERTY_OWNER'
    },
    {
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@email.com',
      password: process.env.INVESTOR2_PASSWORD || 'investor456',
      role: 'INVESTIDOR'
    },
    {
      name: 'Ana Costa',
      email: 'ana.costa@email.com',
      password: process.env.OWNER2_PASSWORD || 'owner456', 
      role: 'PROPERTY_OWNER'
    }
  ]

  const createdUsers = []
  
  for (const userData of users) {
    if (!userData.password || !userData.email) {
      console.log(`⚠️  Pulando usuário ${userData.name} - credenciais não configuradas`)
      continue
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    
    const user = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role
      }
    })
    
    createdUsers.push(user)
    console.log(`✅ Usuário criado: ${user.name} (${user.role})`)
  }

  return createdUsers
}

// Criar propriedades
async function createProperties(users) {
  console.log('🏡 Criando propriedades...')
  
  const propertyOwners = users.filter(u => u.role === 'PROPERTY_OWNER')
  const properties = []
  
  // Ler arquivo PDF de teste
  const pdfPath = path.join(__dirname, '../../test.pdf')
  let pdfBase64 = null
  
  try {
    const pdfBuffer = fs.readFileSync(pdfPath)
    pdfBase64 = pdfBuffer.toString('base64')
    console.log('✅ Arquivo PDF carregado com sucesso')
  } catch (error) {
    console.log('⚠️  Arquivo PDF não encontrado, criando propriedades sem anexo')
  }
  
  for (let i = 0; i < propertyOwners.length; i++) {
    const owner = propertyOwners[i]
    
    const property = await prisma.property.create({
      data: {
        name: `Fazenda ${owner.name}`,
        description: `Propriedade rural de ${owner.name} com foco em preservação ambiental`,
        address: `Rodovia BR-${100 + i}, Km ${50 + i}, Zona Rural`,
        latitude: -23.5505 + (i * 0.01),
        longitude: -46.6333 + (i * 0.01),
        area: 150.0 + (i * 25),
        status: 'PENDING',
        ownerId: owner.id,
        matriculaImovel: pdfBase64,
        car: pdfBase64,
        georreferenciamento: pdfBase64
      }
    })
    
    properties.push(property)
    console.log(`✅ Propriedade criada: ${property.name}`)
  }

  return properties
}

// Criar áreas verdes
async function createGreenAreas(properties) {
  console.log('🌳 Criando áreas verdes...')
  
  const greenAreas = []
  
  for (const property of properties) {
    const areas = [
      {
        name: 'Reserva Legal',
        description: 'Área de reserva legal conforme Código Florestal',
        area: property.area * 0.2,
        coordinates: [
          { lat: property.latitude, lng: property.longitude },
          { lat: property.latitude + 0.01, lng: property.longitude },
          { lat: property.latitude + 0.01, lng: property.longitude + 0.01 },
          { lat: property.latitude, lng: property.longitude + 0.01 }
        ],
        status: 'ACTIVE'
      },
      {
        name: 'Área de Preservação Permanente',
        description: 'APP ao longo de cursos d\'água',
        area: property.area * 0.15,
        coordinates: [
          { lat: property.latitude + 0.005, lng: property.longitude + 0.005 },
          { lat: property.latitude + 0.015, lng: property.longitude + 0.005 },
          { lat: property.latitude + 0.015, lng: property.longitude + 0.015 },
          { lat: property.latitude + 0.005, lng: property.longitude + 0.015 }
        ],
        status: 'ACTIVE'
      }
    ]

    for (const areaData of areas) {
      const greenArea = await prisma.greenArea.create({
        data: {
          ...areaData,
          propertyId: property.id
        }
      })
      
      greenAreas.push(greenArea)
      console.log(`✅ Área verde criada: ${greenArea.name} em ${property.name}`)
    }
  }

  return greenAreas
}

// Criar tokens
async function createTokens(properties) {
  console.log('🪙 Criando tokens...')
  
  const tokens = []
  
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    
    // Buscar áreas verdes da propriedade
    const greenAreas = await prisma.greenArea.findMany({
      where: { propertyId: property.id }
    })
    
    if (greenAreas.length > 0) {
      // Criar token para cada área verde
      for (const greenArea of greenAreas) {
        const token = await prisma.token.create({
          data: {
            name: `Token Verde ${property.name} - ${greenArea.name}`,
            symbol: `TGV${i + 1}${greenArea.id.slice(-4)}`,
            totalSupply: Math.floor(greenArea.area * 1000),
            price: 10.0 + (i * 2.5),
            status: 'ACTIVE',
            greenAreaId: greenArea.id,
            propertyId: property.id
          }
        })
        
        tokens.push(token)
        console.log(`✅ Token criado: ${token.symbol} - ${token.name}`)
      }
    } else {
      // Se não há áreas verdes, criar token genérico
      const token = await prisma.token.create({
        data: {
          name: `Token Verde ${property.name}`,
          symbol: `TGV${i + 1}`,
          totalSupply: Math.floor(property.area * 1000),
          price: 10.0 + (i * 2.5),
          status: 'ACTIVE',
          propertyId: property.id
        }
      })
      
      tokens.push(token)
      console.log(`✅ Token criado: ${token.symbol} - ${token.name}`)
    }
  }

  return tokens
}

// Criar detentores de tokens
async function createTokenHolders(tokens, users) {
  console.log('👤 Criando detentores de tokens...')
  
  const investors = users.filter(u => u.role === 'INVESTIDOR')
  
  for (const token of tokens) {
    for (const investor of investors) {
      const quantity = Math.floor(Math.random() * 100) + 10
      
      await prisma.tokenHolder.create({
        data: {
          quantity,
          userId: investor.id,
          tokenId: token.id
        }
      })
      
      console.log(`✅ ${investor.name} possui ${quantity} tokens ${token.symbol}`)
    }
  }
}

// Criar transações
async function createTransactions(users, tokens) {
  console.log('💱 Criando transações...')
  
  const investors = users.filter(u => u.role === 'INVESTIDOR')
  
  for (const token of tokens) {
    for (const investor of investors) {
      const quantity = Math.floor(Math.random() * 50) + 5
      const amount = quantity * token.price
      
      await prisma.transaction.create({
        data: {
          type: 'BUY',
          amount,
          quantity,
          status: 'COMPLETED',
          userId: investor.id,
          tokenId: token.id
        }
      })
      
      console.log(`✅ Transação: ${investor.name} comprou ${quantity} ${token.symbol}`)
    }
  }
}

// Criar relatórios ambientais
async function createEnvironmentalReports(greenAreas, users) {
  console.log('📊 Criando relatórios ambientais...')
  
  const admins = users.filter(u => u.role === 'ADMIN')
  
  for (const greenArea of greenAreas) {
    const admin = admins[0]
    
    const report = await prisma.environmentalReport.create({
      data: {
        title: `Relatório Ambiental - ${greenArea.name}`,
        description: `Relatório detalhado sobre a situação ambiental da área ${greenArea.name}`,
        data: {
          biodiversidade: {
            especies_identificadas: Math.floor(Math.random() * 50) + 20,
            ameacadas: Math.floor(Math.random() * 5) + 1
          },
          carbono: {
            sequestrado_toneladas: Math.floor(greenArea.area * 100),
            potencial_sequestro: Math.floor(greenArea.area * 150)
          },
          qualidade_agua: 'Boa',
          qualidade_solo: 'Excelente',
          recomendacoes: [
            'Manter monitoramento contínuo',
            'Implementar sistema de irrigação',
            'Realizar reflorestamento em áreas degradadas'
          ]
        },
        greenAreaId: greenArea.id,
        authorId: admin.id
      }
    })
    
    console.log(`✅ Relatório criado: ${report.title}`)
  }
}

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')
  
  // Verificar se já existem usuários no banco
  const existingUsers = await prisma.user.count()
  
  if (existingUsers > 0) {
    console.log('✅ Banco já possui dados. Pulando seed...')
    return
  }
  
  console.log('📝 Banco vazio. Executando seed...')
  
  try {
    // Criar usuários
    const users = await createUsers()
    
    // Criar propriedades
    const properties = await createProperties(users)
    
    // Criar áreas verdes
    const greenAreas = await createGreenAreas(properties)
    
    // Criar tokens
    const tokens = await createTokens(properties)
    
    // Criar detentores de tokens
    await createTokenHolders(tokens, users)
    
    // Criar transações
    await createTransactions(users, tokens)
    
    // Criar relatórios ambientais
    await createEnvironmentalReports(greenAreas, users)
    
    console.log('🎉 Seed concluído com sucesso!')
  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main()
}

module.exports = { main } 