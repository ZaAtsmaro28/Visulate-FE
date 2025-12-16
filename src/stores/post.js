import { defineStore } from "pinia";
import fetchPosts from "../api/fetchPosts";
import { ref } from "vue";

export const usePostStore = defineStore("posts", () => {
  const posts = ref([]);
  const isLoading = ref(false);

  async function loadPosts() {
    isLoading.value = true;
    posts.value = await fetchPosts();
    isLoading.value = false;
  }

  return {
    posts,
    isLoading,
    loadPosts,
  };
});
