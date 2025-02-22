<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"
  >
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Delete Recipe
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete this recipe? This action cannot
                be undone.
              </p>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="$emit('confirm-delete')"
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              @click="$emit('close')"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  show: Boolean,
});
defineEmits(["close", "confirm-delete"]);
</script>
