<!-- @/components/SearchBar.vue -->
<template>
  <div class="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-sm border focus-within:border-primary focus-within:shadow-outline w-full max-w-xs">
    <input
        class="bg-transparent outline-none placeholder-gray-400 leading-tight px-3 w-full"
        :type="type"
        :placeholder="placeholder"
    />
    <button class="ml-2">
      <MagnifyingGlassIcon class="h-6 w-6"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

defineProps({
  type: {
    type: [String],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>
</style>