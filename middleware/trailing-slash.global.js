export default defineNuxtRouteMiddleware((to, from) => {
  if (!route.path.endsWith("/")) {
    return navigateTo(route.path + "/", { redirectCode: 301 });
  }
});
