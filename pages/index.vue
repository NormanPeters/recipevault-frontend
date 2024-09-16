<script setup lang="ts">

import RecipeCard from "~/components/RecipeCard.vue";
import Header from "~/layouts/Header.vue";
</script>

<template>
  <Header/>
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