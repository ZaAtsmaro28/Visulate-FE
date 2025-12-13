<template>
  <router-view />
  <BackToTop/>
  <Toast/>
</template>

<script setup>
  import BackToTop from './components/BackToTop.vue';
  import Toast from './components/Toast.vue';
</script>

