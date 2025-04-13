<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useMapInstance } from '../useMapInstance';

import { tileLayer } from 'leaflet';

const map = useMapInstance();

const props = defineProps({
  urlTemplate: {
    type: String,
    required: true
  },
  attribution: {
    type: String,
    required: true
  }
});

watch(map, () => {
  if (!map.value) {
    return;
  }

  tileLayer(props.urlTemplate, {
    attribution: props.attribution
  }).addTo(map.value);
}, { immediate: true });
</script>