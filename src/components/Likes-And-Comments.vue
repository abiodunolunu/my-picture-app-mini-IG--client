<template>
  <div class="likes-and-comments">
    <div class="likes-and-comments--links">
      <i @click="likePicture" class="fa-heart" :class="liked ? 'fas': 'far'"></i>
      <i class="far fa-comment"></i>
    </div>
    <div class="post-owner-caption">
      <p>
        <a href="#">{{post.owner.firstname + ' ' + post.owner.lastname}}</a>
        {{ post.caption }}
      </p>
    </div>
    <div
      class="likes-and-comments--likes"
      v-if="likes.length > 0"
    >{{likes.length}} Like{{likes.length > 1? 's': ''}}</div>
    <div class="comments" v-if="isNewestCommentPresent && currentRoute !== 'postDetails'">
      <Comment :comment="post.newestComment"></Comment>
    </div>
    <div class="time-posted">{{ time }}</div>
    <hr />
    <div>
      <form action class="add-a-comment" @submit.prevent="onSubmit">
        <textarea
          @input="auto_grow"
          ref="comment-textarea"
          placeholder="add a comment"
          v-model="myComment"
        ></textarea>
        <input type="submit" value="ADD" />
      </form>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment.vue";
import autosize from "autosize";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  props: {
    post: Object,
  },
  components: {
    Comment,
  },
  data() {
    return {
      myComment: "",
      time: `${moment(this.post.createdAt).fromNow()} `,
      isNewestCommentPresent: this.post.newestComment != null ? true : false,
      openOptions: false,
    };
  },
  computed: {
    ...mapGetters({
      userId: "Auth/userId",
    }),
    likes() {
      return this.post.likes;
    },
    liked() {
      return this.post.likes.some((likes) => likes._id == this.userId);
    },
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
        postId: this.post._id,
      };

      await this.$store.dispatch("Feed/createComment", commentData);
      this.myComment = "";
    },
    likePicture() {
      const likeData = {
        postId: this.post._id,
      };

      this.$store.dispatch("Feed/createLike", likeData);
    },
    currentRoute() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes likeAnime {
  0% {
    transform: scale(0.7);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

.post-owner-caption {
  p {
    font-size: 14px;
    color: lighten($color: #000, $amount: 20%);
    a {
      color: #333;
      font-weight: 700;
      margin-right: 10px;
    }
  }
}

.likes-and-comments {
  padding: 5px 10px;

  &--links {
    i {
      font-size: 20px;
      margin-right: 15px;
      cursor: pointer;

      &.fa-heart {
        color: red;
      }

      &.fas {
        animation: likeAnime 200ms ease-in-out forwards;
      }
    }
  }

  &--likes {
    padding-top: 10px;
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 0.9em;

    span {
      font-weight: 400;
      margin: 0px 3px;
    }

    img {
      height: 35px;
      width: 35px;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 10px;
      font-size: 0.9em;
    }
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
</style>