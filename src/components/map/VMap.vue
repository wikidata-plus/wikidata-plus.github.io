<template>
  <div ref="leaflet-map" class="map">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, provide, onMounted } from 'vue'
import { map, control } from 'leaflet';

import type { LatLngExpression } from 'leaflet';

const props = defineProps<{
  center: LatLngExpression
}>();

const mapInstance = ref<L.Map>();
const mapRef = useTemplateRef('leaflet-map');

provide('map', mapInstance);

onMounted(() => {
  if (!mapRef.value) {
    throw new Error('Map reference is not available');
  }

  mapInstance.value = map(mapRef.value, {
    zoomControl: false,
  });

  control.zoom({
    position: 'bottomright'
  }).addTo(mapInstance.value);

  if (props.center) {
    mapInstance.value.setView(props.center, 11.5);
  }
})
</script>

<style scoped>
.map {
  flex: 1;
  height: 100%;
  width: 100%;
}
</style>