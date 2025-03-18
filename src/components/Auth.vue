<script setup>
import { ref } from 'vue';
import supabase from '../supabase';

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');

const handleAuth = async () => {
  errorMessage.value = '';
  const authMethod = isSignUp.value ? supabase.auth.signUp : supabase.auth.signInWithPassword;
  const { error } = await authMethod({ email: email.value, password: password.value });

  if (error) errorMessage.value = error.message;
  else window.location.reload(); // Atualiza após login
};
</script>

<template>
  <div>
    <h2>{{ isSignUp ? "Cadastre-se" : "Login" }}</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="handleAuth">{{ isSignUp ? "Cadastrar" : "Entrar" }}</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <a @click="isSignUp = !isSignUp">
      {{ isSignUp ? "Já tem conta? Faça login!" : "Não tem conta? Cadastre-se!" }}
    </a>
  </div>
</template>
