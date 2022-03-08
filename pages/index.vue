<template>
  <div>
    <section class="home animate__animated animate__fadeIn">
      <article>
        <div
          class="blog-avatar"
          :style="{ backgroundImage: 'url(' + image + ')' }"
        ></div>
        <!-- Template for page title -->

        <template> </template>
        <h1 class="blog-title">
          {{ $prismic.asText(homepageContent.headline) }}
        </h1>
        <p class="blog-description">
          {{ $prismic.asText(homepageContent.description) }}
        </p>
      </article>
    </section>
    <section class=" animate__animated animate__fadeIn pt-5 pb-4">
      <article>
        <div v-if="campoposts.length !== 0" class="blog-main">
          <h3 class=" ml-2">Campos de trabajo</h3>
          <section class="blog-post">
            <div class="imagen__section">
              <div v-for="postcampo in campoposts" :key="postcampo.id">
                <post-campo-widget :postcampo="postcampo"></post-campo-widget>
              </div>
            </div>
          </section>
        </div>

        <div v-else class="blog-main">
          <p>No Posts published at this time.</p>
        </div>
      </article>
    </section>
    <section class="educ animate__animated animate__fadeIn pt-5 pb-4">
      <article>
        <div v-if="educposts.length !== 0" class="blog-main">
          <h3 class="text-light ml-2 mb-4">Estudios realizados</h3>
          <section class="blog-post">
            <div class="imagen__section">
              <div v-for="posteduc in educposts" :key="posteduc.id">
                <post-educ-widget :posteduc="posteduc"></post-educ-widget>
              </div>
            </div>
          </section>
        </div>

        <div v-else class="blog-main">
          <p>No Posts published at this time.</p>
        </div>
      </article>
    </section>
    <section class=" animate__animated animate__fadeIn pt-5 pb-4">
      <article>
        <div v-if="expposts.length !== 0" class="blog-main">
          <h3 class=" ml-2">Experiencia laboral</h3>
          <section class="blog-post">
            <div class="imagen__section">
              <div v-for="postexp in expposts" :key="postexp.id">
                <post-exp-widget :postexp="postexp"></post-exp-widget>
              </div>
            </div>
          </section>
        </div>

        <div v-else class="blog-main">
          <p>No Posts published at this time.</p>
        </div>
      </article>
    </section>
    <section class="educ animate__animated animate__fadeIn pt-5 pb-4">
      <article>
        <div v-if="referposts.length !== 0" class="blog-main">
          <h3 class="text-light ml-2">Referencia personal</h3>

          <section class="blog-post">
            <div class="imagen__section">
              <div v-for="postrefer in referposts" :key="postrefer.id">
                <post-refer-widget :postrefer="postrefer"></post-refer-widget>
              </div>
            </div>
          </section>
        </div>

        <div v-else class="blog-main">
          <p>No Posts published at this time.</p>
        </div>
      </article>
    </section>
    <section class="animate__animated animate__fadeIn pt-5 pb-4">
      <article>
        <div v-if="conocposts.length !== 0" class="blog-main">
          <h3 class="ml-2">Conocimientos y dominios</h3>

          <section class="blog-post">
            <b-row class="imagen__section">
              <b-col
                v-for="postconoc in conocposts"
                :key="postconoc.id"
                cols="12"
                md="4"
                lg="4"
                sm="4"
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
  </div>
</template>

<style scoped>
.css-loading {
  text-align: center;
  width: 40%;
  margin: auto;
}

.css-loading .css-ske-1 {
  height: 3rem;
}
</style>

<script>
// Importing blog posts widget
import BlogWidget from "~/components/BlogWidget.vue";
import PostCampoWidget from "~/components/PostCampoWidget.vue";
import PostEducWidget from "~/components/PostEducWidget.vue";
import PostExpWidget from "~/components/PostExpWidget.vue";
import PostReferWidget from "~/components/PostReferWidget.vue";
import PostConocWidget from "~/components/PostConocWidget.vue";

export default {
  name: "Home",
  components: {
    BlogWidget,
    PostCampoWidget,
    PostEducWidget,
    PostReferWidget,
    PostExpWidget,
    PostConocWidget
  },
  data() {
    return {
     
    };
  },
  head() {
    return {
      title: this.title
    };
  },
 
  async asyncData({ $prismic, error }) {
    try {
      // Query to get blog home content
      const homepageContent = (await $prismic.api.getSingle("blog_home")).data;

      // Query to get posts content to preview
      // const blogPosts = await $prismic.api.query(
      //   $prismic.predicates.at("document.type", "post"),
      //   { orderings: "[my.post.date desc]" }
      // );

      const conocPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "postconoc"),
        { orderings: "[my.postconoc.nivel desc]",pageSize: 100, }
      );

      const campoPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "postcampo"),
        // { orderings: "[my.postcampo.date desc]" }
      );

      const referPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "postrefer")
        // { orderings: "[my.postrefer.date desc]" }
      );

      const expPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "postexp")
        // { orderings: "[my.postexp.date desc]" }
      );

      const educPosts = await $prismic.api.query(
        $prismic.predicates.at("document.type", "posteduc")
        // { orderings: "[my.posteduc.date desc]" }
      );

      // Returns data to be used in template
      return {
        homepageContent,
        // posts: blogPosts.results,
        image: homepageContent.image.url,
        campoposts: campoPosts.results,
        educposts: educPosts.results,
        expposts: expPosts.results,
        referposts: referPosts.results,
        conocposts: conocPosts.results
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
  // max-width: 700px
  margin: auto
  text-align: center
  height: 100vh
  display: flex;
  justify-content: center
  align-items: center
  background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%);
  .blog-avatar
    height: 200px
    width: 200px
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
    margin: 0px 20px;
</style>
