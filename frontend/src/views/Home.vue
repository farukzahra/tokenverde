<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <!-- Header Component -->
    <Header />

    <!-- Hero Section -->
    <main class="flex-1">
      <div class="relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-100/30 via-emerald-100/20 to-teal-100/30"></div>
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.1) 1px, transparent 0); background-size: 20px 20px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <!-- Main Content -->
          <div class="text-center mb-16">
            
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              ÁREAS PARA 
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">COMPENSAÇÃO</span>
              <br>
              <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">SEM BUROCRACIA!</span>
            </h1>
            
            <p class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Desburocratizamos o processo de compensação ambiental com áreas pré-selecionadas e documentação pronta
            </p>
          </div>

          <!-- Features Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Áreas Pré-Selecionadas</h3>
              <p class="text-gray-600 text-center leading-relaxed">
                Detectamos, selecionamos e validamos áreas documentadas e tokenizadas para sua compensação
              </p>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Entrega em 24h</h3>
              <p class="text-gray-600 text-center leading-relaxed">
                Documentação finalizada e relatório de compensação ambiental em até 24 horas úteis
              </p>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-4 text-center">Agilidade Garantida</h3>
              <p class="text-gray-600 text-center leading-relaxed">
                Aprovação mais rápida dos seus projetos de supressão com documentação completa
              </p>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="text-center">
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30 max-w-4xl mx-auto">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Como Funciona</h2>
              <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong>Desburocratizamos o processo de compensação</strong>, com áreas pré-selecionadas, documentadas, verificadas e validadas e Tokenizadas. De forma que após a sua aquisição, entregamos toda a documentação finalizada junto ao Relatório de compensação ambiental, para seu projeto em até 24horas uteis.
                </p>
                <p>
                  Detectamos áreas, selecionamos, validamos a área, documentação e elaboramos toda documentação para que você apenas precise indicar ao órgão ambiental a área.
                </p>
                <p>
                  <strong>Fazendo a aquisição das áreas de compensação conosco, você ganha agilidade na aprovação dos seus projetos de supressão.</strong>
                </p>
              </div>
              
              <div class="mt-8">
                <router-link to="/register" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  Começar Agora
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </router-link>
              </div>
            </div>
          </div>
                 </div>
       </div>
     </main>

     <!-- WhatsApp Floating Button -->
     <div class="fixed bottom-6 right-6 z-50">
       <a 
         href="https://wa.me/554192446793?text=Olá! Gostaria de saber mais sobre compensação ambiental."
         target="_blank"
         rel="noopener noreferrer"
         class="inline-flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
         title="Fale conosco no WhatsApp"
       >
         <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
         </svg>
       </a>
     </div>
   </div>
 </template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'

// Removido mobileMenuOpen pois agora está no componente Header
</script> 