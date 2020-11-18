<template>
  <div class="d-flex justify-content-center align-items-center container" style="height: 50vh;">
    <section id="addPage" class="row align-items-center">
      <div class="col-5">
        <form @submit.prevent="addQuiz">
          <div class="form-group">
            <label for="name">Quiz Name</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Quiz Name Here" v-model="name">
          </div>
          <button type="submit" class="btn btn-block btn-primary">Add Quiz</button>
        </form>
      </div>
      <div class="col-4">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="text-center">Add New Quiz</h2>
          <router-link to="/app/quizzes"><button type="button" class="btn btn-primary float-right">Back</button></router-link>
        </div>
        <img src="../../assets/add-quiz.png" alt="image" class="w-100">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AddQuizPage',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    courses () {
      return this.$store.state.courses
    }
  },
  methods: {
    addQuiz () {
      const { name } = this

      this.$store.dispatch('addQuiz', name)
        .then(() => {
          this.$router.push({ name: 'QuizPage' })
        })
        .catch(err => {
          throw err.response
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.access_token) {
      next()
    } else {
      next({ name: 'LoginPage' })
    }
  },
}
</script>

<style>

</style>
