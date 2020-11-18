<template>
  <tr>
    <td>{{ quiz.id }}</td>
    <td>{{ quiz.name }}</td>
    <td>{{ quiz.Course.name }}</td>
  </tr>
</template>

<script>
export default {
  name: 'QuizRow',
  props: [ 'quiz' ],
  methods: {
    toDrive (link) {
      window.location.href = link;
    }
  }
}
</script>

<style>
.click {
  color: #238AD1;
}
</style>