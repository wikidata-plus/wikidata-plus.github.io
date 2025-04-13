import{W as p,a as u,V as b,_ as g,b as h,u as v}from"./color-A25p1Vcg.js";import{d as f,r as A,c as C,E as P,F as l,G as O,j as o,f as x,o as r,H as E,I as T,e as S}from"./vuetify-D1e-8Ie7.js";import"./leaflet-B44856_d.js";import"./index-DjvKHs3a.js";const I={class:"map-container"},N=`
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
  ?taxon_name ?ipni ?bul_label ?osm ?namesake_wikitext`,M=f({__name:"MapsView",setup(L){const k=p({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}),{stringToHexColor:m}=v();function d(t){var e;const a=(e=s.value)==null?void 0:e.results.bindings.find(n=>{var i;return((i=n.osmRelationId)==null?void 0:i.value)==t});return a!=null&&a.id.value?m((a==null?void 0:a.id.value)+"cvete"):"#000000"}const _=k.sparqlQuery(N),s=A(),w=C(()=>{var t;return((t=s.value)==null?void 0:t.results.bindings.map(a=>{var e;return(e=a.osmRelationId)==null?void 0:e.value}))||[]});function c(t){var e;const a=(((e=s.value)==null?void 0:e.results.bindings)||[]).find(n=>{var i;return((i=n.osmRelationId)==null?void 0:i.value)==t});return`
    <div align="center">
      ${a==null?void 0:a.title.value}<br>
      <img src="${a==null?void 0:a.IMG.value}" alt="Image" style="width: 100px; height: auto;"><br>
      ${a==null?void 0:a.description.value}<br>
    </div>`}return P(async()=>{try{const t=await u.get(_);s.value=t.data}catch(t){console.error("Error fetching data:",t)}}),(t,a)=>(r(),l("div",I,[a[0]||(a[0]=O("h1",{class:"text-h4 bg-white pa-3"},"Улици в София с име на растение",-1)),o(b,{center:[42.698334,23.319941]},{default:x(()=>[o(g),(r(!0),l(E,null,T(w.value,e=>(r(),S(h,{key:e,id:e,stroke:d(e),"stroke-width":5,"popup-content":c(e)},null,8,["id","stroke","popup-content"]))),128))]),_:1})]))}});export{M as default};
