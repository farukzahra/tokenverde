<template>
  <div class="min-h-screen bg-gradient-to-br from-tokenverde-50 to-tokenverde-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-tokenverde-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">T</span>
            </div>
            <h1 class="ml-3 text-2xl font-bold text-gray-900">TokenVerde</h1>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="text-gray-900 hover:text-tokenverde-600 transition-colors">Início</router-link>
            <router-link to="/map" class="text-gray-900 hover:text-tokenverde-600 transition-colors">Mapa</router-link>
            <router-link to="/login" class="text-gray-900 hover:text-tokenverde-600 transition-colors">Login</router-link>
            <router-link to="/register" class="bg-tokenverde-600 hover:bg-tokenverde-700 text-white px-4 py-2 rounded-lg transition-colors">Cadastrar</router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Tokenização de
            <span class="text-tokenverde-600">Áreas Verdes</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conectamos investidores ambientalmente conscientes com projetos de preservação 
            e reflorestamento através da tecnologia blockchain.
          </p>
          <div class="flex justify-center space-x-4">
            <router-link to="/register" class="btn-primary text-lg px-8 py-3">
              Começar a Investir
            </router-link>
            <router-link to="/map" class="btn-secondary text-lg px-8 py-3">
              Explorar Áreas
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-16 h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Investimento Direto</h3>
            <p class="text-gray-600">Cada token representa uma área real preservada, garantindo transparência total.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Impacto Mensurável</h3>
            <p class="text-gray-600">Relatórios detalhados sobre o impacto ambiental das suas áreas investidas.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-tokenverde-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-tokenverde-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tecnologia Blockchain</h3>
            <p class="text-gray-600">Segurança e rastreabilidade garantidas pela tecnologia blockchain.</p>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="bg-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold text-tokenverde-600 mb-2">1,234</div>
              <div class="text-gray-600">Áreas Tokenizadas</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-tokenverde-600 mb-2">5,678</div>
              <div class="text-gray-600">Investidores Ativos</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-tokenverde-600 mb-2">12,345</div>
              <div class="text-gray-600">Hectares Preservados</div>
            </div>
            <div>
              <div class="text-4xl font-bold text-tokenverde-600 mb-2">R$ 2.5M</div>
              <div class="text-gray-600">Valor Total Investido</div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p>&copy; 2024 TokenVerde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Componente da página inicial
</script> 