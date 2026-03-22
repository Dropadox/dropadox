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
  <div v-if="isUploading" class="w-full mt-2">
    <div class="w-full h-2 bg-zinc-200 rounded overflow-hidden">
      <div
        class="h-2 bg-zinc-500 transition-all duration-200"
        :style="{ width: `${uploadProgress}%` }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { uploadLargeFile } from "~/lib/uploadLargeFile";
const {t} = useI18n();

const file = ref(null);
const response = ref(null);
const error = ref(null);
const uploadProgress = ref(0);
const isUploading = ref(false);
const router = useRouter();
const LARGE_UPLOAD_THRESHOLD = 50 * 1024 * 1024;



function onFileChange(e) {
  file.value = e.target.files[0];
  response.value = null;
  error.value = null;
  uploadProgress.value = 0;
  isUploading.value = false;
}

async function upload() {



  try {

    if (!file.value) {
      error.value = "No file selected";
      return;
    }

    const token = useCookie("token").value;
    if (!token) {
      error.value = "Missing token";
     return;
    }

    if (file.value.size > LARGE_UPLOAD_THRESHOLD) {
      console.log("file too large falling back large uploag Api");
      isUploading.value = true;
      uploadProgress.value = 0;
      
      await uploadLargeFile(file.value, token, (progress)=>{
        uploadProgress.value = progress;
      });


      isUploading.value = false;
      await router.push("/dashboard");
      

      return;
    }

    const form = new FormData();
    form.append("file", file.value);
    form.append("token", token);




    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });


    const data = await res.json();
    
    
    if (!res.ok) {
      if (res.status === 413 && res.statusText === "MAXIMUM_STORAGE_REACHED") {
        error.value = "You have reached your maximum storage capacity";
      } else {
        error.value = data?.statusMessage || "Upload failed";
      }
      response.value = null;
      return;
    }
    response.value = data;
    error.value = null;
    uploadProgress.value = 100;
    isUploading.value = false;
    await router.push("/dashboard")
  } catch (err) {
    console.log(err);
    error.value = "Upload failed";
    response.value = null;
    isUploading.value = false;
  } finally {
    isUploading.value = false;
    file.value = null;
  }
}
</script>
