module.exports = {
  root: true,
  extends: "xicri/vue+js",

  ignorePatterns: [ "*.json", "*.json5" ],

  globals: {
    createError: "readonly",
    defineNuxtConfig: "readonly",
    defineNuxtRouteMiddleware: "readonly",
    onMounted: "readonly",
    useContext: "readonly",
    useHead: "readonly",
    useLazyAsyncData: "readonly",
    useNuxtApp: "readonly",
    useRoute: "readonly",
    ref: "readonly",
  },

  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
  },

  overrides: [
    {
      files: [ "**/*.test.js", "**/*.test.mjs" ],
      extends: "xicri/jest",
      rules: {
        "jest/expect-expect": [ "error", {
          assertFunctionNames: [ "expect", "ok" ],
        }],
        "jest/no-conditional-expect": "off",
      },
    },
  ],
};
