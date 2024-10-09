<!-- @/pages/recipe/[id].vue -->
<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div v-if="recipe" class="container flex-grow grid xl:grid-cols-3 xl:grid-rows-3 py-4 gap-4">
      <!-- Recipe Image and Ingredients Section -->
      <div class="col-span-1 row-span-2 shadow rounded-lg bg-white p-4">
        <!-- Image Section -->
        <img
            class="w-full h-48 object-cover rounded-lg mb-4"
            :src="recipe.imageUrl || '/images/placeholder-recipe.jpg'"
            alt="Dish Image"
        />

        <!-- Ingredients Header -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-primary">Ingredients</h2>
          <div class="flex items-center space-x-1 text-gray-600">
            <span>For</span>
            <input
                type="number"
                value="1"
                class="w-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <table class="w-full text-left">
          <tbody>
          <tr v-for="ingredient in recipe.ingredients" :key="ingredient.id">
            <td class="py-1 text-gray-800">{{ ingredient.amount }} {{ ingredient.unit }}</td>
            <td class="py-1 text-gray-800">{{ ingredient.title }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Manual Section -->
      <div class="flex flex-col col-span-2 row-span-3 shadow rounded-lg bg-white p-4">
        <h2 class="text-lg font-bold">Manual</h2>
        <ol class="list-decimal ml-4 mt-2">
          <li v-for="(step, index) in recipe.steps" :key="index">{{ step.description }}</li>
        </ol>
        <!-- Input positioned at the bottom -->
        <div class="mt-auto">
          <label class="block text-lg font-bold mb-2 ml-2" for="source">Source</label>
          <input
              id="source"
              type="text"
              placeholder="https://www.example.com"
              class="shadow-sm border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
              v-model="recipe.sourceUrl"
              disabled
          />
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-1 row-span-1 shadow rounded-lg bg-white p-4">
        <h2 class="text-lg font-bold">Nutritional Values</h2>
        <ul class="list-disc ml-4 mt-2">
          <li v-for="value in recipe.nutritionalValues" :key="value.name">{{ value.title }} : {{ value.amount }}</li>
        </ul>
      </div>
    </div>

    <!-- Fallback when recipe is not loaded yet -->
    <div v-else class="flex items-center justify-center h-full">
      <p class="text-lg text-gray-500">Loading recipe details...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRecipeStore } from '~/stores/recipe';
import Header from '~/layouts/header.vue';

const recipeStore = useRecipeStore();
const recipeId = Number(route.params.id);

onMounted(async () => {
  await recipeStore.fetchRecipeById(recipeId);
  console.log(recipeStore.selectedRecipe);
});

const recipe = computed(() => recipeStore.selectedRecipe);
</script>