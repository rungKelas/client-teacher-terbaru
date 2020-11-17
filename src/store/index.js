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
    selectedLessons: []
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
    }
  }
});
