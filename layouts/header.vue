<!-- @/layouts/header.vue -->
<template>
  <!-- Header Index -->
  <header v-if="$route.path === '/'" class="sticky top-0 w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Search Bar -->
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm border focus-within:border-primary focus-within:shadow-outline">
        <input
            type="text"
            placeholder="Search for ingredients"
            class="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full leading-tight px-3"
        />
        <button class="text-gray-500 ml-2">
          <MagnifyingGlassIcon class="h-6 w-6"/>
        </button>
      </div>

      <!-- Buttons Section -->
      <div class="flex items-center space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" @click="router.push('/create')"/>
        <!-- Filter Icon -->
        <button class="text-gray-500 hover:text-black">
          <AdjustmentsHorizontalIcon class="h-6 w-6"/>
        </button>
        <!-- Settings Icon -->
        <SettingsDropdown />
      </div>
    </div>
  </header>

  <!-- Header Recipe -->
  <header v-else-if="$route.path.match(/^\/recipe\/\d+$/)" class="w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-3xl font-bold leading-tight">{{ $route.params.id ? recipeTitle : '' }}</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton label="Edit"/>
        <NuxtLink to="/"><PrimaryButton label="Back"/></NuxtLink>
      </div>
    </div>
  </header>

  <!-- Header Create -->
  <header v-else-if="$route.path === '/create'" class="w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-3xl font-bold leading-tight">Create A New Recipe</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton label="Submit"/>
        <NuxtLink to="/"><PrimaryButton label="Cancel"/></NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import { useRecipeStore } from '~/stores/recipe';
import { useRouter } from 'vue-router';

const router = useRouter();
const recipeStore = useRecipeStore();
const recipeTitle = ref('');

watch(() => recipeStore.selectedRecipe, (newRecipe) => {
  if (newRecipe) {
    recipeTitle.value = newRecipe.title;
  }
});
</script>