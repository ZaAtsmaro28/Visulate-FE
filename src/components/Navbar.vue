<template>
  <div class="w-full top-0 sticky z-50">
    
    <nav class="w-full bg-white shadow p-4 flex justify-between items-center z-50  px-28">
      <div class="text-2xl font-extrabold flex gap-1.5 z-50"> 
          <img :src="compLogo" class="h-7" alt="Comp Logo">
          <router-link to="/MyApp" class="text-black">Visulate</router-link >
      </div>

      <div class="flex gap-8 justify-items-center items-center">
        <PostButton v-model="isModalOpen" />
  
        <Avatar/>
      </div>

     
  </nav>

  <Modal v-model="isModalOpen" title="Buat Postingan Baru">
      <PostForm @close-modal="closeModal"/>
  </Modal>

  <div v-if="isLoadNewPost">
    <Spinner/>
  </div>
  
</div>
</template>

<script setup>
  import { ref } from 'vue';
  import compLogo from '../assets/logo.svg' 
  import Avatar from './Avatar.vue'
  import PostButton from './PostButton.vue';
  import Modal from './Modal.vue';
  import Spinner from './Spinner.vue';
  import axios from '../api/axios'
  import PostForm from "../components/CreatePost.vue"

  const isModalOpen = ref(false)
  const isLoadNewPost = ref(false)

  const closeModal = async (newValue) => {
        isModalOpen.value = newValue
        isLoadNewPost.value = true
        window.location.reload()
        isLoadNewPost.value = false
    }


</script>
