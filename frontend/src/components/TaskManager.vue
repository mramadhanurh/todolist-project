<template>
    <div class="container mt-5">
      <h1 class="mb-4">Task Manager</h1>
      
      <!-- Form untuk menambahkan atau mengedit task -->
      <form @submit.prevent="submitTask">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" v-model="taskForm.title" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <input type="text" class="form-control" id="description" v-model="taskForm.description" />
        </div>
        <div class="mb-3">
          <label for="tags" class="form-label">Tags</label>
          <input type="text" class="form-control" id="tags" v-model="taskForm.tags" />
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select class="form-select" id="status" v-model="taskForm.status">
            <option :value="true">Completed</option>
            <option :value="false">Not Completed</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update Task' : 'Create Task' }}</button>
        <button type="button" class="btn btn-secondary ms-2" @click="resetForm" v-if="isEditMode">Cancel</button>
      </form>
  
      <!-- Tabel untuk menampilkan task list -->
      <table class="table mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Tags</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.tags }}</td>
            <td>
              <span :class="{'badge bg-success': task.status, 'badge bg-danger': !task.status}">
                {{ task.status ? 'Completed' : 'Not Completed' }}
              </span>
            </td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editTask(task)">Edit</button>
              <button class="btn btn-danger btn-sm ms-2" @click="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getAllTasks, createTask, updateTask, deleteTask } from '@/services/taskService';
  
  export default {
    data() {
      return {
        tasks: [],
        taskForm: {
          id: null,
          title: '',
          description: '',
          tags: '',
          status: false,
        },
        isEditMode: false,
      };
    },
    async created() {
      this.loadTasks();
    },
    methods: {
      // Load semua task dari server
      async loadTasks() {
        try {
          this.tasks = await getAllTasks();
        } catch (error) {
          console.error('Failed to load tasks:', error);
        }
      },
      // Submit form untuk membuat atau mengupdate task
      async submitTask() {
        try {
          if (this.isEditMode) {
            await updateTask(this.taskForm.id, this.taskForm);
          } else {
            await createTask(this.taskForm);
          }
          this.resetForm();
          this.loadTasks();
        } catch (error) {
          console.error('Failed to submit task:', error);
        }
      },
      // Reset form dan batalkan mode edit
      resetForm() {
        this.isEditMode = false;
        this.taskForm = {
          id: null,
          title: '',
          description: '',
          tags: '',
          status: false,
        };
      },
      // Isi form dengan data task untuk mode edit
      editTask(task) {
        this.isEditMode = true;
        this.taskForm = { ...task };
      },
      // Hapus task
      async deleteTask(id) {
        try {
          await deleteTask(id);
          this.loadTasks();
        } catch (error) {
          console.error('Failed to delete task:', error);
        }
      },
    },
  };
  </script>