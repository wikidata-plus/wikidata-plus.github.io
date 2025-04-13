<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { polyline, type LatLngExpression, type PolylineOptions } from 'leaflet';
import { useMapInstance } from './useMapInstance';

const props = defineProps<{
  latLngs?: LatLngExpression[]
  options?: PolylineOptions,
  popupContent?: string
}>();

const map = useMapInstance();

watch(
  () => props.latLngs,
  () => {
    if (!props.latLngs || !map.value) {
      return;
    }

    const p = polyline(props.latLngs, props.options)
      .addTo(map.value);

    if (props.popupContent) {
      p.bindPopup(props.popupContent);
    }
  },
  { immediate: true }
);
</script>
