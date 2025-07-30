<template>
  <div class="min-h-screen bg-gradient-to-br from-tokenverde-50 to-tokenverde-100">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 sm:py-6">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-tokenverde-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg sm:text-xl">T</span>
            </div>
            <h1 class="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900">TokenVerde</h1>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <router-link to="/" class="text-gray-900 hover:text-tokenverde-600 transition-colors text-sm xl:text-base">Início</router-link>
            <router-link to="/map" class="text-gray-900 hover:text-tokenverde-600 transition-colors text-sm xl:text-base">Mapa</router-link>
            <router-link to="/login" class="text-gray-900 hover:text-tokenverde-600 transition-colors text-sm xl:text-base">Login</router-link>
            <router-link to="/register" class="bg-tokenverde-600 hover:bg-tokenverde-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-sm xl:text-base">Cadastrar</router-link>
          </nav>

          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-900 hover:text-tokenverde-600 focus:outline-none focus:text-tokenverde-600"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div v-if="mobileMenuOpen" class="lg:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <router-link 
              to="/" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-tokenverde-600 hover:bg-gray-50 rounded-md"
            >
              Início
            </router-link>
            <router-link 
              to="/map" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-tokenverde-600 hover:bg-gray-50 rounded-md"
            >
              Mapa
            </router-link>
            <router-link 
              to="/login" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-tokenverde-600 hover:bg-gray-50 rounded-md"
            >
              Login
            </router-link>
            <router-link 
              to="/register" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium bg-tokenverde-600 text-white hover:bg-tokenverde-700 rounded-md"
            >
              Cadastrar
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div class="text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Tokenização de
            <span class="text-tokenverde-600">Áreas Verdes</span>
          </h1>
          <p class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            Conectamos investidores ambientalmente conscientes com projetos de preservação 
            e reflorestamento através da tecnologia blockchain.
          </p>
          <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <router-link to="/register" class="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
              Começar a Investir
            </router-link>
            <router-link to="/map" class="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto">
              Explorar Áreas
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div class="card text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2">Investimento Direto</h3>
            <p class="text-sm sm:text-base text-gray-600">Cada token representa uma área real preservada, garantindo transparência total.</p>
          </div>

          <div class="card text-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2">Impacto Mensurável</h3>
            <p class="text-sm sm:text-base text-gray-600">Relatórios detalhados sobre o impacto ambiental das suas áreas investidas.</p>
          </div>

          <div class="card text-center md:col-span-2 lg:col-span-1">
            <div class="w-12 h-12 sm:w-16 sm:h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold mb-2">Tecnologia Blockchain</h3>
            <p class="text-sm sm:text-base text-gray-600">Segurança e rastreabilidade garantidas pela tecnologia blockchain.</p>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-white py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-tokenverde-600 mb-2">1,234</div>
              <div class="text-xs sm:text-sm lg:text-base text-gray-600">Áreas Tokenizadas</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-tokenverde-600 mb-2">5,678</div>
              <div class="text-xs sm:text-sm lg:text-base text-gray-600">Investidores Ativos</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-tokenverde-600 mb-2">12,345</div>
              <div class="text-xs sm:text-sm lg:text-base text-gray-600">Hectares Preservados</div>
            </div>
            <div>
              <div class="text-2xl sm:text-3xl lg:text-4xl font-bold text-tokenverde-600 mb-2">R$ 2.5M</div>
              <div class="text-xs sm:text-sm lg:text-base text-gray-600">Valor Total Investido</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-sm sm:text-base">&copy; 2024 TokenVerde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script> 