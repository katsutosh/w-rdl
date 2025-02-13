<script setup lang="ts">
import WordRow from "../components/WordRow.vue";
import Keyboard from "../components/Keyboard.vue";
import {reactive, onMounted} from "vue";

const state = reactive({
  solution: "books",
  guesses: ["","","","","",""],
  currentGuessIndex: 0,
  guessedLetters: {
    miss: [],
    found: [],
    hint: []
  }
})

const handleInput = (key) => {
  if(state.currentGuessIndex >= 6){
    return;
  }
  let currentGuess = state.guesses[state.currentGuessIndex];
  if(key == "{bksp}"){
    //remove last letter
    state.guesses[state.currentGuessIndex] = currentGuess.slice(0, -1);
  } else if(currentGuess.length < 5){
    const alphaRegex = /[a-zA-Z]/;
    if(alphaRegex.test(key)){
      state.guesses[state.currentGuessIndex] += key;
    }
    
    currentGuess = state.guesses[state.currentGuessIndex];
    if(currentGuess.length == 5) {
      state.currentGuessIndex++;
      for (let i = 0; i < currentGuess.length; i++) {
        let c = currentGuess.charAt(i);
        if (c == state.solution.charAt(i)) {
          state.guessedLetters.found.push(c);
        } else if (state.solution.indexOf(c) != -1) {
          state.guessedLetters.hint.push(c);
        } else {
          state.guessedLetters.miss.push(c);
        }
      }
    }
  }
}

onMounted(() => {
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key = e.keyCode == 13 ? "{enter}"
        : e.keyCode == 8 ? "{bksp}"
        : String.fromCharCode(e.keyCode).toLowerCase();
    handleInput(key);
  });
})
</script>

<template>
  <div class="w-screen h-full select-none flex text-gray-300">
    <div class="w-full h-full bg-slate-700 flex flex-col">
      <div class="w-full h-12 flex-shrink-0 flex justify-between bg-black bg-opacity-20">
        <div class="h-full flex-shrink-0 flex items-center px-4">
          <p class="text-lg">Wordle</p>
        </div>
      </div>
      <div class="w-full flex justify-center p-5">
        <div class="w-96 justify-evenly flex flex-col">
          <div>
            <WordRow v-for="(guess, i) in state.guesses" :key="i" :value="guess" :solution="state.solution" :submitted="i < state.currentGuessIndex"></WordRow>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-center p-5">
        <div class="w-96 justify-evenly flex flex-col">
          <div>
            <Keyboard :solution="state.solution" :guessedLetters="state.guessedLetters"></Keyboard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
