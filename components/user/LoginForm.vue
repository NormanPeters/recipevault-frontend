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
          <span class="font-bold">Username</span>
          <TextInput id="username" label="Username" v-model="username" class="mb-4"/>
          <span class="font-bold">Password</span>
          <div class="relative mb-4">
            <TextInput :type="showPassword ? 'text' : 'password'" id="password" label="Password" v-model="password"
                       class="w-full"/>
            <button type="button" @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center leading-5">
              <EyeIcon v-if="!showPassword" class="h-5 w-5"/>
              <EyeSlashIcon v-else class="h-5 w-5"/>
            </button>
          </div>
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
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {BookOpenIcon} from "@heroicons/vue/24/solid";
import {api} from "~/services/api";
import {EyeIcon, EyeSlashIcon} from "@heroicons/vue/24/outline";
import TextInput from "~/components/forms/TextInput.vue";
import PrimaryButton from "~/components/base/PrimaryButton.vue";

// Reactive state for username and password fields
const username = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);
const router = useRouter();

const handleLogin = async () => {
  try {
    const token = await api.login({username: username.value, password: password.value});
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
  background-image: url('@/assets/images/bg-start.jpg');
  background-size: cover;
}
</style>