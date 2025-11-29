<template>
    <div>
        <h3>Upload File</h3>
        <input type="file" @change="onFileChange" />
         <button @click="upload" :disabled="!file" style="margin-top: 10px">Upload</button>

        <pre v-if="response">{{ response }}</pre>
        <p v-if="error" style="color: red">{{ error }}</p>
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
