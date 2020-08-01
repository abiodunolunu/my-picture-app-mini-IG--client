<template>
  <footer>
    <div class="text">
      <p>
        Made By Abeydev with
        <span>💖</span>
      </p>
    </div>
    <div class="links">
      <a href="https://www.twitter.com/findByUsername">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="https://www.github.com/abiodunolunu">
        <i class="fab fa-github"></i>
      </a>

      <a href="mailto:abiodunolunu@gmail.com">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.5);
  }
}

footer {
  padding: 0.5rem 1rem;
  background-color: var(--clr-1);
  color: var(--clr-5);
  text-align: center;
  height: 70px;
  p {
    text-transform: uppercase;
    font-weight: 500;

    span {
      // font-size: 30px;
    //   position: absolute;
    display: inline-block;
    margin-left: 5px;
      animation: heartbeat 800ms infinite alternate linear;
    }
  }
  a {
    color: inherit;
    font-size: 25px;
    // animation: heartbeat 1s infinite alternate;

    :hover {
      color: var(--clr-4);
    }
  }

  .links {
    display: flex;
    justify-content: center;

    a {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>