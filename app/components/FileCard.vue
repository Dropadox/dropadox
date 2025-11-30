<template>
    <div class="bg-neutral-200 dark:bg-neutral-900/60 hover:dark:bg-blue-500/30 p-4 rounded-xl hover:bg-neutral-300 transition-colors duration-200 cursor-pointer"
        :key="fileId">
        <div class="flex justify-between dark:text-white/60" @click="navigateTo(`/view/${props.fileId}`)">
            <div class="flex gap-4 items-center font-bold dark:text-white/80">
                <File />
                {{ props.fileName }}
            </div>

            <div class="flex gap-4">

                <NuxtLink :to="`/view/${props.fileId}`" class="cursor-pointer hover:text-blue-400">
                    <div class="ml-auto text-sm">
                        <Eye />
                    </div>
                </NuxtLink>

                <button @click="(e) => {e.stopPropagation(); download(); }" class="cursor-pointer hover:text-blue-400">
                    <Download />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { File, View, Download, Eye } from 'lucide-vue-next';

const props = defineProps<{ fileId: number; fileName: string }>();

async function download() {
    try {
        const res = await fetch(`/api/download/${props.fileId}`, {
            method: "GET"
        });

        if (!res.ok) {
            console.error("Download failed:", res.status);
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = props.fileName || "download";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Download error:", err);
    }
}



</script>
