// Definir variável de ambiente diretamente
process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/tokenverde_db"

const { Client } = require('pg')

async function checkData() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    console.log('🔍 Verificando dados no banco...')
    await client.connect()
    
    // Verificar usuários
    const users = await client.query('SELECT id, name, email, role FROM "User"')
    console.log('\n👥 Usuários encontrados:', users.rows.length)
    users.rows.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`)
    })
    
    // Verificar propriedades
    const properties = await client.query('SELECT id, name, status, "ownerId" FROM "Property"')
    console.log('\n🏠 Propriedades encontradas:', properties.rows.length)
    properties.rows.forEach(prop => {
      console.log(`  - ${prop.name} (${prop.status})`)
    })
    
    // Verificar áreas verdes
    const greenAreas = await client.query('SELECT id, name, type, status FROM "GreenArea"')
    console.log('\n🌳 Áreas verdes encontradas:', greenAreas.rows.length)
    greenAreas.rows.forEach(area => {
      console.log(`  - ${area.name} (${area.type}) - ${area.status}`)
    })
    
    // Verificar tokens
    const tokens = await client.query('SELECT id, name, symbol, status FROM "Token"')
    console.log('\n🪙 Tokens encontrados:', tokens.rows.length)
    tokens.rows.forEach(token => {
      console.log(`  - ${token.name} (${token.symbol}) - ${token.status}`)
    })

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error)
  } finally {
    await client.end()
  }
}

checkData() 