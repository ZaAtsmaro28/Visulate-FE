<script setup>
import { ref } from "vue";
import api from "../api/axios";
import Spinner from "./Spinner.vue";
import { useToastStore } from "../stores/toast";

const title = ref("");
const desc = ref("");
const isLoading = ref(false);

const emit = defineEmits(["closeModal"]);

const selectedImage = ref(null);
const toast = useToastStore();

const handleCloseModal = () => {
  emit("closeModal", false);
  toast.show("New Post created successfully.");
};

const onFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedTypes.includes(file.type)) {
    alert("File harus berupa JPG, JPEG, atau PNG");
    e.target.value = "";
    selectedImage.value = null;
    return;
  }

  selectedImage.value = file;
};

const handleTitleInput = (e) => {
  if (e.target.value.length > 100) {
    e.target.value = e.target.value.slice(0, 100);
  }
  title.value = e.target.value;
};

const handleDescInput = (e) => {
  if (e.target.value.length > 255) {
    e.target.value = e.target.value.slice(0, 255);
  }
  desc.value = e.target.value;
};

const submitPostHandler = async () => {
  if (!title.value || !desc.value) {
    alert("Judul dan Deskripsi wajib diisi");
    return;
  }
  isLoading.value = true;

  try {
    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("desc", desc.value);
    formData.append("image", selectedImage.value);

    await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });

    handleCloseModal();
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="w-full h-full">
    <form
      @submit.prevent="submitPostHandler"
      class="px-3 rounded w-full max-w-sm"
    >
      <!-- TITLE -->
      <input
        :value="title"
        @input="handleTitleInput"
        type="text"
        class="w-full border p-2 mb-1"
        placeholder="Judul (max 100 karakter)"
      />

      <p class="text-xs text-gray-500 text-right mb-3">
        {{ title.length }}/100
      </p>

      <!-- DESC -->
      <textarea
        :value="desc"
        @input="handleDescInput"
        class="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring mb-1"
        placeholder="Tulis konten di sini..."
      ></textarea>

      <p class="text-xs text-gray-500 text-right mb-3">{{ desc.length }}/255</p>

      <input
        type="file"
        @change="onFileChange"
        accept="image/jpeg, image/png"
        class="w-full h-fit shadow block rounded mb-4"
      />

      <!-- SUBMIT -->
      <button
        type="submit"
        class="w-full shadow block items-center justify-center text-white bg-black hover:bg-gray-600 hover:bg-linear-to-bl px-4 py-2 h-fit rounded cursor-pointer"
      >
        Kirim
      </button>
    </form>
  </div>
</template>
