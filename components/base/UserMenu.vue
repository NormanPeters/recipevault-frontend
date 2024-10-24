<template>
  <div class="relative inline-flex text-left" ref="dropdown">
    <!-- Settings Icon -->
    <button
        @click="toggleDropdown"
        class="text-btnPrimary hover:text-btnPrimary-hover focus:outline-none"
        aria-haspopup="true"
        :aria-expanded="isOpen"
    >
      <UserCircleIcon class="h-8 w-8"/>
    </button>

    <!-- Dropdown Menu -->
    <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
    >
      <div
          v-if="isOpen"
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
      >
        <div class="flex items-center px-3 py-2 text-primary hover:text-btnPrimary-hover">
          <ArrowRightEndOnRectangleIcon class="h-6 w-6"/>
          <DropdownButton
              @click="handleLogout"
              label="Logout"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import {UserCircleIcon} from "@heroicons/vue/24/solid";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/vue/24/outline";
import DropdownButton from "~/components/base/DropdownButton.vue";

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