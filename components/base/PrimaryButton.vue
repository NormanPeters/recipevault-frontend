<!-- @/components/PrimaryButton.vue-->
<template>
  <button
      class="text-sm font-bold text-btnPrimary hover:text-btnPrimary-hover rounded-full focus:outline-none focus:shadow-outline py-1 px-2"
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