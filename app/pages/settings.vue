<template>
  <h1>User settings</h1>

  <div>
    <h3>Color Profile</h3>
    <p v-if="updateError" class="text-red-500 text-sm mt-1">{{ updateError }}</p>
    <label>
      <input type="radio" v-model="color" value="light" /> Light
    </label>

    <label>
      <input type="radio" v-model="color" value="dark" /> Dark
    </label>
  </div>
  <Button
      @click="updateSettings"
      class="w-full bg-black text-white hover:bg-black/80 mt-2 py-3 rounded-xl"
  >
    Update Settings
  </Button>
</template>
<script setup lang="ts">
const cookie = useCookie('token') ?? false;
const router = useRouter();
const updateError = ref()
if (!cookie.value) {
  router.push('/login');
}

const color = ref('light')
async function updateSettings() {
  updateError.value = ""
  try {
    const res = await $fetch('/api/userSettings', {
      method: 'POST',
      body: {
        token: cookie.value,
        color_mode: color.value
      }
    })
    await router.push('/dashboard')
  } catch (err) {
    updateError.value = "error updating settings"
  }
}


</script>