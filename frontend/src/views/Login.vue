<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="max-w-md w-full">
      <div class="card">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" class="input-field" placeholder="seu@email.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input type="password" class="input-field" placeholder="••••••••">
          </div>
          <button type="submit" class="btn-primary w-full">Entrar</button>
        </form>
        <p class="text-center mt-4 text-gray-600">
          Não tem uma conta? 
          <router-link to="/register" class="text-tokenverde-600 hover:underline">Cadastre-se</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Login component
</script> 