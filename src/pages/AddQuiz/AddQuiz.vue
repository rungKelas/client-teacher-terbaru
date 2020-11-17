<template>
  <div class="d-flex justify-content-center align-items-center container" style="height: 50vh;">
    <section id="addPage" class="row align-items-center">
      <div class="col-5">
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="name">Question</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Quiz Name Here" v-model="name">
          </div>
          <div class="form-group">
            <label for="name">Choices</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Quiz Name Here" v-model="name">
          </div>
          <div class="form-group">
            <label for="name">Answer</label>
            <input type="text" class="form-control" id="name" autocomplete="off" placeholder="Enter Quiz Name Here" v-model="name">
          </div>
          <button type="submit" class="btn btn-block btn-info">Add Quiz</button>
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
}
</script>

<style>

</style>
