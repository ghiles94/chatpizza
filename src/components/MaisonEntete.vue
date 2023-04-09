<template>
  <div class="mt-5">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MaisonEntete',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #f48c24;
}
</style>
