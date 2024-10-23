<!-- @/pages/index.vue -->
<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex/>
    <div class="container grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
      <RecipeCard v-for="recipe in sortRecipes(recipeStore.recipes)" :key="recipe.recipeId" :recipe="recipe"
                  @update-favorite="updateFavorite(recipe)"
                  @show-favorites="showFavorites(recipeStore.recipes)"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useRecipeStore} from '~/stores/recipe';
import RecipeCard from '~/components/recipe/RecipeCard.vue';
import HeaderIndex from '~/layouts/header.vue';
import type {Recipe} from '~/services/types'

const recipeStore = useRecipeStore();

onMounted(async () => {
  await recipeStore.fetchRecipes();
});

const updateFavorite = (recipe) => {
  recipe.favorite = !recipe.favorite;
  try {
    recipeStore.updateRecipe(recipe.recipeId, recipe);
    console.log(`Recipe updated to ${recipe.favorite}`);
  } catch (error) {
    console.error(error);
  }
};

const sortRecipes = (recipes: Recipe[]): Recipe[] => {
  return recipes.sort((a, b) => a.title.localeCompare(b.title));
};

const showFavorites = (recipes: Recipe[]): Recipe[] => {
  return recipes.filter((recipe) => recipe.favorite)
}


</script>