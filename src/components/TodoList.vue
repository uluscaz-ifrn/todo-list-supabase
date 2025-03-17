<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../supabase';

const tarefas = ref([]);
const novaTarefa = ref('');
const fetchTarefas = async () => {
  const { data, error } = await supabase.from('tarefas').select('*').order('id', { ascending: false });
  console.log('Tarefas do Supabase:', data, error);
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

const toggleTarefa = async (tarefa) => {
  const { error } = await supabase.from('tarefas').update({ concluida: !tarefa.concluida }).eq('id', tarefa.id);
  if (error) console.error(error);
  else tarefa.concluida = !tarefa.concluida;
};

const deleteTarefa = async (id) => {
  const { error } = await supabase.from('tarefas').delete().eq('id', id);
  if (error) console.error(error);
  else tarefas.value = tarefas.value.filter(t => t.id !== id);
};

onMounted(fetchTarefas);
</script>

<template>
    <h1>Lista de Tarefas</h1>
    <div class="add-task">
      <input v-model="novaTarefa" placeholder="Nova tarefa..." />
      <button @click="addTarefa">Adicionar</button>
    </div>
    <ul>
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        <span :class="{ done: tarefa.concluida }" @click="toggleTarefa(tarefa)">
          {{ tarefa.titulo }}
        </span>
        <button @click="deleteTarefa(tarefa.id)">❌</button>
      </li>
    </ul>
</template>