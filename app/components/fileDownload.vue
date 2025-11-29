<template>
    <div>
        <button @click="download('hyprland1ef24224-6d08-4e09-a691-8d88bb8d6425.conf')">
            Download
        </button>
    </div>
</template>
<script setup>
function download(filename) {
  const a = document.createElement("a");
  a.href = `/api/download/${filename}`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>
