<!-- @/pages/recipe/[id].vue -->
<template>
  <div class="flex h-screen flex-col">
    <Header :toggle-modal="toggleModal" />
    <div
      v-if="recipe"
      class="container grid flex-grow gap-4 py-4 xl:grid-cols-3 xl:grid-rows-3"
    >
      <!-- Recipe Image and Ingredients Section -->
      <div
        class="col-span-1 row-span-2 flex flex-col rounded bg-white p-4 shadow"
      >
        <!-- Image Section -->
        <img
          class="mb-4 h-48 w-full rounded object-cover"
          :src="recipe.imageUrl || '/images/placeholder-recipe.jpg'"
          alt="Dish Image"
        />

        <!-- Ingredients Header -->
        <div class="mb-4 flex items-center justify-between">
          <h2>Ingredients</h2>
          <div class="flex items-center space-x-1">
            <span>For</span>
            <input
              type="number"
              :value="recipe.servings"
              class="w-10 rounded border border-gray-300 text-center focus:border-btnPrimary focus:outline-none"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <div
          v-for="ingredient in recipe.ingredients"
          :key="ingredient.ingredientId"
          class="mb-1 grid grid-cols-2"
        >
          <div>{{ ingredient.amount }} {{ ingredient.unit }}</div>
          <div>{{ ingredient.title }}</div>
        </div>
      </div>

      <!-- Manual Section -->
      <div
        class="col-span-2 row-span-3 flex flex-col rounded bg-white p-4 shadow"
      >
        <!-- Tools -->
        <h2>What You Need</h2>
        <div class="mb-2 ml-3 mt-2">
          <div v-for="tool in recipe.tools" class="list-none">
            {{ tool.amount }} {{ tool.title }}
          </div>
        </div>
        <!-- Manual Steps -->
        <h2>Manual</h2>
        <div class="ml-3 mt-2">
          <div v-for="(step, index) in recipe.steps" :key="index">
            {{ index + 1 }}. {{ step.stepDescription }}
          </div>
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
      <div class="col-span-1 row-span-1 rounded bg-white p-4 shadow">
        <h2 class="mb-3">Nutritional Values</h2>
        <div class="grid grid-cols-3 gap-2">
          <div></div>
          <div class="font-bold text-black">100g</div>
          <div class="font-bold text-black">Portion ({{ portionSize }}g)</div>
          <div
            v-for="value in nutritionalValuesPerPortion"
            :key="value.title"
            class="contents"
          >
            <div>{{ value.title }}</div>
            <div>{{ value.amount }}</div>
            <div>{{ value.amountPerPortion }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback when recipe is not loaded yet -->
    <div
      v-else
      class="flex h-full items-center justify-center text-lg text-gray-500"
    >
      Loading recipe details...
    </div>

    <!-- Modal for deleting a recipe -->
    <ModalDelete
      :show="modalDelete"
      @close="toggleModal"
      @confirm-delete="deleteRecipe"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRecipeStore } from "~/stores/recipe";
import Header from "~/layouts/header.vue";
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
};

const deleteRecipe = async () => {
  const selectedRecipe = recipeStore.selectedRecipe;
  if (selectedRecipe && selectedRecipe.recipeId !== undefined) {
    await recipeStore.deleteRecipe(selectedRecipe.recipeId);
    modalDelete.value = false;
  }
  await router.push("/");
};

// Calculate nutritional values per portion
const portionSize = computed(() => recipe.value?.portionSize || 0);

const nutritionalValuesPerPortion = computed(() => {
  return (
    recipe.value?.nutritionalValues?.map((value) => {
      const amountPerPortion = (value.amount / 100) * portionSize.value;
      return {
        title: value.title,
        amount: value.amount,
        amountPerPortion: amountPerPortion.toFixed(0),
      };
    }) || []
  );
});
</script>
