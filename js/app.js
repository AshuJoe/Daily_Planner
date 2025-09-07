const app = Vue.createApp({
    data() {
        return {
            newTaskTitle: '',
            newTaskDescription: '',
            newTaskDate: '',
            tasks: JSON.parse(localStorage.getItem('tasks')) || []
        }
    },
    methods: {
        addTask() {
            if (this.newTaskTitle.trim() === '' || this.newTaskDate === '') return;

            const task = {
                id: Date.now(),
                title: this.newTaskTitle,
                description: this.newTaskDescription,
                dueDate: this.newTaskDate,
                completed: false
            };

            this.tasks.push(task);

            // Reset form
            this.newTaskTitle = '';
            this.newTaskDescription = '';
            this.newTaskDate = '';

            this.saveTasks();
        },
        removeTask(id) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
        },
        toggleComplete(task) {
            task.completed = !task.completed;
            this.saveTasks();
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }
    }
});

app.mount('#app');