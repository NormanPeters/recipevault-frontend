<template>
  <header class="sticky top-0 w-full h-16 bg-white p-4 shadow z-10 flex items-center">
    <div class="container flex justify-between">
      <!-- Search Bar -->
      <SearchBar placeholder="Search For Ingredients..."/>

      <!-- Buttons Section -->
      <div class="flex items-center space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" @click="router.push('/create')"/>
        <!-- Filter Icon -->
        <button class="text-btnPrimary hover:text-btnPrimary-hover">
          <AdjustmentsHorizontalIcon class="h-6 w-6"/>
        </button>
        <!-- Settings Icon -->
        <SettingsDropdown/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
</script>