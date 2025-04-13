<template>
  <OsmPolyline
    :lat-lngs="coords"
    :options="{
      color: props.stroke,
      weight: props.strokeWidth
    }"
    :popup-content="props.popupContent"
  >
    <slot></slot>
  </OsmPolyline>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getFeature, getFeatures } from "@/endpoints/osm";
import type { LatLngExpression } from 'leaflet';
import OsmPolyline from './OsmPolyline.vue';

const props = defineProps<{
  id: number,
  stroke?: string,
  strokeWidth?: number,
  popupContent?: string,
}>();

const coords = ref<LatLngExpression[]>([]);

onMounted(async () => {
  const way = await getFeature("way", props.id);

  const nodes = await getFeatures("node", way.nodes);

  coords.value = nodes.map(node => [node.lat, node.lon]);
});
</script>
