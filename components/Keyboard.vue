<script setup lang="ts">
import KeyboardCaps from "./KeyboardCaps.vue";
import {ref, watch} from "vue";
const props = defineProps({
  solution: String,
  guessedLetters: Object
})
const keyData = ref([''])
const lettersRow1 = new Map([
  ['b', 'gray'],
  ['o', 'gray'],
  ['k', 'gray'],
  ['r', 'gray']
]);

console.log(props.solution)

watch(
  () => props.guessedLetters, 
  (newVal) => {
    console.log('Guessed Letters updated:', newVal);
    const { found, hint, miss} = props.guessedLetters;
    console.log(found)
    for(const letter of found) {
      console.log(letter)
      if(lettersRow1.has(letter)) {
        lettersRow1.set(letter, 'green')
      }
    }
  },
  { deep: true } // Da es sich um ein Objekt handelt, müssen wir `deep` verwenden
);

</script>

<template>
  <div class="grid grid-cols-5 gap-1 mx-auto mb-1">
    <keyboard-caps v-for="(value, key) in lettersRow1" :key="key" :keyData="value" />
  </div>
</template>

<style scoped>

</style>