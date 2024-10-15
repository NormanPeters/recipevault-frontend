<!-- @/components/PrimaryButton.vue-->
<template>
  <button
      class="bg-primary hover:bg-primary-hover text-sm text-gray-800 py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      :type="type"
      @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'button',
  },
  onClick: Function,
});
</script>