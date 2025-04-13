<template>
  <div ref="leaflet-map" class="map">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef, provide, onMounted } from 'vue'
import { map } from 'leaflet';

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

  mapInstance.value = map(mapRef.value);

  if (props.center) {
    mapInstance.value.setView(props.center, 11.5);
  }
})
</script>

<style scoped>
.map {
  /* height: 600px; */
  /* width: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>