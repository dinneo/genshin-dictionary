<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute();

const canonical = `https://example.com${route.path.replace(/\/$/, "")}/`; // with trailing slash

useHead({
  meta: [
    { name: "og:url", content: canonical },
  ],
  link: [
    { rel: "canonical", href: canonical },
  ],
});
</script>
