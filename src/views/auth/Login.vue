<template>
  <div class="parent">
    <div class="container">
      <div class="form-wrapper">
        <div class="brand">MY PICTURE APP</div>
        <p class="msg" v-if="msg">{{ this.msg }}</p>
        <auth-errors v-if="signInErrors">
          <p v-for="(error, index) in signInErrors" :key="index">{{error}}</p>
        </auth-errors>
        <form @submit.prevent="onSubmit">
          <div class="form-item">
            <input type="text" placeholder="username or email" v-model="userInput.email" />
          </div>
          <div class="form-item">
            <input type="password" placeholder="Password" v-model="userInput.password" />
          </div>
          <div class="form-item submit">
            <input type="submit" value="Log In" />
          </div>
        </form>
        <div class="options">
          <div class="OR">
            <hr />
            <p>OR</p>
            <hr />
          </div>
          <a href>Forgot password?</a>
        </div>
      </div>
      <div class="alternative">
        <!-- <p>Don't have an account <a href="/signup">Sign up</a></p> -->
        <p>
          Don't have an account
          <router-link to="/signup">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import authErrors from "../../components/authErrors";
import { mapGetters } from "vuex";
export default {
  components: {
    authErrors: authErrors,
  },
  data() {
    return {
      msg: "",
      userInput: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.userInput.email,
        password: this.userInput.password,
      };

      this.$store.dispatch("Auth/signin", formData);
    },
  },
  computed: {
    ...mapGetters({ signInErrors: "Auth/signInErrors" }),
  },

  created() {
    if (this.$router.currentRoute.params.msg) {
      this.msg = this.$router.currentRoute.params.msg;
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("Auth/setSignInErrors", null);
    next();
  },
};
</script>

<style lang="scss" scoped>
.msg {
  width: 100%;
  text-align: center;
  padding: 8px;
  background-color: lightgreen;
  color: darkgreen;
  margin-bottom: 20px;
}

.parent {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 8px;
}
.container {
  width: 100%;
  max-width: 450px;

  .brand {
     font-size: 20px;
    color: var(--clr-3);
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
  }
}

.form-wrapper {
  padding: 1.5rem;
  border: 1px solid #ccc;
  background-color: #fff;

  form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .form-item {
    width: 100%;
    background-color: darken(#fff, 8%);
    margin-bottom: 10px;
    height: 35px;

    &.submit {
      margin-top: 30px;
    }

    input {
      background-color: transparent;
      width: 100%;
      height: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
      outline: none;
      border: 1px solid #ccc;

      &[type="submit"] {
        background-color: var(--clr-1);
        color: var(--clr-5);
        text-transform: uppercase;
        font-weight: 700;
        cursor: pointer;
        transition: 200ms ease-in;

        &:hover,
        &:active {
          transform: scale(0.95);
          background-color: lighten(#000222, 50%);
        }
      }
    }
  }

  .options {
    margin-top: 30px;
    text-align: center;

    a {
      color: #1a73e8;
      font-size: 0.9em;

      &:hover,
      &:active {
        text-decoration: underline;
      }
    }

    .OR {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        padding-left: 20px;
        padding-right: 20px;
      }

      hr {
        height: 2px;
        background: #ddd;
        border: none;
        flex: 1;
      }
    }
  }
}

.alternative {
  padding: 1.5rem;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;

  a {
    color: #1a73e8;
  }
}
</style>
