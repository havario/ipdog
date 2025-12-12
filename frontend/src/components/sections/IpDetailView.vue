<script setup lang="ts">
import MapWidget from "~/components/base/MapWidget.vue";

const props = defineProps<{
  ip: string;
  label?: string;
  color?: string;
  preloadedData?: any;
}>();

const { data, pending, error } = props.preloadedData
  ? { data: ref(props.preloadedData), pending: ref(false), error: ref(null) }
  : await useIpQuery(props.ip);

const coords = computed(() => {
  if (data.value?.mt_geo?.lat) return { lat: data.value.mt_geo.lat, lng: data.value.mt_geo.lng };
  if (data.value?.ipsb?.latitude) return { lat: data.value.ipsb.latitude, lng: data.value.ipsb.longitude };
  return null;
});
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden mb-4"
  >
    <div class="px-3 py-2 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
      <h2 class="text-sm font-medium text-gray-700 dark:text-gray-200">
        {{ label || "IP Location" }} : {{ ip }}
        <a
          :href="`https://ipinfo.io/${ip}`"
          target="_blank"
          class="hover:underline text-gray-400 dark:text-gray-500 ml-1"
          >(Moreinfo)</a
        >
      </h2>
      <div
        class="h-2 w-2 rounded-full"
        :style="{ background: color || '#3b82f6', boxShadow: `0 0 8px ${color || '#3b82f6'}80` }"
      ></div>
    </div>

    <div class="p-3 text-sm">
      <div v-if="pending" class="animate-pulse space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
        <div class="h-20 bg-gray-200 dark:bg-slate-700 rounded"></div>
      </div>
      <div v-else-if="error || !data?.success" class="text-red-500">Failed to get location data</div>

      <div v-else>
        <div v-if="data.mt_geo && Object.keys(data.mt_geo).length > 0" class="mt-3">
          <h3 class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Meituan Data</h3>
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-800 dark:text-slate-300">
            <div><span class="text-gray-500">Country:</span> {{ data.mt_geo.country || "—" }}</div>
            <div><span class="text-gray-500">City:</span> {{ data.mt_geo.city || "—" }}</div>
            <div class="col-span-2">
              <span class="text-gray-500">Coords:</span> {{ data.mt_geo.lat }}, {{ data.mt_geo.lng }}
            </div>
          </div>
        </div>

        <div v-if="data.ipsb" class="mt-3">
          <h3 class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">IP.SB Data</h3>
          <div class="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-800 dark:text-slate-300">
            <div><span class="text-gray-500">ISP:</span> {{ data.ipsb.isp || "—" }}</div>
            <div><span class="text-gray-500">ASN:</span> {{ data.ipsb.asn || "—" }}</div>
          </div>
        </div>

        <ClientOnly>
          <MapWidget v-if="coords" :lat="coords.lat" :lng="coords.lng" :color="color" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
