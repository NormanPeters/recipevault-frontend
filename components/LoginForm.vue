<!-- @/components/LoginForm.vue -->
<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white w-full max-w-xl rounded-lg p-8 m-2">
      <div class="card-body">
        <div class="flex justify-center">
          <BookOpenIcon class="h-12 w-12 text-primary"/>
        </div>
        <h1 class="font-syncopate text-3xl font-bold text-center my-10">Recipe Vault</h1>
        <form @submit.prevent="handleLogin">
          <TextInput id="username" label="Username" v-model="username" class="mb-4"/>
          <TextInput id="password" type="password" label="Password" v-model="password" class="mb-4"/>
          <div class="flex items-center justify-between">
            <PrimaryButton label="Login" type="submit"/>
            <a class="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-hover" href="">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { BookOpenIcon } from "@heroicons/vue/24/solid";
import { api } from "~/services/api";

// Reactive state for username and password fields
const username = ref<string>('');
const password = ref<string>('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const token = await api.login({ username: username.value, password: password.value });
    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Login successful");
      await router.push("/");
    } else {
      console.log("Invalid username or password. Please try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
</script>

<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>