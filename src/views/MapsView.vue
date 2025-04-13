<template>
  <div class="map-container">
    <h1 class="text-h4 bg-white pa-3">Улици в София с име на растение</h1>
    <v-map :center="[42.698334, 23.319941]">
      <osm-tile-layer />
      <osm-relation
        v-for="relationId in relationIds"
        :key="relationId"
        :id="relationId"
        :stroke="getStrokeColor(relationId)"
        :stroke-width="5"
        :popup-content="getPopupContent(relationId)"
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
    ? stringToHexColor(item?.id.value + 'cvete')
    : '#000000';
}


const query = `
SELECT ?id ?namesake (SAMPLE(?img) AS ?IMG) (SAMPLE(?kvartal_wikitext) AS ?KVARTAL_WT)
  (CONCAT('<big>', ?namesake_wikitext, '</big>') AS ?title)
  (COALESCE(CONCAT('<hr>ул. <em><a href="https://www.openstreetmap.org/relation/', ?osm, '" target="_blank">', ?bul_label, '</a></em> в кв.', ?KVARTAL_WT, ', носи името на растението ', ?namesake_wikitext, ' (<em><a href="https://www.ipni.org/n/', ?ipni, '" target="_blank">', ?taxon_name, '</a></em>)'), CONCAT('<hr>[', str(?id), ' обект в уикиданни]')) AS ?description)
  (?osm AS ?osmRelationId)
WHERE {
  ?id wdt:P31 wd:Q79007 ;
      wdt:P276 wd:Q472 ;
      wdt:P276 ?kvartal ;
      wdt:P402 ?osm .
  ?kvartal wdt:P31 wd:Q123705 .
  ?id wdt:P138 ?namesake .
  ?namesake wdt:P31 wd:Q16521 ;
            wdt:P961 ?ipni ;
            wdt:P225 ?taxon_name .
  OPTIONAL {
    ?namesake wdt:P18 ?img .
  }
  OPTIONAL {
    ?namesake_wiki_link schema:about ?namesake ;
                        schema:isPartOf <https://bg.wikipedia.org/> ;
                        schema:name ?namesake_wiki_name .
  }
  OPTIONAL {
    ?kvartal_wiki_link schema:about ?kvartal ;
                       schema:isPartOf <https://bg.wikipedia.org/> ;
                       schema:name ?kvartal_wiki_name .
  }
  SERVICE wikibase:label {
    bd:serviceParam wikibase:language 'bg' .
    ?namesake rdfs:label ?namesake_label .
    ?kvartal rdfs:label ?kvartal_label .
    ?id rdfs:label ?bul_label .
  }
  OPTIONAL {
    ?bul_wiki schema:about ?id ;
              schema:isPartOf <https://bg.wikipedia.org/> ;
              schema:name ?bul_wiki_name .
  }
  BIND (COALESCE(CONCAT('<a href="https://bg.wikipedia.org/wiki/', ?namesake_wiki_name, '" target="_blank">', ?namesake_wiki_name, '</a>'), ?namesake_label) AS ?namesake_wikitext)
  BIND (CONCAT('<a href="https://bg.wikipedia.org/wiki/', ?kvartal_wiki_name, '" target="_blank">', ?kvartal_wiki_name, '</a>') AS ?kvartal_wikitext)
}
GROUP BY ?id ?title ?namesake ?namesake_label ?namesake_desc ?namesake_wiki_name ?namesake_wiki_link
  ?taxon_name ?ipni ?bul_label ?osm ?namesake_wikitext`;

const url = wdk.sparqlQuery(query)

const data = ref<SparqlResults>();

const relationIds = computed(() => data.value?.results.bindings.map((item) => item.osmRelationId?.value) || []);

function getPopupContent(relationId: string) {
  const item = (data.value?.results.bindings || []).find((x) => x.osmRelationId?.value == relationId);
  return `
    <div align="center">
      ${item?.title.value}<br>
      <img src="${item?.IMG.value}" alt="Image" style="width: 100px; height: auto;"><br>
      ${item?.description.value}<br>
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
