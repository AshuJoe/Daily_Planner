<template>
  <div class="progress-container">
    <h3>📊 Task Progress</h3>
    <div class="progress-bar">
      <div
        class="progress-completed"
        :style="{ width: completedPercent + '%' }"
      ></div>
    </div>
    <p>{{ completedTasks }} / {{ totalTasks }} completed</p>
  </div>
</template>

<script>
export default {
  name: "ProgressChart",
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalTasks() {
      return this.tasks.length
    },
    completedTasks() {
      return this.tasks.filter(t => t.completed).length
    },
    completedPercent() {
      if (!this.totalTasks) return 0
      return (this.completedTasks / this.totalTasks) * 100
    }
  }
}
</script>

<style>
.progress-container {
  width: 100%;
  max-width: 400px;
  margin: 1rem auto;
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  margin: 0.5rem 0;
}

.progress-completed {
  height: 100%;
  background: #4caf50;
  transition: width 0.5s ease;
}
</style>
