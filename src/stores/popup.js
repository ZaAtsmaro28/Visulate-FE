import { defineStore } from "pinia";
import { ref } from "vue";

export const usePopupStore = defineStore("popup", () => {
  const message = ref("");
  const ID = ref(0);
  const visible = ref(false);

  function show(msg, id) {
    message.value = msg;
    ID.value = id;
    visible.value = true;
  }

  function hide() {
    message.value = "";
    ID.value = 0;
    visible.value = false;
  }

  return {
    ID,
    message,
    visible,
    show,
    hide,
  };
});
