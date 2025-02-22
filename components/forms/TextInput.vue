<!-- @/components/TextInput.vue -->
<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="focus:shadow-outline w-full rounded border px-2 py-2 leading-tight shadow-sm focus:border-primary focus:outline-none"
    v-model="inputValue"
  />
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: [String, Number],
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);
watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
