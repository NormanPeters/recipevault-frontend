<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex :showFavoritesOnly="showFavoritesOnly" @toggle-favorites="toggleFavorites"/>
    <div class="container grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
      <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.recipeId" :recipe="recipe"
                  @update-favorite="updateFavorite(recipe)"
                  />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useRecipeStore} from '~/stores/recipe';
import RecipeCard from '~/components/recipe/RecipeCard.vue';
import HeaderIndex from '~/layouts/header.vue';
import type {Recipe} from '~/services/types'

const recipeStore = useRecipeStore();
const filteredRecipes = ref<Recipe[]>([]);
const showFavoritesOnly = ref<boolean>(JSON.parse(localStorage.getItem('showFavoritesOnly') || 'false'));

onMounted(async () => {
  await recipeStore.fetchRecipes();
  filterRecipes();
});

watch(showFavoritesOnly, (newValue) => {
  localStorage.setItem('showFavoritesOnly', JSON.stringify(newValue));
  filterRecipes();
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

const filterRecipes = () => {
  if (showFavoritesOnly.value) {
    filteredRecipes.value = recipeStore.recipes.filter((recipe) => recipe.favorite);
  } else {
    filteredRecipes.value = recipeStore.recipes;
  }
};

const toggleFavorites = () => {
  showFavoritesOnly.value = !showFavoritesOnly.value;
};
</script>