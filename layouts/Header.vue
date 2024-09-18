<template>
  <!-- Header Index -->
  <header v-if="$route.path === '/'" class="sticky top-0 w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Search Bar -->
      <div
          class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm border focus-within:border-primary focus-within:shadow-outline">
        <input
            type="text"
            placeholder="Search for ingredients"
            class="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full leading-tight px-3"
        />
        <button class="text-gray-500 ml-2">
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
        </button>
      </div>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" />
        <!-- Filter Icon -->
        <button class="text-gray-500 hover:text-black">
          <font-awesome-icon :icon="['fas', 'filter']" size="lg" />
        </button>
        <!-- Settings Icon -->
        <button class="text-gray-500 hover:text-black">
          <font-awesome-icon :icon="['fas', 'gear']" size="lg" />
        </button>
      </div>
    </div>
  </header>

  <!-- Header Recipe -->
  <header v-if="$route.path === '/recipe'" class="w-full bg-white p-4 shadow z-10">
    <div class="container bg-white flex items-center justify-between">
      <!-- Recipe Title -->
      <h1 class="text-3xl font-bold leading-tight">Hackbällchen mit Senfsoße</h1>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <PrimaryButton label="Edit" />
        <PrimaryButton label="Back" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>