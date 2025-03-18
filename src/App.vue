<script setup>
import TodoList from './components/TodoList.vue'

const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;
});
</script>

<template>
<Auth v-if="!user" />
<TodoList v-else />
</template>

<style scoped>
</style>
