<template>
  <div class="h-full bg-zinc-300 dark:bg-neutral-800 flex flex-col">
    <main class="flex flex-col items-center justify-center flex-1 px-6 text-center dark:text-white/80">

      <h2 class="text-4xl font-extrabold drop-shadow-md mb-6">
        {{ t("signUp.text") }}
      </h2>

      <div class="w-full max-w-sm bg-white/60 dark:bg-neutral-700/50 p-6 rounded-xl shadow-md backdrop-blur">

        <p v-if="submissionError" class="text-red-500 font-medium mb-2">
          {{ submissionError }}
        </p>

        <div class="flex flex-col space-y-4">

          <!-- name -->
          <div class="text-left">
            <Input
              v-model="state.name"
              :placeholder="t('signUp.name')"
              required
            />
            <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
          </div>

          <!-- email -->
          <div class="text-left">
            <Input
              v-model="state.email"
              type="email"
              :placeholder="t('signUp.email')"
            />
            <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
          </div>

          <!-- password -->
          <div class="text-left">
            <Input
              v-model="state.password"
              type="password"
              :placeholder="t('signUp.password')"
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
import { Input } from "@/components/ui/input";

const { t } = useI18n();
const router = useRouter();

const state = reactive({
  name: "",
  email: "",
  password: "",
});

const emailError = ref("");
const passwordError = ref("");
const nameError = ref("");
const submissionError = ref("");

async function signUp() {
  emailError.value = "";
  passwordError.value = "";
  nameError.value = "";
  submissionError.value = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(state.email)) {
    emailError.value = t("signIn.validation.validEmail");
  }

  if (state.password.length < 6) {
    passwordError.value = t("signUp.validation.passwordRequired");
  }

  if (state.name.length < 1) {
    nameError.value = t("signUp.validation.nameRequired");
  }

  if (emailError.value || passwordError.value || nameError.value) {
    return;
  }

  try {
    await $fetch("/api/register", {
      method: "POST",
      body: {
        username: state.name,
        email: state.email,
        password: state.password,
      },
    });

    router.push("/login");
  } catch (err) {
    submissionError.value = t("signUp.error.submissionFailed");
  }
}
</script>
