<template>
  <div class="post">
    <post-options :post="post" />
    <div class="post-image">
      <img :src="`${post.imageUrl}`" alt />
    </div>
    <likes-and-comments :post="post"/>
  </div>
</template>

<script>
import moment from "moment";
import autosize from "autosize";
import PostOptions from "./postOptions";
import LikesAndComments from './Likes-And-Comments'
import { mapGetters } from "vuex";
export default {
  props: {
    post: Object
  },
  components: {
    PostOptions,
    LikesAndComments
  },
  data() {
    return {
      myComment: "",
      time: `${moment(this.post.createdAt).format("lll")} ${moment(
        this.post.createdAt
      ).fromNow()} `,
      isNewestCommentPresent: this.post.newestComment != null ? true : false,
      openOptions: false
    };
  },
  computed: {
    ...mapGetters({
      userId: "Auth/userId"
    }),
    likes() {
      return this.post.likes;
    },
    liked() {
      return this.post.likes.some(likes => likes._id == this.userId);
    }
  },
  methods: {
    auto_grow() {
      const area = this.$refs["comment-textarea"];
      autosize(area);
      // area.style.height = '5px'
      area.style.height = area.scrollHeight + "px";
    },
    async onSubmit() {
      const commentData = {
        text: this.myComment,
        postId: this.post._id
      };

      await this.$store.dispatch("Feed/createComment", commentData);
      this.myComment = "";
    },
    likePicture() {
      const likeData = {
        postId: this.post._id
      };

      this.$store.dispatch("Feed/createLike", likeData);
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #fff;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 4px 10px -5px #333;

  &-image {
    width: 100%;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      // object-fit: contain;
    }
  }

  &-owner-caption {
    padding: 5px 10px;

    p {
      font-size: 0.85em;

      a {
        font-weight: 700;
        font-size: 0.8em;
        color: #000222;
      }
    }

    img {
      height: 45px;
      width: 45px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 10px;
    }
  }

 
  .comments {
    margin-top: 10px;
  }

  .time-posted {
    margin-top: 10px;
    color: lighten(#000000, 50%);
    font-size: 0.85rem;
    font-weight: 700;
    font-family: monospace;
    text-transform: uppercase;
  }

  .add-a-comment {
    margin-top: 10px;
    width: 100%;
    position: relative;
    // border: 1px solid red;
    // border: 1px solid #ddd;
    // box-shadow: 0px -3px 10px -9px #000;
    border-radius: 5px;
    padding-top: 5px;
    overflow: hidden;

    textarea {
      height: 100%;
      width: 100%;
      resize: none;
      outline: none;
      border-radius: 5px;
      padding-left: 20px;
      padding-right: 60px;
      border: none;
      &::placeholder {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
          "Lucida Sans", Arial, sans-serif;
        text-align: center;
        // font-size: 30px;
        // color: red;
      }
    }

    input[type="submit"] {
      position: absolute;
      top: 50%;
      // bottom: 0;
      transform: translateY(-50%);
      right: 5px;
      background-color: var(--clr-3);
      color: #fff;
      font-size: 12px;
      border: none;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
      padding-top: 5px;
      padding-bottom: 5px;
      cursor: pointer;
      font-weight: 700;

      &:hover,
      &:active {
        background: #ddd;
        color: var(--clr-3);
        box-shadow: 0px 4px 10px -5px #333;
      }
    }
  }
}

hr {
  margin-top: 12px;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.2)
  );
}

@keyframes lineAnime {
  0% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}
</style>
