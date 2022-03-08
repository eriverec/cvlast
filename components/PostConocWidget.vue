<template>
  <div class="blog-post">
    <div class="style_root__3iCRH conoc">
      <div class="style_rootInner__32CX1">
        <div>
          <!-- <prismic-image
            :field="postconoc.data.image"
            sizes="(max-width: 990px) 100vw (min-width: 991px) 57vw"
          /> -->
          <img
            v-if="postconoc.data.image.url"
            :src="postconoc.data.image.url"
            alt="post"
          />
        </div>

        <div class="style_title__1jQC3 text-center">
          <h6>{{ $prismic.asText(postconoc.data.title) }}</h6>
          <!-- <h4>{{postconoc.data.nivel}}</h4> -->
        </div>
        <div class="style_title__1jQC3 text-center">
          <b-progress
            :value="postconoc.data.nivel"
            :variant="
              postconoc.data.nivel <= 30
                ? 'danger'
                : postconoc.data.nivel <= 60
                ? 'warning'
                : 'success'
            "
            show-progress
          ></b-progress>
        </div>
        <!-- <prismic-rich-text :field="postconoc.data.texto" class="parrafo" /> -->
      </div>
    </div>
  </div>
</template>

<script>
//import LinkResolver from "~/plugins/link-resolver.js";
import SlicesBlock from "~/components/SlicesBlock.vue";

export default {
  props: ["postconoc"],
  components: {
    SlicesBlock
  },
  data: function() {
    return {};
  },
  name: "post-conoc-widget"
};
</script>

<style lang="sass" scoped>
.blog-post
  color: #353535

h2
  margin: 0
</style>
