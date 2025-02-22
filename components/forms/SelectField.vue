<!-- @/components/SelectField.vue -->
<template>
  <select
    class="focus:shadow-outline w-full rounded border px-2 py-2 leading-tight shadow-sm focus:border-primary focus:outline-none"
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

const emit = defineEmits(["update:modelValue"]);

const selectedValue = ref(props.modelValue);
watch(selectedValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
