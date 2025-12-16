<script setup>
import { ref, onMounted } from "vue";
import axios from "../api/axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Modal from "../components/Modal.vue";
import PostForm from "../components/CreatePost.vue";
import { useAuthStore } from "../stores/auth";
import PostButton from "../components/PostButton.vue";
import ListSkeleton from "../components/ListSkeleton.vue";
import CardPostImage from "../components/CardPostImage.vue";
import CardPost from "../components/CardPost.vue";
import fetchPosts from "../api/fetchPosts";
import { usePostStore } from "../stores/post";
import PopUp from "../components/PopUp.vue";
import { usePopupStore } from "../stores/popUp";

const postsStore = usePostStore();
const popupStore = usePopupStore();

onMounted(() => {
  postsStore.loadPosts();
  // console.log(postsStore.posts);
});

dayjs.extend(relativeTime);

const formatDate = (date) => {
  return dayjs(date).fromNow();
};
</script>

<template>
  <div v-if="popupStore.visible">
    <PopUp />
  </div>
  <div class="pt-4 mx-auto max-w-5xl px-4 min-h-screen">
    <h1 class="mb-4 font-bold text-heading text-4xl">
      <span class="text-heading">Home</span>
    </h1>

    <div v-if="postsStore.isLoading">
      <ListSkeleton />
    </div>

    <div v-else class="space-y-4">
      <div v-for="post in postsStore.posts" :key="post.id">
        <div v-if="post.image">
          <CardPostImage
            :title="post.title"
            :desc="post.desc"
            :author="post.user.name"
            :created-at="formatDate(post.created_at)"
            :image="post.image"
            :likeCount="post.liked_by_count"
            :isLiked="post.is_liked"
          />
        </div>
        <div v-else class="w-full">
          <CardPost
            :id="post.id"
            :title="post.title"
            :desc="post.desc"
            :author="post.user.name"
            :isLiked="post.is_liked"
            :likeCount="post.liked_by_count"
            :created-at="formatDate(post.created_at)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
