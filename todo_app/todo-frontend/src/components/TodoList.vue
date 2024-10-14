<template>
  <div class="container mt-5">
    <!-- Card for Todo List -->
    <div class="card">
      <!-- Card Header with Button in the top-right -->
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4>Todo List</h4>
        <!-- Create Button -->
        <button class="btn btn-success" @click="openModal">Create Todo</button>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <!-- Todo Form -->
        <todo-form @todo-saved="fetchTodos"></todo-form>

        <!-- Todo List -->
        <ul class="list-group mt-4">
          <todo-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @todo-updated="fetchTodos"
            @todo-deleted="fetchTodos"
            class="list-group-item mb-2"
          ></todo-item>
        </ul>
      </div>
    </div>
  </div>

  <!-- Create Todo Modal -->
  <div class="modal" tabindex="-1" v-if="showModal" @click.self="closeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Todo</h5>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveTodo">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                id="title"
                v-model="newTodo.title"
                class="form-control"
                placeholder="Enter a task title"
              />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                id="description"
                v-model="newTodo.description"
                class="form-control"
                placeholder="Enter a task description"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../services/Service';
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoForm, TodoItem },
  data() {
    return {
      todos: [],
      showModal: false,  // Controls modal visibility
      newTodo: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    fetchTodos() {
      Service.getAllTodos().then(res => {
        this.todos = res.data;
      });
    },
    openModal() {
      this.showModal = true;  // Show the modal when the "Create Todo" button is clicked
    },
    closeModal() {
      this.showModal = false;  // Hide the modal when clicked outside or on the close button
    },
    saveTodo() {
      const todoData = { title: this.newTodo.title, description: this.newTodo.description };
      Service.createTodo(todoData).then(() => {
        this.fetchTodos();
        this.closeModal(); // Close the modal after saving the todo
        this.newTodo.title = '';  // Clear the input fields
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
/* You can add custom styles here */
</style>
