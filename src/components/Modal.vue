<script setup>
const props = defineProps({
  modelValue: Boolean,
  title: String
})

const emit = defineEmits(["update:modelValue"])

const close = () => {
  emit("update:modelValue", false)
}
</script>


<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <header class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button @click="close" class="cursor-pointer text-gray-500 hover:text-gray-700">&times;</button>
        </header>

        <!-- Slot isi modal -->
        <div>
          <slot></slot>
        </div>

        <footer class="mt-6 text-right">
          <button
            @click="close"
            class="cursor-pointer px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Batal
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>


