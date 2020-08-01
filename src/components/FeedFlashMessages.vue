<template>
  <div class="parent" v-if="feedMessage">
    <div :class="feedMessage.type">{{feedMessage.message}}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters({
            feedMessage: "Feed/feedMessage"
        })
    },
    methods: {
        removeFeedMessage() {
            setTimeout(() => {
                this.$store.commit('Feed/setFeedMessage', null)
            }, 2500);
        }
    },
    watch: {
       feedMessage() {
           this.removeFeedMessage()
       }
    }
};
</script>

<style lang="scss" scoped>
.parent {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 40px;
  animation: fromUp 200ms linear;
}

@keyframes fromUp {
    from {
        transform: translateY(40px);
    }

    to {
        transform: translateY(0px);
    }
}

.success,
.error {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
}

.success {
  background: lightgreen;
  color: darkgreen;
}

.error {
    background: pink;
    color: red;
}
</style>