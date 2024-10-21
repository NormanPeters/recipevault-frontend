<!-- @/layouts/header.vue -->
<template>
  <component :is="currentHeader" :submitRecipe="submitRecipe" :saveRecipe="saveRecipe" :toggleModal="toggleModal"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import HeaderIndex from '@/components/headers/HeaderIndex.vue';
import HeaderRecipe from '@/components/headers/HeaderRecipe.vue';
import HeaderEdit from '@/components/headers/HeaderEdit.vue';
import HeaderCreate from '@/components/headers/HeaderCreate.vue';

const route = useRoute();

const currentHeader = computed(() => {
  if (route.path === '/') {
    return HeaderIndex;
  } else if (route.path.match(/^\/recipe\/\d+$/)) {
    return HeaderRecipe;
  } else if (route.path.match(/^\/edit\/\d+$/)) {
    return HeaderEdit;
  } else if (route.path === '/create') {
    return HeaderCreate;
  }
  return null;
});

defineProps(['submitRecipe', 'saveRecipe', 'toggleModal']);
</script>