<template>
  <word-list @search="onSearch" />
</template>

<script>
import { defineComponent, onMounted, useContext, useMeta } from "@nuxtjs/composition-api";
import { getWordRedirectDestination } from "~/libs/redirect.js";
import { useDictionaryStore } from "~/store/index.js";

export default defineComponent({
  setup() {
    const { $pinia, i18n, params, redirect } = useContext();
    const store = useDictionaryStore($pinia);

    const onSearch = () => {
      if (window.location.pathname !== "/") {
        history.pushState({}, "", `/${i18n.locale}/`);
        document.title = i18n.t("siteTitle");
      }
    };

    const destWordID = getWordRedirectDestination(params.value.wordid);
    if (destWordID) {
      redirect(`/${destWordID}/`);
    }

    store.$reset();
    store.queryByID(params.value.wordid);
    const word = store.searchResults[0];

    if (!word) {
      const { error } = useContext();
      error({ statusCode: 404 });
      return;
    }

    const title = `${ i18n.t("wordIdTitle", { ja: word.ja, en: word.en, zhCN: word.zhCN }) } | ${ i18n.t("siteTitle") }`;
    const description = i18n.t("wordIdDescription", { ja: word.ja, en: word.en, zhCN: word.zhCN });

    useMeta({
      title,
      meta: [
        { hid: "og:title", property: "og:title", content: title },
        { hid: "description", name: "description", content: description },
        { hid: "og:description", property: "og:description", content: description },
      ],
    });

    onMounted(() => {
      // Reset on browser back
      window.onpopstate = () => {
        store.$reset();
        store.queryByID(word.id);
      };
    });

    return {
      onSearch,
    };
  },
  head: {},
});
</script>
