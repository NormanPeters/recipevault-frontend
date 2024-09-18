<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white w-full max-w-xl rounded-lg p-8 m-2">
      <div class="card-body">
        <div class="flex justify-center">
          <font-awesome-icon :icon="['fas', 'book-open']" class="text-primary text-5xl mx-auto"/>
        </div>
        <h1 class="font-syncopate text-3xl font-bold text-center my-10">Recipe Vault</h1>
        <form @submit.prevent="handleLogin">
          <TextInput
              id="username"
              label="Username"
              v-model="username"
          />
          <TextInput
              id="password"
              type="password"
              label="Password"
              v-model="password"
          />
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

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {userService} from '~/services/userService';
import {useAuth} from '~/composables/useAuth';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const username = ref('');
const password = ref('');
const router = useRouter();

// Login handler
async function handleLogin() {
  const {setAuth} = useAuth();

  try {
    const user = await userService.login({username: username.value, password: password.value});

    setAuth(user);

    await router.push('/');
    console.log('Login successful');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed. Please check your credentials.');
  }
}

// Redirect to home if user is already authenticated
const {isAuthenticated} = useAuth();
if (!isAuthenticated()) {
  router.push('/login');
}
</script>

<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>