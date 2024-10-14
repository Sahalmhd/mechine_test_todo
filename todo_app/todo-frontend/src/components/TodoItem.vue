<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <!-- Container for Task Title and Status, aligned left -->
    <div class="d-flex align-items-center w-75">
      <!-- Task Name -->
      <span :class="{'text-decoration-line-through': todo.completed}" class="todo-title">
        {{ todo.title }}
      </span>
      
      <!-- Status Badge -->
      <span 
        v-if="todo.completed" 
        class="badge bg-success ms-3"
      >
        Completed
      </span>
      
      <span 
        v-else 
        class="badge bg-warning ms-3"
      >
        Pending
      </span>
    </div>
    
    <!-- Action Buttons (Aligned Right) -->
    <div class="action-buttons">
      <button 
        class="btn btn-success btn-sm me-2" 
        @click="markAsComplete"
        :disabled="todo.completed"
      >
        Mark Complete
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteTodo">
        Delete
      </button>
    </div>
  </li>
</template>

<script>
import Service from '../services/Service';

export default {
  props: ['todo'],
  methods: {
    markAsComplete() {
      Service.updateTodo(this.todo.id, { completed: true }).then(() => {
        this.$emit('todo-updated');
      });
    },
    deleteTodo() {
      Service.deleteTodo(this.todo.id).then(() => {
        this.$emit('todo-deleted');
      });
    }
  }
};
</script>

<style scoped>
/* Title styling */
.todo-title {
  font-weight: 500;
  font-size: 1rem;
  margin-right: 10px;
}

/* Styling for when the task is marked as complete */
.text-decoration-line-through {
  text-decoration: line-through;
  color: grey;
}

/* Customize badge styling */
.badge {
  font-size: 0.85rem;
  padding: 5px 10px;
}

/* Align task name and status to the left */
.d-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.d-flex > span {
  margin-left: 10px;
}

/* Ensure action buttons are aligned to the right */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* Ensure buttons have proper spacing */
button {
  margin-left: 10px;
}

/* Disable button opacity */
button:disabled {
  opacity: 0.6;
}
</style>
