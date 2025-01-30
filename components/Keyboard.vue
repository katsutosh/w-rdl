<script setup lang="ts">
import KeyboardCaps from "./KeyboardCaps.vue";
import {ref, watch} from "vue";
const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean
})

const colors = ref(["", "", "", "", ""]);

const lettersRow1 = new Map([
  ['q', 'gray'],
  ['w', 'gray'],
  ['e', 'gray'],
  ['r', 'gray']
]);
watch(
    () => props.submitted,
    async (submitted, prevSubmitted) => {
       let s = props.solution;
       let v = props.value;
       let temp = ["gray","gray","gray","gray","gray"]
       let letterPool = [];
       for( let i = 0; i< 5; i++){
         if(s.charAt(i) == v.charAt(i)){
           temp[i] = "green"
         } else {
           letterPool.push(s.charAt(i));
         }
       }
       for( let i = 0; i< 5; i++){
         if(temp[i] == "gray"){
           if(letterPool.indexOf(v.charAt(i)) != -1 ){
             letterPool.splice(letterPool.indexOf(v.charAt(i)),1);
             temp[i] = "yellow"
           }
         }
         colors.value[i] = temp[i];
       }
    }
)
</script>

<template>
  <div class="grid grid-cols-5 gap-1 mx-auto mb-1">
    <keyboard-caps v-for="(value, key) in lettersRow1" :key="key" :data="value" />
  </div>
</template>

<style scoped>

</style>