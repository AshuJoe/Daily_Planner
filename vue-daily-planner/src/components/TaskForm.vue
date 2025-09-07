<template>
  <form @submit.prevent="submitTask" class="task-form">
    <input v-model="title" type="text" placeholder="Task title" required />
    <input v-model="description" type="text" placeholder="Description (optional)" />
    <input v-model="date" type="date" required />
    <input v-model="time" type="time" required />
    <input v-model="category" type="text" placeholder="Category (optional)" />
    <button type="submit"><i class="fa-solid fa-plus"></i> Add Task</button>
  </form>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return {
      title: "",
      description: "",
      date: "",
      time: "",
      category: ""
    };
  },
  methods: {
    submitTask() {
      if (!this.title || !this.date || !this.time) return;
      const newTask = {
        id: Date.now(),
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
        category: this.category.trim() || "General",
        completed: false
      };
      this.$emit("add-task", newTask);
      this.title = this.description = this.date = this.time = this.category = "";
    }
  }
};
</script>

<style>
.task-form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.task-form input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.task-form button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  background: #4caf50;
  color: white;
  cursor: pointer;
}

.task-form button:hover {
  background: #45a049;
}
</style>
