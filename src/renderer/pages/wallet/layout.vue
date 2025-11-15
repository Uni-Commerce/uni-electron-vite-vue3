<template>
  <router-view v-slot="{ Component, route: routeInfo }">
    <keep-alive :include="cachedViews">
      <component :is="Component" :key="routeInfo.path" v-bind="$route.query" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
const cachedViews = ref([])
</script>
