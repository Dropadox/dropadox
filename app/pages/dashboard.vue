<template>
  <div class="h-full">
    <div class="flex h-full grow bg-zinc-100 dark:bg-neutral-800/95">

      <DashboardSidebar v-model:search="searchQuery">
        <FileCard v-for="fileUpload in filteredUploads" :key="fileUpload.id" :file-id="fileUpload.id"
          :file-name="getFileName(fileUpload.filePath ?? '')" />
      </DashboardSidebar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import DashboardSidebar from "@/components/DashboardSidebar.vue"; // make sure to import it
import { getFileName } from '../../shared/utils/getFileName';

const {t} = useI18n();

// --- Auth check ---
const token = useCookie("token").value;

if (!token) {
  await navigateTo("/");
}

const { data } = await useFetch("/api/files/fromUser", {
  method: "POST",
  body: { token }
});

const userUploads = ref(data.value?.userUploads ?? []);

const searchQuery = ref("");

const filteredUploads = computed(() => {
  if (!searchQuery.value) return userUploads.value;
  return userUploads.value.filter(file =>
    getFileName(file.filePath ?? '').toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

useHead({
  title: t("common.siteName") + " - " + t("dashboard.title")
})
</script>
