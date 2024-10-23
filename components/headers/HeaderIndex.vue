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
        <PrimaryButton label="Filter"/>
        <!-- Settings Icon -->
        <SettingsDropdown/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import SearchBar from "~/components/forms/SearchBar.vue";
import PrimaryButton from "~/components/base/PrimaryButton.vue";
import SettingsDropdown from "~/components/base/UserMenu.vue";

const router = useRouter();
</script>