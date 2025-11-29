<template>
  <div class="h-full">
    <div class="flex h-full grow bg-zinc-100">

      <DashboardSidebar>
        <FileCard v-for="fileUpload in userUploads" :file-id="fileUpload.id"
          :file-name="getFileName(fileUpload.filePath ?? '')" />
      </DashboardSidebar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Upload, Folder, Star, Trash2, File } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog"
//icons

const token = useCookie("token").value;

if (!token) {
  await navigateTo("/");
}

const { data } = await useFetch("/api/files/fromUser", {
  method: "POST",
  body: {
    token: token
  }
});

const userUploads = data.value?.userUploads;

function getFileName(fileName: string) {
  // get the filename only
  const filename = fileName.split("//").pop()!;

  // remove everything up to the first dot
  const cleanFilename = fileName.substring(filename.indexOf(".") + 1);

  return cleanFilename;
}

</script>
