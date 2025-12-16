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
  image: String,
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
  <div
    class="bg-neutral-primary-soft block w-lg px-6 py-4 border border-default rounded-base shadow-xs"
  >
    <div class="flex justify-between">
      <h5
        class="mb-3 text-sm font-semibold tracking-tight text-heading hover:underline cursor-pointer"
      >
        {{ props.author }}
      </h5>
      <button
        @click="handlerDelete"
        v-if="isAdmin"
        class="w-5 h-5 cursor-pointer rounded p-0.5 hover:bg-gray-400"
      >
        <img src="../assets/delete.svg" alt="delete icon" />
      </button>
    </div>
    <img class="rounded-base" :src="props.image" alt="image_post" />

    <div class="flex items-center gap-2 mt-3 cursor-pointer w-fit h-fit">
      <img
        v-if="props.isLiked"
        src="../assets/heart.svg"
        alt="like icon"
        class="w-7 h-7"
      />
      <img
        v-else
        src="../assets/heart-outline.svg"
        alt="like icon"
        class="w-7 h-7"
      />
      <span class="block">{{ props.likeCount }}</span>
    </div>

    <h5 class="mt-2 mb-2 text-xl font-semibold tracking-tight text-heading">
      {{ props.title }}
    </h5>
    <p class="mb-6 text-heading font-semibold text-sm">
      {{ props.author }}
      <span class="text-body text-sm font-light">
        {{ props.desc }}
      </span>
    </p>

    <p class="text-gray-400 text-sm">
      {{ props.createdAt }}
    </p>
  </div>
</template>
