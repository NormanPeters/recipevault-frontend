<script setup lang="ts">

import RecipeCard from "~/components/RecipeCard.vue";
import HeaderIndex from "~/layouts/HeaderIndex.vue";
</script>

<template>
  <HeaderIndex />
    <div class="container grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
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
</template>

<style scoped>
</style>