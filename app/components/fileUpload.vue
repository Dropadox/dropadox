<template>
  <div>
    <!-- File Input -->
    <label
      class="flex flex-col items-center justify-center w-full h-32 border border-dashed border-zinc-300 rounded-lg cursor-pointer hover:bg-zinc-100 transition">
      <p class="text-zinc-600">
        {{ file ? file.name : t('dashboard.uploadFileModalDescription') }}
      </p>
      <input type="file" class="hidden" @change="onFileChange" />
    </label>

    <!-- Upload Button -->
    <Button class="w-full mt-2 bg-zinc-300 hover:bg-zinc-400 text-zinc-800 font-medium" :disabled="!file"
      @click="upload">
      {{ t('dashboard.uploadFileModalButton') }}
    </Button>

    <!-- Error -->
    <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>

    <!-- Success / Verification -->
    <p v-if="response" class="text-green-600 text-sm mt-2">
      {{ t('dashboard.uploadFileSuccessMessage', { fileName: response.fileName || file?.name }) }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { routerKey } from "vue-router";
const {t} = useI18n();

const file = ref(null);
const response = ref(null);
const error = ref(null);
const router = useRouter();

function onFileChange(e) {
  file.value = e.target.files[0];
  response.value = null;
  error.value = null;
}

async function upload() {
  try {
    const token = useCookie("token").value;

    const form = new FormData();
    form.append("file", file.value);
    form.append("token", token);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    // Assume backend returns { fileName: 'example.txt' }
    response.value = await res.json();
    error.value = null;
    await router.push("/dashboard")
  } catch (err) {
    error.value = "Upload failed";
    response.value = null;
  } finally {
    file.value = null;
  }
}
</script>
