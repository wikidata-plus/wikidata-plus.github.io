import{W as w,a as b,V as g,_ as h,b as C,u as f}from"./color-BUAkOZH_.js";import{d as O,r as v,c as A,D as E,E as l,F as P,j as d,f as N,G as I,H as T,o as r,e as S}from"./vuetify-Bz3L5cxd.js";import"./leaflet-B44856_d.js";import"./index-DS4N1NxX.js";const L={class:"map-container"},B=`
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
GROUP BY ?id ?title ?namesake ?namesake_label ?namesake_desc ?namesake_wiki_name ?namesake_wiki_link ?osm`,G=O({__name:"BoulevardsMapsView",setup(x){const k=w({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}),{stringToHexColor:m}=f();function c(s){var a;const e=(a=t.value)==null?void 0:a.results.bindings.find(n=>{var i;return((i=n.osmRelationId)==null?void 0:i.value)==s});return e!=null&&e.id.value?m(e==null?void 0:e.id.value):"#000000"}const u=k.sparqlQuery(B),t=v(),_=A(()=>{var s;return((s=t.value)==null?void 0:s.results.bindings.map(e=>{var a;return(a=e.osmRelationId)==null?void 0:a.value}))||[]});function p(s){var a,n;const e=(((a=t.value)==null?void 0:a.results.bindings)||[]).find(i=>{var o;return((o=i.osmRelationId)==null?void 0:o.value)==s});return`
    <div align="center">
      ${e==null?void 0:e.title.value}<br>`+(e!=null&&e.IMG?`<img src="${(n=e==null?void 0:e.IMG)==null?void 0:n.value}" alt="Image" style="width: 100px; height: auto;"><br>`:"")+`${e==null?void 0:e.description.value}<br>
    </div>`}return E(async()=>{try{const s=await b.get(u);t.value=s.data}catch(s){console.error("Error fetching data:",s)}}),(s,e)=>(r(),l("div",L,[e[0]||(e[0]=P("h1",{class:"text-h4 bg-white pa-3"},"Булеварди в София и тяхната памет",-1)),d(g,{center:[42.698334,23.319941]},{default:N(()=>[d(h),(r(!0),l(I,null,T(_.value,a=>(r(),S(C,{key:a,id:a,stroke:c(a),"stroke-width":4,"popup-content":p(a)},null,8,["id","stroke","popup-content"]))),128))]),_:1})]))}});export{G as default};
