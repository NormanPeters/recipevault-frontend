<template>
  <header class="w-full h-16 bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-end">
      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton @click="submitRecipe" label="+ Submit"/>
        <NuxtLink to="/">
          <PrimaryButton label="Cancel"/>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps(['submitRecipe']);
</script>