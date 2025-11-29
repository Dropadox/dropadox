<template>

    <div>
        <h3>Upload File</h3>
        <input type="file" @change="onFileChange" />
         <button @click="upload" :disabled="!file" style="margin-top: 10px">Upload</button>

        <pre v-if="response">{{ response }}</pre>
        <p v-if="error" style="color: red">{{ error }}</p>
    </div>
</template>

<script>
import { ref } from "vue";


const file = ref(null);
const response = ref(null);
const error = ref(null);

function onFileChange(e){
    file.value = e.target.file[0];
    response.value = null;
    error = null;
}

async function upload() {
  try {
    const form = new FormData();
    form.append("file", file.value); // MUST be "file"

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
