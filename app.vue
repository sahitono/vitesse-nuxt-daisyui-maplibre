<script setup lang="ts">
import { appName } from "~/constants"

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("@fontsource-variable/dm-sans");

html,
body,
#__nuxt {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "DM Sans Variable", "sans serif";
}
</style>
