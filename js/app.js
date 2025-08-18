const app = Vue.createApp({
  data() {
    return {
      newTask: '',
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push(this.newTask);
        this.newTask = '';
        this.saveTasks();
      }
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
});
app.mount('#app');
