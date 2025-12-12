<script setup>
import TheHeader from "~/components/base/TheHeader.vue";
</script>

<template>
  <div
    class="bg-slate-50 dark:bg-slate-900 font-sans min-h-screen p-3 md:p-6 text-slate-700 dark:text-slate-200 transition-colors duration-300"
  >
    <div class="max-w-4xl mx-auto relative">
      <TheHeader />
      <slot />
      <div class="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
        Powered by Meituan API & IP.SB & CARTO
      </div>
    </div>
  </div>
</template>
