<template>
  <div
      class="bg-neutral-200 p-4 rounded-xl hover:bg-neutral-300 transition-colors duration-200 cursor-pointer"
      :key="fileId"
  >
    {{ props.fileName }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ fileId: Number, fileName: String })
</script>
