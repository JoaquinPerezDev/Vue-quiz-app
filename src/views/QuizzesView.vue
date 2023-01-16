<script setup>
  import q from "../assets/data/quizzes.json"
  import gsap from "gsap"
  import {ref, watch} from "vue"
  import Card from "../components/Card.vue";

  const quizzes = ref(q)
  const search = ref("")

  watch(search, () => {
    quizzes.value = q.filter(quiz => quiz.name.toLowerCase().includes(search.value.toLowerCase()))
  })

  const beforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(-60px)"
  }
  const enter = (el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      delay: el.dataset.index * 0.3
    })
  }
  const afterEnter = () => {
    console.log("AFTER ENTER")
    //Not necessary but is included to demonstrate the available 
    //options for the lifecycle hook of the transition
  }
</script>

<template>
  <div class="container">
    <header>
      <h1>Quizzes</h1>
      <input v-model.trim="search" type="text" placeholder="Search...">
    </header>
    <div class="options-container">
      <TransitionGroup 
        name="card" 
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <Card 
          v-for="(quiz, index) in quizzes" 
          :key="quiz.id" 
          :quiz="quiz"
          :data-index="index"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }

  header h1 {
    font-weight: bold;
    margin-right: 30px;
  }

  header input {
    border: none;
    background-color: rgba(128,128,128,0.1);
    padding: 10px;
    border-radius: 5px;
  }

  .options-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .card-enter-from {
    transform: translateY(-50px);
    opacity: 0;
  }

  .card-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .card-enter-active {
    transition: all 0.4s ease;
  }
</style>