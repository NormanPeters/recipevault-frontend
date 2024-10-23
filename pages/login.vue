<!-- @/pages/login.vue -->
<template>
  <section>
    <div >
      <LoginForm />
    </div>
  </section>
</template>
<script setup>
import LoginForm from "~/components/user/LoginForm.vue";

definePageMeta({
  layout: "login",
});
</script>