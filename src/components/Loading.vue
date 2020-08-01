<template>
  <div class="parent">
    <div class="inner"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.parent {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 4px solid var(--clr-3);
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: spin 500ms infinite linear;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }

    from {
      transform: rotate(0deg);
    }
  }
}
</style>