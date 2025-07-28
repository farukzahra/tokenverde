<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Meu Perfil</h1>
      </div>

      <!-- Informações do Usuário -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <!-- Propriedades do Usuário -->
        <div class="card" v-if="user.role === 'PROPERTY_OWNER'">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Minhas Propriedades</h2>
          
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">Carregando propriedades...</p>
          </div>

          <div v-else-if="properties.length === 0" class="text-center py-8">
            <p class="text-gray-600 mb-4">Você ainda não cadastrou nenhuma propriedade</p>
            <button 
              @click="$router.push('/property-form')"
              class="btn-primary"
            >
              Cadastrar Primeira Propriedade
            </button>
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="property in properties" 
              :key="property.id"
              class="border rounded-lg p-4 hover:bg-gray-50"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-gray-900">{{ property.name }}</h3>
                  <p class="text-sm text-gray-600">{{ property.address }}</p>
                  <p class="text-sm text-gray-600">{{ property.area }} hectares</p>
                </div>
                <span :class="getStatusClass(property.status)">
                  {{ getStatusLabel(property.status) }}
                </span>
              </div>
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
const properties = ref([])
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

  // Carregar propriedades se for proprietário
  if (user.role === 'PROPERTY_OWNER') {
    await loadProperties()
  }
})

const loadProperties = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5001/api/properties', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      // Filtrar apenas propriedades do usuário logado
      properties.value = response.data.data.filter(prop => prop.ownerId === user.id)
    }
  } catch (error) {
    console.error('Erro ao carregar propriedades:', error)
  } finally {
    loading.value = false
  }
}

const getUserRoleLabel = (role) => {
  const labels = {
    'ADMIN': 'Administrador',
    'INVESTOR': 'Investidor',
    'PROPERTY_OWNER': 'Proprietário de Terreno'
  }
  return labels[role] || role
}

const getStatusLabel = (status) => {
  const labels = {
    'PENDING': 'Pendente',
    'APPROVED': 'Aprovada',
    'REJECTED': 'Rejeitada',
    'ACTIVE': 'Ativa',
    'INACTIVE': 'Inativa'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    'PENDING': 'px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full',
    'APPROVED': 'px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full',
    'REJECTED': 'px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full',
    'ACTIVE': 'px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full',
    'INACTIVE': 'px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full'
  }
  return classes[status] || 'px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script> 