<script setup>
    import { useRouter } from 'vue-router';
import logo from '../assets/logo.svg'

    const router = useRouter()

    const loginHandler = () => {
        router.push('/login')    
    }

</script>

<template>
    <nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 shadow">
    <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <router-link to="/MyApp" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img :src="logo" class="h-7" alt="Comp Logo">
            <span class="self-center text-2xl text-black font-semibold whitespace-nowrap">Visulate</span>
        </router-link>
        <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            
            <button @click="loginHandler" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-heading rounded-base group bg-white hover:bg-black hover:text-white focus:ring-2 focus:outline-none  border">
            <span class="cursor-pointer relative px-4 py-2.5 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-base group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
            Login
            </span>
            </button>
            
        </div>
        <div class="  items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
        <ul class=" flex flex-col p-4 md:p-0 mt-4 font-medium border border-default rounded-base  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
            <a href="#" class="block py-2 px-3 text-heading rounded   hover:text-gray-400" aria-current="page">Home</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 text-heading rounded hover:text-gray-400">About</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 text-heading rounded   hover:text-gray-400">Services</a>
            </li>
            <li>
            <a href="#" class="block py-2 px-3 text-heading rounded   hover:text-gray-400">Contact</a>
            </li>
        </ul>
        </div>
    </div>
    
    </nav>
</template>

