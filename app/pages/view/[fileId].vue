<template>
    <div class="h-full">
        <div class="flex h-full grow bg-zinc-100">
            <DashboardSidebar>
                <div class="p-4 bg-white rounded-lg shadow-md flex flex-col gap-2">
                    <h1 class="text-2xl font-bold mb-4">File Details</h1>
                    <p>File ID: {{ upload.id }}</p>
                    <p>File Size: {{ upload.size }} bytes</p>
                    <p>File Name: {{ upload.filePath }}</p>
                    <p>Uploaded At: {{ new Date(upload.createdAt).toLocaleString() }}</p>
                    <Button @click="download" class="bg-blue-500 hover:bg-blue-400 cursor-pointer">
                        <Download />
                        Download
                    </Button>
                </div>
            </DashboardSidebar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Download } from 'lucide-vue-next';
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

</script>