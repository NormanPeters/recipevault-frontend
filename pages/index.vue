<script setup lang="ts">

import RecipeCard from "~/components/RecipeCard.vue";
import Header from "~/layouts/Header.vue";
</script>

<template>
  <Header/>
  <div class="container h-screen bg-gray-300">
    <div class="pt-4 gap-4 grid xl:grid-cols-3 md:grid-cols-2">
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-center items-center space-x-4 mt-6">
      <button
          class="text-gray-400"
          :class="{ 'cursor-not-allowed': currentPage === 1 }"
          @click="prevPage"
          :disabled="currentPage === 1"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <span class="text-lg">
        Page {{ currentPage }} from {{ totalPages }}
      </span>
      <button
          class="text-gray-600"
          :class="{ 'cursor-not-allowed': currentPage === totalPages }"
          @click="nextPage"
          :disabled="currentPage === totalPages"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>