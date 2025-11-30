<template>
  <div class="h-full bg-zinc-300 dark:bg-slate-800 flex flex-col">

    <main class="flex flex-col items-center justify-center flex-1 px-6 text-center">

      <h2 class="text-4xl font-extrabold text-black drop-shadow-md mb-6">
        {{ t("signUp.text") }}
      </h2>

      <div class="w-full max-w-sm bg-white/60 dark:bg-slate-700/50 p-6 rounded-xl shadow-md backdrop-blur">

        <p v-if="submissionError" class="text-red-500 font-medium mb-2">
          {{ submissionError }}
        </p>

        <div class="flex flex-col space-y-4">

          <div class="text-left">
            <input
                v-model="state.name"
                :placeholder="t('signUp.name')"
                class="w-full p-3 rounded-md border border-black/30 bg-white focus:outline-none focus:ring-2 focus:ring-black"
                required
            />
            <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
          </div>

          <div class="text-left">
            <input
                v-model="state.email"
                :placeholder="t('signUp.email')"
                class="w-full p-3 rounded-md border border-black/30 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>

          <div class="text-left">
            <input
                v-model="state.password"
                type="password"
                :placeholder="t('signIn.password')"
                class="w-full p-3 rounded-md border border-black/30 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
          </div>

          <Button
              @click="signUp"
              class="w-full bg-black text-white hover:bg-black/80 mt-2 py-3 rounded-xl"
          >
            {{ t("signUp.buttonText") }}
          </Button>
        </div>

      </div>
    </main>

    <Footer />

  </div>
</template>
<script lang="ts" setup>
import { Button } from "@/components/ui/button";
const {t} = useI18n();
  const state = reactive({
    name: '',
    email: '',
    password: '',
  })
  const passwordError = ref();
  const emailError = ref();
  const nameError = ref();
  const submissionError = ref();
  const router = useRouter();

  async function signUp() {
      emailError.value = false
      passwordError.value = false
      nameError.value = false
      submissionError.value = false
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.email)) {
          emailError.value = t("signIn.validation.validEmail");
      }
      if (state.password.length < 6) {
        passwordError.value = t("signIn.validation.passwordRequired");
      }
      if (state.name.length < 1) {
        nameError.value = t("signUp.validation.nameRequired");
      }

      if (!emailError.value && !passwordError.value && !nameError.value) {
        // add api connection here
        try {
          const res = await $fetch('api/register', {
            method: 'POST',
            body: {
              username: state.name,
              email: state.email,
              password: state.password,
            }
          })
          router.push('/login')
        } catch (err) {
           submissionError.value = t("signUp.error.submissionFailed");
        }


      }
  }

</script>