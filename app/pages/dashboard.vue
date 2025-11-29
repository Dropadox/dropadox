<template>
  <div class="h-full">
    <div class="flex h-full grow bg-zinc-100">

      <aside class="w-64 bg-zinc-300 text-black flex flex-col p-4 space-y-6">
        <nav class="flex flex-col space-y-2">
          <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
            <Folder class="w-4 h-4 mr-2" />
            My Files
          </Button>

          <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
            <Star class="w-4 h-4 mr-2" />
            Starred
          </Button>

          <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
            <Trash2 class="w-4 h-4 mr-2" />
            Trash
          </Button>
        </nav>

        <div class="mt-auto text-sm text-black/80">
          © 2025 Dropadox
        </div>
      </aside>

      <div class="flex-1 flex flex-col w-full">

        <header class="p-4 border-b flex items-center gap-4 bg-black">
          <div class="flex-1">
            <Input placeholder="Search files…" class="text-zinc-300 border-zinc-300 focus-visible:ring-zinc-300" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">New ▼</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem @click="showUploadFile = true">Upload File</DropdownMenuItem>
              <DropdownMenuItem>New Folder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main class="flex flex-col w-full gap-4 p-4">
          <div v-for="userUpload in userUploads" class="bg-neutral-200 p-4 rounded-xl">
            {{ (getFileName(userUpload.filePath ?? '')) }}
          </div>
        </main>
      </div>
    </div>

    <Dialog v-model:open="showUploadFile">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a File</DialogTitle>
        </DialogHeader>

        <fileUpload />
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog"
//icons
import { Upload, Folder, Star, Trash2, File } from "lucide-vue-next";

const showUploadFile = ref(false)

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
