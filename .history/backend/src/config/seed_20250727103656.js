const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

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

    // Criar senha criptografada
    const hashedPassword = await bcrypt.hash('admin123456', 10)

    // Criar usuário administrador
    const adminUser = await prisma.user.create({
      data: {
        name: 'Administrador TokenVerde',
        email: 'admin@tokenverde.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('✅ Usuário administrador criado com sucesso!')
    console.log('📧 Email: admin@tokenverde.com')
    console.log('🔑 Senha: admin123456')
    console.log('⚠️  IMPORTANTE: Guarde essas credenciais em local seguro!')

  } catch (error) {
    console.error('❌ Erro ao criar usuário administrador:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser() 