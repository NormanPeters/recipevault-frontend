<!-- @/pages/recipe/[id].vue -->
<template>
  <div class="flex flex-col h-screen">
    <Header :toggle-modal="toggleModal"/>
    <div v-if="recipe" class="container flex-grow grid xl:grid-cols-3 xl:grid-rows-3 py-4 gap-4">
      <!-- Recipe Image and Ingredients Section -->
      <div class="flex flex-col col-span-1 row-span-2 shadow rounded bg-white p-4">
        <!-- Image Section -->
        <img
            class="w-full h-48 object-cover rounded mb-4"
            :src="recipe.imageUrl || '/images/placeholder-recipe.jpg'"
            alt="Dish Image"
        />

        <!-- Ingredients Header -->
        <div class="flex items-center justify-between mb-4">
          <h2>Ingredients</h2>
          <div class="flex items-center space-x-1">
            <span>For</span>
            <input
                type="number"
                :value="recipe.servings"
                class="w-10 text-center border border-gray-300 rounded focus:outline-none focus:border-btnPrimary"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <div v-for="ingredient in recipe.ingredients" :key="ingredient.ingredientId" class="grid grid-cols-2 mb-1">
          <div>{{ ingredient.amount }} {{ ingredient.unit }}</div>
          <div>{{ ingredient.title }}</div>
        </div>
      </div>

      <!-- Manual Section -->
      <div class="flex flex-col col-span-2 row-span-3 shadow rounded bg-white p-4">
        <!-- Tools -->
        <h2>What You Need</h2>
        <div class="ml-3 mt-2 mb-2">
          <div v-for="tool in recipe.tools" class="list-none">{{ tool.amount }} {{ tool.title }}</div>
        </div>
        <!-- Manual Steps -->
        <h2>Manual</h2>
        <div class="ml-3 mt-2">
          <div v-for="(step, index) in recipe.steps" :key="index">{{ index + 1 }}. {{ step.stepDescription }}</div>
        </div>

        <!-- Input positioned at the bottom -->
        <div class="mt-auto">
          <h2>Source</h2>
          <div class="mx-1 mt-2">
            <TextInput
                type="text"
                placeholder="https://www.example.com"
                v-model="recipe.sourceUrl"
                disabled
            />
          </div>
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-1 row-span-1 shadow rounded bg-white p-4">
        <h2 class="mb-3">Nutritional Values</h2>
        <div class="grid grid-cols-3 gap-2">
          <div></div>
          <div class="text-black font-bold">100g</div>
          <div class="text-black font-bold">Portion ({{ portionSize }}g)</div>
          <div v-for="value in nutritionalValuesPerPortion" :key="value.title" class="contents">
            <div>{{ value.title }}</div>
            <div>{{ value.amount }}</div>
            <div>{{ value.amountPerPortion }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback when recipe is not loaded yet -->
    <div v-else class="flex items-center justify-center h-full text-lg text-gray-500">
      Loading recipe details...
    </div>

    <!-- Modal for deleting a recipe -->
    <ModalDelete :show="modalDelete" @close="toggleModal" @confirm-delete="deleteRecipe" />
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRecipeStore} from '~/stores/recipe';
import Header from '~/layouts/header.vue';
import TextInput from "~/components/forms/TextInput.vue";
import ModalDelete from "~/components/modals/ModalDelete.vue";

const route = useRoute();
const router = useRouter();
const recipeStore = useRecipeStore();
const recipeId = Number(route.params.id);
const recipe = computed(() => recipeStore.selectedRecipe);
const modalDelete = ref(false);

onMounted(async () => {
  await recipeStore.fetchRecipeById(recipeId);

});
onUnmounted(() => {
  recipeStore.clearSelectedRecipe();

});

// delete recipe
const toggleModal = () => {
  modalDelete.value = !modalDelete.value;
}

const deleteRecipe = async () => {
  const selectedRecipe = recipeStore.selectedRecipe;
  if (selectedRecipe && selectedRecipe.recipeId !== undefined) {
    await recipeStore.deleteRecipe(selectedRecipe.recipeId);
    modalDelete.value = false;
  }
  await router.push('/');
};

// Calculate nutritional values per portion
const portionSize = computed(() => recipe.value?.portionSize || 0);

const nutritionalValuesPerPortion = computed(() => {
  return recipe.value?.nutritionalValues?.map(value => {
    const amountPerPortion = (value.amount / 100) * portionSize.value;
    return {
      title: value.title,
      amount: value.amount,
      amountPerPortion: amountPerPortion.toFixed(0)
    };
  }) || [];
});
</script>