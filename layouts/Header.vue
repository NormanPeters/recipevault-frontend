<template>
  <header class="bg-white p-4 shadow">
    <div class="container bg-white flex items-center justify-between">
      <!-- Search Bar -->
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm border focus-within:border-primary focus-within:shadow-outline">
        <input
            type="text"
            placeholder="Search for ingredients"
            class="bg-transparent outline-none text-gray-600 placeholder-gray-400 w-full leading-tight px-3"
        />
        <button class="text-gray-500 ml-2">
          <!-- Search Icon (SVG) -->
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
        </button>
      </div>

      <!-- Buttons Section -->
      <div class="flex space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe"/>
        <!-- First Icon (Filter) -->
        <button class="text-gray-500 hover:text-black">
          <font-awesome-icon :icon="['fas', 'filter']" size="lg"/>
        </button>

        <!-- Second Icon (Sort) -->
        <button class="text-gray-500 hover:text-black">
          <font-awesome-icon :icon="['fas', 'gear']" size="lg"/>
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>