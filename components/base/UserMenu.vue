<template>
  <div class="relative inline-flex text-left" ref="dropdown">
    <!-- Settings Icon -->
    <button
        @click="toggleDropdown"
        class="text-btnPrimary hover:text-btnPrimary-hover focus:outline-none"
        aria-haspopup="true"
        :aria-expanded="isOpen"
    >
      <UserCircleIcon class="h-6 w-6"/>
    </button>

    <!-- Dropdown Menu -->
    <DropdownMenu :isOpen="isOpen" @logout="handleLogout">
      <template #logout>
        <DropdownLink
            @click="handleLogout"
            label="Logout"
            class="text-left px-2 py-2"
        >
          <template #linkIcon>
            <ArrowRightEndOnRectangleIcon class="h-6 w-6 mx-2"/>
          </template>
        </DropdownLink>
      </template>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import {UserCircleIcon} from "@heroicons/vue/24/solid";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/vue/24/outline";
import DropdownMenu from './DropdownMenu.vue';
import DropdownLink from "~/components/base/DropdownLink.vue";

const isOpen = ref<boolean>(false);
const dropdown = ref<HTMLElement | null>(null);
const router = useRouter();

function toggleDropdown(): void {
  isOpen.value = !isOpen.value;
}

function handleClickOutside(event: Event): void {
  if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

const handleLogout = () => {
  try {
    localStorage.removeItem('authToken');
    router.push('/login');
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>