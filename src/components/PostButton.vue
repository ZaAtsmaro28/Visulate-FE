<script setup>
  const props = defineProps({
    modelValue: Boolean
  })

  const emit = defineEmits(["update:modelValue"])

  const openModal = () => {
        emit("update:modelValue", true)
        console.log('open');
        
    }

</script>

<template>
  <div>
    <button
            @click="openModal"
            class=" block items-center justify-center text-white bg-transparent  w-fit h-fit rounded cursor-pointer my-4"
            >
            <img src="../assets/post_icon.svg" alt="post_icon" class="w-6 h-6 hover:bg-gray-200 rounded-lg">
        </button>
  </div>
</template>

