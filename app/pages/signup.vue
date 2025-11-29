<template>

  <h1>Welcome to Dropadox</h1>
  <h2>Sign up Now</h2>
    <div class="signup flex">
      <p v-if="submissionError">{{submissionError}}</p>

      <input v-model="state.name" placeholder="Name" required />
      <p v-if="nameError">{{nameError}}</p>
      <input v-model="state.email" placeholder="email"/>
      <p v-if="emailError">{{ emailError }}</p>
      <input v-model="state.password" placeholder="password"/>
      <p v-if="passwordError">{{ passwordError }}</p>
      <button @click="signUp">Sign Up</button>
    </div>

</template>
<script lang="ts" setup>
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
          emailError.value = 'Please enter a valid email';
      }
      if (state.password.length < 6) {
        passwordError.value = 'Please enter a password';
      }
      if (state.name.length < 1) {
        nameError.value = 'Please enter a name';
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
           submissionError.value = "Unable to register user, please try again"
        }


      }
  }

</script>