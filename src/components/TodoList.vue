<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../supabase';

const tarefas = ref([]);
const novaTarefa = ref('');
const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (user.value) fetchTarefas();
});

const fetchTarefas = async () => {
  const { data } = await supabase
    .from('tarefas')
    .select('*')
    .eq('user_id', user.value.id)
    .order('id', { ascending: false });

  tarefas.value = data;
};

const addTarefa = async () => {
  if (!novaTarefa.value) return;

  const { data } = await supabase
    .from('tarefas')
    .insert([{ titulo: novaTarefa.value, concluida: false, user_id: user.value.id }]);

  if (data) tarefas.value.unshift(data[0]);
  novaTarefa.value = '';
};
</script>

<template>
  <div>
    <h2>Minhas Tarefas</h2>
    <input v-model="novaTarefa" placeholder="Nova tarefa..." />
    <button @click="addTarefa">Adicionar</button>
    <ul>
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        {{ tarefa.titulo }}
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
  background: #1a1a1a;
  margin: 5px 0;
  cursor: pointer;
}
.done {
  text-decoration: line-through;
  color: rgb(122, 66, 66);
}
</style>