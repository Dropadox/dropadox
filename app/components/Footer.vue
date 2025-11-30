<template>
  <div>
    <footer class="text-center py-6 text-black/80 dark:text-neutral-500/80 text-sm">
      © {{ new Date().getFullYear() }} {{ t("common.footer.copyrightText") }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<style></style>