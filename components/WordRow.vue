<script setup lang="ts">
import LetterBox from "./LetterBox.vue";
import {ref, watch} from "vue";
const props = defineProps({
  value: String,
  solution: String,
  submitted: Boolean
})

const colors = ref(["", "", "", "", ""]);

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
    <letter-box v-for="i in 5" :key="i" :letter="value[i-1]" :color="colors[i-1]" />
  </div>
</template>

<style scoped>

</style>