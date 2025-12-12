<script setup lang="ts">
import SearchBox from "~/components/base/SearchBox.vue";
import IpDetailView from "~/components/sections/IpDetailView.vue";
import HomeDashboard from "~/components/sections/HomeDashboard.vue";

const route = useRoute();
const searchIp = computed(() => route.query.ip as string);
</script>

<template>
  <div>
    <SearchBox />
    <div v-if="searchIp">
      <IpDetailView :ip="searchIp" label="Search Result" color="#6366f1" />
    </div>
    <div v-else>
      <HomeDashboard />
    </div>
  </div>
</template>
