<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { useTheme } from "~/composables/useTheme";

const props = defineProps<{ lat: number; lng: number; color?: string }>();
const mapContainer = ref<HTMLElement | null>(null);
const { isDark } = useTheme();
let map: any = null;
let tileLayer: any = null;

onMounted(async () => {
  if (!process.client) return;
  const L = (await import("leaflet")).default;

  map = L.map(mapContainer.value!, { zoomControl: true, attributionControl: false }).setView(
    [props.lat, props.lng],
    10
  );

  const updateTiles = () => {
    if (tileLayer) map.removeLayer(tileLayer);
    const tileUrl = isDark.value
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    tileLayer = L.tileLayer(tileUrl, { subdomains: "abcd" }).addTo(map);
  };

  watch(isDark, updateTiles);
  updateTiles();

  L.circleMarker([props.lat, props.lng], {
    radius: 8,
    color: props.color || "#3b82f6",
    weight: 2,
    fillOpacity: 0.5,
  }).addTo(map);

  setTimeout(() => map.invalidateSize(), 100);
});
</script>

<template>
  <div ref="mapContainer" class="h-60 rounded-md mt-2 dark:brightness-90 dark:invert-[0.05] z-0"></div>
</template>
