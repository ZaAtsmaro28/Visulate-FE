<script setup>
import HomeNav from "../components/HomeNav.vue";
import { useToastStore } from "../stores/toast";

const toast = useToastStore();

const handleStarted = () => {
  toast.show("new post created successfully.");
};
</script>

<template>
  <HomeNav />
  <div class="w-screen h-screen flex items-center justify-center px-10">
    <section class="bg-neutral-primary">
      <div class="py-8 px-4 mx-auto max-w-screen-2xl text-center">
        <h1
          class="text-black mb-6 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl"
        >
          Unlocking expression through seamless sharing
        </h1>
        <p class="mb-8 text-base font-normal text-body md:text-xl">
          Here at Visulate share your stories, discover new inspiration, and
          connect with other creators. Enjoy fast, secure, and easy-to-use
          posting features.
        </p>
        <div
          class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 md:space-x-4"
        >
          <button
            @click="handleStarted"
            type="button"
            class="cursor-pointer inline-flex items-center justify-center text-white bg-black hover:bg-gray-700 focus:ring-2 focus:outline-none focus:ring-gray-200 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
          >
            Getting started
            <svg
              class="w-4 h-4 ms-1.5 -me-0.5"
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
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </button>
          <button
            type="button"
            class="cursor-pointer text-body bg-neutral-secondary-medium box-border border border-gray-400 hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-2 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-base px-5 py-3 focus:outline-none"
          >
            Learn more
          </button>
        </div>
      </div>
    </section>

    <div
      id="delete-modal"
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-full"
    >
      <div class="relative w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <!-- Header -->
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900"
            data-modal-hide="delete-modal"
          >
            ✕
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
              Apakah Anda yakin ingin menghapus post ini?
            </h3>

            <!-- Actions -->
            <button
              data-modal-hide="delete-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Ya, Hapus
            </button>

            <button
              data-modal-hide="delete-modal"
              type="button"
              class="text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm px-5 py-2.5"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
