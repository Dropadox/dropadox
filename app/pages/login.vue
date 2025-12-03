<template>
  <div class="h-full bg-zinc-300 dark:bg-neutral-800 flex flex-col">

    <main class="flex flex-col items-center justify-center flex-1 px-6 text-center dark:text-white/80">

      <h2 class="text-4xl font-extrabold drop-shadow-md mb-6">
        {{ t("signIn.text") }}
      </h2>

      <div class="w-full max-w-sm bg-white/60 dark:bg-neutral-700/50 p-6 rounded-xl shadow-md backdrop-blur">

        <p v-if="submissionError" class="text-red-500 font-medium mb-2">
          {{ submissionError }}
        </p>

        <div class="flex flex-col space-y-4">

          <div class="text-left">
            <Input v-model="state.email" :placeholder="t('signIn.email')" />
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>

          <div class="text-left">
            <Input v-model="state.password" type="password" :placeholder="t('signIn.password')" />
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
          </div>

          <Button @click="signIn" class="w-full text-white hover:bg-black/80 mt-2 py-3 rounded-xl cursor-pointer">
            {{ t("signIn.buttonText") }}
          </Button>
        </div>

      </div>
    </main>

    <Footer />

  </div>
</template>
<script lang="ts" setup>
const { t } = useI18n();
const router = useRouter()
const emailError = ref()
const passwordError = ref()
const submissionError = ref()
const state = {
  email: '',
  password: '',
}

async function signIn() {
  emailError.value = false
  passwordError.value = false
  submissionError.value = false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(state.email)) {
    emailError.value = t('signIn.validation.validEmail');
  }
  if (state.password.length < 6) {
    passwordError.value = t('signIn.validation.passwordRequired');
  }

  if (!emailError.value && !passwordError.value) {
    // add api connection here
    try {
      const res = await $fetch<{ token: string }>('api/login', {
        method: 'POST',
        body: {
          email: state.email,
          password: state.password,
        }
      })

      const token = useCookie('token', {
        maxAge: 172800,
        sameSite: 'strict',
        secure: true
      })

      token.value = res.token

      await router.push('/dashboard')

    } catch (err: any) {
      submissionError.value = err.statusText;
    }

  }
}

useHead({
  title: t("common.siteName") + " - " + t("common.nav.login")
})

</script>