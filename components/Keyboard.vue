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
    
    const getLetterColor = (letter: string) => {
      if(lettersRow1.has(letter)) {
        return lettersRow1.get(letter)
      }
      if(lettersRow2.has(letter)) {
        return lettersRow2.get(letter)
      }
      if(lettersRow3.has(letter)) {
        return lettersRow3.get(letter)
      }
    }

    const { found, hint, miss} = props.guessedLetters;
    for(const letter of miss) {
      setLetterColor(letter, 'gray')
    }
    for(const letter of hint) {
      const currentColor = getLetterColor(letter);
      if(['gray'].includes(currentColor)) {
        setLetterColor(letter, 'yellow')
      }
    } 
    for(const letter of found) {
      const currentColor = getLetterColor(letter);
      if(['gray', 'yellow'].includes(currentColor)) {
        setLetterColor(letter, 'green')
      }   
    }
  },
  { deep: true } // Da es sich um ein Objekt handelt, müssen wir `deep` verwenden
);

</script>

<template>


  <div class="flex flex-col gap-1 p-4 w-full">
    <div class="flex gap-1 w-full">
     <keyboard-caps v-for="(value, key) in lettersRow1" :key="value[1]" :color="value[1]" :content="value[0]" />
    </div>
    <div class="flex gap-1 w-full">
      <keyboard-caps v-for="(value, key) in lettersRow2" :key="value[1]" :color="value[1]" :content="value[0]" />
    </div>
    <div class="flex gap-1 w-full">
     <keyboard-caps v-for="(value, key) in lettersRow3" :key="value[1]" :color="value[1]" :content="value[0]" />
    </div>
  </div>
</template>

<style scoped>

</style>