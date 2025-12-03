<template>
  <div class="h-full dark:bg-neutral-800 pt-10">
    <div
      class="max-w-md mx-auto p-6 bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-200 dark:border-neutral-800">
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

          <div class="flex items-center gap-4 dark:text-white/60">
            <RadioGroup default-value="dark" class="flex flex-col gap-6">
              
              <div class="flex items-center space-x-2">
                <RadioGroupItem id="dark" v-model="color" value="dark" />
                <Label for="dark">{{ $t('settings.colorProfile.dark') }}</Label>
              </div>

              <div class="flex items-center space-x-2">
                <RadioGroupItem id="light" v-model="color" value="light" />
                <Label for="light">{{ $t('settings.colorProfile.light') }}</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button @click="updateSettings"
          class="w-full bg-black text-white hover:bg-black/80 py-3 rounded-xl font-medium transition">
          {{ $t('settings.updateButton') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
const cookie = useCookie('token') ?? false
const router = useRouter()
const { t } = useI18n()
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

useHead({
  title: t("common.siteName") + " - " + t("settings.title")
})
</script>
