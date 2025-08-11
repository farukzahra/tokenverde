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
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Calculadora</span>
              <br>
              <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">de Compensação Ambiental</span>
            </h1>
            <p class="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Calcule rapidamente a área necessária para compensação ambiental do seu projeto
            </p>
          </div>

          <!-- Calculadora Principal -->
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/30 max-w-4xl mx-auto mb-12">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Calculadora de Compensação</h2>
            
            <form @submit.prevent="calcularCompensacao" class="space-y-6">
              <!-- Tipo de Projeto -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Projeto</label>
                <select v-model="form.tipoProjeto" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione o tipo de projeto</option>
                  <option value="empreendimento">Empreendimento</option>
                  <option value="construcao">Construção Civil</option>
                  <option value="industrial">Industrial</option>
                  <option value="comercial">Comercial</option>
                  <option value="residencial">Residencial</option>
                  <option value="infraestrutura">Infraestrutura</option>
                </select>
              </div>

              <!-- Área do Projeto -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Área do Projeto (m²)</label>
                <input 
                  v-model="form.areaProjeto" 
                  type="number" 
                  placeholder="Ex: 10000"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
              </div>

              <!-- Localização -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Localização (Estado)</label>
                <select v-model="form.localizacao" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione o estado</option>
                  <option value="SP">São Paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="PR">Paraná</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="BA">Bahia</option>
                  <option value="GO">Goiás</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                </select>
              </div>

              <!-- Bioma -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bioma</label>
                <select v-model="form.bioma" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">Selecione o bioma</option>
                  <option value="mata-atlantica">Mata Atlântica</option>
                  <option value="cerrado">Cerrado</option>
                  <option value="amazonia">Amazônia</option>
                  <option value="caatinga">Caatinga</option>
                  <option value="pampa">Pampa</option>
                  <option value="pantanal">Pantanal</option>
                </select>
              </div>

              <!-- Botão Calcular -->
              <button 
                type="submit"
                class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
              >
                Calcular Compensação
              </button>
            </form>
          </div>

          <!-- Resultado da Cálculo -->
          <div v-if="resultado" class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30 max-w-4xl mx-auto mb-12">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Resultado do Cálculo</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-green-50 rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-green-800 mb-4">Área Necessária</h4>
                <div class="text-3xl font-bold text-green-600 mb-2">{{ resultado.areaNecessaria }} m²</div>
                <div class="text-sm text-green-700">{{ resultado.areaHectares }} hectares</div>
              </div>
              
              <div class="bg-blue-50 rounded-2xl p-6">
                <h4 class="text-lg font-semibold text-blue-800 mb-4">Custo Estimado</h4>
                <div class="text-3xl font-bold text-blue-600 mb-2">R$ {{ resultado.custoEstimado }}</div>
                <div class="text-sm text-blue-700">Baseado no valor médio do mercado</div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-gray-50 rounded-xl">
              <h5 class="font-semibold text-gray-800 mb-2">Detalhes do Cálculo:</h5>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Fator de compensação: {{ resultado.fatorCompensacao }}x</li>
                <li>• Área do projeto: {{ form.areaProjeto }} m²</li>
                <li>• Valor por m²: R$ {{ resultado.valorPorMetro }}</li>
              </ul>
            </div>
          </div>

          <!-- Informações Adicionais -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Cálculo Preciso</h3>
              <p class="text-sm text-gray-600">Baseado nas normas ambientais vigentes e fatores regionais</p>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Custo Estimado</h3>
              <p class="text-sm text-gray-600">Valor aproximado baseado nos preços atuais do mercado</p>
            </div>

            <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
              <div class="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Consultoria</h3>
              <p class="text-sm text-gray-600">Nossa equipe pode ajudar com a implementação</p>
            </div>
          </div>

          <!-- CTA -->
          <div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center shadow-2xl border border-white/30 mt-12">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Precisa de Ajuda Especializada?</h2>
            <p class="text-lg text-gray-600 mb-6">
              Nossa equipe de especialistas ambientais pode auxiliar no processo completo
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                Falar com Especialista
              </button>
              <button class="px-8 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300">
                Solicitar Proposta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- WhatsApp Floating Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <a 
        href="https://wa.me/554192446793?text=Olá! Gostaria de saber mais sobre a calculadora de compensação ambiental."
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
import { ref, reactive } from 'vue'
import Header from '../components/Header.vue'

const form = reactive({
  tipoProjeto: '',
  areaProjeto: '',
  localizacao: '',
  bioma: ''
})

const resultado = ref(null)

const calcularCompensacao = () => {
  if (!form.tipoProjeto || !form.areaProjeto || !form.localizacao || !form.bioma) {
    alert('Por favor, preencha todos os campos')
    return
  }

  const area = parseFloat(form.areaProjeto)
  
  // Fatores de compensação baseados no tipo de projeto e bioma
  let fatorCompensacao = 1
  
  if (form.tipoProjeto === 'empreendimento') fatorCompensacao = 1.5
  else if (form.tipoProjeto === 'construcao') fatorCompensacao = 1.2
  else if (form.tipoProjeto === 'industrial') fatorCompensacao = 2.0
  else if (form.tipoProjeto === 'infraestrutura') fatorCompensacao = 1.8
  
  // Ajuste por bioma
  if (form.bioma === 'mata-atlantica') fatorCompensacao *= 1.3
  else if (form.bioma === 'amazonia') fatorCompensacao *= 1.5
  else if (form.bioma === 'cerrado') fatorCompensacao *= 1.1
  
  const areaNecessaria = Math.ceil(area * fatorCompensacao)
  const areaHectares = (areaNecessaria / 10000).toFixed(2)
  
  // Valor por m² baseado na localização e bioma
  let valorPorMetro = 15 // valor base
  if (form.localizacao === 'SP') valorPorMetro = 20
  else if (form.localizacao === 'RJ') valorPorMetro = 18
  else if (form.localizacao === 'MG') valorPorMetro = 16
  
  if (form.bioma === 'mata-atlantica') valorPorMetro *= 1.2
  else if (form.bioma === 'amazonia') valorPorMetro *= 1.4
  
  const custoEstimado = (areaNecessaria * valorPorMetro).toLocaleString('pt-BR')
  
  resultado.value = {
    areaNecessaria,
    areaHectares,
    custoEstimado,
    fatorCompensacao: fatorCompensacao.toFixed(1),
    valorPorMetro: valorPorMetro.toFixed(2)
  }
}
</script>
