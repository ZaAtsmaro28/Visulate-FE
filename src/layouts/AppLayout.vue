<script setup>
  import Navbar from '../components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <!-- Navbar global -->
    <Navbar />

    <!-- Konten halaman -->
    <main class="px-6">
      <router-view />
    </main>

  </div>
</template>
