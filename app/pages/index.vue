<template>
  <div class="h-full bg-zinc-300 dark:bg-neutral-800 flex flex-col">

    <main class="flex flex-col items-center justify-center flex-1 text-center px-4 dark:text-white/80">
      <h2 class="text-4xl md:text-6xl font-extrabold drop-shadow-md">
        {{ t("index.h2") }}
      </h2>

      <p class="dark:text-white/60 mt-4 text-lg max-w-xl">
        {{ t("index.tagLine") }}
      </p>
    </main>

    <Footer />

  </div>
</template>
<script setup lang="ts">
import Footer from "~/components/Footer.vue";

const {t} = useI18n();
</script>
