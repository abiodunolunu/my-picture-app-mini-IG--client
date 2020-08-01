<template>
  <div class="post__links">
    <div class="post__links--profile">
      <img src="/avi.png" alt />
      <p class="name">{{post.owner.firstname + " " + post.owner.lastname}}</p>
    </div>
    <div class="post__links--options">
      <a href="#" @click.prevent="openOptions = true">•••</a>
      <div
        class="post__links--options__menu"
        :class="openOptions ==  true ? 'open': ''"
        ref="optionsMenu"
        @click="closeOptions"
      >
        <div class="container">
          <p @click="deletePost" v-if="isOwner">Delete Post</p>
          <p v-if="this.$route.name != 'postDetails'" @click="$router.push({name: 'postDetails', params: {postId: post._id}})">Go to post</p>
          <p @click="copyLink">Copy Link</p>
          <p @click="openOptions = false">Cancel</p>
        </div>
      </div>
      <p v-if="copySuccess" class="copy-success">Link copied!</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "postOptions",
  props: {
    post: Object,
  },
  data() {
    return {
      openOptions: false,
      linkToCopy: window.location.origin + "/p/" + this.post._id,
      copySuccess: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: "Auth/userId",
    }),
    isOwner() {
      return this.post.owner._id === this.userId;
    },
  },
  methods: {
    closeOptions(e) {
      if (e.target === this.$refs.optionsMenu) {
        this.openOptions = false;
      }
    },
    deletePost() {
      this.$store.dispatch("Feed/deleteAPost", this.post._id);
    },
    copyLink() {
      this.$clipboard(this.linkToCopy);
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 2500);
      this.openOptions = false;
    },
  },
};
</script>

<style scoped lang="scss">
@keyframes fromTop {
  from {
    bottom: -30px;
    opacity: 0;
  }

  to {
    bottom: 0px;
    opacity: 1;
  }
}

.copy-success {
  background-color: #000;
  color: #fa4f00;
  position: fixed;
  left: 0;
  right: 0;
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 0.9em;
  letter-spacing: 0.5px;
  animation: fromTop 250ms forwards;
  z-index: 1;
}

.post__links {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-content: center;
  padding: 5px 10px;
  background-color: #fff;

  a {
    color: #333;
  }

  &--profile {
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      height: 50px;
      width: 50px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 10px;
    }

    p {
      font-weight: 500;
      font-size: 0.9em;
    }
  }

  &--options {
    display: flex;
    align-items: center;

    &__menu {
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100vh;
      z-index: 5;
      height: 0;
      display: none;
      justify-content: center;
      align-items: center;
      padding: 8px;

      &.open {
        display: flex;
        height: 100vh;
      }

      .container {
        background-color: #fff;
        width: 100%;
        max-width: 300px;
        border-radius: 10px;
        overflow: hidden;

        p {
          cursor: pointer;
          font-weight: 700;
          font-size: 0.9em;
          text-align: center;
          padding-top: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #ddd;

          &:last-of-type {
            border-bottom: none;
          }

          &:hover {
            background-color: rgba(0, 0, 255, 0.5);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>