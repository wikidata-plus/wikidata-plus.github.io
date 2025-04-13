<template>
  <OsmPolyline
    :lat-lngs="coords"
    :options="{
      color: stroke,
      weight: strokeWidth
    }"
    :popup-content="popupContent"
  >
    <slot></slot>
  </OsmPolyline>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query'
import { getFeature, getFeatures } from "@/endpoints/osm";
import type { LatLngExpression } from 'leaflet';
import OsmPolyline from './OsmPolyline.vue';

const props = defineProps<{
  id: number,
  stroke?: string,
  strokeWidth?: number,
  popupContent?: string,
}>();

const { data: way } = useQuery({
  queryKey: ['osmWay', props.id],
  queryFn() {
    return getFeature("way", props.id);
  },
  staleTime: Infinity,
  enabled: computed(() => !!props.id)
})

const { data: nodes } = useQuery({
  queryKey: ['osmWayNodes', way],
  queryFn() {
    return getFeatures("node", way.value?.nodes || []);
  },
  staleTime: Infinity,
  enabled: computed(() => !!way.value)
})

const coords = computed<LatLngExpression[]>(() => nodes.value?.map((node) => [node.lat, node.lon]) || []);
</script>
