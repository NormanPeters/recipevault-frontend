<template>
  <header class="sticky top-0 w-full h-16 bg-white p-4 shadow z-10 flex items-center">
    <div class="container flex">
      <!-- Search Bar -->
      <SearchBar placeholder="Search For Ingredients..."/>

      <!-- Filters Section -->
      <div class="flex flex-1 justify-start items-center px-2">
        <PrimaryButton v-if="!isFilterCardOpen" label="Filter" @click="$emit('toggle-filter-card')"/>
        <PrimaryButton v-else label="Close" @click="$emit('toggle-filter-card')"/>
      </div>

      <!-- Buttons Section -->
      <div class="flex items-center space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" @click="router.push('/create')"/>
        <!-- Settings Icon -->
        <UserMenu />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import SearchBar from "~/components/forms/SearchBar.vue";
import PrimaryButton from "~/components/base/PrimaryButton.vue";
import UserMenu from "~/components/base/UserMenu.vue";
const router = useRouter();

defineEmits(['toggle-filter-card']);
defineProps<{ isFilterCardOpen: boolean }>();
</script>