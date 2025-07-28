const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
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
      role: 'INVESTOR'
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
      role: 'INVESTOR'
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
        status: 'APPROVED',
        ownerId: owner.id
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
async function createTokens(greenAreas, properties) {
  console.log('🪙 Criando tokens...')
  
  const tokens = []
  
  for (let i = 0; i < greenAreas.length; i++) {
    const greenArea = greenAreas[i]
    const property = properties.find(p => p.id === greenArea.propertyId)
    
    const token = await prisma.token.create({
      data: {
        name: `Token Verde ${property.name} - ${greenArea.name}`,
        symbol: `TGV${i + 1}`,
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

  return tokens
}

// Criar detentores de tokens
async function createTokenHolders(tokens, users) {
  console.log('👤 Criando detentores de tokens...')
  
  const investors = users.filter(u => u.role === 'INVESTOR')
  
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
async function createTransactions(tokens, users) {
  console.log('💱 Criando transações...')
  
  const investors = users.filter(u => u.role === 'INVESTOR')
  
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

// Função principal
async function seedDatabase() {
  try {
    console.log('🚀 Iniciando seed completo do banco de dados...')
    
    // Limpar banco
    await clearDatabase()
    
    // Criar dados
    const users = await createUsers()
    const properties = await createProperties(users)
    const greenAreas = await createGreenAreas(properties)
    const tokens = await createTokens(greenAreas, properties)
    await createTokenHolders(tokens, users)
    await createTransactions(tokens, users)
    await createEnvironmentalReports(greenAreas, users)
    
    console.log('\n🎉 Seed completo finalizado com sucesso!')
    console.log('\n📊 Resumo:')
    console.log(`👥 Usuários: ${users.length}`)
    console.log(`🏡 Propriedades: ${properties.length}`)
    console.log(`🌳 Áreas verdes: ${greenAreas.length}`)
    console.log(`🪙 Tokens: ${tokens.length}`)
    
    console.log('\n🔑 Credenciais de acesso:')
    console.log(`Admin: ${process.env.ADMIN_EMAIL} / ${process.env.ADMIN_PASSWORD}`)
    console.log(`Investor: joao.silva@email.com / ${process.env.INVESTOR_PASSWORD || 'investor123'}`)
    console.log(`Owner: maria.santos@email.com / ${process.env.OWNER_PASSWORD || 'owner123'}`)
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase } 