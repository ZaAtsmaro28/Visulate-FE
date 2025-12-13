<script setup>
    import { ref, onMounted } from 'vue'
    import axios from '../api/axios'
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import Modal from "../components/Modal.vue"
    import PostForm from "../components/CreatePost.vue"
    import { useAuthStore } from '../stores/auth';
    import PostButton from '../components/PostButton.vue';
    import ListSkeleton from '../components/ListSkeleton.vue';
    import CardPostImage from '../components/CardPostImage.vue';
    import CardPost from '../components/CardPost.vue';
    
    const posts = ref(null)
    const loading = ref(true)
    const isLoadNewPost = ref(false)
    const isAdmin = ref(false)

    const auth = useAuthStore()

    const showModal = ref(false)

    if (auth.role === 'admin') {
      isAdmin.value = true
    }
    
    onMounted(() => {
        fetchPosts()
    })

    const fetchPosts = async () => {
        const res = await axios.get('/posts') 
        posts.value = res.data.data
        loading.value = false
    }

    dayjs.extend(relativeTime);

    const formatDate = (date) => {
        return dayjs(date).fromNow(); 
    };

</script>

<template>
  
  <div class="pt-4 mx-auto max-w-5xl px-4 min-h-screen">
    <h1 class="mb-4 font-bold text-heading text-4xl">
      <span class="text-heading">Home</span>
    </h1>

    <div v-if="loading">  
      <ListSkeleton/>
    </div>

    <div v-else class="space-y-4">
      <div v-for="post in posts" :key="post.id" >
        <div v-if="post.image">
            <CardPostImage 
              :title="post.title" 
              :desc="post.desc" 
              :author="post.user.name" 
              :created-at="formatDate(post.created_at)"
              :image="post.image"
              :likeCount="post.liked_by_count"
              :isLiked="post.is_liked"
              />
            </div>
            <div v-else class="w-full">
              <CardPost
              :title="post.title" 
              :desc="post.desc" 
              :author="post.user.name" 
              :isLiked="post.is_liked"
              :likeCount="post.liked_by_count"
              :created-at="formatDate(post.created_at)"
              />
        </div>
      </div>
    </div>
  </div>
</template>


