<!-- pages/login.vue -->
<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white w-full max-w-xl rounded-lg p-8 m-2">
      <div class="card-body">
        <div class="flex justify-center">
          <font-awesome-icon :icon="['fas', 'book-open']" class="text-primary text-5xl mx-auto" />
        </div>
        <h1 class="font-syncopate text-3xl font-bold text-center my-10">Recipe Vault</h1>
        <form @submit.prevent="handleLogin">
          <TextInput id="username" label="Username" v-model="username" />
          <TextInput id="password" type="password" label="Password" v-model="password" />
          <div class="flex items-center justify-between">
            <PrimaryButton label="Login" type="submit" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const username = ref<string>('');
const password = ref<string>('');
const router = useRouter();
const authStore = useAuthStore();
const { login, isAuthenticated } = authStore;

async function handleLogin(): Promise<void> {
  try {
    await login({ username: username.value, password: password.value });
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  }
}

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/');
  }
});

definePageMeta({
  middleware: 'auth-redirect'
});
</script>

<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>