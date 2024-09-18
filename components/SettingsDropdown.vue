<template>
  <div class="relative inline-block text-left" ref="dropdown">
    <!-- Settings Icon -->
    <button
        @click="toggleDropdown"
        class="text-gray-500 hover:text-black focus:outline-none"
        aria-haspopup="true"
        :aria-expanded="isOpen"
    >
      <font-awesome-icon :icon="['fas', 'gear']" size="lg" />
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
        <div class="py-1" role="none">
          <button
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
          >
            Logout
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const isOpen = ref(false);
const dropdown = ref(null);
const { logout } = useAuth();

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function handleLogout() {
  logout();
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Optional: Add any additional styling here */
</style>