<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const hideHeader = computed(() => Boolean(route.query.hideHeader));
</script>

<template>
  <v-app>
    <v-app-bar flat v-if="!hideHeader">
      <template v-slot:prepend>
        <RouterLink to="/">
          <v-img
            src="@/assets/wikidata-logo.svg"
            width="50"
            class="mr-2"
            alt="Wikidata"
          />
        </RouterLink>
        </template>
      <v-app-bar-title>
        Plus
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>