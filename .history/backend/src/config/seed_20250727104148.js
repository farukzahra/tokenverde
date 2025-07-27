const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      console.log('✅ Usuário administrador já existe!')
      return
    }

    // Pegar credenciais do .env
    const adminPassword = process.env.ADMIN_PASSWORD
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminPassword || !adminEmail) {
      console.log('❌ Erro: ADMIN_PASSWORD e ADMIN_EMAIL devem estar configurados no .env')
      console.log('📝 Exemplo no .env:')
      console.log('ADMIN_EMAIL=admin@tokenverde.com')
      console.log('ADMIN_PASSWORD=sua_senha_segura')
      return
    }

    // Criar senha criptografada
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Criar usuário administrador
    const adminUser = await prisma.user.create({
      data: {
        name: 'Administrador TokenVerde',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('✅ Usuário administrador criado com sucesso!')
    console.log(`📧 Email: ${adminEmail}`)
    console.log(`🔑 Senha: ${adminPassword}`)
    console.log('⚠️  IMPORTANTE: Guarde essas credenciais em local seguro!')

  } catch (error) {
    console.error('❌ Erro ao criar usuário administrador:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser() 