<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm sm:max-w-md">
      <div class="card">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Login</h2>
        
        <!-- Mensagem de sucesso -->
        <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
          {{ successMessage }}
        </div>
        
        <!-- Mensagem de erro -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {{ errorMessage }}
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              class="input-field text-sm sm:text-base" 
              placeholder="seu@email.com"
              required
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input 
              v-model="form.password" 
              type="password" 
              class="input-field text-sm sm:text-base" 
              placeholder="••••••••"
              required
            >
          </div>
          
          <button 
            type="submit" 
            class="btn-primary w-full text-sm sm:text-base py-3"
            :disabled="loading"
          >
            <span v-if="loading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>
        
        <p class="text-center mt-4 text-gray-600 text-sm sm:text-base">
          Não tem uma conta? 
          <router-link to="/register" class="text-tokenverde-600 hover:underline">Cadastre-se</router-link>
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
  email: '',
  password: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  // Limpar mensagens anteriores
  successMessage.value = ''
  errorMessage.value = ''
  
  loading.value = true
  
  try {
          const response = await api.post('/api/auth/login', {
      email: form.email,
      password: form.password
    })
    
    if (response.data.success) {
      successMessage.value = response.data.message
      
      // Salvar token no localStorage
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      // Redirecionar para o dashboard após 1 segundo
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
    
  } catch (error) {
    console.error('Erro no login:', error)
    
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.response?.data?.errors) {
      errorMessage.value = error.response.data.errors[0].msg
    } else {
      errorMessage.value = 'Erro ao realizar login. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}
</script> 