<script setup>
import { useLoadingStore } from "../stores/loading";
import { usePopupStore } from "../stores/popUp";
import axios from "../api/axios";
import { usePostStore } from "../stores/post";

const popupStore = usePopupStore();
const loadingStore = useLoadingStore();
const postStore = usePostStore();

const handlerDelete = async () => {
  loadingStore.setLoading(true);
  await axios.delete(`/posts/${popupStore.ID}`);
  loadingStore.setLoading(false);
  postStore.loadPosts();
  popupStore.hide();
};

const handlerCancel = () => {
  popupStore.hide();
};
</script>

<template>
  <div
    id="delete-modal"
    tabindex="-1"
    class="flex items-center justify-center fixed top-0 left-0 right-0 z-50 bg-black/40 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full"
  >
    <div class="relative w-full max-w-md h-full md:h-auto">
      <div class="relative bg-neutral-primary-soft rounded-lg shadow">
        <!-- Header -->
        <button
          @click="popupStore.hide()"
          type="button"
          class="cursor-pointer absolute top-3 right-2.5 text-gray-400 hover:text-gray-900"
          data-modal-hide="delete-modal"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>

        <!-- Body -->
        <div class="p-6 text-center">
          <svg
            class="mx-auto mb-4 text-red-600 w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

          <h3 class="mb-5 text-lg font-normal text-gray-700">
            Are your sure want to delete
            <span class="font-bold">{{ popupStore.message }}</span> post ?
          </h3>

          <!-- Actions -->
          <button
            @click="handlerDelete"
            data-modal-hide="delete-modal"
            type="button"
            class="cursor-pointer text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Yes, Delete
          </button>

          <button
            @click="handlerCancel"
            data-modal-hide="delete-modal"
            type="button"
            class="cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
