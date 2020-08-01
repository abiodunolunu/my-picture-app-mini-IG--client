<template>
  <header>
    <nav class="nav-bar">
      <router-link activeClass="active" href="#" to="/home" class="brand">MY PICTURE APP</router-link>
      <ul class="nav-list">
        <li class="nav-list__item" v-if="isAuth"  @click="toggle()">
          <router-link tag="a"  activeClass="active" class="nav-list__link" to="/home">Home</router-link>
        </li>
        <li class="nav-list__item" v-if="!isAuth"  @click="toggle()">
          <router-link tag="a"  activeClass="active" class="nav-list__link" to="/login">Login</router-link>
        </li>
        <li class="nav-list__item" v-if="!isAuth"  @click="toggle()">
          <router-link tag="a"  activeClass="active" class="nav-list__link" to="/signup">Signup</router-link>
        </li>
        <li class="nav-list__item" v-if="isAuth">
          <a class="nav-list__link"  activeClass="active" @click.prevent="logout" v-if="isAuth">Logout</a>
        </li>
      </ul>
      <div class="menu-icon" @click="toggle()">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    logout() {
      this.toggle()
      this.$store.dispatch("Auth/logout");
    },
    toggle() {
      const navList = document.querySelector(".nav-list");
      const menu = document.querySelector(".menu-icon");
      const children = menu.querySelectorAll("span");
      children.forEach(ele => {
        ele.classList.toggle("open");
      });
      navList.classList.toggle("show");
    }
  },
  computed: {
    ...mapGetters({
      isAuth: "Auth/isAuth"
    })
  },
  beforeRouteChange() {
      this.toggle()
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: var(--clr-1);
  height: 70px;

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    position: relative;
    height: 100%;

    .brand {
      height: 100%;
      font-weight: 700;
      height: 35px;
      display: flex;
      align-items: center;
      color: var(--clr-5);
    }

    .nav-list {
      height: 100%;
      list-style: none;

      &__item {
        display: inline-block;
        height: 100%;
        margin-left: 0;
        margin-right: 0;
        &:last-of-type {
          margin-right: 0;
        }
      }

      &__link {
        display: flex;
        align-items: center;
        padding-right: 8px;
        padding-left: 8px;
        height: 100%;
        width: 100%;
        color: var(--clr-4);
        font-size: 0.9rem;

        &:hover,
        &:active,
        &:focus,
        &.active {
          background-color: var(--clr-3);
          font-weight: 700;
        }
      }
    }

    .menu-icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 30px;
      cursor: pointer;
      display: none;
    }

    .menu-icon span {
      display: block;
      height: 2px;
      background-color: var(--clr-4);
      margin-bottom: 4px;
      pointer-events: none;
      transition: 0.2s ease-in;
      border-radius: 5px;
    }

    .menu-icon span:nth-of-type(3) {
      margin-bottom: 0px;
    }

    .menu-icon span:nth-of-type(1).open {
      transform: rotate(45deg) translateX(10px);
      background-color: var(--clr-2);
    }

    .menu-icon span:nth-of-type(3).open {
      transform: rotate(-45deg) translateX(7px);
      background-color: var(--clr-2);
    }

    .menu-icon span:nth-of-type(2).open {
      background-color: rebeccapurple;
      transform: translateY(30px);
      transform: translateX(30px);
      opacity: 0;
    }
  }
}

@media (max-width: 50em) {
  header {
    .nav-bar {
      .nav-list {
        z-index: 5;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        // height: 100vh;
        display: block;
        background-color: #fff;
        padding-top: 4rem;
        box-shadow: 4px 4px 20px -10px var(--clr-1);
        transition: transform 250ms ease-in;
        transform: translateY(-110%);

        &.show {
          transform: translateY(0);
        }

        &__item {
          display: block;
          height: 35px;
          text-align: center;
          width: 100%;
        }

        &__link {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--clr-3);
          font-size: 0.9em;
          height: 100%;

          &:hover,
          &:active,
          &:active,
          &.active {
            color: var(--clr-5);
          }
        }
      }

      .menu-icon {
        display: block;
        z-index: 5;
      }
    }
  }
}
</style>