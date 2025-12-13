<script setup>

    const props = defineProps({
        pages: Array,
        prev: String,
        next: String,
        currentPage: Number,
        lastPage: Number
    });

    const emit = defineEmits(['change-page'])

    const goTo = (page) => {
        emit("change-page", page.page)
    }
    
    const gotoPrev = () => {
        if (props.currentPage === 1) {
            return
        }
        emit("change-page", props.currentPage - 1)
    }
    
    const gotoNext = () => {
        
        emit("change-page", props.currentPage + 1)
    }

    

</script>

<template>
  <div class="w-fit mx-auto">
    <!-- {{pages.label}} -->
    <nav aria-label="Page navigation example">
  <ul class="flex -space-x-px text-sm">
   
    <li v-for="page in props.pages" :key="page.label">
        
            <button v-if="page.label.includes('Previous')" @click="gotoPrev" class="flex items-center justify-center text-body bg-neutral-secondary-medium  box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading disabled:hover:text-body font-medium rounded-s-base text-sm w-10 h-10 focus:outline-none disabled:bg-gray-200"  :disabled="props.currentPage === 1">
              <span class="sr-only">Previous</span>
              <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/></svg>
            </button>

            <button v-else-if="page.label.includes('Next')" @click="gotoNext" class="flex items-center justify-center text-body bg-neutral-secondary-medium  box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading disabled:hover:text-body font-medium rounded-e-base text-sm w-10 h-10 focus:outline-none disabled:bg-gray-200" :disabled="props.currentPage === props.lastPage">
            <span class="sr-only">Next</span>
            <svg class="w-4 h-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
          </button>

            <button v-else @click="goTo(page)" class="flex items-center justify-center text-body  box-border border border-default-medium   font-medium text-sm w-10 h-10 focus:outline-none" :class="page.page === props.currentPage ? 'bg-black text-white hover:bg-gray-600' : 'bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium hover:text-heading'">
                {{ page.label }}    
            </button>

    </li>
  </ul>
</nav>
  </div>
</template>

