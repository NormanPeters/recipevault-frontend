<!-- pages/index.vue -->
<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex/>
    <div class="container grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
      <RecipeCard v-for="recipe in recipeStore.recipes" :key="recipe.recipeId" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore} from "~/stores/auth";
import { useRecipeStore } from '~/stores/recipe';
import RecipeCard from '~/components/RecipeCard.vue';
import HeaderIndex from '~/layouts/header.vue';


const recipeStore = useRecipeStore();
onMounted(async () => {
  await recipeStore.fetchRecipes();
});
const authStore = useAuthStore();
console.log("isAuthenticated:" + authStore.isAuthenticated);

</script>