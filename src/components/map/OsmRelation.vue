<template>
  <osm-way
    v-for="wayId in wayIds"
    :key="wayId"
    :id="wayId"
    :stroke="props.stroke"
    :stroke-width="props.strokeWidth"
    :popup-content="props.popupContent"
  >
    <slot></slot>
  </osm-way>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getFeature } from "@/endpoints/osm";
import OsmWay from './OsmWay.vue';

const props = defineProps<{
  id: number | string,
  stroke?: string,
  strokeWidth?: number,
  popupContent?: string,
}>();

const wayIds = ref<number[]>([]);
onMounted(async () => {
  const relation = await getFeature("relation", Number(props.id));

  wayIds.value = relation.members
    .filter(m => m.type === 'way')
    .map(m => m.ref) || [];
})
</script>
