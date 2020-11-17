<template>
  <div>
    <div class="d-flex align-items-center justify-content-between">
      <h1 class="page-title">
        Quiz <span class="fw-semi-bold">Lists</span>
      </h1>
      <button type="button" class="btn btn-primary float-right" @click.prevent="changePage">Add Quiz</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizPage',
  methods: {
    changePage () {
      this.$router.push({ name: 'AddQuizPage' })
    }
  }
};
</script>

<style src="./Quiz.scss" lang="scss" scoped />
