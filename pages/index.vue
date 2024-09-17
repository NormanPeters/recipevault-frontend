<script setup lang="ts">

import RecipeCard from "~/components/RecipeCard.vue";
import HeaderIndex from "~/layouts/Header.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex/>
    <div class="container grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
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