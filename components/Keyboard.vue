<script setup lang="ts">
import KeyboardCaps from "./KeyboardCaps.vue";
import {ref, watch, reactive} from "vue";
const props = defineProps({
  solution: String,
  guessedLetters: Object
})
const lettersRow1 = reactive(new Map([
  ['q', 'gray'],
  ['w', 'gray'],
  ['e', 'gray'],
  ['r', 'gray'],
  ['t', 'gray'],
  ['z', 'gray'],
  ['u', 'gray'],
  ['i', 'gray'],
  ['o', 'gray'],
  ['p', 'gray'],
  ['ü', 'gray'],
]));

const lettersRow2 = reactive(new Map([
  ['a', 'gray'],
  ['s', 'gray'],
  ['d', 'gray'],
  ['f', 'gray'],
  ['g', 'gray'],
  ['h', 'gray'],
  ['j', 'gray'],
  ['k', 'gray'],
  ['l', 'gray'],
  ['ö', 'gray'],
  ['ä', 'gray'],
]));

const lettersRow3 = reactive(new Map([
  ['y', 'gray'],
  ['x', 'gray'],
  ['c', 'gray'],
  ['v', 'gray'],
  ['b', 'gray'],
  ['n', 'gray'],
  ['m', 'gray']
]));

watch(
  () => props.guessedLetters, 
  (newVal) => {
    const setLetterColor = (letter: string, color: string) => {
      if(lettersRow1.has(letter)) {
        lettersRow1.set(letter, color)
      }
      if(lettersRow2.has(letter)) {
        lettersRow2.set(letter, color)
      }
      if(lettersRow3.has(letter)) {
        lettersRow3.set(letter, color)
      }
    }
    
    const { found, hint, miss} = props.guessedLetters;
    for(const letter of found) {
      setLetterColor(letter, 'green')    
    }
    
    for(const letter of hint) {
      setLetterColor(letter, 'yellow')    
    }
    
    for(const letter of miss) {
      setLetterColor(letter, 'gray')    
    }    
  },
  { deep: true } // Da es sich um ein Objekt handelt, müssen wir `deep` verwenden

);

</script>

<template>
  <div class="grid grid-cols-11 gap-1 mx-auto mb-1">
    <keyboard-caps v-for="(value, key) in lettersRow1" :key="value[1]" :color="value[1]" :content="value[0]" />
    <keyboard-caps v-for="(value, key) in lettersRow2" :key="value[1]" :color="value[1]" :content="value[0]" />
    <keyboard-caps v-for="(value, key) in lettersRow3" :key="value[1]" :color="value[1]" :content="value[0]" />
  </div>
</template>

<style scoped>

</style>