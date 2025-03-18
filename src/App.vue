<script setup>
import TodoList from './components/TodoList.vue'
</script>

<template>
<Auth v-if="!user" />
<TodoList v-else />
</template>

<style scoped>
</style>
