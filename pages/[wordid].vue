<template>
  <word-list @search="onSearch" />
</template>

<script setup>
import { getWordRedirectDestination } from "~/libs/redirect.js";
import { useDictionaryStore } from "~/store/index.js";

const { $pinia, i18n, redirect } = useNuxtApp();
const route = useRoute();
const store = useDictionaryStore($pinia);

const onSearch = () => {
  if (window.location.pathname !== "/") {
    history.pushState({}, "", `/${i18n.locale}/`);
    document.title = i18n.t("siteTitle");
  }
};

const destWordID = getWordRedirectDestination(route.params.wordid);
if (destWordID) {
  redirect(`/${destWordID}/`);
}

store.$reset();
store.queryByID(route.params.wordid);
const word = store.searchResults[0];

if (!word) {
  throw createError({ statusCode: 404, fatal: true });
}

const title = `${ i18n.t("wordIdTitle", { ja: word.ja, en: word.en, zhCN: word.zhCN }) } | ${ i18n.t("siteTitle") }`;
const description = i18n.t("wordIdDescription", { ja: word.ja, en: word.en, zhCN: word.zhCN });

useHead({
  title,
  meta: [
    { hid: "og:title", property: "og:title", content: title },
    { hid: "description", name: "description", content: description },
    { hid: "og:description", property: "og:description", content: description },
    ...(((i18n.locale === "zh-CN" || i18n.locale === "en") && !word.zhCN) ? [{
      hid: "noindex",
      name: "robots",
      content: "noindex",
    }] : []),
  ],
});

onMounted(() => {
  // Reset on browser back
  window.onpopstate = () => {
    store.$reset();
    store.queryByID(word.id);
  };
});
</script>
