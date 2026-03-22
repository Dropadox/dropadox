



export async function uploadLargeFile(file: File, token: string, onProgress?: (progress: number) => void) {
  console.log("uploadLargeFile started");
  console.log("file:", file);
  console.log("token:", token);

  const chunkSize = 5 * 1024 * 1024;
  const totalChunks = Math.ceil(file.size / chunkSize);

  console.log("chunkSize:", chunkSize);
  console.log("totalChunks:", totalChunks);

  let uploadId: string | null = null;

  for (let i = 0; i < totalChunks; i++) {
    console.log("starting chunk", i);

    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    console.log("chunk made", { start, end, size: chunk.size });

    const form = new FormData();
    form.append("token", token);
    form.append("fileName", file.name);
    form.append("chunkIndex", String(i));
    form.append("totalChunks", String(totalChunks));
    form.append("chunk", chunk, file.name);

    if (uploadId) {
      form.append("uploadId", uploadId);
    }

    console.log("about to fetch", i);


    const res = await fetch("/api/large-upload", {
      method: "POST",
      body: form,
    });

    console.log("fetch finished", res.status);

    const data = await res.json();
    console.log("chunk response", data);

    if (!res.ok) {
      throw new Error(data?.statusMessage || "chunk upload failed");
    }

    uploadId = data.uploadId;
    //progress bar pass through  
    const progress = Math.round(((i + 1) / totalChunks) * 100);
    onProgress?.(progress);

  }
}


