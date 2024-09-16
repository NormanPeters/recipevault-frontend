<script setup lang="ts">

</script>


<template>
  <div class="main flex justify-center items-center h-screen w-screen">
    <div class="bg-white basis-1/3 shadow-md rounded-lg p-6">
      <div class="card-body">

        <h1 class="font-syncopate  text-2xl font-bold text-center my-6">Recipe Vault</h1>
        <form>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-2" for="email">
              Email
            </label>
            <input
                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
            />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2 ml-2" for="password">
              Password
            </label>
            <input
                class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
                class="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="button"
            >
              Login
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-primary hover:text-primary-hover" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.main {
  background-image: url('assets/images/bg-start.jpg');
  background-size: cover;
}
</style>