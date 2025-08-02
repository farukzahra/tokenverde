<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <!-- Header -->
    <header class="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4 sm:py-6">
          <!-- Logo -->
          <div class="flex items-center">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg sm:text-xl">T</span>
            </div>
            <h1 class="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold text-gray-900">TokenVerde</h1>
          </div>

          <!-- Desktop Navigation -->
          <nav class="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <router-link to="/register" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Registro de Usuários</router-link>
            <router-link to="/vender-token" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Vender Token</router-link>
            <router-link to="/comprar-token" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Comprar Token</router-link>
            <router-link to="/como-funciona" class="text-green-600 font-semibold transition-colors text-sm xl:text-base font-medium">Como funciona</router-link>
            <router-link to="/marketplace" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">MarketPlace</router-link>
            <router-link to="/calculadora" class="text-gray-900 hover:text-green-600 transition-colors text-sm xl:text-base font-medium">Calculadora de Compensação</router-link>
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
              to="/register" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              Registro de Usuários
            </router-link>
            <router-link 
              to="/vender-token" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              Vender Token
            </router-link>
            <router-link 
              to="/comprar-token" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              Comprar Token
            </router-link>
            <router-link 
              to="/como-funciona" 
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-green-600 bg-green-50 rounded-lg"
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
          </div>
        </div>
      </div>
    </header>

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
              Como 
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Funciona</span>
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Entenda como funciona a tokenização de áreas verdes para compensação ambiental
            </p>
          </div>

          <!-- Tabs Navigation -->
          <div class="flex justify-center mb-12">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20">
              <div class="flex space-x-2">
                <button 
                  @click="activeTab = 'vendedor'"
                  :class="[
                    'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
                    activeTab === 'vendedor' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:text-green-600'
                  ]"
                >
                  Para Vendedores
                </button>
                <button 
                  @click="activeTab = 'comprador'"
                  :class="[
                    'px-6 py-3 rounded-xl font-semibold transition-all duration-300',
                    activeTab === 'comprador' 
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:text-green-600'
                  ]"
                >
                  Para Compradores
                </button>
              </div>
            </div>
          </div>

          <!-- Vendedor Content -->
          <div v-if="activeTab === 'vendedor'" class="space-y-12">
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30">
              <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Para Vendedores</h2>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                  Transforme sua área verde em tokens negociáveis e receba por serviços ambientais
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Como Vender Sua Área</h3>
                  <div class="space-y-4">
                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Cadastro e Avaliação</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Cadastre-se como vendedor e envie a documentação da sua área verde. Nossa equipe fará uma avaliação completa da propriedade.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Tokenização</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Sua área será tokenizada e dividida em partes negociáveis. Cada token representa uma porção da área com valor ambiental.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Negociação</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Seus tokens ficam disponíveis no marketplace para compradores interessados em compensação ambiental.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Recebimento</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Receba pagamentos pelos tokens vendidos e mantenha a propriedade da área, garantindo sua preservação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Benefícios para Vendedores</h3>
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Renda Passiva</h4>
                        <p class="text-gray-600 text-sm">Gere receita com sua área verde sem perder a propriedade</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Preservação Garantida</h4>
                        <p class="text-gray-600 text-sm">Sua área continua protegida e você mantém o controle</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Valorização</h4>
                        <p class="text-gray-600 text-sm">Sua propriedade ganha valor ambiental reconhecido</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Suporte Técnico</h4>
                        <p class="text-gray-600 text-sm">Assessoria completa para documentação e processos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comprador Content -->
          <div v-if="activeTab === 'comprador'" class="space-y-12">
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30">
              <div class="text-center mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Para Compradores</h2>
                <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                  Compre tokens de áreas verdes para compensação ambiental de forma simples e transparente
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Como Comprar Tokens</h3>
                  <div class="space-y-4">
                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Cadastro</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Cadastre-se como comprador e forneça as informações necessárias para sua empresa ou projeto.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Seleção de Áreas</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Explore o marketplace e escolha as áreas verdes que melhor atendem às suas necessidades de compensação.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Compra de Tokens</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Adquira os tokens das áreas selecionadas através da plataforma segura.
                        </p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-4">
                      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span class="text-green-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Documentação</h4>
                        <p class="text-gray-600 text-sm leading-relaxed">
                          Receba toda a documentação necessária para comprovar a compensação ambiental em até 24h.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="space-y-6">
                  <h3 class="text-xl font-bold text-gray-900 mb-4">Benefícios para Compradores</h3>
                  <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Agilidade</h4>
                        <p class="text-gray-600 text-sm">Processo simplificado sem burocracia excessiva</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Transparência</h4>
                        <p class="text-gray-600 text-sm">Áreas verificadas e documentadas previamente</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Documentação Completa</h4>
                        <p class="text-gray-600 text-sm">Relatórios e certificados prontos para órgãos ambientais</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <svg class="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <div>
                        <h4 class="font-semibold text-gray-900">Impacto Real</h4>
                        <p class="text-gray-600 text-sm">Contribua para a preservação de áreas verdes reais</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="text-center mt-16">
            <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30 max-w-4xl mx-auto">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Pronto para Começar?</h2>
              <p class="text-lg text-gray-700 mb-8 leading-relaxed">
                Junte-se à revolução da compensação ambiental. Escolha seu perfil e comece hoje mesmo!
              </p>
              
              <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <router-link to="/register" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Cadastrar como Vendedor
                </router-link>
                
                <router-link to="/register" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                  Cadastrar como Comprador
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
        href="https://wa.me/554192446793?text=Olá! Gostaria de saber mais sobre como funciona a tokenização de áreas verdes."
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

const mobileMenuOpen = ref(false)
const activeTab = ref('vendedor')
</script> 