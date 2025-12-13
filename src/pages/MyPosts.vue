<script setup>
import dayjs from 'dayjs';
import axios from '../api/axios';
import { onMounted, ref } from 'vue';
import 'dayjs/locale/id'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import PaginationBar from '../components/PaginationBar.vue';


    dayjs.locale('id')
    dayjs.extend(localizedFormat)

    
    const posts = ref(null)
    const startDate = ref('')
    const endDate = ref('')

    const prev = ref('')
    const next = ref('')
    const pages = ref(null)
    const currentPage = ref(0)
    const lastPage = ref(0)

    const fetchPosts = async (page=1) => {
      const params = {}

      // Jika filter terisi baru kirim sebagai query param
      if (startDate.value) params.start_date = startDate.value
      if (endDate.value) params.end_date = endDate.value

      params.page = page

      const res = await axios.get('/posts/mypost', { params })
      posts.value = res.data.data.data
      prev.value = res.data.data.prev_page_url
      next.value = res.data.data.next_page_url
      pages.value = res.data.data.links
      currentPage.value = res.data.data.current_page
      lastPage.value = res.data.data.last_page
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'   
      })
    }

    const handlerFilter = () => {
        fetchPosts()
        
    }

    const formatDate = (date) => dayjs(date).format('D MMMM YYYY | HH.mm')

    onMounted(()=>{
        fetchPosts()
    })

</script>

<template>
  <div class="w-full px-28 pt-4 pb-8">

    <h1 class="text-2xl text-black font-semibold mb-4">MyPost: Timeline</h1>

    <div class="flex gap-4 w-full max-w-sm mb-8 ">
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">Start Date</label>
      <input
        type="date"
        v-model="startDate"
        class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">End Date</label>
      <input
        type="date"
        v-model="endDate"
        class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
    </div>
    
    <button @click="handlerFilter" class="ms-2 mt-auto bg-black h-fit w-fit px-4 py-2 text-white cursor-pointer rounded hover:bg-gray-500  ">Filter</button>

  </div>

    
    <ol class="relative border-s border-default">  
        <div v-for="post in posts" :key="post.id">

            <li class="mb-10 ms-4">
                <div class="absolute w-3 h-3 bg-neutral-quaternary rounded-full mt-1.5 -start-1.5 border border-buffer"></div>
                <time class="text-sm font-normal leading-none text-body">{{formatDate(post.created_at)}}</time>
                <h3 class="text-lg font-semibold text-heading my-2">{{post.title}}</h3>
                <p class="mb-4 text-base font-normal text-body">{{post.desc}}</p>
                <div v-if="post.image">
                    <img :src="post.image" alt="" class="w-40 h-w-40">
                </div>
            </li>
        </div>                
        
    </ol>

    <PaginationBar 
    :pages="pages"
    :prev="prev"
    :next="next"
    :current-page="currentPage"
    :last-page="lastPage"
    @change-page="fetchPosts"
    />
     
  </div>
</template>

