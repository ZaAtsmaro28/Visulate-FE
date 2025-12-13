import { defineStore } from "pinia";
import { ref } from 'vue';

export const useErrorStore = defineStore('isError', () => {
    const isError = ref(false)

    function setError(newValue){
        isError.value = newValue
    }

    return{
        isError,
        setError
    }
}) 