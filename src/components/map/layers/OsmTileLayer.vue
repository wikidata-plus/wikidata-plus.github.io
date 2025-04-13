<template>
  <tile-layer
    url-template="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
  ></tile-layer>
</template>

<script lang="ts" setup>
import TileLayer from './TileLayer.vue';
</script>

