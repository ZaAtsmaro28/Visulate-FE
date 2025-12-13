<template>
  <button
    v-show="isVisible"
    @click="scrollTop"
    class="cursor-pointer w-10 h-10 flex items-center justify-center fixed bottom-6 right-6 p-3 rounded-full bg-black text-white shadow-lg text-xl transition-all duration-300"
  >
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

const handleScroll = () => {
  // Muncul ketika scroll > 300px
  isVisible.value = window.scrollY > 300;
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
