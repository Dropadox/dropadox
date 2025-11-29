<template>
  <h1>Dropadox</h1>
  <h2>Sign in </h2>
  <div class="signin flex">
    <p v-if="submissionError">{{submissionError}}</p>


    <input v-model="state.email" placeholder="email"/>
    <p v-if="emailError">{{ emailError }}</p>
    <input v-model="state.password" placeholder="password"/>
    <p v-if="passwordError">{{ passwordError }}</p>
    <button @click="signIn">Sign Up</button>
  </div>

</template>
<script lang="ts" setup>
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
      emailError.value = 'Please enter a valid email';
    }
    if (state.password.length < 6) {
      passwordError.value = 'Please enter a password';
    }

    if (!emailError.value && !passwordError.value) {
      // add api connection here
      try {
        const res = await $fetch<{token: string}>('api/login', {
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

        await router.push('/')

      } catch (err: any) {
        submissionError.value = err.statusText;
      }

    }
  }

</script>