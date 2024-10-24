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
    <Dropdown :isOpen="isOpen" @logout="handleLogout">
      <template #slot1>
        <div class="flex items-center px-3 py-2">
          <ArrowRightEndOnRectangleIcon class="h-6 w-6 text-primary"/>
          <DropdownBtn
              @click="handleLogout"
              label="Logout"
          />
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import {UserCircleIcon} from "@heroicons/vue/24/solid";
import {ArrowRightEndOnRectangleIcon} from "@heroicons/vue/24/outline";
import Dropdown from './Dropdown.vue';
import DropdownBtn from "~/components/base/DropdownBtn.vue";

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