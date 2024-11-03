<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  auth: false,
})
</script>

<template>
  <NuxtWelcome />
</template>

<style scoped>

</style>
