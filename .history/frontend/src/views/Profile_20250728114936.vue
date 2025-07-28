<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Meu Perfil</h1>
      </div>

      <!-- Informações do Usuário -->
      <div class="max-w-2xl">
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Nome</label>
              <p class="text-gray-900">{{ user.name }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <p class="text-gray-900">{{ user.email }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
              <p class="text-gray-900">{{ getUserRoleLabel(user.role) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Membro desde</label>
              <p class="text-gray-900">{{ formatDate(user.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const user = reactive({})
const loading = ref(false)

onMounted(async () => {
  // Verificar se o usuário está logado
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  if (!userData.id) {
    router.push('/login')
    return
  }

  // Carregar dados do usuário
  Object.assign(user, userData)


})



const getUserRoleLabel = (role) => {
  const labels = {
    'ADMIN': 'Administrador',
    'INVESTOR': 'Investidor',
    'PROPERTY_OWNER': 'Proprietário de Terreno'
  }
  return labels[role] || role
}



const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script> 