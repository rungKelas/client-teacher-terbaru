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

    quizzes: [],
    selectedLessons: [],
    quizCourseId: [],
    questions: []

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

    setQuizzes (state, payload) {
      state.quizzes = payload
    },
    setQuizCourseId (state, payload) {
      state.quizCourseId = payload
    },
    setSelectedQuiz (state, payload) {
      state.questions = payload
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
    register (context, payload) {
      const { name, address, birthdate, email, password } = payload
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/teacher/register',
        data: {
          name,
          address,
          birthdate,
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
        .catch(err => {
          throw err.response
        })
    },
    fetchCourses (context) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/teacher/course`
      })
        .then(({ data }) => {
          context.commit('setCourses', data)
        })
        .catch(err => {
          throw err.response
        })
    },
    addCourse (context, payload) {
      const { name, LessonId, materialUrl } = payload

      return axios({
        method: 'POST',
        url: `http://localhost:3000/teacher/course/${LessonId}`,
        data: {
          name,
          materialUrl
        }
      })
    },
    fetchQuizzes (context) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/teacher/quiz/`
      })
        .then(({ data }) => {
          context.commit('setQuizzes', data)
        })
        .catch(err => {
          throw err.response
        })
    },
    addQuiz (context, payload) {
      const { name, CourseId } = payload

      return axios({
        method: 'POST',
        url: `http://localhost:3000/teacher/quiz/${CourseId}`,

        data: {
          name
        }
      })
    },

    getQuiz (context, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/quiz/${payload}`
      })
      .then(({ data }) => {
        context.commit('setQuizCourseId', data)
      })
      .catch(err => {

        throw err
      })
    },
    addQuestion (context, payload) {
      const { QuizId, answer, question, choices } = payload

      return axios({
        method: 'POST',
        url: `http://localhost:3000/teacher/question/${QuizId}`,
        data: {
          question,
          answer,
          choices
        }
      })
    },
    fetchQuestionByQuizId (context, id) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/${id}`
      })
        .then(({ data }) => {
          context.commit('setSelectedQuiz', data)
        })
        .catch(err => {
          throw err.response
        })

    }
  }
});
