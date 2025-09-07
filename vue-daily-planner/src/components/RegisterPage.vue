<template>
  <div class="register-card">
    <h2>📝 Create Account</h2>

    <form @submit.prevent="handleRegister">
      <input v-model="username" type="text" placeholder="Choose username" required />
      <input v-model="password" type="password" placeholder="Choose password" required />
      <button type="submit">Register</button>
    </form>

    <p>
      Already have an account? 
      <a href="#" @click.prevent="$emit('go-login')">Back to Login</a>
    </p>
  </div>
</template>

<script>
import sha256 from "crypto-js/sha256"

export default {
  name: "RegisterPage",
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
    handleRegister() {
      const users = JSON.parse(localStorage.getItem("users")) || {}

      if (users[this.username]) {
        alert("❌ Username already exists! Try another one.")
        return
      }

      users[this.username] = this.hashPassword(this.password)
      localStorage.setItem("users", JSON.stringify(users))

      alert("✅ Registered successfully! Please log in.")
      this.$emit("go-login")
    }
  }
}
</script>

<style scoped>
.register-card {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
  text-align: center;
}

.register-card h2 {
  margin-bottom: 1.5rem;
}

.register-card input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.register-card button {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.register-card button:hover {
  background: #45a049;
}

.register-card p {
  margin-top: 1rem;
}

.register-card a {
  color: #2196f3;
  text-decoration: none;
}

.register-card a:hover {
  text-decoration: underline;
}
</style>
