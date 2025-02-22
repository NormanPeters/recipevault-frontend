<!-- @/components/PrimaryButton.vue-->
<template>
  <button
    class="focus:shadow-outline flex w-full flex-row items-center rounded-full px-2 py-1 text-sm font-bold text-primary hover:text-btnPrimary-hover focus:outline-none"
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
    default: "button",
  },
  onClick: Function,
});
</script>
