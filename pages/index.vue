<!-- pages/index.vue -->
<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex @toggle-filter-card="toggleFilterCard"
                 :is-filter-card-open="isFilterCardOpen"
                 @handle-search-submit="handleSearchSubmit"/>


    <div class="container">
      <FilterCard v-if="isFilterCardOpen"/>
      <div class="grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
        <RecipeCard v-for="recipe in filteredRecipes"
                    :key="recipe.recipeId"
                    :recipe="recipe"
                    @update-favorite="updateFavorite(recipe)"
        />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRecipeStore} from '~/stores/recipe';
import RecipeCard from '~/components/recipe/RecipeCard.vue';
import HeaderIndex from '~/layouts/header.vue';
import FilterCard from "~/components/recipe/FilterCard.vue";

const recipeStore = useRecipeStore();
const isFilterCardOpen = ref(false);

onMounted(async () => {
  await recipeStore.fetchRecipes();
});

const handleSearchSubmit = (input: string) => {
  recipeStore.updateSearchQuery(input); // Update search query in the store
};

const filteredRecipes = computed(() => recipeStore.filteredRecipes);

const toggleFilterCard = () => {
  isFilterCardOpen.value = !isFilterCardOpen.value;
};

const updateFavorite = (recipe) => {
  recipe.favorite = !recipe.favorite;
  recipeStore.updateRecipe(recipe.recipeId, recipe); // Update the recipe in the store
};
</script>