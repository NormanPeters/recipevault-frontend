<template>
  <header class="w-full h-16 bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-end">
      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton @click="saveRecipe" label="Save"/>
        <NuxtLink :to="{ name: 'recipe-id', params: { id: recipeId }}">
          <PrimaryButton label="Cancel"/>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import PrimaryButton from "~/components/base/PrimaryButton.vue";

const router = useRouter();
const recipeId = Number(router.currentRoute.value.params.id);

defineProps(['saveRecipe']);
</script>