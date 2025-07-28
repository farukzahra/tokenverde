<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Editar Propriedade</h1>
        <p class="text-gray-600 mt-2">Atualize as informações da propriedade</p>
      </div>

      <!-- Mensagem de sucesso -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        {{ successMessage }}
      </div>

      <!-- Mensagem de erro -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ errorMessage }}
      </div>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600">Carregando propriedade...</p>
      </div>

      <div v-else-if="property" class="card">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Informações Básicas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Propriedade *</label>
              <input 
                v-model="form.name" 
                type="text" 
                class="input-field" 
                placeholder="Ex: Fazenda Santa Maria"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Área (hectares) *</label>
              <input 
                v-model="form.area" 
                type="number" 
                step="0.01"
                class="input-field" 
                placeholder="500.00"
                required
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
            <input 
              v-model="form.address" 
              type="text" 
              class="input-field" 
              placeholder="Rodovia BR-101, km 45, Município - Estado"
              required
            >
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
              <input 
                v-model="form.latitude" 
                type="number" 
                step="0.000001"
                class="input-field" 
                placeholder="-23.5505"
                required
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
              <input 
                v-model="form.longitude" 
                type="number" 
                step="0.000001"
                class="input-field" 
                placeholder="-46.6333"
                required
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea 
              v-model="form.description" 
              class="input-field" 
              rows="3"
              placeholder="Descreva a propriedade, características, histórico..."
            ></textarea>
          </div>

          <!-- Status da Propriedade -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="form.status" class="input-field">
              <option value="PENDING">Pendente</option>
              <option value="APPROVED">Aprovada</option>
              <option value="REJECTED">Rejeitada</option>
              <option value="ACTIVE">Ativa</option>
              <option value="INACTIVE">Inativa</option>
            </select>
          </div>

          <!-- Upload de Documentos -->
          <div class="border-t pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Documentos da Propriedade</h3>
            
            <div class="space-y-4">
              <!-- Matrícula do Imóvel -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Matrícula do Imóvel (PDF)
                </label>
                <div class="flex items-center space-x-4">
                  <input 
                    ref="matriculaInput"
                    type="file" 
                    accept=".pdf"
                    @change="handleFileChange('matriculaImovel', $event)"
                    class="hidden"
                  >
                  <button 
                    type="button"
                    @click="$refs.matriculaInput.click()"
                    class="btn-secondary"
                  >
                    Selecionar PDF
                  </button>
                  <span v-if="form.matriculaImovel" class="text-sm text-green-600">
                    ✓ Arquivo selecionado
                  </span>
                  <span v-else-if="property.matriculaImovel" class="text-sm text-blue-600">
                    📄 Documento já enviado
                  </span>
                </div>
              </div>

              <!-- CAR -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  CAR - Cadastro Ambiental Rural (PDF)
                </label>
                <div class="flex items-center space-x-4">
                  <input 
                    ref="carInput"
                    type="file" 
                    accept=".pdf"
                    @change="handleFileChange('car', $event)"
                    class="hidden"
                  >
                  <button 
                    type="button"
                    @click="$refs.carInput.click()"
                    class="btn-secondary"
                  >
                    Selecionar PDF
                  </button>
                  <span v-if="form.car" class="text-sm text-green-600">
                    ✓ Arquivo selecionado
                  </span>
                  <span v-else-if="property.car" class="text-sm text-blue-600">
                    📄 Documento já enviado
                  </span>
                </div>
              </div>

              <!-- Georreferenciamento -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Georreferenciamento (PDF)
                </label>
                <div class="flex items-center space-x-4">
                  <input 
                    ref="georreferenciamentoInput"
                    type="file" 
                    accept=".pdf"
                    @change="handleFileChange('georreferenciamento', $event)"
                    class="hidden"
                  >
                  <button 
                    type="button"
                    @click="$refs.georreferenciamentoInput.click()"
                    class="btn-secondary"
                  >
                    Selecionar PDF
                  </button>
                  <span v-if="form.georreferenciamento" class="text-sm text-green-600">
                    ✓ Arquivo selecionado
                  </span>
                  <span v-else-if="property.georreferenciamento" class="text-sm text-blue-600">
                    📄 Documento já enviado
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Botões -->
          <div class="flex justify-end space-x-4 pt-6 border-t">
            <button 
              type="button"
              @click="$router.push('/profile')"
              class="btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              class="btn-primary"
              :disabled="loading"
            >
              <span v-if="loading">Atualizando...</span>
              <span v-else>Atualizar Propriedade</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const property = ref(null)
const form = reactive({
  name: '',
  description: '',
  address: '',
  latitude: '',
  longitude: '',
  area: '',
  status: 'PENDING',
  matriculaImovel: null,
  car: null,
  georreferenciamento: null
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (!user.id) {
    router.push('/login')
    return
  }

  await loadProperty()
})

const loadProperty = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const propertyId = route.params.id

    const response = await axios.get(`http://localhost:5001/api/properties/${propertyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      property.value = response.data.data
      
      // Preencher formulário com dados existentes
      Object.assign(form, {
        name: property.value.name,
        description: property.value.description || '',
        address: property.value.address,
        latitude: property.value.latitude,
        longitude: property.value.longitude,
        area: property.value.area,
        status: property.value.status
      })
    }
  } catch (error) {
    console.error('Erro ao carregar propriedade:', error)
    errorMessage.value = 'Erro ao carregar propriedade'
  } finally {
    loading.value = false
  }
}

const handleFileChange = (field, event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.type !== 'application/pdf') {
      errorMessage.value = 'Apenas arquivos PDF são permitidos'
      return
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB
      errorMessage.value = 'Arquivo muito grande. Máximo 10MB'
      return
    }
    form[field] = file
    errorMessage.value = ''
  }
}

const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  
  loading.value = true

  try {
    const token = localStorage.getItem('token')
    const propertyId = route.params.id

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('address', form.address)
    formData.append('latitude', form.latitude)
    formData.append('longitude', form.longitude)
    formData.append('area', form.area)
    formData.append('status', form.status)

    // Adicionar arquivos se selecionados
    if (form.matriculaImovel) {
      formData.append('matriculaImovel', form.matriculaImovel)
    }
    if (form.car) {
      formData.append('car', form.car)
    }
    if (form.georreferenciamento) {
      formData.append('georreferenciamento', form.georreferenciamento)
    }

    const response = await axios.put(`http://localhost:5001/api/properties/${propertyId}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.data.success) {
      successMessage.value = response.data.message
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }

  } catch (error) {
    console.error('Erro ao atualizar propriedade:', error)
    
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage.value = error.response.data.errors[0].msg
    } else {
      errorMessage.value = 'Erro ao atualizar propriedade. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script> 