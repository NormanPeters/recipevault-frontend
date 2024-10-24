<!-- SearchBar.vue -->
<template>
  <div class="flex items-center bg-gray-100 rounded-full px-2 py-1 shadow-sm border focus-within:border-primary focus-within:shadow-outline w-full max-w-xs">
    <input
        class="bg-transparent outline-none placeholder-gray-400 leading-tight px-3 w-full"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="submitInput"
    />
    <button class="ml-2" @click="submitInput">
      <MagnifyingGlassIcon class="h-6 w-6"/>
    </button>
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';

const inputValue = ref<string>('');

const props = defineProps({
  type: {
    type: [String],
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search...',
  },
});

const emit = defineEmits(['submit']);

const submitInput = () => {
  emit('submit', inputValue.value);
};
</script>