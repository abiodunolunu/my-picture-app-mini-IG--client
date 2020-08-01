<template>
  <div class="new-post-parent" ref="newPostParent" @click="goHome">
    <div class="wrapper">
      <div class="image" v-if="imageUrl">
        <img :src="imageUrl" alt />
      </div>
      <form @submit.prevent="onSubmit">
        <label>
          <input type="file" @change="compressImage" accept="image/*" />
          <span>select image</span>
        </label>
        <textarea name="caption" placeholder="say something here" v-model="imageInput.caption"></textarea>
        <input type="submit" value="Post!" :disabled="!ready" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imageInput: {
        caption: "",
        compressedfile: "",
      },
      imageUrl: "",
      ready: false,
    };
  },
  methods: {
    goHome(e) {
      if (e.target === this.$refs.newPostParent) {
        this.$router.push("/home");
      }
    },
    compressImage(e) {
      if (e.target.files.length < 1) {
        return;
      }
      this.ready = false;
      const file = e.target.files[0];
      const width = 400;
      let scaleFactor;
      let height;
      const fileName = file.name;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          scaleFactor = width / img.width;
          height = img.height * scaleFactor;
          const elem = document.createElement("canvas");
          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          ctx.canvas.toBlob(
            (blob) => {
              const file = new File([blob], fileName, {
                type: "image/png",
                lastModified: Date.now(),
              });
              localStorage.setItem("image", file);
              this.imageInput.compressedfile = file;
              this.imageUrl = URL.createObjectURL(file);
              this.ready = true;
            },
            "image/jpeg",
            1
          );
        };
        reader.onerror = (error) => console.log(error);
      };
    },
    async onSubmit() {
      this.ready = false;
      const formdata = new FormData();
      formdata.append("image", this.imageInput.compressedfile);
      const upload = await axios.put("/api/post-image", formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = upload.data.imageUrl;
      const imagePublicId = upload.data.imagePublicId;
      const postInput = {
        imageUrl: imageUrl,
        imagePublicId: imagePublicId,
        caption: this.imageInput.caption,
      };

      this.$store.dispatch("Feed/createPost", postInput).then((result) => {
        this.$router.push("/home");
        this.ready = true;
        return result;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes open {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.new-post-parent {
  position: fixed;
  min-height: 100vh;
  background-color: rgba($color: #000, $alpha: 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: bottom;
  animation: open 250ms forwards;
  padding: 10px;

  .wrapper {
    overflow: hidden;
    background: #fff;
    width: 100%;
    max-width: 500px;
    padding-bottom: 5px;
    border-radius: 10px;
    .image {
      max-height: 60vh;
      width: 100%;
      overflow: auto;
      background: #ddd;

      img {
        width: 100%;
        // height: 100%;
        // object-fit: cover;
        // height: 100%;
      }
    }

    form {
      position: relative;

      label {
        display: block;
        width: 90%;
        position: relative;
        height: 30px;
        cursor: pointer;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;

        &:hover span {
          background: var(--clr-2);
          color: #fff;
          transform: scale(0.97);
        }

        input {
          all: unset;
          height: 0;
          width: 0;
        }

        span {
          position: absolute;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--clr-1);
          width: 100%;
          color: #fff;
          transition: all 200ms ease-out;
        }
      }

      textarea {
        width: 100%;
        resize: none;
        font-size: 16px;
        outline: 0;
        padding: 5px 10px;
        border: 0;
        border-top: 1px solid var(--clr-1);
        border-bottom: 1px solid var(--clr-1);
        font-family: inherit;

        &::placeholder {
          font-family: monospace;
          text-align: center;
        }
      }

      input[type="submit"] {
        display: block;
        background: var(--clr-1);
        color: #eee;
        border: 0;
        outline: none;
        width: 90%;
        max-width: 150px;
        margin: auto;
        margin-top: 10px;
        padding: 5px 10px;
        height: 30px;

        &:hover {
          background: var(--clr-3);
          // width: 100%;
          transform: scale(0.95);
          transition: all 200ms linear;
          cursor: pointer;
        }

        &[disabled] {
          background-color: var(--clr-4);
          transform: none;
          // pointer-events: none;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
