<template>
  <client-only>
    <div>
      <Menu />
      <nuxt />
      <footer-prismic />
    </div>
  </client-only>
</template>

<script>
import FooterPrismic from "~/components/FooterPrismic.vue";
import Menu from "~/components/Menu.vue";


export default {
  components: {
    FooterPrismic, Menu
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>
