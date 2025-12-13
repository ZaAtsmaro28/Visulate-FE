<script setup>
import { useToastStore } from '../stores/toast';

    
    const toast = useToastStore()
</script>

<template>
    <transition name='toast-slide'>
    
        <div v-if="toast.visible" id="toast-success" class="w-full fixed bottom-5 right-5 flex items-center  max-w-sm p-4 text-success-medium bg-zinc-800 rounded-lg shadow-xs border border-default" role="alert">
            <div class="inline-flex items-center justify-center shrink-0 w-7 h-7 text-green-500 bg-fg-success-strong">
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/></svg>
                <span class="sr-only">Check icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">{{toast.message}}</div>
            <button @click="toast.hide()" type="button" class="ms-auto flex items-center justify-center text-zinc-400 hover:text-heading bg-transparent box-border hover:bg-gray-100 focus:ring-1 focus:ring-neutral-tertiary font-medium leading-5 rounded text-sm h-8 w-8 focus:outline-none" data-dismiss-target="#toast-success" aria-label="Close">
                <span class="sr-only">Close</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
            </button>
        </div>
    </transition>
</template>

