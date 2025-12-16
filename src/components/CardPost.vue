<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { usePopupStore } from "../stores/popUp";

const props = defineProps({
  id: Number,
  title: String,
  desc: String,
  author: String,
  createdAt: String,
  isLiked: Boolean,
  likeCount: Number,
});

const isAdmin = ref(false);

const auth = useAuthStore();
const popupStore = usePopupStore();

if (auth.role === "admin") {
  isAdmin.value = true;
}

const handlerDelete = async () => {
  popupStore.show(props.title, props.id);
};
</script>

<template>
  <div>
    <div
      class="cursor bg-neutral-primary-soft block w-full p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium"
    >
      <div class="flex justify-between">
        <h5
          class="mb-3 text-xl font-semibold tracking-tight text-heading leading-8"
        >
          {{ props.title }}
        </h5>
        <button
          @click="handlerDelete"
          v-if="isAdmin"
          class="w-5 h-5 cursor-pointer rounded p-0.5 hover:bg-gray-400"
        >
          <img src="../assets/delete.svg" alt="delete icon" />
        </button>
      </div>
      <p class="mb-2 text-heading font-semibold text-sm">
        {{ props.author }}
        <span class="text-body text-sm font-light">
          {{ props.desc }}
        </span>
      </p>

      <div class="flex gap-1 items-center cursor-pointer w-fit h-fit">
        <img
          v-if="props.isLiked"
          src="../assets/heart.svg"
          alt="like icon"
          class="w-5 h-5"
        />
        <img
          v-else
          src="../assets/heart-outline.svg"
          alt="like icon"
          class="w-5 h-5"
        />
        <span class="block">{{ props.likeCount }}</span>
      </div>

      <p class="text-gray-400 text-sm mt-2">
        {{ props.createdAt }}
      </p>
    </div>
  </div>
</template>
