<template>
  <div class="h-full" >
    <div class="flex h-full grow bg-zinc-100">

      <DashboardSidebar v-model:search="searchQuery">
        <FileCard
            v-for="fileUpload in filteredUploads"
            :key="fileUpload.id"
            :file-id="fileUpload.id"
            :file-name="getFileName(fileUpload.filePath ?? '')"
        />
      </DashboardSidebar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Upload, Folder, Star, Trash2, File } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardSidebar from "@/components/DashboardSidebar.vue"; // make sure to import it

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

function getFileName(fileName: string) {
  const filename = fileName.split("//").pop()!;
  return fileName.substring(filename.indexOf(".") + 1);
}

const filteredUploads = computed(() => {
  if (!searchQuery.value) return userUploads.value;
  return userUploads.value.filter(file =>
      getFileName(file.filePath ?? '').toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

