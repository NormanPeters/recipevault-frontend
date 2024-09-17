<script setup lang="ts">

import RecipeCard from "~/components/RecipeCard.vue";
import HeaderIndex from "~/layouts/HeaderIndex.vue";
</script>

<template>
  <HeaderIndex />
  <div class="container bg-gray-300">
    <div class="py-4 gap-4 grid xl:grid-cols-3 md:grid-cols-2">
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
    </div>
  </div>
</template>

<style scoped>
</style>