<!-- @/components/PrimaryButton.vue-->
<template>
  <button
      class="w-full flex flex-row items-center text-primary hover:text-btnPrimary-hover text-sm font-bold rounded-full focus:outline-none focus:shadow-outline py-1 px-2"
      :type="type"
      @click="onClick"
  >
    <slot name="linkIcon"/>
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