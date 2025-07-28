<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <div class="text-sm text-gray-600">
          Administrador: <span class="font-medium">{{ user.name }}</span>
        </div>
      </div>

      <!-- Cards de Resumo -->
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Pendentes</h3>
              <p class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Aprovadas</h3>
              <p class="text-2xl font-bold text-green-600">{{ stats.approved }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-red-100 text-red-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Rejeitadas</h3>
              <p class="text-2xl font-bold text-red-600">{{ stats.rejected }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Total</h3>
              <p class="text-2xl font-bold text-blue-600">{{ stats.total }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtros -->
      <div class="card mb-6">
        <div class="flex flex-wrap gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filters.status" class="input-field">
              <option value="">Todos</option>
              <option value="PENDING">Pendentes</option>
              <option value="APPROVED">Aprovadas</option>
              <option value="REJECTED">Rejeitadas</option>
              <option value="ACTIVE">Ativas</option>
              <option value="INACTIVE">Inativas</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Proprietário</label>
            <select v-model="filters.owner" class="input-field">
              <option value="">Todos</option>
              <option v-for="owner in owners" :key="owner.id" :value="owner.id">
                {{ owner.name }}
              </option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="loadProperties" class="btn-primary">
              Filtrar
            </button>
          </div>
        </div>
      </div>

      <!-- Lista de Propriedades -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Propriedades</h2>
        
        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-600">Carregando propriedades...</p>
        </div>

        <div v-else-if="properties.length === 0" class="text-center py-8">
          <p class="text-gray-600">Nenhuma propriedade encontrada</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="property in properties" 
            :key="property.id"
            class="border rounded-lg p-4 hover:bg-gray-50"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="font-medium text-gray-900">{{ property.name }}</h3>
                  <span :class="getStatusClass(property.status)">
                    {{ getStatusLabel(property.status) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-1">{{ property.address }}</p>
                <p class="text-sm text-gray-600 mb-2">{{ property.area }} hectares</p>
                <p class="text-sm text-gray-500">Proprietário: {{ property.owner.name }}</p>
                <p class="text-sm text-gray-500">Cadastrada em: {{ formatDate(property.createdAt) }}</p>
              </div>
              
              <div class="flex items-center space-x-2">
                <!-- Ações por status -->
                <div class="flex space-x-2">
                  <!-- Propriedades PENDENTES -->
                  <div v-if="property.status === 'PENDING'" class="flex space-x-2">
                    <button 
                      @click="updatePropertyStatus(property.id, 'APPROVED')"
                      class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                    >
                      Aprovar
                    </button>
                    <button 
                      @click="updatePropertyStatus(property.id, 'REJECTED')"
                      class="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                    >
                      Rejeitar
                    </button>
                  </div>

                  <!-- Propriedades APROVADAS -->
                  <div v-if="property.status === 'APPROVED'" class="flex space-x-2">
                    <button 
                      @click="updatePropertyStatus(property.id, 'ACTIVE')"
                      class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                    >
                      Ativar
                    </button>
                    <button 
                      @click="updatePropertyStatus(property.id, 'REJECTED')"
                      class="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                    >
                      Rejeitar
                    </button>
                  </div>

                  <!-- Propriedades REJEITADAS -->
                  <div v-if="property.status === 'REJECTED'" class="flex space-x-2">
                    <button 
                      @click="updatePropertyStatus(property.id, 'APPROVED')"
                      class="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                    >
                      Aprovar
                    </button>
                  </div>

                  <!-- Propriedades ATIVAS -->
                  <div v-if="property.status === 'ACTIVE'" class="flex space-x-2">
                    <button 
                      @click="updatePropertyStatus(property.id, 'INACTIVE')"
                      class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full hover:bg-yellow-200"
                    >
                      Desativar
                    </button>
                    <button 
                      @click="updatePropertyStatus(property.id, 'REJECTED')"
                      class="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                    >
                      Rejeitar
                    </button>
                  </div>

                  <!-- Propriedades INATIVAS -->
                  <div v-if="property.status === 'INACTIVE'" class="flex space-x-2">
                    <button 
                      @click="updatePropertyStatus(property.id, 'ACTIVE')"
                      class="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                    >
                      Ativar
                    </button>
                    <button 
                      @click="updatePropertyStatus(property.id, 'REJECTED')"
                      class="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full hover:bg-red-200"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
                
                <!-- Botão Editar -->
                <button 
                  @click="$router.push(`/property-edit/${property.id}`)"
                  class="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200"
                >
                  Editar
                </button>
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
const loading = ref(false)
const properties = ref([])
const owners = ref([])


const stats = reactive({
  pending: 0,
  approved: 0,
  rejected: 0,
  total: 0
})

const filters = reactive({
  status: '',
  owner: ''
})

onMounted(async () => {
  // Verificar se o usuário está logado e é admin
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  if (!userData.id || userData.role !== 'ADMIN') {
    router.push('/login')
    return
  }

  // Carregar dados do usuário
  Object.assign(user, userData)

  // Carregar dados
  await loadProperties()
  await loadOwners()
  calculateStats()

  // Fechar dropdown quando clicar fora
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
      activeDropdown.value = null
    }
  })
})

const loadProperties = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    let url = 'http://localhost:5001/api/properties'
    
    const params = new URLSearchParams()
    if (filters.status) params.append('status', filters.status)
    if (filters.owner) params.append('ownerId', filters.owner)
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      properties.value = response.data.data
      calculateStats()
    }
  } catch (error) {
    console.error('Erro ao carregar propriedades:', error)
  } finally {
    loading.value = false
  }
}

const loadOwners = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:5001/api/users?role=PROPERTY_OWNER', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      owners.value = response.data.data
    }
  } catch (error) {
    console.error('Erro ao carregar proprietários:', error)
  }
}

const updatePropertyStatus = async (propertyId, newStatus) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.put(`http://localhost:5001/api/properties/${propertyId}/status`, {
      status: newStatus
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      // Recarregar propriedades
      await loadProperties()
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
  }
}

const calculateStats = () => {
  stats.pending = properties.value.filter(p => p.status === 'PENDING').length
  stats.approved = properties.value.filter(p => p.status === 'APPROVED').length
  stats.rejected = properties.value.filter(p => p.status === 'REJECTED').length
  stats.total = properties.value.length
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

const toggleDropdown = (propertyId) => {
  activeDropdown.value = activeDropdown.value === propertyId ? null : propertyId
}
</script> 