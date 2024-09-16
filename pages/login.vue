<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white basis-1/3 rounded-lg p-8">
      <div class="card-body">
        <div class="flex justify-center">
          <font-awesome-icon :icon="['fas', 'book']" class="text-5xl mx-auto"/>
        </div>
        <h1 class="font-syncopate text-3xl font-bold text-center my-10">Recipe Vault</h1>
        <form>
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
            <PrimaryButton label="Login" @click="handleLogin"/>
            <a class="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-hover" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import PrimaryButton from '~/components/PrimaryButton.vue';
import TextInput from '~/components/TextInput.vue';
import {ref} from 'vue';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const username = ref('');
const password = ref('');

function handleLogin() {
  console.log('Logging in with:', username.value, password.value);
}
</script>


<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>