<script setup lang="ts">
import {MagnifyingGlassIcon} from '@heroicons/vue/24/outline';
</script>

<!-- @/components/SearchBar.vue -->
<template>
  <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm border focus-within:border-primary focus-within:shadow-outline">
    <input
        type="text"
        placeholder="Search for ingredients"
        class="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full leading-tight px-3"
    />
    <button class="text-gray-500 ml-2">
      <MagnifyingGlassIcon class="h-6 w-6"/>
    </button>
  </div>
</template>

<style scoped>

</style>