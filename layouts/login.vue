<!-- @/layouts/login.vue -->
<template>
  <div>
    <slot />
    <DialogWrapper />
  </div>
</template>

<script setup>
import { DialogWrapper } from "vue3-promise-dialog";
</script>