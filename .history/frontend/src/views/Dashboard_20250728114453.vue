<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex items-center space-x-4">
          <div class="text-sm text-gray-600">
            Bem-vindo, {{ user.name }}!
          </div>
          <button 
            v-if="user.role === 'PROPERTY_OWNER'"
            @click="$router.push('/property-form')"
            class="btn-primary"
          >
            + Cadastrar Propriedade
          </button>
        </div>
      </div>

      <!-- Cards de Resumo -->
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Meus Tokens</h3>
              <p class="text-2xl font-bold text-green-600">{{ totalTokens }}</p>
              <p class="text-sm text-gray-600">Valor: R$ {{ totalValue.toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Áreas Investidas</h3>
              <p class="text-2xl font-bold text-blue-600">{{ investedAreas }}</p>
              <p class="text-sm text-gray-600">{{ totalArea.toFixed(1) }} hectares</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900">Transações</h3>
              <p class="text-2xl font-bold text-purple-600">{{ totalTransactions }}</p>
              <p class="text-sm text-gray-600">Último mês</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Conteúdo Específico por Tipo de Usuário -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Para Investidores -->
        <div v-if="user.role === 'INVESTIDOR'" class="card">
          <h3 class="text-lg font-semibold mb-4">Meus Tokens Verdes</h3>
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">Carregando...</p>
          </div>
          <div v-else-if="tokenHolders.length === 0" class="text-center py-8">
            <p class="text-gray-600 mb-4">Você ainda não possui tokens</p>
            <button @click="$router.push('/map')" class="btn-primary">
              Explorar Áreas Verdes
            </button>
          </div>
          <div v-else class="space-y-3">
            <div v-for="holder in tokenHolders" :key="holder.id" class="border rounded-lg p-3">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-medium">{{ holder.token.name }}</h4>
                  <p class="text-sm text-gray-600">{{ holder.token.symbol }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">{{ holder.quantity }} tokens</p>
                  <p class="text-sm text-gray-600">R$ {{ (holder.quantity * holder.token.price).toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Para Proprietários -->
        <div v-if="user.role === 'PROPERTY_OWNER'" class="card">
          <h3 class="text-lg font-semibold mb-4">Minhas Propriedades</h3>
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">Carregando...</p>
          </div>
          <div v-else-if="properties.length === 0" class="text-center py-8">
            <p class="text-gray-600 mb-4">Você ainda não cadastrou propriedades</p>
            <button @click="$router.push('/property-form')" class="btn-primary">
              Cadastrar Propriedade
            </button>
          </div>
          <div v-else class="space-y-3">
            <div v-for="property in properties" :key="property.id" class="border rounded-lg p-3">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-medium">{{ property.name }}</h4>
                  <p class="text-sm text-gray-600">{{ property.area }} hectares</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span :class="getStatusClass(property.status)">
                    {{ getStatusLabel(property.status) }}
                  </span>
                  <button 
                    @click="$router.push(`/property-edit/${property.id}`)"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Transações Recentes -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Transações Recentes</h3>
          <div v-if="loading" class="text-center py-4">
            <p class="text-gray-600">Carregando...</p>
          </div>
          <div v-else-if="transactions.length === 0" class="text-center py-8">
            <p class="text-gray-600">Nenhuma transação encontrada</p>
          </div>
          <div v-else class="space-y-3">
            <div v-for="transaction in transactions.slice(0, 5)" :key="transaction.id" class="border rounded-lg p-3">
              <div class="flex justify-between items-center">
                <div>
                  <h4 class="font-medium">{{ transaction.token.symbol }}</h4>
                  <p class="text-sm text-gray-600">{{ getTransactionTypeLabel(transaction.type) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">{{ transaction.quantity }} tokens</p>
                  <p class="text-sm text-gray-600">R$ {{ transaction.amount.toFixed(2) }}</p>
                </div>
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
const tokenHolders = ref([])
const properties = ref([])
const transactions = ref([])

// Dados calculados
const totalTokens = ref(0)
const totalValue = ref(0)
const investedAreas = ref(0)
const totalArea = ref(0)
const totalTransactions = ref(0)

onMounted(async () => {
  // Verificar se o usuário está logado
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  if (!userData.id) {
    router.push('/login')
    return
  }

  // Carregar dados do usuário
  Object.assign(user, userData)

  // Carregar dados do dashboard
  await loadDashboardData()
})

const loadDashboardData = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const headers = { 'Authorization': `Bearer ${token}` }

    // Carregar dados baseado no tipo de usuário
    if (user.role === 'INVESTIDOR') {
      await loadTokenHolders(headers)
    } else if (user.role === 'PROPERTY_OWNER') {
      await loadProperties(headers)
    }

    // Carregar transações para todos
    await loadTransactions(headers)

    // Calcular totais
    calculateTotals()
  } catch (error) {
    console.error('Erro ao carregar dados do dashboard:', error)
  } finally {
    loading.value = false
  }
}

const loadTokenHolders = async (headers) => {
  try {
    const response = await axios.get('http://localhost:5001/api/tokens/holders', { headers })
    if (response.data.success) {
      tokenHolders.value = response.data.data.filter(holder => holder.userId === user.id)
    }
  } catch (error) {
    console.error('Erro ao carregar token holders:', error)
  }
}

const loadProperties = async (headers) => {
  try {
    const response = await axios.get('http://localhost:5001/api/properties', { headers })
    if (response.data.success) {
      properties.value = response.data.data.filter(prop => prop.ownerId === user.id)
    }
  } catch (error) {
    console.error('Erro ao carregar propriedades:', error)
  }
}

const loadTransactions = async (headers) => {
  try {
    const response = await axios.get('http://localhost:5001/api/transactions', { headers })
    if (response.data.success) {
      transactions.value = response.data.data.filter(t => t.userId === user.id)
    }
  } catch (error) {
    console.error('Erro ao carregar transações:', error)
  }
}

const calculateTotals = () => {
  // Calcular totais para investidores
  if (user.role === 'INVESTIDOR') {
    totalTokens.value = tokenHolders.value.reduce((sum, holder) => sum + holder.quantity, 0)
    totalValue.value = tokenHolders.value.reduce((sum, holder) => sum + (holder.quantity * holder.token.price), 0)
    investedAreas.value = new Set(tokenHolders.value.map(h => h.token.greenAreaId)).size
  }

  // Calcular totais para proprietários
  if (user.role === 'PROPERTY_OWNER') {
    totalArea.value = properties.value.reduce((sum, prop) => sum + prop.area, 0)
    investedAreas.value = properties.value.length
  }

  // Transações para todos
  totalTransactions.value = transactions.value.length
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

const getTransactionTypeLabel = (type) => {
  const labels = {
    'BUY': 'Compra',
    'SELL': 'Venda',
    'TRANSFER': 'Transferência'
  }
  return labels[type] || type
}
</script> 