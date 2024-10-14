<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="#" @click.prevent="switchToRegister">Register here</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    // Handle login logic
    async handleLogin() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          }),
        });
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
          this.$emit('login-success');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    switchToRegister() {
      this.$emit('switch-view', 'register');
    }
  }
};
</script>
