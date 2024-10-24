<template>
  <div class="flex flex-col h-screen">
    <HeaderIndex @toggle-filter-card="toggleFilterCard" :is-filter-card-open="isFilterCardOpen"/>
    <div class="container">
      <FilterCard v-if="isFilterCardOpen"/>
      <div class="grid xl:grid-cols-3 md:grid-cols-2 py-4 gap-4">
        <RecipeCard v-for="recipe in filteredRecipes" :key="recipe.recipeId" :recipe="recipe"
                    @update-favorite="updateFavorite(recipe)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useRecipeStore} from '~/stores/recipe';
import RecipeCard from '~/components/recipe/RecipeCard.vue';
import HeaderIndex from '~/layouts/header.vue';
import type {Recipe} from '~/services/types'
import FilterCard from "~/components/recipe/FilterCard.vue";

const recipeStore = useRecipeStore();
const filteredRecipes = ref<Recipe[]>([]);
const isFilterCardOpen = ref(false);

onMounted(async () => {
  await recipeStore.fetchRecipes();
});

const toggleFilterCard = () => {
  isFilterCardOpen.value = !isFilterCardOpen.value;
}

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
  return recipes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
}

watch(() => recipeStore.recipes, (newRecipes) => {
  filteredRecipes.value = sortRecipes(newRecipes);
});
</script>