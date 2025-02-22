<!-- SearchBar.vue -->
<template>
  <div
    class="focus-within:shadow-outline flex w-full max-w-xs items-center rounded-full border bg-gray-100 px-2 py-1 shadow-sm focus-within:border-primary"
  >
    <input
      class="w-full bg-transparent px-3 leading-tight placeholder-gray-400 outline-none"
      :type="type"
      :placeholder="placeholder"
      v-model="inputValue"
      @input="submitInput"
    />
    <button class="ml-2" @click="submitInput">
      <MagnifyingGlassIcon class="h-6 w-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const inputValue = ref<string>("");

const props = defineProps({
  type: {
    type: [String],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
});

const emit = defineEmits(["submit"]);

const submitInput = () => {
  emit("submit", inputValue.value);
};
</script>
