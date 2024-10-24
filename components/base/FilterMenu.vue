<template>
  <div class="relative inline-flex text-left" ref="dropdown">
    <!-- Settings Icon -->
    <PrimaryButton
        @click="toggleDropdown"
        class="text-btnPrimary hover:text-btnPrimary-hover focus:outline-none"
        aria-haspopup="true"
        :aria-expanded="isOpen"
        label="Filter"
    />

    <!-- Dropdown Menu -->
    <Dropdown :isOpen="isOpen">
      <template #slot1>
        <div class="flex items-center px-3 py-2">
          <input type="checkbox" :checked="showFavoritesOnly" @change="showFavoritesOnly">
          <DropdownBtn label="Favorites"
                         @click="$emit('toggle-favorites')"/>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import Dropdown from './Dropdown.vue';
import PrimaryButton from "~/components/base/PrimaryButton.vue";
import DropdownBtn from "~/components/base/DropdownBtn.vue";

const isOpen = ref<boolean>(false);
const dropdown = ref<HTMLElement | null>(null);

function toggleDropdown(): void {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: Event): void {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

defineProps<{ showFavoritesOnly: boolean }>();
defineEmits(['toggle-favorites']);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>