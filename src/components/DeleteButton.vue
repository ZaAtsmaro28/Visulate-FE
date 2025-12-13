<script setup>
    import { ref } from 'vue'
    import deleteIcon from '../assets/delete.svg'
    import api from '../api/axios'
    import Spinner from './Spinner.vue'

    const props = defineProps({
        id: Number,
        reRender: Function
    })

    const isLoading = ref(false)

    const deletePost = async () => {
        try {
            
            await api.delete(`/posts/${props.id.toString()}`)
    
        } catch (error) {
            console.log(error);
        }
    }

    const handlerDelete = async () => {
        isLoading.value = true
        await deletePost()
        await props.reRender()
        isLoading.value = false
        
    }

</script>

<template>
    <div v-if="isLoading">
        <Spinner/>
    </div>
  <button @click="handlerDelete" class="w-fit h-fit p-1 border rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <img :src="deleteIcon" alt="delete_icon" class="w-3 h-3">
  </button>
</template>

