<!-- @/components/TextInput.vue -->
<template>
  <div class="mb-4">
    <label class="block text-sm font-bold mb-2 ml-2" :for="id">
      {{ label }}
    </label>
    <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        class="shadow-sm border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
        v-model="inputValue"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>