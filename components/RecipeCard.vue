<template>
  <div class="max-w-full max-h-96 rounded-lg overflow-hidden shadow bg-white p-4">
    <!-- Image Section -->
    <div class="relative">
      <img
          class="w-full h-44 object-cover rounded-lg"
          src="https://via.placeholder.com/400x300"
          alt="Dish Image"
      />
      <!-- Heart Icon (Favorite Button) -->
      <div class="absolute top-2 right-2">
        <button class="bg-transparent rounded-full text-primary hover:text-primary-hover">
          <font-awesome-icon :icon="['fas', 'heart']" size="lg"  />
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4">
      <!-- Title -->
      <h2 class="text-lg font-bold text-gray-800">Pasta</h2>

      <!-- Time and Calories -->
      <div class="flex justify-between text-gray-500 text-sm my-2">
        <span>30 - 40 Minuten</span>
        <span>4228 kj / 1011 kcal</span>
      </div>

      <!-- Description -->
      <p class="text-gray-700 text-sm">
        Zwiebel, Semmelbrösel, gemischtes Hackfleisch, Basmatireis, Porree, körniger Senf, mittelscharfer Senf, Rinderbrühe, Petersilie, Schnittlauch, Honig, Karotte, Kochsahne
      </p>
    </div>
  </div>
</template>

<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
</script>

<style scoped>
</style>