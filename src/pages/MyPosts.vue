<script setup>
import dayjs from "dayjs";
import axios from "../api/axios";
import { onMounted, ref, watch } from "vue";
import "dayjs/locale/id";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PaginationBar from "../components/PaginationBar.vue";
import { useRoute, useRouter } from "vue-router";

dayjs.locale("id");
dayjs.extend(localizedFormat);

const route = useRoute();
const router = useRouter();

const posts = ref(null);

const startDate = ref("");
const endDate = ref("");
const search = ref("");

const prev = ref("");
const next = ref("");
const pages = ref(null);
const currentPage = ref(1);
const lastPage = ref(1);

onMounted(() => {
  startDate.value = route.query.startDate || "";
  endDate.value = route.query.endDate || "";
  search.value = route.query.search || "";
  currentPage.value = Number(route.query.page) || 1;

  fetchPosts(currentPage.value);
});

watch(
  () => route.query,
  (query) => {
    startDate.value = query.start_date || "";
    endDate.value = query.end_date || "";
    search.value = query.search || "";
    currentPage.value = Number(query.page) || 1;

    fetchPosts(currentPage.value);
  }
);

watch([startDate, endDate], () => {
  router.push({
    query: {
      ...route.query,
      start_date: startDate.value || undefined,
      end_date: endDate.value || undefined,
      page: 1,
    },
  });
});

let searchTimeout = null;

watch(search, (newValue) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  searchTimeout = setTimeout(() => {
    console.log(newValue);
    router.push({
      query: {
        ...route.query,
        search: newValue || undefined,
        page: 1,
      },
    });
  }, 1000);
});

const changePage = (page) => {
  router.push({
    query: {
      ...route.query,
      page,
    },
  });
};

const fetchPosts = async (page = 1) => {
  const params = {
    page,
    start_date: route.query.start_date,
    end_date: route.query.end_date,
    search: route.query.search,
  };

  const res = await axios.get("/posts/mypost", { params });

  posts.value = res.data.data.data;
  prev.value = res.data.data.prev_page_url;
  next.value = res.data.data.next_page_url;
  pages.value = res.data.data.links;
  currentPage.value = res.data.data.current_page;
  lastPage.value = res.data.data.last_page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const clearFilter = () => {
  router.push({ query: {} });
};

const formatDate = (date) => dayjs(date).format("D MMMM YYYY | HH.mm");
</script>

<template>
  <div class="w-full px-28 pt-4 pb-8">
    <h1 class="text-2xl text-black font-semibold mb-4">MyPost: Timeline</h1>
    <div name="mainContainerFilter " class="max-w-sm">
      <div name="dateAndButton">
        <div class="flex gap-4 w-full max-w-sm mb-2">
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1"
              >Start Date</label
            >
            <input
              type="date"
              v-model="startDate"
              class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-700 mb-1"
              >End Date</label
            >
            <input
              type="date"
              v-model="endDate"
              class="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            @click="clearFilter"
            class="ms-2 mt-auto bg-black h-fit w-fit px-4 py-2 text-white cursor-pointer rounded hover:bg-gray-500"
          >
            Clear
          </button>
        </div>
        <div name="searchContainer " class="w-full">
          <div class="relative w-full mb-4">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-body"
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
                  d="M8 8v8m0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0a4 4 0 0 1-4 4h-1a3 3 0 0 0-3 3"
                />
              </svg>
            </div>
            <input
              v-model="search"
              type="text"
              id="simple-search"
              class="px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium rounded-base ps-9 text-heading text-sm focus:ring-brand focus:border-brand block w-full placeholder:text-body"
              placeholder="Search post name..."
              required
            />
          </div>
        </div>
      </div>
    </div>

    <ol class="relative border-s border-default">
      <div v-for="post in posts" :key="post.id">
        <li class="mb-10 ms-4">
          <div
            class="absolute w-3 h-3 bg-neutral-quaternary rounded-full mt-1.5 -start-1.5 border border-buffer"
          ></div>
          <time class="text-sm font-normal leading-none text-body">{{
            formatDate(post.created_at)
          }}</time>
          <h3 class="text-lg font-semibold text-heading my-2">
            {{ post.title }}
          </h3>
          <p class="mb-4 text-base font-normal text-body">{{ post.desc }}</p>
          <div v-if="post.image">
            <img :src="post.image" alt="" class="w-40 h-w-40" />
          </div>
        </li>
      </div>
    </ol>

    <PaginationBar
      :pages="pages"
      :prev="prev"
      :next="next"
      :current-page="currentPage"
      :last-page="lastPage"
      @change-page="changePage"
    />
  </div>
</template>
