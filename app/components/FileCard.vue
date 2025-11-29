<template>
    <div class="bg-neutral-200 p-4 rounded-xl" :key="fileId">
        {{ props.fileName }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{ fileId: number; fileName: string }>();

async function download() {
  try {
    const res = await fetch(`/api/download/${props.fileId}`, {
      method: "GET"   // ✅ NO POST = no navigation side effects
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
