<template>
    <aside class="w-64 bg-zinc-300 dark:bg-neutral-900 dark:text-white flex flex-col p-4 space-y-6">
        <nav class="flex flex-col space-y-2">
            <NuxtLink to="/dashboard">
                <Button variant="ghost" class="justify-start hover:bg-zinc-400/30">
                    <Folder class="w-4 h-4 mr-2" />
                    {{ t('dashboard.myFiles') }}
                </Button>
            </NuxtLink>

            <Button variant="ghost" class="justify-start hover:bg-zinc-400/30">
                <Star class="w-4 h-4 mr-2" />
                {{ t('dashboard.starred') }}
            </Button>

            <Button variant="ghost" class="justify-start hover:bg-zinc-400/30">
                <Trash2 class="w-4 h-4 mr-2" />
                {{ t('dashboard.trash') }}
            </Button>
        </nav>

        <div class="mt-auto text-sm text-black/80 dark:text-white/50">
            © {{ new Date().getFullYear() }} {{ t('common.siteName') }}
        </div>
    </aside>

    <div class="flex-1 flex flex-col w-full">

        <header class="p-4 border-b dark:border-b-neutral-800 flex items-center gap-4">
            <div class="flex-1">
                <Input v-model="search" :placeholder="t('dashboard.searchFiles')"
                    class="text-zinc-300 border-zinc-300 bg-white dark:bg-neutral-800 dark:focus-visible:ring-neutral-300 focus-visible:ring-zinc-300" />
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="default">{{ t('common.words.new') }} ▼</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem @click="showUploadFile = true">{{ t('dashboard.uploadFile') }}</DropdownMenuItem>
                    <DropdownMenuItem>{{ t('dashboard.newFolder') }}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>

        <main class="flex flex-col w-full gap-4 p-4 overflow-y-scroll">
            <slot />
        </main>

        <Dialog v-model:open="showUploadFile">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{{ t('dashboard.uploadFileModalTitle') }}</DialogTitle>
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
const { t } = useI18n();

const showUploadFile = ref(false)

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<{
    (e: 'update:search', value: string): void
}>();

const search = ref(props.modelValue ?? "");

// Keep v-model in sync
watch(search, (val: string) => emit("update:search", val));
</script>
