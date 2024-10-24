<template>
  <header class="sticky top-0 w-full h-16 bg-white p-4 shadow z-10 flex items-center">
    <div class="container flex">
      <!-- Search Bar -->
      <SearchBar placeholder="Search For Ingredients..."/>

      <div class="flex flex-1 justify-start items-center pl-5">
        <!-- Favorites Button -->
        <PlusCircleIcon v-if="!showFavoritesOnly" class="h-5 w-5 text-primary cursor-pointer"
                  @click="$emit('toggle-favorites')"/>
        <MinusCircleIcon v-else class="h-5 w-5 text-primary cursor-pointer" @click="$emit('toggle-favorites')"/>
        <PrimaryButton label="Favorites" @click="$emit('toggle-favorites')"/>

        <!-- Filter Icon -->
        <FilterMenu @toggle-favorites="$emit('toggle-favorites')" class="pl-4"/>
      </div>

      <!-- Buttons Section -->
      <div class="flex items-center space-x-4">
        <!-- Add Recipe Button -->
        <PrimaryButton label="+ Add Recipe" @click="router.push('/create')"/>
        <!-- Settings Icon -->
        <UserMenu/>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import SearchBar from "~/components/forms/SearchBar.vue";
import PrimaryButton from "~/components/base/PrimaryButton.vue";
import UserMenu from "~/components/base/UserMenu.vue";
import FilterMenu from "~/components/base/FilterMenu.vue";
import {MinusCircleIcon, PlusCircleIcon} from "@heroicons/vue/24/outline";

const router = useRouter();

defineProps<{ showFavoritesOnly: boolean }>();
defineEmits(['toggle-favorites']);
</script>