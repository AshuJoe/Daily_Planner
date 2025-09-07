<template>
  <div class="login-card">
    <h2>🔑 Daily Planner Login</h2>

    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <p>
      Don’t have an account? 
      <a href="#" @click.prevent="$emit('go-register')">Register here</a>
    </p>
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256"

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    hashPassword(pwd) {
      return sha256(pwd).toString()
    },
    handleLogin() {
      const users = JSON.parse(localStorage.getItem("users")) || {}
      const storedHash = users[this.username]

      if (!storedHash) {
        alert("User not found! Please register.")
        return
      }

      if (storedHash === this.hashPassword(this.password)) {
        localStorage.setItem("loggedInUser", this.username)
        this.$emit("login-success", this.username)
      } else {
        alert("❌ Wrong password!")
      }
    }
  }
}
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  text-align: center;
}

.login-card h2 {
  margin-bottom: 1.5rem;
}

.login-card input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.login-card button {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.login-card button:hover {
  background: #45a049;
}

.login-card p {
  margin-top: 1rem;
}

.login-card a {
  color: #2196f3;
  text-decoration: none;
}

.login-card a:hover {
  text-decoration: underline;
}
</style>
