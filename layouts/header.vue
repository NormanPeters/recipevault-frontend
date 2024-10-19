<!-- @/layouts/header.vue -->
<template>
  <!-- Header Index -->
  <header v-if="$route.path === '/'" class="sticky top-0 w-full h-16 bg-white p-4 shadow z-10 flex items-center">
    <div class="container flex justify-between">
      <!-- Search Bar -->

      <SearchBar placeholder="Search For Ingredients..."/>

      <!-- Buttons Section -->
      <div class="flex items-center space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" @click="router.push('/create')"/>
        <!-- Filter Icon -->
        <button class="text-btnPrimary hover:text-btnPrimary-hover">
          <AdjustmentsHorizontalIcon class="h-6 w-6"/>
        </button>
        <!-- Settings Icon -->
        <SettingsDropdown/>
      </div>
    </div>
  </header>

  <!-- Header Recipe -->
  <header v-else-if="$route.path.match(/^\/recipe\/\d+$/)" class="w-full h-16 bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-3xl font-bold">{{ $route.params.id ? recipeTitle : '' }}</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton label="Edit"/>
        <PrimaryButton label="Delete" @click="deleteRecipe"/>
        <NuxtLink to="/">
          <PrimaryButton label="Back"/>
        </NuxtLink>
      </div>
    </div>
  </header>

  <!-- Header Create -->
  <header v-else-if="$route.path === '/create'" class="w-full h-16 bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-end">

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton @click="submitRecipe" label="Add Recipe"/>
        <NuxtLink to="/">
          <PrimaryButton label="Cancel"/>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {AdjustmentsHorizontalIcon, MagnifyingGlassIcon} from '@heroicons/vue/24/solid';
import {useRecipeStore} from '~/stores/recipe';
import {useRouter} from 'vue-router';

const router = useRouter();
const recipeStore = useRecipeStore();
const recipeTitle = ref('');

defineProps({
  submitRecipe: {
    type: Function,
    required: false,
  },
});

const deleteRecipe = async () => {
  if (recipeStore.selectedRecipe) {
    await recipeStore.deleteRecipe(recipeStore.selectedRecipe.recipeId);
    await router.push('/');
  }
};

watch(() => recipeStore.selectedRecipe, (newRecipe) => {
  if (newRecipe) {
    recipeTitle.value = newRecipe.title;
  }
});


</script>