<script setup lang="ts">
const props = defineProps({
data: {
    type: Array,
    default: ['','']
  }
})
</script>

<template>
  <div class="col-span-1 flex items-center justify-center h-8 uppercase border-2 transition-all duration-300"
  :class="{
    'border-gray-500 bg-gray-500 text-white': data[1] == 'gray',
    'border-green-500 bg-green-500 text-white': data[1] == 'green',
    'border-yellow-500 bg-yellow-500 text-white': data[1] == 'yellow'
  }">{{data[0]}}</div>
</template>

<style scoped>

</style>