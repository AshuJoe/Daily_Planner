<template>
  <li class="task-item">
    <div class="task-card">
      <div class="task-header">
        <strong>{{ task.title }}</strong>
        <span class="category">{{ task.category }}</span>
      </div>
      <p v-if="task.description">{{ task.description }}</p>
      <small>{{ task.date }} {{ task.time }}</small>

      <button
        v-if="!task.completed"
        class="complete-btn"
        @click="$emit('toggle-task', task.id)"
      >
        Mark Completed
      </button>
    </div>
    <button class="delete-btn" @click="$emit('delete-task', task.id)">
      <i class="fa-solid fa-trash"></i>
    </button>
  </li>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["task"]
};
</script>

<style>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-card {
  flex: 1;
  background: #f4f4f4;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  position: relative;
}

.task-card .task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.task-card .category {
  background: #2196f3;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
}

.completed .task-card {
  background: #e0e0e0;
  text-decoration: line-through;
  color: #666;
}

.task-card small {
  display: block;
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.3rem;
}

.complete-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

.complete-btn:hover {
  background: #45a049;
}

.delete-btn {
  border: none;
  background: transparent;
  color: #f44336;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.delete-btn:hover {
  color: #d32f2f;
}
</style>
