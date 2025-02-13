<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'gray'
  },
  content: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="col-span-1 flex items-center justify-center h-8 uppercase border-2 transition-all duration-300"
  :class="{
    'border-gray-500 bg-gray-500 text-white': color == 'gray',
    'border-green-500 bg-green-500 text-white': color == 'green',
    'border-yellow-500 bg-yellow-500 text-white': color == 'yellow'
  }">{{content}}</div>
</template>

<style scoped>

</style>