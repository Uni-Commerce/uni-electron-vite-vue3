<template>
  <div class="target h-[calc(100vh-57px)] overflow-y-auto">
    <router-view v-slot="{ Component, route: routeInfo }">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="routeInfo.path" v-bind="$route.query" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
const cachedViews = ref([])
</script>
