<template>
  <div>
    <h1>Улици в София с име на растение</h1>

    <v-map :center="[42.698334, 23.319941]">
      <osm-tile-layer />
      <osm-relation
        v-for="osmRelationId in relationIds1"
        :key="osmRelationId"
        :id="osmRelationId"
        :stroke="data?.results.bindings.find((x: any) => x.osmRelationId?.value == osmRelationId)?.stroke.value"
        :stroke-width="5"
        :popup-content="getPopupContent(osmRelationId)"
      />
    </v-map>
    <!-- v-model:zoom="zoom" , 11.5 -->
    <!-- <div v-for="x in (data?.results.bindings || [])" :key="x.id.value" style="padding-top: 20px">
      title: {{ x.title.value }}<br />
      IMG: {{ x.IMG.value }}<br />
      KVARTAL_WT: {{ x.KVARTAL_WT.value }}<br />
      description: {{ x.description.value }}<br />
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import VMap from '@/components/map/VMap.vue';
import OsmTileLayer from '@/components/map/layers/OsmTileLayer.vue';
import OsmRelation from '@/components/map/OsmRelation.vue';
import { ref, computed, onMounted } from 'vue';
import { WBK } from 'wikibase-sdk';
import axios from 'axios';

const wdk = WBK({
  instance: 'https://www.wikidata.org',
  sparqlEndpoint: 'https://query.wikidata.org/sparql'
});

const query = `
SELECT ?id ?namesake (SAMPLE(?img) AS ?IMG) (SAMPLE(?kvartal_wikitext) AS ?KVARTAL_WT)
  (CONCAT('<big>', ?namesake_wikitext, '</big>') AS ?title)
  (COALESCE(CONCAT('<hr>ул. <em><a href="https://www.openstreetmap.org/relation/', ?osm, '" target="_blank">', ?bul_label, '</a></em> в кв.', 
  ?KVARTAL_WT, ', носи името на растението ', ?namesake_wikitext, ' (<em><a href="https://www.ipni.org/n/', ?ipni, '" target="_blank">', ?taxon_name, '</a></em>)'), CONCAT('<hr>[', str(?id), ' обект в уикиданни]')) AS ?description)
  (CONCAT('#', substr(SHA1(CONCAT(str(?id), 'cvete')), 1, 6)) AS ?stroke)
  (5 AS ?stroke_width)
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

const data = ref();

const relationIds1 = computed(() => data.value?.results.bindings.map((item: any) => item.osmRelationId?.value) || []);

function getPopupContent(osmRelationId: any) {
  const item = (data.value?.results.bindings || []).find((x: any) => x.osmRelationId?.value == osmRelationId);
  return `
    <div align="center">
      ${item?.title.value}<br>
      <img src="${item?.IMG.value}" alt="Image" style="width: 100px; height: auto;"><br>
      ${item?.description.value}<br>
    </div>`;
}

onMounted(async () => {
  try {
    const response = await axios.get(url);
 
    data.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style scoped>
h1 {
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  position: relative;
  text-align: center;
}
</style>