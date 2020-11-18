<template>
  <div class="d-flex justify-content-center align-items-center container" style="height: 50vh;">
    <section id="addPage" class="row align-items-center">
      <div class="col-5">
        <div v-if="isAddQuizDone">
          <h4>amount: {{ totalQuestion }} </h4>
        </div>
        <form @submit.prevent="addQuiz"  v-if="!isAddQuizDone">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Quiz Name" v-model="name">
          </div>
          <div class="form-group">
            <label for="name">Lesson</label>
            <select v-model="LessonId">
              <option disabled value="">Please select one</option>
              <option v-for="lesson in lessons" :key="lesson.id" v-bind:value="lesson.id"> {{lesson.name}} </option>
            </select>
          </div>
          <div class="form-group">
            <label for="name">Courses</label>
            <select v-model="CourseId">
              <option disabled value="">Please select one</option>
              <option v-for="course in courses" :key="course.id" v-bind:value="course.id"> {{course.name}} </option>
            </select>
          </div>
          <button type="submit" class="btn btn-block btn-info">Add Quiz</button>
        </form>

        <form @submit.prevent="addQuestion"  v-if="isAddQuizDone">
          <div class="form-group">
            <label for="name">Question</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Question Here" v-model="question">
          </div>
          <div class="form-group">
            <label for="name">Choices</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Choices Here" v-model="choices">
          </div>
          <div class="form-group">
            <label for="name">Answer</label>
            <select v-model="answer">
              <option disabled value="">Please select answer</option>
              <option v-for="choice in choices.split(',') " :key="choice" v-bind:value="choice"> {{choice}} </option>
            </select>
          </div>
          <button type="submit" class="btn btn-block btn-info">Add Question</button>
        </form>
      </div>
      <div class="col-4">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="text-center">Add New Quiz</h2>
          <router-link to="/app/quizzes"><button type="button" class="btn btn-primary float-right">Back</button></router-link>
          <button type="button" class="btn btn-primary float-right ml-3" v-if="isAddQuizDone" @click="finish">Finish</button>
        </div>
        <img src="../../assets/add-quiz.png" alt="image" class="w-100">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return{
      isAddQuizDone: false,
      name: '',
      CourseId: '',
      LessonId: '',
      QuizId: '',
      question: '',
      choices: '',
      answer: '',
      totalQuestion: ''
    }
  },
  name: 'AddQuizPage',
  computed: {
    courses () {
      return this.$store.state.courses
    },
    lessons () {
      return this.$store.state.lessons
    },
    quizCourseId () {
      return this.$store.state.quizCourseId
    }
  },
  created () {
    this.$store.dispatch('fetchLessons')
  },
  watch: {
    LessonId: function() {
      const { LessonId } = this
      this.$store.dispatch('fetchCourses', LessonId)
    },
    isAddQuizDone: function() {
      const { CourseId } = this
      this.$store.dispatch('getQuiz', CourseId)
    },
    quizCourseId: function() {
      const found = this.quizCourseId.find(el => el.name === this.name)
      this.QuizId = found.id
    }
  },
  methods:{
    addQuiz(){
      const { name, CourseId } = this
      this.$store.dispatch('addQuiz', {name, CourseId})
      .then(({ data }) => {
        this.isAddQuizDone = true
      })
      .catch(err => {
        console.log(err)
      })
    },
    addQuestion(){
      let choices = this.choices.split(",")
      const { QuizId, answer, question } = this
      this.$store.dispatch('addQuestion', { QuizId, answer, question, choices })
      .then(({ data }) => {
        this.totalQuestion = Number(this.totalQuestion) + 1
        this.question = '',
        this.answer = '',
        this.choices = ''
      })
      .catch(err => {
        console.log(err)
      })
    },
    finish() {
      this.isAddQuizDone = false
      this.$router.push({ name: "QuizPage" })
    }
  }
}
</script>

<style>

</style>
