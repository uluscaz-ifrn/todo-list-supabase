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
  <div class="container">
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
  </div>
</template>
<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f4f4f4;
  margin: 5px 0;
  cursor: pointer;
}
.done {
  text-decoration: line-through;
  color: gray;
}
</style>