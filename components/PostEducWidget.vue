<template>
  <div class="blog-post">
    <div class="style_root__3iCRH">
      <div class="style_rootInner__32CX1">
        <!-- <prismic-image
            v-if="posteduc.data && posteduc.data.image"
            :field="posteduc.data.image"
            sizes="(max-width: 990px) 100vw (min-width: 991px) 57vw"
          /> -->
        <div class="style_title__1jQC3">
          <h2>{{ $prismic.asText(posteduc.data.title) }}</h2>
        </div>
        <prismic-rich-text :field="posteduc.data.texto" class="parrafo" />
      </div>
    </div>
  </div>
</template>

<script>
//import LinkResolver from "~/plugins/link-resolver.js";

export default {
  props: ["posteduc"],
  data: function() {
    return {
      link: "",
      formattedDate: ""
    };
  },
  name: "post-educ-widget",
  methods: {
    // Function to get the first paragraph of text in a blog post and limit the displayed text at 300 characters
    getFirstParagraph(posteduc) {
      const textLimit = 300;
      const slices = posteduc.data.body;
      let firstParagraph = "";
      let haveFirstParagraph = false;

      slices.map(function(slice) {
        if (!haveFirstParagraph && slice.slice_type == "text") {
          slice.primary.text.forEach(function(block) {
            if (block.type == "paragraph" && !haveFirstParagraph) {
              firstParagraph += block.text;
              haveFirstParagraph = true;
            }
          });
        }
      });

      const limitedText = firstParagraph.substr(0, textLimit);

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(" ")) + "...";
      } else {
        return firstParagraph;
      }
    }
  }
  /*created () {
    this.link = LinkResolver(this.menu),
    this.formattedDate = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(this.menu.data.date))
  },*/
};
</script>

<style lang="sass" scoped>
.blog-post
  color: #353535

h2
  margin: 0
</style>
