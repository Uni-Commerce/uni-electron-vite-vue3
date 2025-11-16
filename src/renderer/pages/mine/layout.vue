<template>
  <div class="grid h-full grid-cols-[231px_1fr] items-stretch justify-between">
    <div class="bg-primary">
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/management">
          <span class="text-sm text-font">Wallet Management</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/backup">
          <span class="text-sm text-font">Wallet Backup</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/setting">
          <span class="text-sm text-font">Security Setting</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/network">
          <span class="text-sm text-font">Blockchain Network</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/crypto">
          <span class="text-sm text-font">Manage Crypto</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/address">
          <span class="text-sm text-font">Address Book</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/general">
          <span class="text-sm text-font">General Setting</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/agreement">
          <span class="text-sm text-font">User Agreement</span>
        </router-link>
      </div>
      <div class="grid grid-flow-col items-center justify-start gap-x-3 px-3 py-[13px]">
        <router-link to="/mine/about-us">
          <span class="text-sm text-font">About Us</span>
        </router-link>
      </div>
    </div>
    <div class="p-4">
      <router-view v-slot="{ Component, route: routeInfo }">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="routeInfo.path" v-bind="$route.query" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
const cachedViews = ref([])
</script>
