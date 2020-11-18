<template>
  <div class="d-flex justify-content-center align-items-center container" style="height: 50vh;">
    <section id="addPage" class="row align-items-center">
      <div class="col-5">
        <form @submit.prevent="addCourse">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Course Name Here" v-model="name">
          </div>
          <div class="form-group">
            <label for="name">Link Url</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Link Material" v-model="materialUrl">
          </div>
          <div class="form-group">
            <label for="name">Lessons  </label>
            <select v-model="LessonId">
              <option disabled value="">Please select one</option>
              <option v-for="lesson in lessons" :key="lesson.id" v-bind:value="lesson.id"> {{lesson.name}} </option>
            </select>
          </div>
          <button type="submit" class="btn btn-block btn-info">Add Course</button>
        </form>
      </div>
      <div class="col-4">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="text-center">Add New Course</h2>
          <router-link to="/app/courses"><button type="button" class="btn btn-primary float-right">Back</button></router-link>
        </div>
        <img src="../../assets/add-course.png" alt="image" class="w-100">
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AddCoursePage',
  data(){
    return {
      name: '',
      materialUrl: '',
      LessonId: ''
    }
  },
  computed: {
    lessons () {
      return this.$store.state.lessons
    }
  },
   created () {
    this.$store.dispatch('fetchLessons')
  },
  methods: {
    addCourse() {
      const { name, materialUrl, LessonId } = this
      this.$store.dispatch('addCourse', { name, materialUrl, LessonId })
      .then(({ data }) => {
        this.$router.push({ name: 'CoursePage' })
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

}
</script>

<style>

</style>
