<!-- @/layouts/default.vue -->
<template>
  <div v-if="isAuthenticated">
    <slot />
    <DialogWrapper />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { DialogWrapper } from "vue3-promise-dialog";

const router = useRouter();
const isAuthenticated = ref<boolean | null>(null);

onMounted(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      isAuthenticated.value = true;
    } else {
      isAuthenticated.value = false;
      router.push("/login");
    }
});
</script>