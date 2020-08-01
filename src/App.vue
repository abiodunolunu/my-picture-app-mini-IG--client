<template>
  <div id="app">
    <div id="nav">
      <nav-bar />
    </div>
    <main>
      <transition name="zoom" mode="out-in">
        <router-view />
      </transition>
    </main>
    <footer-comp />
    <feed-flash-messages />
  </div>
</template>

<script>
import FeedFlashMessages from "./components/FeedFlashMessages.vue";
import NavBar from "./components/Navbar";
import FooterComp from "./components/Footer";
export default {
  components: {
    NavBar,
    FooterComp,
    FeedFlashMessages,
  },

  beforeCreate() {
    console.log(
      "%c what do you want?",
      "color: crimson; font-size: 5em; font-weight: 900; text-transform: uppercase; font-family: monospace; text-align: center"
    );
    this.$store.dispatch("Auth/tryAutoLogin");
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap");

:root {
  --clr-1: #011f4b;
  --clr-2: #03396c;
  --clr-3: #005b96;
  --clr-4: #6497b1;
  --clr-5: #b3cde0;
}

::-webkit-scrollbar {
  width: 10px;
  background: var(--clr-5);
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px #fff;
}
::-webkit-scrollbar-thumb {
  background: var(--clr-1);
  // border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--clr-3);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
}

html {
  background-color: #fff;
}

body {
  background-color: darken(#fff, 8%);
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#app {
  font-family: "Poppins", sans-serif;
  color: lighten(#000, 25%);
  font-weight: 400;
  font-size: 15px;
}

main {
  min-height: calc(100vh - 140px);
  position: relative;
}

a {
  text-decoration: none;
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
