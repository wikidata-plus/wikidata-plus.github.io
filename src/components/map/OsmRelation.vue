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
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query'
import { getFeature } from "@/endpoints/osm";
import OsmWay from './OsmWay.vue';

const props = defineProps<{
  id: number | string,
  stroke?: string,
  strokeWidth?: number,
  popupContent?: string,
}>();

const { data: relation } = useQuery({
  queryKey: ['osmRelation', props.id],
  queryFn() {
    return getFeature("relation", Number(props.id));
  },
  staleTime: Infinity,
  enabled: computed(() => !!props.id)
})

const wayIds = computed(() => relation.value?.members
  .filter(m => m.type === 'way')
  .map(m => m.ref) || []);
</script>
