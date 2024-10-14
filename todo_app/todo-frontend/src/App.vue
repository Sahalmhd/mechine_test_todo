<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h3>Todo List</h3>
        <button class="btn btn-primary btn-sm" @click="toggleCreateCard">Create Task</button>
      </div>
      <div class="card-body">
        <ul class="list-group">
          <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @todo-updated="fetchTodos"
            @todo-deleted="fetchTodos"
          ></todo-item>
        </ul>
      </div>
    </div>

    <!-- Conditional create task card -->
    <div v-if="isCreateCardVisible" class="card mt-3">
      <div class="card-header">Create Todo</div>
      <div class="card-body">
        <form @submit.prevent="saveTodo">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="newTodo.title"
              placeholder="Enter a task title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              class="form-control"
              v-model="newTodo.description"
              placeholder="Enter a task description"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save Task</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Service from './services/Service';
import TodoItem from './components/TodoItem.vue';

export default {
  components: { TodoItem },
  data() {
    return {
      todos: [],
      isCreateCardVisible: false,
      newTodo: { title: '', description: '' }
    };
  },
  methods: {
    fetchTodos() {
      Service.getAllTodos().then(res => {
        this.todos = res.data;
      });
    },
    toggleCreateCard() {
      this.isCreateCardVisible = !this.isCreateCardVisible;
    },
    saveTodo() {
      const todoData = { title: this.newTodo.title, description: this.newTodo.description };
      Service.createTodo(todoData).then(() => {
        this.fetchTodos();
        this.toggleCreateCard();
        this.newTodo.title = '';
        this.newTodo.description = '';
      });
    }
  },
  mounted() {
    this.fetchTodos();
  }
};
</script>

<style scoped>
/* Optional styling for App.vue */
</style>
