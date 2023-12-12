<template>
  <div v-if="notification" class="notification">
    {{ notification }}
  </div>
</template>

<script>
export default {
  computed: {
    notification() {
      return this.$store.state.notification;
    }
  }
};
</script>

<style scoped>
.notification {
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  color: #303030;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  z-index: 1000;
}
</style>
