<!-- pages/index.vue -->
<template>
  <div class="flex h-screen flex-col">
    <HeaderIndex
      @toggle-filter-card="toggleFilterCard"
      :is-filter-card-open="isFilterCardOpen"
      @handle-search-submit="handleSearchSubmit"
    />

    <div class="container">
      <FilterCard v-if="isFilterCardOpen" />
      <div class="grid gap-4 py-4 md:grid-cols-2 xl:grid-cols-3">
        <RecipeCard
          v-for="recipe in filteredRecipes"
          :key="recipe.recipeId"
          :recipe="recipe"
          @update-favorite="updateFavorite(recipe)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRecipeStore } from "~/stores/recipe";
import RecipeCard from "~/components/recipe/RecipeCard.vue";
import HeaderIndex from "~/layouts/header.vue";
import FilterCard from "~/components/recipe/FilterCard.vue";
import type { Recipe } from "~/services/types";

const recipeStore = useRecipeStore();
const isFilterCardOpen = ref(false);

onMounted(async () => {
  await recipeStore.fetchRecipes();
});

const handleSearchSubmit = (input: string) => {
  const formattedInput = input.split(/[\s,]+/).filter((q) => q);
  recipeStore.updateSearchQuery(formattedInput);
};

const filteredRecipes = computed(() => recipeStore.filteredRecipes);

const toggleFilterCard = () => {
  isFilterCardOpen.value = !isFilterCardOpen.value;
};

const updateFavorite = (recipe: Recipe) => {
  recipe.favorite = !recipe.favorite;
  recipeStore.updateRecipe(recipe.recipeId!, recipe); // Update the recipe in the store
};
</script>
