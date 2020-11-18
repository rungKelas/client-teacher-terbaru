import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import layout from './layout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
  },
  state: {
    teacher: [],
    students: [],
    lessons: [],
    courses: [],
    quizzes: [], //maybe is all of quiz the teacher have
    selectedLessons: [],
    quizCourseId: [] //all quiz based on CourseId
  },
  mutations: {
    setTeacher (state, payload) {
      state.teacher = payload
    },
    setLessons (state, payload) {
      state.lessons = payload
    },
    setStudents (state, payload) {
      state.students = payload
    },
    setCourses (state, payload) {
      state.courses = payload
    },
    setQuizCourseId (state, payload) {
      state.quizCourseId = payload
    }
  },
  actions: {
    login (context, payload) {
      const { email, password } = payload
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/teacher/login',
        data: {
          email,
          password
        }
      })
    },
    fetchLessons (context) {
      const TeacherId = localStorage.getItem('teacherId')
      axios({
        method: 'GET',
        url: `http://localhost:3000/lessons/${TeacherId}`
      })
        .then(({ data }) => {
          context.commit('setLessons', data)
        })
        .catch(err => {
          throw err.response
        })
    },
    addLesson (context, name) {
      const teacherId = localStorage.getItem('teacherId')

      return axios({
        method: 'POST',
        url: `http://localhost:3000/teacher/lesson/${teacherId}`,
        data: {
          name,
          teacherId
        }
      })
    },
    fetchStudents (context) {
      const TeacherId = localStorage.getItem('teacherId')
      axios({
        method: 'GET',
        url: `http://localhost:3000/teacher/student-list/${TeacherId}`
      })
        .then(({ data }) => {
          context.commit('setStudents', data)
        })
    },
    addCourse (context, payload) {
      const { name, materialUrl, LessonId } = payload
      return axios({
        url: 'http://localhost:3000/teacher/course/'+LessonId,
        method: 'post',
        data: {
          name, materialUrl
        }
      })
    },
    fetchCourses(context, payload){
      axios({
        url: 'http://localhost:3000/courses/'+ payload,
        method: 'get'
      })
      .then(({ data }) => {
        context.commit('setCourses', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addQuiz(context, payload){
      const { name, CourseId } = payload
      return axios({
        url: 'http://localhost:3000/teacher/quiz/' + CourseId,
        method: 'post',
        data: {
          name
        }
      })
    },
    getQuiz(context, payload) {
      axios({
        url: 'http://localhost:3000/quiz/' + payload,
        method: 'get'
      })
      .then(({ data }) => {
        context.commit('setQuizCourseId', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addQuestion(context, payload) {
      const { QuizId, answer, question, choices } = payload
      return axios({
        url: 'http://localhost:3000/teacher/question/' + QuizId,
        method: 'post',
        data: {
          answer, question, choices
        }
      })
    }
  }
});
