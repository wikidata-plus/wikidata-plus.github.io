import{W as u,a as p,V as w,_ as b,b as h}from"./index-D7qWMBhM.js";import{d as g,r as C,c as A,D as O,E as d,F as f,j as k,f as v,G as E,H as N,o,e as P}from"./vuetify-Bz3L5cxd.js";import"./leaflet-B44856_d.js";import"./index-CmzqPN2c.js";const T={class:"map-container"},I=`
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
  (CONCAT('#', substr(SHA1(CONCAT(str(?id), 'kur')), 1, 6)) AS ?stroke)
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
GROUP BY ?id ?title ?namesake ?namesake_label ?namesake_desc ?namesake_wiki_name ?namesake_wiki_link ?osm`,V=g({__name:"BoulevardsMapsView",setup(S){const m=u({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}).sparqlQuery(I),n=C(),c=A(()=>{var s;return((s=n.value)==null?void 0:s.results.bindings.map(e=>{var a;return(a=e.osmRelationId)==null?void 0:a.value}))||[]});function _(s){var a,t;const e=(((a=n.value)==null?void 0:a.results.bindings)||[]).find(i=>{var r;return((r=i.osmRelationId)==null?void 0:r.value)==s});return`
    <div align="center">
      ${e==null?void 0:e.title.value}<br>`+(e!=null&&e.IMG?`<img src="${(t=e==null?void 0:e.IMG)==null?void 0:t.value}" alt="Image" style="width: 100px; height: auto;"><br>`:"")+`${e==null?void 0:e.description.value}<br>
    </div>`}return O(async()=>{try{const s=await p.get(m);n.value=s.data}catch(s){console.error("Error fetching data:",s)}}),(s,e)=>(o(),d("div",T,[e[0]||(e[0]=f("h1",{class:"text-h4 bg-white pa-3"},"Булеварди в София и тяхната памет",-1)),k(w,{center:[42.698334,23.319941]},{default:v(()=>[k(b),(o(!0),d(E,null,N(c.value,a=>{var t,i;return o(),P(h,{key:a,id:a,stroke:(i=(t=n.value)==null?void 0:t.results.bindings.find(r=>{var l;return((l=r.osmRelationId)==null?void 0:l.value)==a}))==null?void 0:i.stroke.value,"stroke-width":4,"popup-content":_(a)},null,8,["id","stroke","popup-content"])}),128))]),_:1})]))}});export{V as default};
