<script setup>
  import Question from '../components/Question.vue' 
  import QuizHeader from '../components/QuizHeader.vue'
  import Result from '../components/Result.vue'
  import { useRoute } from 'vue-router'
  import { ref, watch, computed } from 'vue'
  import quizes from '../assets/data/quizzes.json'
  
  const route = useRoute()

  const quizId = parseInt(route.params.id)

  const quiz = quizes.find(q => q.id === quizId)

  const currentQuestionIndex = ref(0)

  const numberOfCorrectAnswers = ref(0)

  const showResults = ref(false)

  // Watch allows us to listen to specific values in our state for changes. 

  // const questionStatus = ref(`${currentQuestionIndex.value}/${quiz.questions.length}`)

  // watch(() => currentQuestionIndex.value, () => {
  //   questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`
  // })

  // The variation below is a more efficient use of state via computing the values. The reason 
  // being that we don't need to use ref and watch, we just define the values to compute. 

  // const questionStatus = computed(() => {
  //   return `${currentQuestionIndex.value}/${quiz.questions.length}`
  // })

  // Even more efficient is writing the above code in one line, turning 5 lines of code into 1.
  const questionStatus = computed(() => `${currentQuestionIndex.value}/${quiz.questions.length}`)
  const barPercentage = computed(() => `${currentQuestionIndex.value}/${quiz.questions.length * 100}%`)

  const onOptionSelected = (isCorrect) => {
    if(isCorrect) {
      numberOfCorrectAnswers.value++
    }

    if(quiz.questions.length - 1 === currentQuestionIndex.value) {
      showResults.value = true
    }
    currentQuestionIndex.value++
  }
</script>

<template>
  <div>
    <QuizHeader  
      :questionStatus="questionStatus"
      :barPercentage="barPercentage"
    />
    <div>
      <Question 
        v-if="!showResults"
        :question="quiz.questions[currentQuestionIndex]"
        @selectOption="onOptionSelected"
      />
      <Result 
        v-else
        :quizQuestionLength="quiz.questions.length"
        :numberOfCorrectAnswers="numberOfCorrectAnswers"
      />
    </div>

    <button @click="currentQuestionIndex++">Next Question</button>
  </div>
</template>
