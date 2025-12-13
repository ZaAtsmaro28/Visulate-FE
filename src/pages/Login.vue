<script setup>
import { onMounted, ref } from 'vue'
import { authService } from '../api/auth.js'
import {useRouter} from 'vue-router'
import { useErrorStore } from "../stores/error.js";
import { useLoadingStore } from "../stores/loading.js";
import Spinner from '../components/Spinner.vue'
import Alert from '../components/Alert.vue'

const email = ref('')
const password = ref('')

const router = useRouter()
const errorStore = useErrorStore()
const isLoading = useLoadingStore()

const loginHandler = async () => {
  isLoading.setLoading(true)
  try {
    
    await authService.login(email.value, password.value)
    
    router.push('/dashboard')   
  } catch (e) {
    
    if (e.response?.status === 401) {
      
      isLoading.setLoading(false)
      errorStore.setError(true)
      
      return
    }
  }
}

</script>


<template>
  <div v-if="isLoading.value">
    <Spinner/>
  </div>
  <div class="min-h-screen flex-col content-center justify-items-center py-10">
    <div class="flex-col justify-items-center ">
      <img src="../assets/logo.svg" alt="" class="h-16 w-16 mb-3">
        <router-link to="/MyApp">
          <span class="text-4xl font-bold mb-2 text-black cursor-pointer">Visulate</span>
        </router-link>
        
    </div>
    <form @submit.prevent="loginHandler" class=" py-12 px-10 shadow-xl rounded-xl w-full max-w-lg">
    <h1 class="text-3xl font-semibold mb-2 ">Sign in to your account</h1>
    <p class="mb-6">Join our community to share your stories, discover new inspiration, and connect with other creators. Enjoy fast, secure, and easy-to-use posting features.</p>

    <div class="mb-5">
      <label for="email" class="block mb-2.5 text-sm font-medium text-heading">Your email</label>
      <input v-model="email" type="email" id="email" class=" bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-black focus:border-black block w-full px-3 py-2.5 shadow-md placeholder:text-gray-300" placeholder="name@example.com" required />
    </div>
    <div class="mb-5">
      <label for="password" class="block mb-2.5 text-sm font-medium text-heading">Your password</label>
      <input v-model="password" type="password" id="password" class=" bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-black focus:border-black block w-full px-3 py-2.5 shadow-md placeholder:text-gray-300" placeholder="Enter your password" required />
    </div>

      <div v-if="errorStore.isError">
        <Alert/>
      </div>

      <button type="submit" class="w-full bg-black hover:bg-gray-600 cursor-pointer text-white py-2 rounded focus:ring-2 focus:outline-none focus:ring-pink-800">
        Login
      </button>
      
    </form>

  </div>
</template>


