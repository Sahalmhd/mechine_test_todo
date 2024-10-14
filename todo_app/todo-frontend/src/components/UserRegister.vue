<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="#" @click.prevent="switchToLogin">Login here</a></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Registration successful!');
          this.$emit('switch-view', 'login');
        } else {
          alert('Registration failed');
        }
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    switchToLogin() {
      this.$emit('switch-view', 'login');
    }
  }
};
</script>
