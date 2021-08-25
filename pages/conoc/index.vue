<template>
  <section class="home animate__animated animate__fadeIn" >
    <!-- <Back /> -->
    <article>
      <div v-if="conocposts.length !== 0" class="blog-main">
        <section class="blog-post">
          <b-row class="imagen__section">
            <b-col
              v-for="postconoc in conocposts"
              :key="postconoc.id"
              cols="12"
              md="12"
              lg="12"
              sm="12"
            >
              <post-conoc-widget :postconoc="postconoc"></post-conoc-widget>
            </b-col>
          </b-row>
        </section>
      </div>

      <div v-else class="blog-main">
        <p>No Posts published at this time.</p>
      </div>
    </article>
  </section>
</template>

<script>
// Importing blog posts widget
import PostConocWidget from "~/components/PostConocWidget.vue";
import Back from '~/components/Back.vue';

export default {
  components: {
    PostConocWidget, Back
  },
  data() {
    return {
      title: "Conocimientos"
    }
  },
  head() {
    return {
      title: this.title
    };
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query to get blog home content
      //const homepageContent = (await $prismic.api.getSingle('blog_home')).data

      // Query to get posts content to preview
      // const blogPosts = await $prismic.api.query(
      //   $prismic.predicates.at("document.type", "post"),
      //   { orderings : '[my.post.date desc]' }
      // )

      const conocPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "postconoc"),
       // { orderings: "[my.postconoc.date desc]" }
      );

      // Returns data to be used in template
      return {
        //homepageContent,
        // posts: blogPosts.results,
        conocposts: conocPosts.results

        //image: homepageContent.image.url,
      };
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: "Page not found" });
    }
  }
};
</script>

<style lang="sass" scoped>
.home
  max-width: 700px
  margin: auto
 
  .blog-avatar
    height: 140px
    width: 140px
    border-radius: 50%
    background-position: center
    background-size: cover
    margin: 1em auto
  .blog-description
    font-size: 18px
    color: #9A9A9A
    line-height: 30px
    margin-bottom: 3rem
    padding-bottom: 3rem
    font-family: 'Lato', sans-serif
    border-bottom: 1px solid #DADADA

.blog-main
  max-width: 700px
  margin: auto
  text-align: left
  &.single img
    width: 100%
    height: auto
  &.single a
    text-decoration: none
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%)
    background-repeat: repeat-x
    background-size: 2px 2px
    background-position: 0 23px

.blog-post
  margin: 0
  margin-bottom: 3rem

@media (max-width: 767px)
  
  .blog-main
    padding: 0
    font-size: 18px
</style>
