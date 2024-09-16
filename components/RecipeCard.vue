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
        <button class="bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-gray-100">
          <!-- FontAwesome icon (for example) -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
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
</script>

<style scoped>
</style>