<template>
  <header class="z-10 h-16 w-full bg-white p-4 shadow">
    <div class="container flex items-center justify-end bg-white">
      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton @click="submitRecipe" label="+ Submit" />
        <NuxtLink to="/">
          <PrimaryButton label="Cancel" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import PrimaryButton from "~/components/base/PrimaryButton.vue";

defineProps(["submitRecipe"]);
</script>
