<template>
  <div class="tables-basic">
    <div class="d-flex align-items-center justify-content-between">
      <h2 class="page-title">Course <span class="fw-semi-bold">Lists</span></h2>
      <button type="button" class="btn btn-primary float-right" @click.prevent="changePage">Add Course</button>
    </div>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Table <span class='fw-semi-bold'>Courses</span></h5>"
          customHeader settings close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Materi</th>
                  <th>Mata Pelajaran</th>
                  <th class="hidden-sm-down">Link Materi</th>
                  <th class="hidden-sm-down">Quiz</th>
                </tr>
              </thead>
              <tbody>
                <CourseRow v-for="(course, index) in courses" :key="course.id" :course="course" :index="index" />
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import CourseRow from '@/components/CourseRow/CourseRow';

export default {
  name: 'CoursePage',
  components: { Widget, CourseRow },
  computed: {
    courses () {
      return this.$store.state.courses
    }
  },
  methods: {
    changePage () {
      this.$router.push({ name: 'AddCoursePage' })
    }
  },
  created () {
    this.$store.dispatch('fetchCourses')
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.access_token) {
      next()
    } else {
      next({ name: 'LoginPage' })
    }
  },
};
</script>

<style src="./Course.scss" lang="scss" scoped />
