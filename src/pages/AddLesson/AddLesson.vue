<template>
  <div class="d-flex justify-content-center align-items-center container" style="height: 50vh;">
    <section id="addPage" class="row align-items-center">
      <div class="col-5">
        <form @submit.prevent="addLesson">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Lesson Name Here" v-model="name">
          </div>
          <button type="submit" class="btn btn-block btn-primary">Add Lesson</button>
        </form>
      </div>
      <div class="col-4">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="text-center">Add New Lesson</h2>
          <router-link to="/app/lessons"><button type="button" class="btn btn-primary float-right">Back</button></router-link>
        </div>
        <img src="../../assets/add-lesson.png" alt="image" class="w-100">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AddLessonPage',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    addLesson () {
      const { name } = this
      this.$store.dispatch('addLesson', name)
        .then(() => {
          this.$router.push({ name: 'LessonPage' })
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
