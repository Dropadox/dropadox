<template>
    <div class="h-full">
        <div class="flex h-full grow bg-zinc-100 dark:bg-neutral-800/95">
            <DashboardSidebar>
                <div class="p-4 bg-white dark:bg-neutral-900/60 rounded-lg shadow-md flex flex-col gap-2 dark:text-white/80">
                    <h1 class="text-2xl font-bold mb-4">{{t("view.fileDetails.title")}}</h1>
                    <p>{{t("view.fileDetails.fileId")}}: {{ upload.id }}</p>
                    <p>{{t("view.fileDetails.fileSize")}}: {{ upload.size }} bytes</p>
                    <p>{{t("view.fileDetails.fileName")}}: {{ getFileName(upload.filePath) }}</p>
                    <p>{{t("view.fileDetails.uploadedAt")}}: {{ new Date(upload.createdAt).toLocaleString() }}</p>
                    <Button @click="download" class="bg-blue-500 hover:bg-blue-400 cursor-pointer hover:scale-[101%]">
                        <Download />
                        {{t("common.words.download")}}
                    </Button>
                </div>
            </DashboardSidebar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next';
import { getFileName } from '../../../shared/utils/getFileName';
const {t} = useI18n();
const { fileId } = useRoute().params;
const token = useCookie("token").value;
const fileUpload = await $fetch.raw(`/api/files/get/${fileId}`, {
    method: "post",
    body: {
        token: token
    },
});

if(!fileUpload){
    await navigateTo("/dashboard");
}


const upload = (fileUpload._data as any).upload;

async function download() {
    try {
        const res = await fetch(`/api/download/${fileId}`, {
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
        a.download = upload.filePath || "download";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("Download error:", err);
    }
}

useHead({
  title: t("common.siteName") + " - " + getFileName(upload.filePath)
})

</script>