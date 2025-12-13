<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center">
    <h1 class="text-6xl font-bold text-red-600">403</h1>

    <h2 class="mt-4 text-2xl font-semibold text-gray-800">
      Akses Ditolak
    </h2>

    <p class="mt-2 text-gray-600 max-w-md">
      Kamu tidak punya izin untuk mengakses halaman ini.  
      Silakan kembali atau hubungi administrator jika menurutmu ini sebuah kesalahan.
    </p>

    <button
      @click="goBack"
      class="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
    >
      Kembali
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>
