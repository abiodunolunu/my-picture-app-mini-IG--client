<template>
  <div class="parent-of-posts" v-if="allPosts.length > 0">
    <single-post v-for="post of allPosts" :key="post._id" :post="post"></single-post>
  </div>
  <div v-else-if="loading">
    <loading />
  </div>
  <div style="display: flex; justify-content: center; align-items: center; height: 30vh" v-else>
      <p style="font-weight: 700; font-size: 24px">No Post Yet...</p>
  </div>
</template>

<script>
import SinglePostVue from "./SinglePost.vue";
import Loading from "./Loading";
import { mapGetters } from "vuex";
export default {
  components: {
    singlePost: SinglePostVue,
    Loading,
  },
  computed: {
    ...mapGetters({
        allPosts: "Feed/allPosts",
        loading: "Feed/loading"
    }),
  },
};
</script>

<style lang="scss">
.parent-of-posts {
  margin-top: 50px;
  display: grid;
  place-items: center;
  padding: 8px;
}
</style>