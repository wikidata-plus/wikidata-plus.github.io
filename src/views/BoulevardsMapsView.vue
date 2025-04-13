<template>
  <div class="map-container">
    <h1 class="text-h4 bg-white pa-3">Булеварди в София и тяхната памет</h1>
    <v-map :center="[42.698334, 23.319941]">
      <osm-tile-layer />
      <osm-relation
        v-for="osmRelationId in relationIds"
        :key="osmRelationId"
        :id="osmRelationId"
        :stroke="getStrokeColor(osmRelationId)"
        :stroke-width="4"
        :popup-content="getPopupContent(osmRelationId)"
      />
    </v-map>
  </div>
</template>

<script lang="ts" setup>
import VMap from '@/components/map/VMap.vue';
import OsmTileLayer from '@/components/map/layers/OsmTileLayer.vue';
import OsmRelation from '@/components/map/OsmRelation.vue';
import { ref, computed, onMounted } from 'vue';
import { WBK, type SparqlResults } from 'wikibase-sdk';
import axios from 'axios';
import { useColor } from '@/composables/color';

const wdk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
});

const { stringToHexColor } = useColor();

function getStrokeColor(relationId: string) {
  const item = data.value?.results.bindings.find(x => x.osmRelationId?.value == relationId);

  return item?.id.value
    ? stringToHexColor(item?.id.value)
    : '#000000';
}

const query = `
SELECT ?id ?namesake ?namesake_desc
  (SAMPLE(?img) AS ?IMG)
  ?title
  (COALESCE(
    CONCAT('<hr>', ?namesake_desc),
    CONCAT('<hr>', ?namesake_desc),
    CONCAT('<hr><a href="https://bg.wikipedia.org/wiki/', ?namesake_wiki_name, '" target="_blank">', ?namesake_wiki_name, '</a><br>'),
    CONCAT('<hr>[', str(?namesake), ' ', ?namesake_label, ']<br>', ?namesake_desc),
    CONCAT('<hr>[', str(?namesake), ' ', ?namesake_label, ']')
  ) AS ?description)
  (?osm AS ?osmRelationId)
WHERE {
  ?id wdt:P31 wd:Q54114 ;
      wdt:P276 wd:Q472 ;
      wdt:P402 ?osm .
  OPTIONAL {
    ?id wdt:P138 ?namesake .
    OPTIONAL {
      ?namesake wdt:P18 ?img .
    }
    OPTIONAL {
      ?namesake_wiki_link schema:about ?namesake ;
            schema:isPartOf <https://bg.wikipedia.org/> ;
            schema:name ?namesake_wiki_name .
    }
  }
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language 'bg' .
    ?namesake rdfs:label ?namesake_label ;
              schema:description ?namesake_desc .
    ?id rdfs:label ?bul_label .
  }
  OPTIONAL {
    ?bul_wiki schema:about ?id ;
              schema:isPartOf <https://bg.wikipedia.org/> ;
              schema:name ?bul_wiki_name .
  }
  BIND (COALESCE(CONCAT('<a href="https://bg.wikipedia.org/wiki/', ?namesake_wiki_name, '" target="_blank">', ?namesake_wiki_name, '</a>'), ?namesake_label) AS ?title)
}
GROUP BY ?id ?title ?namesake ?namesake_label ?namesake_desc ?namesake_wiki_name ?namesake_wiki_link ?osm`;

const url = wdk.sparqlQuery(query)

const data = ref<SparqlResults>();

const relationIds = computed(() => data.value?.results.bindings.map((item) => item.osmRelationId?.value) || []);

function getPopupContent(osmRelationId: string) {
  const item = (data.value?.results.bindings || []).find((x) => x.osmRelationId?.value == osmRelationId);
  return `
    <div align="center">
      ${item?.title.value}<br>`
      + ( item?.IMG ? `<img src="${item?.IMG?.value}" alt="Image" style="width: 100px; height: auto;"><br>` : '')
      +`${item?.description.value}<br>
    </div>`;
}

onMounted(async () => {
  try {
    const response = await axios.get<SparqlResults>(url);
 
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>