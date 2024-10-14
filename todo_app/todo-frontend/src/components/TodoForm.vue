<template>
  <div class="container mt-4">
    <form @submit.prevent="saveTodo">
      <!-- Title Input Field -->
      <div class="mb-3">
        <label for="title" class="form-label">Task Title</label>
        <input 
          v-model="title" 
          type="text" 
          class="form-control" 
          id="title" 
          placeholder="Enter a task" 
        />
      </div>

      <!-- Description Input Field -->
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea 
          v-model="description" 
          class="form-control" 
          id="description" 
          rows="3" 
          placeholder="Enter a description"
        ></textarea>
      </div>

      <!-- Save Button -->
      <button type="submit" class="btn btn-primary">Save Task</button>
    </form>
  </div>
</template>

<script>
import Service from '../services/Service';

export default {
  data() {
    return {
      title: '',
      description: '',
    };
  },
  methods: {
    saveTodo() {
      const todoData = { title: this.title, description: this.description };
      Service.createTodo(todoData).then(() => {
        this.$emit('todo-saved');
        this.title = '';
        this.description = '';
      });
    }
  }
};
</script>

<style scoped>
/* Optional: Custom styling for the form */
.container {
  max-width: 500px;
}
</style>
