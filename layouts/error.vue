<template>
  <section class="outer-container home">
    
    <h1 v-if="error.statusCode === 404">Página no encontrada</h1>
    <h1 v-else>An error occurred</h1>
    <nuxt-link to="/" style="text-decoration: underline;">Vuelve al inicio</nuxt-link>
  </section>
</template>

<style scoped>
.home{
  
  margin-top: initial;
}
</style>

<script>
export default {
  props: ['error'],
  head () {
    return {
      title: 'Prismic Nuxt.js Blog',
    }
  },
}
</script>