import{W as p,a as c,V as u,_ as b,b as g}from"./index-EGzlvahn.js";import{d as h,r as v,c as A,o as f,a as k,b as C,e as o,w as P,F as O,f as S,g as r,h as T,_ as x}from"./index-8jTyUR94.js";const E=`
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
  ?taxon_name ?ipni ?bul_label ?osm ?namesake_wikitext`,N=h({__name:"MapsView",setup(I){const d=p({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}).sparqlQuery(E),s=v(),m=A(()=>{var t;return((t=s.value)==null?void 0:t.results.bindings.map(a=>{var e;return(e=a.osmRelationId)==null?void 0:e.value}))||[]});function _(t){var e;const a=(((e=s.value)==null?void 0:e.results.bindings)||[]).find(n=>{var i;return((i=n.osmRelationId)==null?void 0:i.value)==t});return`
    <div align="center">
      ${a==null?void 0:a.title.value}<br>
      <img src="${a==null?void 0:a.IMG.value}" alt="Image" style="width: 100px; height: auto;"><br>
      ${a==null?void 0:a.description.value}<br>
    </div>`}return f(async()=>{try{const t=await c.get(d);s.value=t.data}catch(t){console.error("Error fetching data:",t)}}),(t,a)=>(r(),k("div",null,[a[0]||(a[0]=C("h1",null,"Улици в София с име на растение",-1)),o(u,{center:[42.698334,23.319941]},{default:P(()=>[o(b),(r(!0),k(O,null,S(m.value,e=>{var n,i;return r(),T(g,{key:e,id:e,stroke:(i=(n=s.value)==null?void 0:n.results.bindings.find(w=>{var l;return((l=w.osmRelationId)==null?void 0:l.value)==e}))==null?void 0:i.stroke.value,"stroke-width":5,"popup-content":_(e)},null,8,["id","stroke","popup-content"])}),128))]),_:1})]))}}),M=x(N,[["__scopeId","data-v-459566c3"]]);export{M as default};
