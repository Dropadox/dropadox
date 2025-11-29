<template>
  <div>
      <!-- File Input -->
      <label
        class="flex flex-col items-center justify-center w-full h-32 border border-dashed border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 transition"
      >
        <p class="text-zinc-600">
          {{ file ? file.name : "Click to choose a file…" }}
        </p>
        <input type="file" class="hidden" @change="onFileChange" />
      </label>

      <!-- Upload Button -->
      <Button
        class="w-full mt-2 bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-medium"
        :disabled="!file"
        @click="upload"
      >
        Upload
      </Button>

      <!-- Response -->
      <pre
        v-if="response"
        class="bg-zinc-100 p-3 rounded text-sm text-zinc-700 whitespace-pre-wrap"
      >
{{ response }}
      </pre>

      <!-- Error -->
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>


<script setup>
import { ref } from "vue";


const file = ref(null);
const response = ref(null);
const error = ref(null);

function onFileChange(e){
    console.log("CLIENT FILE:", file.value);
    file.value = e.target.files[0];
    response.value = null;
    error.value = null;
}

async function upload() {
  try {
    const token = useCookie("token").value;

    const form = new FormData();
    form.append("file", file.value); // MUST be "file"
    form.append("token", token)

    console.log("FILE BEING SENT:", file.value);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form
    });

    response.value = await res.json();
  } catch (err) {
    error.value = "Upload failed";
  }
}
</script>
