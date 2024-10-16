<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {useRecipeStore} from '~/stores/recipe';
import Header from '~/layouts/header.vue';
import {Recipe} from '~/services/types';
import {TrashIcon} from "@heroicons/vue/24/outline";
import TextInput from '~/components/TextInput.vue';
import SelectField from "~/components/SelectField.vue";

const router = useRouter();
const recipeStore = useRecipeStore();
const nutritionalValuesTitles = ['Calories', 'Fat', ' - hereof: Sat. Fatty Acids', 'Protein', 'Carbohydrates', ' - hereof: Sugar'];

const createNewRecipe = (): Recipe => ({
  imageUrl: '',
  title: '',
  description: '',
  isFavourite: false,
  ingredients: [],
  tools: [],
  steps: [],
  nutritionalValues: nutritionalValuesTitles.map(title => ({
    title,
    amount: 0,
    recipe: {} as Recipe
  }))
});

const newRecipe = ref<Recipe>(createNewRecipe());

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

const addNutritionalValue = () => {
  if (!newRecipe.value.nutritionalValues) {
    newRecipe.value.nutritionalValues = [];
  }
  newRecipe.value.nutritionalValues.push({title: '', amount: 0, recipe: {} as Recipe});
};

onMounted(() => {
  addIngredient();
  addNutritionalValue();
  addTool();
  addStep();
});

const addTool = () => {
  if (!newRecipe.value.tools) {
    newRecipe.value.tools = [];
  }
  newRecipe.value.tools.push({title: '', amount: 0, recipe: {} as Recipe});
};

const removeTool = (index: number) => {
  if (newRecipe.value.tools) {
    newRecipe.value.tools.splice(index, 1);
  }
};

const addStep = () => {
  if (!newRecipe.value.steps) {
    newRecipe.value.steps = [];
  }
  newRecipe.value.steps.push({stepDescription: '', stepNumber: 0, recipe: {} as Recipe});
};

const removeStep = (index: number) => {
  if (newRecipe.value.steps) {
    newRecipe.value.steps.splice(index, 1);
  }
};

const submitRecipe = async () => {
  console.log('Creating recipe:', newRecipe.value);
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
    <Header :submitRecipe="submitRecipe"/>
    <div class="container flex-grow grid xl:grid-cols-6 xl:grid-rows-6 py-4 gap-4">

      <!-- Recipe Image and Ingredients Section -->
      <div class="col-span-2 row-span-3 bg-white p-4 shadow rounded">

        <!-- Ingredients Header -->
        <div class="flex items-center justify-between mb-4">
          <h2>Ingredients</h2>
          <div class="flex items-center space-x-1">
            <span>For</span>
            <TextInput
                type="number"
                v-model="newRecipe.servings"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <table>
          <tbody>
          <tr v-for="(ingredient, index) in newRecipe.ingredients" :key="index">
            <td>
              <TextInput
                  type="text"
                  v-model="ingredient.amount"
                  placeholder="Amount"
                  @keyup.enter="addIngredient"
              />
            </td>
            <td>
              <SelectField
                  v-model="ingredient.unit"
                  :options="measurementUnits.map(unit => ({ value: unit, text: unit }))"
              />
            </td>
            <td class="w-3/6">
              <TextInput
                  type="text"
                  v-model="ingredient.title"
                  placeholder="Title"
                  @keyup.enter="addIngredient"
              />
            </td>
            <td class="">
              <button @click="removeIngredient(index)" class="text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
        <PrimaryButton @click="addIngredient" label=" + Add Ingredient"/>
      </div>

      <!-- Manual Section -->
      <div class="flex flex-col col-span-4 row-span-6 bg-white p-4 shadow rounded">

        <!-- Title -->
        <div class="justify-start">
          <h2>Recipe Title</h2>
          <TextInput
              type="text"
              v-model="newRecipe.title"
          />

          <!-- Description -->
          <h2 class="mt-2">Description</h2>
          <TextInput
              type="text"
              v-model="newRecipe.description"
          />

          <!-- Tools -->
          <h2 class="mt-2">Tools</h2>
          <table>
            <tbody>
            <tr v-for="(tool, index) in newRecipe.tools" :key="index">
              <td class="w-1/12 py-1">
                <TextInput
                    type="text"
                    v-model="tool.amount"
                />
              </td>
              <td class="w-full">
                <TextInput
                    type="text"
                    v-model="tool.title"
                    placeholder="Tool Name"
                />
              </td>
              <td>
                <button @click="removeTool(index)" class="w-1/12 text-red-500">
                  <TrashIcon class="h-5 w-5"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <PrimaryButton @click="addTool" label=" + Add Tool"/>

          <!-- Manual Steps -->
          <h2 class="mt-2">Manual</h2>
          <table>
            <tbody>
            <tr v-for="(step, index) in newRecipe.steps" :key="index">
              <td class="w-full py-1">
                <TextInput
                    type="text"
                    v-model="step.stepDescription"
                    :placeholder="`${index + 1}. Step`"
                />
              </td>
              <td>
                <button @click="removeStep(index)" class="text-red-500">
                  <TrashIcon class="h-5 w-5"/>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
          <PrimaryButton @click="addStep" label="+ Add Step"/>
        </div>

        <!-- Image Section -->
        <div class="mt-auto">
          <h2>Image URL</h2>
          <TextInput
              type="text"
              placeholder="https://www.example.com"
              v-model="newRecipe.imageUrl"
          />

          <!-- Source URL -->
          <h2>Source</h2>
          <TextInput
              type="text"
              placeholder="https://www.example.com"
              v-model="newRecipe.sourceUrl"
          />
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-2 row-span-3 bg-white p-4 shadow rounded">
        <h2 class="mb-2">Nutritional Values</h2>
        <table class="w-full text-left">
          <thead>
          <tr class="font-bold text-black">
            <th class="py-1"></th>
            <th class="py-1">Amount Per 100g</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(title, index) in nutritionalValuesTitles" :key="index">
            <td class="py-1">
              {{ title }}
            </td>
            <td class="py-1">
              <TextInput
                  type="text"
                  v-model="newRecipe.nutritionalValues[index].amount"
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>