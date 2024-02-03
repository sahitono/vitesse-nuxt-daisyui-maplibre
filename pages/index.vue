<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/map",
  },
})

const { signIn, token, data, status, lastRefreshedAt, refreshToken } = useAuth()
const username = ref()
const password = ref()

onMounted(() => {
  console.debug(token.value, data.value, refreshToken.value)
})
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <h1>Login Page</h1>
    <pre>Status: {{ status }}</pre>
    <pre>Data: {{ data || 'no session data present, are you logged in?' }}</pre>
    <pre>Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</pre>
    <pre>JWT token: {{ token || 'no token present, are you logged in?' }}</pre>
    <form
      class="flex flex-col mt-3" @submit.prevent="async () => {
        await signIn({ username, password }, { callbackUrl: '/map' })
        await $router.push('/map')
      }"
    >
      <input v-model="username" type="text" placeholder="Username" class="input input-bordered mb-1 w-full max-w-xs">
      <input v-model="password" type="password" placeholder="Password" class="input input-bordered mb-3 w-full max-w-xs">
      <button type="submit" class="btn btn-primary">
        sign in
      </button>
    </form>
  </div>
</template>
