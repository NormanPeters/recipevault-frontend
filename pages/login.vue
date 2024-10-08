<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white w-full max-w-xl rounded-lg p-8 m-2">
      <div class="card-body">
        <div class="flex justify-center">
          <BookOpenIcon class="h-12 w-12 text-primary"/>
        </div>
        <h1 class="font-syncopate text-3xl font-bold text-center my-10">Recipe Vault</h1>
        <form @submit.prevent="handleLogin">
          <TextInput id="username" label="Username" v-model="username"/>
          <TextInput id="password" type="password" label="Password" v-model="password"/>
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
import {useAuthStore} from "@/stores/auth";
import {BookOpenIcon} from "@heroicons/vue/24/solid";

const username = ref<string>('');
const password = ref<string>('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);
    await router.push('/');
  } catch (error) {
    console.error('Error during login:', error);
  }
};

console.log("isAuthenticated:" + authStore.isAuthenticated);
</script>

<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>