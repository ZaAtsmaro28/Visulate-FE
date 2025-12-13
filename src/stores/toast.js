import { defineStore } from "pinia";
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const message = ref('')
    const visible = ref(false)
    const duration = 2000
    const timer = ref(null)

    function show(msg){
        message.value = msg
        visible.value = true

        if (timer.value) {
            clearTimeout(timer.value)
        }

        timer.value = window.setTimeout(() => {
            hide()
            timer.value = null
        }, duration)


    }
    
    function hide() {
        visible.value = false
    }

    return{
        message,
        visible,
        show,
        hide,
        timer
    }
}) 