<script setup>
import { ref, onMounted } from 'vue';
import supabase from '../supabase';

const tasks = ref([]);
const novatask = ref('');
const user = ref(null);

onMounted(async () => {
  const { data } = await supabase.auth.getUser();
  user.value = data.user;

  if (user.value) fetchtasks();
});

const fetchtasks = async () => {
  const { data } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.value.id)
    .order('id', { ascending: false });

  tasks.value = data;
};

const addtask = async () => {
  if (!novatask.value) return;

  const { data } = await supabase
    .from('tasks')
    .insert([{ titulo: novatask.value, concluida: false, user_id: user.value.id }]);

  if (data) tasks.value.unshift(data[0]);
  novatask.value = '';
};

const deleteTask = async (taskId) => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) {
    console.error("Erro ao excluir task:", error);
  } else {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  }
};

const toggletask = async (task) => {
   const { error } = await supabase.from('tasks').update({ concluida: !task.concluida }).eq('id', task.id);
   if (error) console.error(error);
   else task.concluida = !task.concluida;
 };
</script>

<template>
  <div>
    <h2>Minhas tasks</h2>
    <input v-model="novatask" placeholder="Nova task..." />
    <button @click="addtask">Adicionar</button>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <span :class="{ done: task.concluida }" @click="toggletask(task)">
        {{ task?.titulo ?? "task sem título" }}
      </span>
        <button v-if="task?.id" @click="deleteTask(task.id)">❌ Remover</button>
      </li>
    </ul>
  </div>
</template>
<style scoped>
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