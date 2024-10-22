<template>
  <div class="flex flex-col h-screen">
    <Header :submitRecipe="submitRecipe"/>
    <div class="container flex-grow grid xl:grid-cols-6 xl:grid-rows-6 py-4 gap-4">

      <!-- Recipe Image and Ingredients Section -->
      <div class="col-span-2 row-span-3 bg-white p-4 shadow rounded">

        <!-- Time -->
        <div class="grid grid-cols-2 mb-4">
          <h2>Cooking Time</h2>
          <TextInput type="text"
                     v-model="newRecipe.time"
          />
        </div>
        <!-- Ingredients Header -->
        <div class="flex items-center justify-between mb-4">
          <h2>Ingredients</h2>
          <div class="flex items-center space-x-1">
            <span>For</span>
            <TextInput
                class="w-16"
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
          <TextInput type="text" v-model="newRecipe.title" placeholder="Recipe Title"/>

          <!-- Description -->
          <h2 class="mt-2">Description</h2>
          <TextInput type="text" v-model="newRecipe.description" placeholder="Recipe Description"/>

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
          <h2 class="mt-2">Source</h2>
          <TextInput type="text" placeholder="https://www.example.com" v-model="newRecipe.sourceUrl"/>
        </div>
      </div>

      <!-- Nutritional Values Section -->
      <div class="col-span-2 row-span-3 bg-white p-4 shadow rounded text-left">
        <div class="grid grid-cols-2 mb-4">
          <h2>Nutritional Values</h2>
          <div>
            <TextInput
                type="number"
                v-model="newRecipe.portionSize"
                placeholder="Portion Size in grams"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 font-bold text-black mb-1">
          <div></div>
          <div>Amount Per 100g</div>
        </div>
        <div>
          <div v-for="(nutritionalValue, index) in newRecipe.nutritionalValues" :key="index"
               class="grid grid-cols-2 mb-1 gap-1">
            <div>
              <TextInput type="text" v-model="nutritionalValue.title"/>
            </div>
            <div class="flex">
              <TextInput
                  type="text"
                  v-model="nutritionalValue.amount"
                  class="mr-1"
              />
              <button @click="removeNutritionalValue(index)" class="text-red-500">
                <TrashIcon class="h-5 w-5"/>
              </button>
            </div>
          </div>
          <PrimaryButton @click="addNutritionalValue" label=" + Add Nutritional Value"/>
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
import { useRecipe } from '~/composables/useRecipe';


const router = useRouter();
const recipeStore = useRecipeStore();

const createNewRecipe = (): Recipe => ({
  title: '',
  description: '',
  imageUrl: '',
  isFavourite: false,
  time: '30 - 40 min',
  sourceUrl: '',
  portionSize: '',
  servings: 1,
  ingredients: [],
  tools: [],
  steps: [],
  nutritionalValues: [],
});

const newRecipe = ref<Recipe>(createNewRecipe());

const {
  addIngredient,
  removeIngredient,
  addTool,
  removeTool,
  addStep,
  removeStep,
  addNutritionalValue,
  removeNutritionalValue,
} = useRecipe(newRecipe);

const measurementUnits = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'piece'];

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
