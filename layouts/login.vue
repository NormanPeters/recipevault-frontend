<!-- @/layouts/login.vue -->
<template>
  <div>
    <NuxtPage />
    <DialogWrapper />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { DialogWrapper } from "vue3-promise-dialog";
const router = useRouter();
const navigateToRoute = (route) => {
  router.push(route);
};
</script>