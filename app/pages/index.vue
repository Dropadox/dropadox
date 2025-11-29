<template>
  <div class="min-h-screen bg-gradient-to-b from-red-300 to-red-400 flex flex-col">

    <!-- NAVBAR -->
    <header class="w-full py-4 px-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-white">Dropadox</h1>
      <Button variant="outline" class="border-white text-white hover:bg-white/20">
        Sign In
      </Button>
    </header>

    <!-- HERO -->
    <main class="flex flex-col items-center justify-center flex-1 text-center px-4">
      <h2 class="text-4xl md:text-6xl font-extrabold text-white drop-shadow-md">
        Fast, Simple File Sharing
      </h2>

      <p class="text-white/90 mt-4 text-lg max-w-xl">
        Drop your files, get a link. No accounts. No hassle.
      </p>

      <div class="mt-8">
        <Button size="lg" class="bg-white text-red-500 hover:bg-red-100 font-semibold">
          Upload a File
        </Button>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="text-center py-6 text-white/80 text-sm">
      © 2025 Dropadox — Simple, secure file sharing
    </footer>

  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>
<template>
    <h1 class="m-3 p-3 bg--300 rounded-md font-bold">Welcome to Dropadox</h1>
    <div>
        
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>