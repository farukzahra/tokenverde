// Definir variável de ambiente diretamente
process.env.DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/tokenverde_db"

const { Client } = require('pg')
const fs = require('fs')
const path = require('path')

async function runSeedDirect() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  })

  try {
    console.log('🚀 Conectando ao banco de dados...')
    console.log('🔗 DATABASE_URL:', process.env.DATABASE_URL)
    await client.connect()
    console.log('✅ Conectado com sucesso!')

    // Ler o arquivo SQL
    const sqlPath = path.join(__dirname, 'seed.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    console.log('📝 Executando script SQL...')
    await client.query(sqlContent)
    
    console.log('✅ Seed executado com sucesso!')
    console.log('\n📋 Dados inseridos:')
    console.log('👥 5 usuários (Admin, 2 Proprietários, 2 Investidores)')
    console.log('🏠 3 propriedades com diferentes status')
    console.log('🌳 3 áreas verdes associadas às propriedades')
    console.log('🪙 2 tokens representando as propriedades')
    
    console.log('\n🔑 Credenciais de acesso:')
    console.log('Admin: admin@tokenverde.com / admin123456')
    console.log('Proprietário 1: joao.silva@email.com / 123456')
    console.log('Proprietário 2: maria.santos@email.com / 123456')
    console.log('Investidor 1: carlos.investidor@email.com / 123456')
    console.log('Investidor 2: ana.investidora@email.com / 123456')

  } catch (error) {
    console.error('❌ Erro ao executar seed:', error)
  } finally {
    await client.end()
  }
}

runSeedDirect() 