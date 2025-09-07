<template>
  <ul class="task-list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle-task="$emit('toggle-task', $event)"
      @delete-task="$emit('delete-task', $event)"
    />
  </ul>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  name: "TaskList",
  components: { TaskItem },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
