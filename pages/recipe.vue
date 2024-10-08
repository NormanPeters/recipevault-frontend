<script setup lang="ts">

import Header from "~/layouts/header.vue";
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <!-- Image and Ingredients -->
    <div class="container flex-grow grid xl:grid-cols-3 xl:grid-rows-3 py-4 gap-4">
      <div class="col-span-1 row-span-2 shadow rounded-lg bg-white p-4">
        <img
            class="w-full h-44 object-cover rounded-lg mb-4"
            src="assets/images/placeholder-recipe.jpg"
            alt="Dish Image"
        />
        <h2 class="text-lg font-bold">Ingredients</h2>
      </div>

      <!-- Manual Section -->
      <div class="flex flex-col col-span-2 row-span-3 shadow rounded-lg bg-white p-4 ">
        <h2 class="text-lg font-bold">Manual</h2>
        <!-- Input positioned at the bottom -->
        <div class="mt-auto">
          <label class="block text-lg font-bold mb-2 ml-2" :for="id">
            Source
          </label>
          <input
              id="search"
              type="text"
              placeholder="https://www.example.com"
              class="shadow-sm border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
              v-model="inputValue"
              disabled
          />
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-1 row-span-1 shadow rounded-lg bg-white p-4">
        <h2 class="text-lg font-bold">Nutritional Values</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
