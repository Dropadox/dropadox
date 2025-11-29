<script setup lang="ts">
import FileUpload from '~/components/fileUpload.vue';

</script>

<template>
  <div class="min-h-screen bg-zinc-300 dark:bg-slate-800 flex flex-col">

    <header class="w-full py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-black">Dropadox</h1>
      <div>
        <NuxtLink to="/signup">
          <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
            Sign up
          </Button>
        </NuxtLink>
        <NuxtLink to="/login">        
          <Button variant="outline" class="m-2 border-black text-black hover:bg-black/20">
            Login
          </Button>
        </NuxtLink>
      </div>
    </header>

    <main class="flex flex-col items-center justify-center flex-1 text-center px-4">
      <h2 class="text-4xl md:text-6xl font-extrabold text-black drop-shadow-md">
        Fast, Simple File Sharing
      </h2>

      <p class="text-black /90 mt-4 text-lg max-w-xl">
        Drop your files, get a link. No accounts. No hassle.
      </p>
    </main>

    <footer class="text-center py-6 text-black/80 text-sm">
      © 2025 Dropadox — Simple, secure file sharing
    </footer>

  </div>

  <FileUpload />
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>
