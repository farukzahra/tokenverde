<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
        <p class="text-gray-600 mt-2">Gerencie propriedades e usuários do sistema</p>
      </div>

      <!-- Estatísticas -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ stats.totalProperties }}</div>
            <div class="text-sm text-gray-600">Total de Propriedades</div>
          </div>
        </div>
        <div class="card">
          <div class="text-center">
            <div class="text-2xl font-bold text-yellow-600">{{ stats.pendingProperties }}</div>
            <div class="text-sm text-gray-600">Aguardando Aprovação</div>
          </div>
        </div>
        <div class="card">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ stats.approvedProperties }}</div>
            <div class="text-sm text-gray-600">Aprovadas</div>
          </div>
        </div>
        <div class="card">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-600">{{ stats.totalUsers }}</div>
            <div class="text-sm text-gray-600">Total de Usuários</div>
          </div>
        </div>
      </div>

      <!-- Propriedades Pendentes -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Propriedades Pendentes de Aprovação</h2>
        
        <div v-if="loading" class="text-center py-8">
          <p class="text-gray-600">Carregando propriedades...</p>
        </div>

        <div v-else-if="pendingProperties.length === 0" class="text-center py-8">
          <p class="text-gray-600">Nenhuma propriedade pendente de aprovação</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="property in pendingProperties" 
            :key="property.id"
            class="border rounded-lg p-6 hover:bg-gray-50"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ property.name }}</h3>
                <p class="text-sm text-gray-600">{{ property.address }}</p>
                <p class="text-sm text-gray-600">{{ property.area }} hectares</p>
                <p class="text-sm text-gray-600">Proprietário: {{ property.owner?.name }}</p>
              </div>
              <span class="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Pendente
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Documentos:</h4>
                <div class="space-y-1 text-sm">
                  <div v-if="property.matriculaImovel" class="flex items-center">
                    <span class="text-green-600 mr-2">✓</span>
                    Matrícula do Imóvel
                  </div>
                  <div v-if="property.car" class="flex items-center">
                    <span class="text-green-600 mr-2">✓</span>
                    CAR
                  </div>
                  <div v-if="property.georreferenciamento" class="flex items-center">
                    <span class="text-green-600 mr-2">✓</span>
                    Georreferenciamento
                  </div>
                </div>
              </div>
              <div>
                <h4 class="font-medium text-gray-700 mb-2">Coordenadas:</h4>
                <p class="text-sm text-gray-600">
                  Lat: {{ property.latitude }}, Lon: {{ property.longitude }}
                </p>
              </div>
            </div>

            <div class="flex space-x-3">
              <button 
                @click="approveProperty(property.id)"
                class="btn-primary"
                :disabled="processingProperty === property.id"
              >
                <span v-if="processingProperty === property.id">Aprovando...</span>
                <span v-else>Aprovar</span>
              </button>
              <button 
                @click="rejectProperty(property.id)"
                class="btn-secondary"
                :disabled="processingProperty === property.id"
              >
                <span v-if="processingProperty === property.id">Rejeitando...</span>
                <span v-else>Rejeitar</span>
              </button>
              <button 
                @click="viewPropertyDetails(property.id)"
                class="btn-secondary"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Todas as Propriedades -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Todas as Propriedades</h2>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propriedade
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Proprietário
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Área
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="property in allProperties" :key="property.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ property.name }}</div>
                    <div class="text-sm text-gray-500">{{ property.address }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ property.owner?.name }}</div>
                  <div class="text-sm text-gray-500">{{ property.owner?.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ property.area }} hectares
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(property.status)">
                    {{ getStatusLabel(property.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="viewPropertyDetails(property.id)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Ver
                  </button>
                  <button 
                    v-if="property.status === 'PENDING'"
                    @click="approveProperty(property.id)"
                    class="text-green-600 hover:text-green-900 mr-3"
                  >
                    Aprovar
                  </button>
                  <button 
                    v-if="property.status === 'PENDING'"
                    @click="rejectProperty(property.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Rejeitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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

const loading = ref(false)
const processingProperty = ref(null)
const pendingProperties = ref([])
const allProperties = ref([])
const stats = reactive({
  totalProperties: 0,
  pendingProperties: 0,
  approvedProperties: 0,
  totalUsers: 0
})

onMounted(async () => {
  // Verificar se o usuário é administrador
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id || user.role !== 'ADMIN') {
    router.push('/login')
    return
  }

  await loadData()
})

const loadData = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    
    // Carregar propriedades
    const propertiesResponse = await axios.get('http://localhost:5001/api/properties', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (propertiesResponse.data.success) {
      allProperties.value = propertiesResponse.data.data
      pendingProperties.value = propertiesResponse.data.data.filter(p => p.status === 'PENDING')
      
      // Calcular estatísticas
      stats.totalProperties = allProperties.value.length
      stats.pendingProperties = pendingProperties.value.length
      stats.approvedProperties = allProperties.value.filter(p => p.status === 'APPROVED').length
    }

    // Carregar usuários (se houver endpoint)
    try {
      const usersResponse = await axios.get('http://localhost:5001/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (usersResponse.data.success) {
        stats.totalUsers = usersResponse.data.data.length
      }
    } catch (error) {
      console.log('Endpoint de usuários não disponível')
    }

  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    loading.value = false
  }
}

const approveProperty = async (propertyId) => {
  processingProperty.value = propertyId
  try {
    const token = localStorage.getItem('token')
    
    const response = await axios.patch(`http://localhost:5001/api/properties/${propertyId}/status`, {
      status: 'APPROVED'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      // Recarregar dados
      await loadData()
    }
  } catch (error) {
    console.error('Erro ao aprovar propriedade:', error)
  } finally {
    processingProperty.value = null
  }
}

const rejectProperty = async (propertyId) => {
  processingProperty.value = propertyId
  try {
    const token = localStorage.getItem('token')
    
    const response = await axios.patch(`http://localhost:5001/api/properties/${propertyId}/status`, {
      status: 'REJECTED'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      // Recarregar dados
      await loadData()
    }
  } catch (error) {
    console.error('Erro ao rejeitar propriedade:', error)
  } finally {
    processingProperty.value = null
  }
}

const viewPropertyDetails = (propertyId) => {
  // Implementar modal ou nova página para detalhes
  console.log('Ver detalhes da propriedade:', propertyId)
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
</script> 