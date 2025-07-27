<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Cadastro</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input type="text" class="input-field" placeholder="Seu nome completo">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="input-field" placeholder="seu@email.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <button type="submit" class="btn-primary w-full">Cadastrar</button>
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
// Register component
</script> 