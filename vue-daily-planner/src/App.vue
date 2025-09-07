<template>
  <div v-if="user" class="planner-dashboard">
    <!-- Header -->
    <header>
      <h1>📝 Daily Planner</h1>
      <p>Welcome, {{ user }}</p>
      <button @click="logout" class="logout-btn">
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </button>
    </header>

    <!-- Three columns -->
    <div class="dashboard-columns">

      <!-- LEFT: Pending & Completed Tasks side-by-side -->
      <div class="tasks-column">
        <div class="task-section">
          <h3>🕓 Pending Tasks ({{ pendingTasks.length }})</h3>
          <TaskList
            :tasks="pendingTasks"
            @toggle-task="toggleTask"
            @delete-task="deleteTask"
          />
        </div>

        <div class="task-section completed-section">
          <h3>✅ Completed Tasks ({{ completedTasks.length }})</h3>
          <TaskList
            :tasks="completedTasks"
            @toggle-task="toggleTask"
            @delete-task="deleteTask"
          />
        </div>
      </div>

      <!-- MIDDLE: Add Task Form -->
      <div class="form-column">
        <TaskForm @add-task="addTask" />
      </div>

      <!-- RIGHT: Progress Pie Chart -->
      <div class="chart-column">
        <ProgressPie :tasks="tasks" />
      </div>
    </div>
  </div>

  <!-- LOGIN & REGISTER -->
  <LoginPage v-else @login-success="setUser" @go-register="showRegister = true" />
  <RegisterPage v-if="showRegister && !user" @go-login="showRegister = false" />
</template>

<script>
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";
import ProgressPie from "./components/ProgressPie.vue";

export default {
  name: "App",
  components: { LoginPage, RegisterPage, TaskForm, TaskList, ProgressPie },
  data() {
    const user = localStorage.getItem("loggedInUser") || null;
    const tasks = user
      ? JSON.parse(localStorage.getItem("tasks_" + user)) || []
      : [];
    return { user, tasks, showRegister: false };
  },
  computed: {
    pendingTasks() {
      return this.tasks.filter(t => !t.completed);
    },
    completedTasks() {
      return this.tasks.filter(t => t.completed);
    }
  },
  methods: {
    setUser(username) {
      this.user = username;
      this.showRegister = false;
      this.loadTasks();
    },
    logout() {
      localStorage.removeItem("loggedInUser");
      this.user = null;
      this.tasks = [];
    },
    addTask(task) {
      this.tasks.push(task);
      this.saveTasks();
    },
    toggleTask(id) {
      this.tasks = this.tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      this.saveTasks();
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.saveTasks();
    },
    saveTasks() {
      if (this.user) {
        localStorage.setItem("tasks_" + this.user, JSON.stringify(this.tasks));
      }
    },
    loadTasks() {
      if (this.user) {
        this.tasks = JSON.parse(localStorage.getItem("tasks_" + this.user)) || [];
      }
    }
  }
};
</script>

<style>
.planner-dashboard {
  max-width: 1200px;
  margin: auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  background: #f0f2f5;
  min-height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background: #f44336;
  color: white;
  cursor: pointer;
}

.dashboard-columns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* LEFT tasks column */
.tasks-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Side-by-side task sections for large screens */
@media (min-width: 800px) {
  .tasks-column {
    flex-direction: row;
  }
  .tasks-column .task-section {
    flex: 1;
  }
}

/* MIDDLE form column */
.form-column {
  flex: 1;
  min-width: 280px;
}

/* RIGHT chart column */
.chart-column {
  flex: 1;
  min-width: 280px;
}

/* Task section styling */
.task-section {
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
}

.completed-section {
  background: #f9f9f9;
}
</style>
