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
                class="w-14"
                type="number"
                v-model="newRecipe.servings"
            />
            <span>People</span>
          </div>
        </div>

        <!-- Ingredients Table -->
        <div class="grid gap-1">
          <div v-for="(ingredient, index) in newRecipe.ingredients" :key="index"
               class="grid grid-cols-12 gap-1 items-center">
            <TextInput
                class="col-span-2"
                type="text"
                v-model="ingredient.amount"
                placeholder="Amount"
                @keyup.enter="addIngredient"
            />
            <SelectField
                class="col-span-3"
                v-model="ingredient.unit"
                :options="measurementUnits.map(unit => ({ value: unit, text: unit }))"
            />
            <TextInput
                class="col-span-6"
                type="text"
                v-model="ingredient.title"
                placeholder="Title"
                @keyup.enter="addIngredient"
            />
            <button @click="removeIngredient(index)" class="col-span-1 text-red-500">
              <TrashIcon class="h-5 w-5"/>
            </button>
          </div>
        </div>
        <PrimaryButton @click="addIngredient" label=" + Add Ingredient"/>
      </div>


      <div class="flex flex-col col-span-4 row-span-6 bg-white p-4 shadow rounded">
        <!-- Title -->
        <div class="justify-start">
          <h2>Recipe Title</h2>
          <TextInput type="text" v-model="newRecipe.title"/>

          <!-- Description -->
          <h2 class="mt-2">Description</h2>
          <TextInput type="text" v-model="newRecipe.description"/>

          <!-- Tools -->
          <h2 class="mt-2">Tools</h2>
          <div class="grid gap-1">
            <div v-for="(tool, index) in newRecipe.tools" :key="index" class="grid grid-cols-12 gap-1 items-center">
              <TextInput class="col-span-1" type="text" v-model="tool.amount"/>
              <TextInput class="col-span-10" type="text" v-model="tool.title" placeholder="Tool Name"/>
              <button @click="removeTool(index)" class="col-span-1 text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </div>
          </div>
          <PrimaryButton @click="addTool" label=" + Add Tool"/>

          <!-- Manual Steps -->
          <h2 class="mt-2">Manual</h2>
          <div class="grid gap-1">
            <div v-for="(step, index) in newRecipe.steps" :key="index" class="grid grid-cols-12 gap-1 items-center">
              <TextInput class="col-span-11" type="text" v-model="step.stepDescription"
                         :placeholder="`${index + 1}. Step`"/>
              <button @click="removeStep(index)" class="col-span-1 text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </div>
          </div>
          <PrimaryButton @click="addStep" label="+ Add Step"/>
        </div>

        <!-- Image Section -->
        <div class="mt-auto">
          <h2>Image URL</h2>
          <TextInput type="text" placeholder="https://www.example.com" v-model="newRecipe.imageUrl"/>

          <!-- Source URL -->
          <h2>Source</h2>
          <TextInput type="text" placeholder="https://www.example.com" v-model="newRecipe.sourceUrl"/>
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-2 row-span-3 bg-white p-4 shadow rounded text-left">
        <h2 class="mb-2">Nutritional Values</h2>
        <div class="grid grid-cols-2 font-bold text-black mb-1">
          <div></div>
          <div>Amount Per 100g</div>
        </div>
        <div>
          <div v-for="(nutritionalValue, index) in newRecipe.nutritionalValues" :key="index"
               class="grid grid-cols-2 mb-1">
            <div>
              {{ nutritionalValue.title }}
            </div>
            <div>
              <TextInput
                  type="text"
                  v-model="nutritionalValue.amount"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

onMounted(() => {
  addIngredient();
  addTool();
  addStep();
});
</script>



<style scoped>
</style>