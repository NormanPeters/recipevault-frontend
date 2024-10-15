<!-- @/pages/create.vue -->
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useRecipeStore} from '~/stores/recipe';
import Header from '~/layouts/header.vue';
import {Recipe} from '~/services/types';
import {TrashIcon} from "@heroicons/vue/24/outline";

const router = useRouter();
const recipeStore = useRecipeStore();

const createNewRecipe = (): Recipe => ({
  imageUrl: '',
  title: '',
  description: '',
  isFavourite: false,
  ingredients: [],
  tools: [],
  steps: [],
  nutritionalValues: [],
});

const newRecipe = ref<Recipe>(createNewRecipe());

// Ingredient Methods
const addIngredient = () => {
  if (!newRecipe.value.ingredients) {
    newRecipe.value.ingredients = [];
  }
  newRecipe.value.ingredients.push({title: '', amount: 0, unit: 'g', recipe: {} as Recipe});
};

const removeIngredient = (index: number) => {
  if (newRecipe.value.ingredients) {
    newRecipe.value.ingredients.splice(index, 1);
  }
};

const measurementUnits = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'piece'];

// Tool Methods
const addTool = () => {
  if (!newRecipe.value.tools) {
    newRecipe.value.tools = [];
  }
  newRecipe.value.tools.push({title: '', amount: 0, recipe: {} as Recipe});
};

// Step Methods
const addStep = () => {
  if (!newRecipe.value.steps) {
    newRecipe.value.steps = [];
  }
  newRecipe.value.steps.push({stepDescription: '', stepNumber: 0, recipe: {} as Recipe});
};

// Nutritional Value Methods
const addNutritionalValue = () => {
  if (!newRecipe.value.nutritionalValues) {
    newRecipe.value.nutritionalValues = [];
  }
  newRecipe.value.nutritionalValues.push({title: '', amount: 0, recipe: {} as Recipe});
};

const submitRecipe = async () => {
  try {
    await recipeStore.createRecipe(newRecipe.value);
    await router.push('/');
  } catch (error) {
    console.error('Error creating recipe:', error);
  }
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header/>
    <div class="container flex-grow grid xl:grid-cols-6 xl:grid-rows-6 py-4 gap-4">

      <!-- Recipe Image and Ingredients Section -->
      <div class="col-span-2 row-span-3 shadow rounded-lg bg-white p-4">
        <!-- Image Section -->
        <div class="mt-auto">
          <label class="block text-lg text-primary font-bold mb-2" for="source">Image URL</label>
          <input
              type="text"
              class="shadow-sm border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary mb-2"
              v-model="newRecipe.imageUrl"
          />
        </div>

        <!-- Ingredients Header -->
        <div class="flex items-center justify-between mb-4 text-sm">
          <h2 class="text-lg font-bold text-primary">Ingredients</h2>
          <div class="flex items-center space-x-1 text-gray-800">
            <span>For</span>
            <input
                type="number"
                v-model="newRecipe.servings"
                class="w-12 px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                aria-label="Servings"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <table class="w-full text-left text-sm mb-2">
          <tbody>
          <tr v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
            <td class="py-1 text-gray-800">
              <input
                  type="text"
                  v-model="ingredient.amount"
                  placeholder="Amount"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Ingredient Amount"
                  @keyup.enter="addIngredient"
              />
            </td>
            <td class="py-1 pl-1 text-gray-800">
              <select
                  v-model="ingredient.unit"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Ingredient Unit"
                  @keyup.enter="addIngredient">
                <option v-for="unit in measurementUnits" :key="unit" :value="unit">{{ unit }}</option>
              </select>
            </td>
            <td class="w-1/2 py-1 pr-1 text-gray-800">
              <input
                  type="text"
                  v-model="ingredient.title"
                  placeholder="Title"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Ingredient Title"
                  @keyup.enter="addIngredient"/>
            </td>
            <td class="py-1 pl-1 text-gray-800">
              <button @click="removeIngredient(index)" class="text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <PrimaryButton @click="addIngredient" label="Add Ingredient">Add Ingredient</PrimaryButton>
      </div>

      <!-- Manual Section -->
      <div class="flex flex-col col-span-4 row-span-6 shadow rounded-lg bg-white p-4">
        <!-- Tools -->
        <h2 class="text-lg text-primary font-bold">What You Need</h2>
        <ul class="ml-4 mt-2 mb-2">
          <li v-for="(tool, index) in newRecipe.tools" :key="index" class="list-none">
            <input
                type="text"
                v-model="tool.amount"
                placeholder="Amount"
                class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Tool Amount"
            />
            <input
                type="text"
                v-model="tool.title"
                placeholder="Tool"
                class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Tool Title"
            />
          </li>
        </ul>

        <button @click="addTool" class="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Tool</button>

        <!-- Manual Steps -->
        <h2 class="text-lg text-primary font-bold mt-4">Manual</h2>
        <ol class="list-decimal ml-4 mt-2">
          <li v-for="(step, index) in newRecipe.steps" :key="index">
            <input
                type="text"
                v-model="step.stepDescription"
                placeholder="Step Description"
                class="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                aria-label="Step Description"
            />
          </li>
        </ol>

        <button @click="addStep" class="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Step</button>

        <!-- Source URL -->
        <div class="mt-auto">
          <label class="block text-lg text-primary font-bold mb-2 ml-2" for="source">Source</label>
          <input
              id="source"
              type="text"
              placeholder="https://www.example.com"
              class="shadow-sm border rounded-full w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
              v-model="newRecipe.sourceUrl"
          />
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-2 row-span-3 shadow rounded-lg bg-white p-4">
        <h2 class="text-lg font-bold text-primary mb-4">Nutritional Values</h2>
        <table class="w-full text-left text-sm mb-2">
          <tbody>
          <tr v-for="(value, index) in newRecipe.nutritionalValues" :key="index">
            <td class="py-1 pr-1 text-gray-800">
              <input
                  type="text"
                  v-model="value.title"
                  placeholder="Nutrient"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Nutritional Value Title"
                  @keyup.enter="addNutritionalValue"/>
            </td>
            <td class="py-1 text-gray-800">
              <input
                  type="text"
                  v-model="value.amount"
                  placeholder="Amount per 100g"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Amount per 100g"
                  @keyup.enter="addNutritionalValue"
              />
            </td>
            <td class="py-1 pl-1 text-gray-800">
              <input
                  type="text"
                  v-model="value.amountPerPortion"
                  placeholder="Amount per Portion"
                  class="w-full px-2 shadow-sm border border-gray-300 rounded-full focus:outline-none focus:ring-primary focus:border-primary"
                  aria-label="Amount per Portion"
                  @keyup.enter="addNutritionalValue"/>
            </td>
            <td class="py-1 pl-1 text-gray-800">
              <button @click="removeNutritionalValue(index)" class="text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <PrimaryButton @click="addNutritionalValue" label="Add Nutritional Value">Add Nutritional Value</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
