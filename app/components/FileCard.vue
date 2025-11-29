<template>
    <div class="bg-neutral-200 p-4 rounded-xl" :key="fileId">
        {{ props.fileName }}
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ fileId: Number, fileName: String })
</script>