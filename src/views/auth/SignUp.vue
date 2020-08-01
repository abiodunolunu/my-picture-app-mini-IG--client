<template>
  <div class="parent">
    <div class="container">
      <div class="form-wrapper">
        <div class="brand">MY PICTURE APP</div>
        <auth-error v-if="signupErrors">
          <p v-for="(error, index) in signupErrors" :key="index">{{ error }}</p>
        </auth-error>
        <form @submit.prevent="onSubmit">
          <div class="form-item half-width">
            <input type="text" placeholder="First name" v-model="userInput.firstname" />
          </div>
          <div class="form-item half-width">
            <input type="text" placeholder="Last name" v-model="userInput.lastname" />
          </div>
          <div class="form-item">
            <input type="email" placeholder="Email Address" v-model="userInput.email" />
          </div>
          <div class="form-item">
            <input type="password" placeholder="password" v-model="userInput.password" />
          </div>
          <div class="form-item">
            <input
              type="password"
              placeholder="Re-Enter password"
              v-model="userInput.reEnterPassword"
            />
          </div>
          <div class="form-item submit">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
      <div class="alternative">
        <p>
          Already have an account?
          <router-link to="/Login">Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import authError from "../../components/authErrors.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    authError: authError,
  },
  data() {
    return {
      userInput: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        reEnterPassword: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.userInput.email,
        password: this.userInput.password,
        confirmPassword: this.userInput.reEnterPassword,
        firstname: this.userInput.firstname,
        lastname: this.userInput.lastname,
      };
      // console.log(formData)
      this.$store.dispatch("Auth/signup", formData);
    },
  },
  computed: {
    ...mapGetters({
      signupErrors: "Auth/signupErrors",
    }),
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("Auth/setSignupErrors", null);
    next();
  },
};
</script>

<style lang="scss" scoped>
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

    &.half-width {
      width: 46%;
    }

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
