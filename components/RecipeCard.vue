<!-- components/RecipeCard.vue -->
<template>
  <NuxtLink :to="{ name: 'recipe-id', params: { id: recipe.recipeId } }" class="block max-w-full max-h-96 rounded-lg overflow-hidden shadow bg-white p-4 hover:shadow-lg transition-shadow duration-300">
    <!-- Image Section -->
    <div class="relative">
      <img
          :src="recipe.imageUrl && recipe.imageUrl !== '' ? recipe.imageUrl : '/images/placeholder-recipe.jpg'"
          class="w-full h-44 object-cover rounded-lg"
          alt="Dish Image"
      />
      <!-- Heart Icon (Favorite Button) -->
      <div class="absolute top-2 right-2">
        <button class="bg-transparent rounded-full text-primary hover:text-primary-hover">
          <HeartIcon class="h-6 w-6" :class="{ 'text-red-500': recipe.isFavourite }" />
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4">
      <!-- Title -->
      <h2 class="text-lg font-bold text-gray-800">{{ recipe.title }}</h2>

      <!-- Time and Calories (Example placeholders, adjust based on your data) -->
      <div class="flex justify-between text-gray-500 text-sm my-2">
        <span>30 - 40 Minuten</span>
        <span>4228 kj / 1011 kcal</span>
      </div>

      <!-- Description -->
      <p class="text-gray-700">{{ recipe.description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline/index.js";
import type { Recipe } from "@/services/types";

defineProps<{ recipe: Recipe }>();
</script>