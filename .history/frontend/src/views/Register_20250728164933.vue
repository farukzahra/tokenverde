<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Cadastro</h2>
        
        <!-- Mensagem de sucesso -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {{ successMessage }}
        </div>
        
        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="input-field" 
              placeholder="Seu nome completo"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              class="input-field" 
              placeholder="seu@email.com"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              v-model="form.password" 
              type="password" 
              class="input-field" 
              placeholder="••••••••"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input 
              v-model="form.confirmPassword" 
              type="password" 
              class="input-field" 
              placeholder="••••••••"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Usuário</label>
            <select v-model="form.role" class="input-field" required>
              <option value="INVESTOR">Investidor</option>
              <option value="PROPERTY_OWNER">Proprietário de Terreno</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            class="btn-primary w-full"
            :disabled="loading"
          >
            <span v-if="loading">Cadastrando...</span>
            <span v-else>Cadastrar</span>
          </button>
        </form>
        
        <p class="text-center mt-4 text-gray-600">
          Já tem uma conta? 
          <router-link to="/login" class="text-tokenverde-600 hover:underline">Faça login</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import api from '../config/axios'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'INVESTOR'
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleRegister = async () => {
  // Limpar mensagens anteriores
  successMessage.value = ''
  errorMessage.value = ''
  
  // Validações básicas
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem'
    return
  }
  
  if (form.password.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return
  }
  
  loading.value = true
  
  try {
    const response = await axios.post('http://localhost:5001/api/auth/register', {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    })
    
    if (response.data.success) {
      successMessage.value = response.data.message
      
      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Redirecionar para o dashboard após 2 segundos
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
    
  } catch (error) {
    console.error('Erro no cadastro:', error)
    
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage.value = error.response.data.errors[0].msg
    } else {
      errorMessage.value = 'Erro ao realizar cadastro. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script> 