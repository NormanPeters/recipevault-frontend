<template>
  <NuxtLink
    :to="{ name: 'recipe-id', params: { id: recipe?.recipeId } }"
    class="block max-h-96 max-w-full overflow-hidden rounded bg-white p-4 shadow transition-shadow duration-300 hover:shadow-lg"
  >
    <!-- Image Section -->
    <div class="relative">
      <NuxtImg
        :src="
          recipe?.imageUrl && recipe.imageUrl !== ''
            ? recipe.imageUrl
            : '/images/placeholder-recipe.jpg'
        "
        class="h-44 w-full rounded object-cover"
        alt="Dish Image"
      />
      <!-- Heart Icon (Favorite Button) -->
      <div class="absolute right-2 top-2">
        <button
          @click.stop.prevent="switchFavorite"
          class="rounded-full bg-transparent text-attention hover:text-attention-hover focus:outline-none"
        >
          <SolidHeartIcon v-if="recipe?.favorite" class="h-6 w-6" />
          <OutlineHeartIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-4">
      <!-- Title -->
      <h2>{{ recipe?.title }}</h2>

      <!-- Time and Calories (Example placeholders, adjust based on your data) -->
      <div class="my-2 flex justify-between text-sm">
        <span>{{ recipe.time }}</span>
        <span>{{ caloriesPerPortion }}</span>
      </div>

      <!-- Description -->
      <span>{{ recipe?.description }}</span>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { HeartIcon as OutlineHeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/vue/24/solid";
import { computed } from "vue";
import type { Recipe } from "~/services/types";

const props = defineProps<{ recipe: Recipe }>();
const emit = defineEmits(["update-favorite"]);

const caloriesPerPortion = computed(() => {
  if (!props.recipe || !props.recipe.nutritionalValues) return "N/A";
  const calories = props.recipe.nutritionalValues.find(
    (value) => value.title === "Calories",
  );
  if (calories) {
    return `${((calories.amount / 100) * props.recipe.portionSize).toFixed(0)} cal`;
  }
  return "N/A";
});

const switchFavorite = () => {
  emit("update-favorite", !props.recipe.favorite);
};
</script>
