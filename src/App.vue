<script setup>
import Header from './components/Header.vue';
</script>

<template>
  <v-app>
    <Header />
    <router-view />
  </v-app>
</template>

<style scoped>
* {
  color: #303030;
  font-family: 'Spline Sans', sans-serif;
}

.v-app {
  max-height: 100vh;
}
</style>
