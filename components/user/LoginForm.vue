<!-- @/components/LoginForm.vue -->
<template>
  <div class="main flex h-screen w-screen items-center justify-center">
    <div class="m-2 w-full max-w-xl rounded-lg bg-white p-8">
      <div class="card-body">
        <div class="flex justify-center">
          <BookOpenIcon class="h-12 w-12 text-primary" />
        </div>
        <h1 class="my-10 text-center font-syncopate text-3xl font-bold">
          Recipe Vault
        </h1>
        <form @submit.prevent="handleLogin">
          <span class="font-bold">Username</span>
          <TextInput
            id="username"
            label="Username"
            v-model="username"
            class="mb-4"
          />
          <span class="font-bold">Password</span>
          <div class="relative mb-4">
            <TextInput
              :type="showPassword ? 'text' : 'password'"
              id="password"
              label="Password"
              v-model="password"
              class="w-full"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 flex items-center pr-3 leading-5"
            >
              <EyeIcon v-if="!showPassword" class="h-5 w-5" />
              <EyeSlashIcon v-else class="h-5 w-5" />
            </button>
          </div>
          <div class="flex items-center justify-between">
            <PrimaryButton label="Login" type="submit" />
            <a
              class="hover:text-primary-hover inline-block align-baseline text-sm font-bold text-primary"
              href=""
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { BookOpenIcon } from "@heroicons/vue/24/solid";
import { api } from "~/services/api";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import TextInput from "~/components/forms/TextInput.vue";
import PrimaryButton from "~/components/base/PrimaryButton.vue";

// Reactive state for username and password fields
const username = ref<string>("");
const password = ref<string>("");
const showPassword = ref<boolean>(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    const token = await api.login({
      username: username.value,
      password: password.value,
    });
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

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.main {
  background-image: url("@/assets/images/bg-start.jpg");
  background-size: cover;
}
</style>
