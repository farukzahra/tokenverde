<template>
  <header class="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4 sm:py-6">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg sm:text-xl">T</span>
            </div>
            <h1 class="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900">TokenVerde</h1>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-4 xl:space-x-6">
          <router-link to="/como-funciona" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Como funciona</router-link>
          <router-link to="/marketplace" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">MarketPlace</router-link>
          <router-link to="/calculadora" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Calculadora de Compensação</router-link>
          <router-link to="/login" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-sm font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Entrar</router-link>
        </nav>

        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button 
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-900 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors"
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
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm border-t border-gray-200 rounded-b-xl">
          <router-link 
            to="/como-funciona" 
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            Como funciona
          </router-link>
          <router-link 
            to="/marketplace" 
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            MarketPlace
          </router-link>
          <router-link 
            to="/calculadora" 
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            Calculadora de Compensação
          </router-link>
          <router-link 
            to="/login" 
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg transition-colors text-center"
          >
            Entrar
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
