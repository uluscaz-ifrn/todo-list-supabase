<script setup>
import { ref } from 'vue';
import supabase from '../supabase';

const email = ref('');
const password = ref('');
const isSignUp = ref(false);
const errorMessage = ref('');

const handleAuth = async (isLogin) => {
  let result;
  if (isLogin) {
    result = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
  } else {
    result = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
  }

  if (result.error) {
    errorMessage.value = result.error.message;
    console.error("Erro:", result.error);
  } else {
    console.log("Usuário autenticado:", result.data);
  }
};
</script>

<template>
  <div>
    <v-text-field v-model="email" type="email" placeholder="Digite seu e-mail"/>
    <v-text-field v-model="password" type="password" placeholder="Digite sua senha" />
    <v-btn @click="handleAuth(true)">Login</v-btn>
    <v-btn @click="handleAuth(false)">Cadastrar</v-btn>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
