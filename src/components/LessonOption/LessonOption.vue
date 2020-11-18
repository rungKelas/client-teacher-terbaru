<template>
  <option v-bind:value="lesson.id">{{ lesson.name }}</option>
</template>

<script>
export default {
  name: 'LessonOption',
  props: [ 'lesson' ]
}
</script>

<style>

</style>