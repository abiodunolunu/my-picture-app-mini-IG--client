<template>
  <div class="comment">
    <p>
      <a class="commenter-link">{{comment.author.firstname + " " + comment.author.lastname}}</a>
      {{comment.text}}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
};
</script>

<style lang="scss" scoped>
.comment {
  font-size: 0.9em;
  margin: 5px 0;

  a {
    font-weight: 700;
    font-size: 0.85em;
    margin-right: 8px;
    cursor: pointer;
    color: #000;
  }
}
</style>
