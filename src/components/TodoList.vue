<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../supabase';

const fetchTarefas = async () => {
  const { data, error } = await supabase.from('tarefas').select('*').order('id', { ascending: false });
  if (error) console.error(error);
  else tarefas.value = data;
};

const addTarefa = async () => {
  if (!novaTarefa.value) return;
  
  const { data, error } = await supabase.from('tarefas').insert([{ titulo: novaTarefa.value, concluida: false }]);
  if (error) console.error(error);
  else {
    tarefas.value.unshift(data[0]);
    novaTarefa.value = '';
  }
};

</script>

<template>
    <h1>Lista de Tarefas</h1>
    <div class="add-task">
      <input v-model="novaTarefa" placeholder="Nova tarefa..." />
      <button @click="addTarefa">Adicionar</button>
    </div>
    <ul>
      <li v-for="tarefa in tarefas" :key="tarefa.id"></li>
    </ul>
</template>