<template>
  <header class="w-full h-16 bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-2xl font-bold">{{ recipeTitle }}</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <NuxtLink :to="{ name: 'edit-id', params: { id: recipeId }}">
          <PrimaryButton label="Edit"/>
        </NuxtLink>
        <PrimaryButton label="Delete" @click="toggleModal"/>
        <NuxtLink to="/">
          <PrimaryButton label="Back"/>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRecipeStore } from '~/stores/recipe';
import { useRouter } from 'vue-router';
import PrimaryButton from "~/components/base/PrimaryButton.vue";

const router = useRouter();
const recipeStore = useRecipeStore();
const recipeTitle = ref('');
const recipeId = Number(router.currentRoute.value.params.id);

defineProps(['toggleModal']);

watch(() => recipeStore.selectedRecipe, (newRecipe) => {
  if (newRecipe) {
    recipeTitle.value = newRecipe.title;
  }
});
</script>