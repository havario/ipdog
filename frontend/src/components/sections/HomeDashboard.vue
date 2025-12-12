<script setup lang="ts">
import IpDetailView from "./IpDetailView.vue";

const sources = [
  { id: "f", url: "https://api.ipify.org?format=json", label: "Foreign IP", color: "#3b82f6" },
  { id: "d", url: "https://ipv4_cu.itdog.cn/", label: "Domestic IP", color: "#10b981" },
];

const results = ref<Record<string, { ip: string; data: any; loading: boolean }>>({});

onMounted(() => {
  sources.forEach(async (source) => {
    results.value[source.id] = { ip: "", data: null, loading: true };
    try {
      const res = await fetch(source.url);
      const text = await res.text();
      let ip = text.trim();
      try {
        ip = JSON.parse(text).ip || ip;
      } catch {}

      const detail = await $fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ ip }).toString(),
      });
      results.value[source.id] = { ip, data: detail, loading: false };
    } catch (e) {
      results.value[source.id].loading = false;
    }
  });
});
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <div v-for="s in sources" :key="s.id">
      <IpDetailView
        v-if="results[s.id]?.ip"
        :ip="results[s.id].ip"
        :label="s.label"
        :color="s.color"
        :preloaded-data="results[s.id].data"
      />
      <div v-else-if="results[s.id]?.loading" class="p-4 bg-white dark:bg-slate-800 rounded animate-pulse">
        Loading...
      </div>
    </div>
  </div>
</template>
