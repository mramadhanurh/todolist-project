// src/router/index.js
import Vue from "vue";
import VueRouter from "vue-router";
import TaskManager from "../components/TaskManager.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/tasks",
    name: "TaskManager",
    component: TaskManager,
  },
  // Route lainnya bisa ditambahkan di sini
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;