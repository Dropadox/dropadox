<template>
  <div class="flex h-screen bg-zinc-100">

    <aside class="w-64 bg-zinc-300 text-black flex flex-col p-4 space-y-6">
      <h1 class="text-2xl font-bold">Dropadox</h1>

      <nav class="flex flex-col space-y-2">
        <Button variant="secondary" class="justify-start bg-zinc-400/40 hover:bg-zinc-400/60">
          <Upload class="w-4 h-4 mr-2" />
          Upload Files
        </Button>

        <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
          <Folder class="w-4 h-4 mr-2" />
          My Files
        </Button>

        <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
          <Star class="w-4 h-4 mr-2" />
          Starred
        </Button>

        <Button variant="ghost" class="justify-start text-black hover:bg-zinc-400/30">
          <Trash2 class="w-4 h-4 mr-2" />
          Trash
        </Button>
      </nav>

      <div class="mt-auto text-sm text-black/80">
        © 2025 Dropadox
      </div>
    </aside>

    <div class="flex-1 flex flex-col">

      <header class="p-4 border-b flex items-center gap-4 bg-black">
        <div class="flex-1">
          <Input 
            placeholder="Search files…" 
            class="text-zinc-300 border-zinc-300 focus-visible:ring-zinc-300"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">New ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Upload File</DropdownMenuItem>
            <DropdownMenuItem>New Folder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main class="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <FileCard v-for="n in 12" :key="n" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";

// Icons (lucide-vue)
import { Upload, Folder, Star, Trash2, File } from "lucide-vue-next";
</script>
