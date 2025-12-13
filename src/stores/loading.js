import { defineStore } from "pinia";
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(false)

    function setLoading(newValue){
        isLoading.value = newValue
    }

    return{
        isLoading,
        setLoading
    }
}) 