<template>
  <div class="home">
    <all-post></all-post>
    <div class="link-to-new-post" ref="newPostBtn">
      <a @click="goToNewPost" to="/home/new">
        <i class="fa fa-plus"></i>
      </a>
    </div>
    <div class="newPost">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AllPostsVue from "@/components/AllPosts.vue";

export default {
  name: "Home",
  components: {
    allPost: AllPostsVue,
  },
  data() {
    return {
      isScrolling: "",
    };
  },
  methods: {
    goToNewPost() {
      this.$router.push("/home/new");
    },
  },
  mounted() {
    const self = this;
    window.addEventListener("scroll", () => {
      if(!self.$refs.newPostBtn) {
        return
      }
      window.clearTimeout(self.isScrolling);

      self.isScrolling = setTimeout(() => {
        self.$refs.newPostBtn.classList.remove("inactive");
      }, 100);

      self.$refs.newPostBtn.classList.add("inactive");
    });
  },
  created() {
    this.$store.dispatch("Feed/getAllPosts");
  },
};
</script>

<style lang="scss" scoped>
.home {
  .inactive {
    opacity: 0.5;
    pointer-events: none;
  }

  .link-to-new-post {
    position: fixed;
    bottom: 72px;
    right: 5px;
    background-color: var(--clr-1);
    border-radius: 10px;
    overflow: hidden;
    transition: 200ms ease;
    box-shadow: 0px 0px 10px -3px #000;

    &:hover {
      transform: scale(0.95);
    }

    a {
      color: #fff;
      font-size: 0.9em;
      display: block;
      width: 100%;
      height: 100%;
      padding: 8px 0;
      text-transform: uppercase;
      font-weight: 500;
      width: 50px;
      display: flex;
      justify-content: center;
      i.fa {
        color: #fff;
        font-size: 20px;
      }

      &:hover {
        background-color: var(--clr-3);

        i.fa {
          color: #fff;
        }
      }
    }
  }
}
</style>
