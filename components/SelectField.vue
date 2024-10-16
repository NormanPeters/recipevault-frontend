<!-- @/components/SelectField.vue -->
<template>
  <select
      class="w-full rounded shadow-sm border py-2 px-2 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
      v-model="selectedValue"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);
watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>