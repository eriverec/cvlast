<template>
  <section class="home animate__animated animate__fadeIn">
    <article>
      <div
        class="blog-avatar"
        :style="{ backgroundImage: 'url(' + image + ')' }"
      ></div>
      <!-- Template for page title -->

      <b-skeleton-wrapper :loading="loading">
        <template #loading>
          <p class="css-loading">
            <b-skeleton class="css-ske-1" width="100%"></b-skeleton>
            <b-skeleton width="100%"></b-skeleton>
          </p>
        </template>
        <h1 class="blog-title">
          {{ $prismic.asText(homepageContent.headline) }}
        </h1>
        <p class="blog-description">
          {{ $prismic.asText(homepageContent.description) }}
        </p>
      </b-skeleton-wrapper>
      <!-- 
 
      <div v-if="posts.length !== 0" class="blog-main">
      
        <section v-for="post in posts" :key="post.id" v-bind:post="post" class="blog-post">
       
          <blog-widget :post="post"></blog-widget>
        </section>
      </div>
    
      <div v-else class="blog-main">
        <p>No Posts published at this time.</p>
      </div> -->
    </article>
  </section>
</template>


<style scoped>
.css-loading {
  text-align: center;
  width: 40%;
  margin: auto;
}

.css-loading .css-ske-1{
  height: 3rem;
}
</style>

<script>
// Importing blog posts widget
import BlogWidget from "~/components/BlogWidget.vue";

export default {
  name: "Home",
  components: {
    BlogWidget
  },
  data() {
    return {
      loading: false,
      loadingTime: 0,
      maxLoadingTime: 1
    };
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.clearLoadingTimeInterval();

        if (newValue) {
          this.$_loadingTimeInterval = setInterval(() => {
            this.loadingTime++;
          }, 1000);
        }
      }
    },
    loadingTime(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (newValue === this.maxLoadingTime) {
          this.loading = false;
        }
      }
    }
  },
  created() {
    this.$_loadingTimeInterval = null;
  },
  mounted() {
    this.startLoading();
  },
  methods: {
    clearLoadingTimeInterval() {
      clearInterval(this.$_loadingTimeInterval);
      this.$_loadingTimeInterval = null;
    },
    startLoading() {
      this.loading = true;
      this.loadingTime = 0;
    }
  },
  head() {
    return {
      title: "Prismic Nuxt.js Blog"
    };
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query to get blog home content
      const homepageContent = (await $prismic.api.getSingle("blog_home")).data;

      // Query to get posts content to preview
      const blogPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "post"),
        { orderings: "[my.post.date desc]" }
      );

      // Returns data to be used in template
      return {
        homepageContent,
        posts: blogPosts.results,
        image: homepageContent.image.url
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
  text-align: center
  .blog-avatar
    height: 140px
    width: 140px
    border-radius: 50%
    background-position: center
    background-size: cover
    margin: 1em auto
  .blog-description
    font-size: 25px
    color: #aaa
    line-height: 30px
    margin-bottom: 3rem
    padding-bottom: 3rem
    font-weight: 900;

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
