<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<template>
  <header class="sticky top-0 w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-3xl font-bold">Hackbällchen mit Senfsoße</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="Edit"/>
        <PrimaryButton label="Back"/>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>