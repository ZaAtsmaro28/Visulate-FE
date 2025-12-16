<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { authService } from "../api/auth";
import Spinner from "./Spinner.vue";

const isOpen = ref(false);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const isAdmin = ref(false);
const auth = useAuthStore();

if (auth.role === "admin") {
  isAdmin.value = true;
}

// Ref untuk div dropdown
const dropdownRef = ref(null);

const handleClickOutside = (event) => {
  // Jika klik di luar dropdown, tutup
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const router = useRouter();
const isLoading = ref(false);

const handleLogout = async () => {
  isLoading.value = true;
  try {
    await authService.logout();
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <!-- Avatar button -->
    <img
      id="avatarButton"
      @click="toggleDropdown"
      class="w-10 h-10 rounded-full cursor-pointer shadow-sm"
      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
      alt="User dropdown"
    />

    <div v-if="isLoading">
      <Spinner />
    </div>

    <!-- Dropdown menu -->
    <div
      v-show="isOpen"
      class="end-0 absolute z-500 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 mt-2"
    >
      <div
        class="px-4 py-3 border-b border-default-medium text-sm text-heading"
      >
        <div class="font-semibold">{{ auth.user?.name }}</div>
        <div class="text-sm">{{ auth.user?.email }}</div>
      </div>
      <ul class="p-2 text-sm text-body font-medium">
        <li v-if="isAdmin">
          <router-link
            to="/dashboard"
            class="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
            >Dashboard</router-link
          >
        </li>
        <li>
          <router-link
            to="/MyPosts"
            class="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
            >MyPosts</router-link
          >
        </li>
        <li>
          <router-link
            to="/posts"
            class="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
            >Home</router-link
          >
        </li>

        <li>
          <a
            href="#"
            class="cursor-pointer block w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
            >Settings</a
          >
        </li>
        <li>
          <button
            @click="handleLogout"
            class="block w-full p-2 hover:bg-neutral-tertiary-medium text-fg-danger rounded-md"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
