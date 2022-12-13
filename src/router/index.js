import { createRouter, createWebHistory } from "vue-router";
import QuizzesViewVue from "../views/QuizzesView.vue";
import QuizViewVue from "../views/QuizView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'quizes',
      component: QuizzesViewVue
    },
    {
      path: "/quiz/:id",
      name: 'quiz',
      component: QuizViewVue
    }
  ]
})

export default router

