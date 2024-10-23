<!-- @/components/TextInput.vue -->
<template>
    <input
        :type="type"
        :placeholder="placeholder"
        class="w-full rounded shadow-sm border py-2 px-2 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
        v-model="inputValue"
    />
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>