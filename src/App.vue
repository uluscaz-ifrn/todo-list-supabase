<script setup>
import { ref, onMounted } from 'vue';
import Auth from './components/Auth.vue';
import TodoList from './components/TodoList.vue'
import supabase from './supabase';

const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null;
});
});
</script>

<template>
  <div v-if="user">
    <TodoList />
    <button @click="supabase.auth.signOut()">Sair</button>
  </div>
  <Auth v-else />
</template>

<style scoped>
</style>
