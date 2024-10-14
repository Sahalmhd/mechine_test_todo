<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="submitRegistration">
      <input v-model="newUser.username" placeholder="Username" type="text" />
      <input v-model="newUser.email" placeholder="Email" type="email" />
      <input v-model="newUser.password" placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // newUser will hold registration details
      newUser: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
  submitRegistration() {
    this.$http.post('/api/register', this.newUser)
      .then(() => {
        console.log('User registered successfully');
        this.$router.push('/login'); // Redirect after registration
      })
      .catch(error => {
        console.error('Error registering user', error);
      });
  }
}

};
</script>
