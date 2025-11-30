<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800">
    <h1 class="text-2xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-white">
      {{ $t('settings.title') }}
    </h1>

    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
          {{ $t('settings.colorProfile.label') }}
        </h3>

        <p v-if="updateError" class="text-red-500 text-sm mb-2">
          {{ updateError }}
        </p>

        <div class="flex items-center gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              v-model="color"
              value="light"
              class="accent-blue-500 h-4 w-4"
            />
            <span class="text-neutral-700 dark:text-neutral-300">{{ $t('settings.colorProfile.light') }}</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              v-model="color"
              value="dark"
              class="accent-blue-500 h-4 w-4"
            />
            <span class="text-neutral-700 dark:text-neutral-300">{{ $t('settings.colorProfile.dark') }}</span>
          </label>
        </div>
      </div>

      <Button
        @click="updateSettings"
        class="w-full bg-black text-white hover:bg-black/80 py-3 rounded-xl font-medium transition"
      >
        {{ $t('settings.updateButton') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const cookie = useCookie('token') ?? false
const router = useRouter()
const {t} = useI18n()
const updateError = ref("")
if (!cookie.value) {
  router.push('/login')
}

const color = ref('light')

async function updateSettings() {
  updateError.value = ""
  try {
    await $fetch('/api/userSettings', {
      method: 'POST',
      body: {
        token: cookie.value,
        color_mode: color.value
      }
    })
    await router.push('/dashboard')
  } catch {
    updateError.value = t('settings.errorUpdating')
  }
}
</script>
