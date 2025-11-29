<template>
    <aside class="w-64 bg-zinc-300 text-black flex flex-col p-4 space-y-6">
        <nav class="flex flex-col space-y-2">
            <NuxtLink to="/dashboard">
                <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
                    <Folder class="w-4 h-4 mr-2" />
                    My Files
                </Button>
            </NuxtLink>

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

        <header class="p-4 border-b flex items-center gap-4">
            <div class="flex-1">
              <Input
                  v-model="search"
                  placeholder="Search files…"
                  class="text-zinc-300 border-zinc-300 bg-white focus-visible:ring-zinc-300"
              />
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

        <main class="flex flex-col w-full gap-4 p-4 overflow-y-scroll">
                <slot />
        </main>

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

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Upload, Folder, Star, Trash2, File } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const showUploadFile = ref(false)

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>();

const search = ref(props.modelValue ?? "");

// Keep v-model in sync
watch(search, (val: string) => emit("update:search", val));
</script>
