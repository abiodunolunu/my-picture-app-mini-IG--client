<template>
  <div class="parent">
    <div class="container" v-if="singlePost">
      <div class="post--content">
        <div class="image">
          <post-options :post="singlePost.post" />
          <img :src="`${singlePost.post.imageUrl}`" alt />
        </div>
        <div class="content">
          <likes-and-comments :post="singlePost.post" />
          <div class="comments">
            <h2 style="text-align: center">Comments</h2>
            <div class="a-comment" v-for="(comment) in singlePost.comments" :key="comment._id">
              <div class="comment-image">
                <img src="/avi.png" alt />
              </div>
              <div class="comment-text">
                <strong>
                  <p class="name">{{comment.author.firstname + " " + comment.author.lastname}}</p>
                </strong>
                <p class="text">{{comment.text}}</p>
                <p class="time">{{moment(comment.createdAt).fromNow()}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostOptions from "../components/postOptions";
import LikesAndComments from "../components/Likes-And-Comments";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  props: {
    postId: String,
  },
  components: { PostOptions, LikesAndComments },
  data() {
    return {
      commentTime: this.singlePost,
      moment: moment,
    };
  },
  computed: {
    ...mapGetters({
      singlePost: "Feed/singlePost",
    }),
  },
  created() {
    this.$store.dispatch("Feed/getSinglePost", this.postId);
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 8px;
  .post--content {
    // background-color: #fff;
    width: 100%;
    max-width: 800px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    align-items: center;
    justify-content: center;

    .image {
      grid-row: 1/2;
      box-shadow: 0px 3px 12px -6px #333;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .content {
      background-color: #fff;
      // outline: 1px solid red;
      // max-height: 500px;
      min-height: 200px;
      // height: 100%;
      display: grid;
      grid-template-rows: auto auto;
      box-shadow: 0px 3px 12px -6px #333;
    }
  }
}

.caption {
  border-bottom: 1px solid #ccc;
  padding: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  &__image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.comments {
  border-top: 1px solid #ccc;
  grid-row: 1/2;
  padding: 8px;
  padding-top: 20px;
  overflow-y: auto;
  height: 100%;
  max-height: 300px;
  // overflow: hidden;
  .a-comment {
    display: flex;
    padding-top: 8px;
    padding-bottom: 8px;
    .comment-image {
      height: 45px;
      width: 45px;
      margin-right: 10px;
      flex-shrink: 0;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .comment-text {
      display: flex;
      flex-wrap: wrap;

      .name {
        margin-right: 10px;
      }

      .text {
        font-size: 14px;
      }

      .time {
        width: 100%;
        color: #777;
        font-size: 13px;
      }
    }
  }
}

@media (max-width: 615px) {
  .comments {
    grid-row: 2/3;
  }
}
</style>