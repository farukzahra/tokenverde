<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <!-- Header Component -->
    <Header />

    <!-- Main Content -->
    <main class="flex-1">
      <div class="relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/20 to-teal-100/30"></div>
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <!-- Page Header -->
          <div class="text-center mb-16">
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Marketplace</span>
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Página em desenvolvimento - Em breve você poderá explorar e comprar tokens de áreas verdes
            </p>
          </div>

          <!-- Filtros e Busca -->
          <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
            <div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <input 
                  type="text" 
                  placeholder="Buscar por localização, área ou proprietário..."
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-80"
                >
                <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Todas as áreas</option>
                  <option value="reserva-legal">Reserva Legal</option>
                  <option value="app">Área de Preservação Permanente</option>
                  <option value="reflorestamento">Reflorestamento</option>
                </select>
                <select class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Qualquer tamanho</option>
                  <option value="0-10">0-10 hectares</option>
                  <option value="10-50">10-50 hectares</option>
                  <option value="50-100">50-100 hectares</option>
                  <option value="100+">100+ hectares</option>
                </select>
              </div>
              <button class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Buscar
              </button>
            </div>
          </div>

          <!-- Grid de Áreas Verdes -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <!-- Área 1 -->
            <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="relative mb-4">
                <div class="w-full h-48 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Reserva Legal
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-2">Fazenda São João</h3>
              <p class="text-gray-600 text-sm mb-3">São Paulo, SP - 150 hectares</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Área disponível:</span>
                  <span class="font-medium">30 hectares</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Preço por hectare:</span>
                  <span class="font-medium text-green-600">R$ 15,00</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Aprovado</span>
                </div>
              </div>
              
              <button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Detalhes
              </button>
            </div>

            <!-- Área 2 -->
            <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="relative mb-4">
                <div class="w-full h-48 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  APP
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-2">Sítio Boa Vista</h3>
              <p class="text-gray-600 text-sm mb-3">Campinas, SP - 80 hectares</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Área disponível:</span>
                  <span class="font-medium">12 hectares</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Preço por hectare:</span>
                  <span class="font-medium text-green-600">R$ 18,50</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-green-600 font-medium">Aprovado</span>
                </div>
              </div>
              
              <button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Detalhes
              </button>
            </div>

            <!-- Área 3 -->
            <div class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="relative mb-4">
                <div class="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
                  <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div class="absolute top-3 right-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Reflorestamento
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-2">Chácara Recanto</h3>
              <p class="text-gray-600 text-sm mb-3">Ribeirão Preto, SP - 120 hectares</p>
              
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Área disponível:</span>
                  <span class="font-medium">25 hectares</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Preço por hectare:</span>
                  <span class="font-medium text-green-600">R$ 12,00</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Status:</span>
                  <span class="text-yellow-600 font-medium">Em Análise</span>
                </div>
              </div>
              
              <button class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Ver Detalhes
              </button>
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div class="text-3xl font-bold text-green-600 mb-2">24</div>
              <div class="text-gray-600 text-sm">Áreas Disponíveis</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div class="text-3xl font-bold text-blue-600 mb-2">1.250</div>
              <div class="text-gray-600 text-sm">Hectares Totais</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div class="text-3xl font-bold text-purple-600 mb-2">R$ 18.500</div>
              <div class="text-gray-600 text-sm">Valor Médio/ha</div>
            </div>
            <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20">
              <div class="text-3xl font-bold text-emerald-600 mb-2">156</div>
              <div class="text-gray-600 text-sm">Transações</div>
            </div>
          </div>

          <!-- CTA -->
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl border border-white/30">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Precisa de Área para Compensação?</h2>
            <p class="text-lg text-gray-600 mb-6">
              Nossa equipe pode ajudar você a encontrar a área perfeita para seu projeto
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Falar com Especialista
              </button>
              <button class="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300">
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- WhatsApp Floating Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <a 
        href="https://wa.me/554192446793?text=Olá! Gostaria de saber mais sobre o marketplace de tokens verdes."
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Fale conosco no WhatsApp"
      >
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>
