import{W as u,a as p,V as w,_ as b,b as g}from"./index-EGzlvahn.js";import{d as h,r as C,c as A,o as f,a as d,b as O,e as k,w as v,F as N,f as P,g as l,h as E,_ as I}from"./index-8jTyUR94.js";const T=`
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
  (4 AS ?stroke_width)
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
GROUP BY ?id ?title ?namesake ?namesake_label ?namesake_desc ?namesake_wiki_name ?namesake_wiki_link ?osm`,S=h({__name:"BoulevardsMapsView",setup(B){const m=u({instance:"https://www.wikidata.org",sparqlEndpoint:"https://query.wikidata.org/sparql"}).sparqlQuery(T),n=C(),c=A(()=>{var s;return((s=n.value)==null?void 0:s.results.bindings.map(e=>{var a;return(a=e.osmRelationId)==null?void 0:a.value}))||[]});function _(s){var a,t;const e=(((a=n.value)==null?void 0:a.results.bindings)||[]).find(i=>{var r;return((r=i.osmRelationId)==null?void 0:r.value)==s});return`
    <div align="center">
      ${e==null?void 0:e.title.value}<br>`+(e!=null&&e.IMG?`<img src="${(t=e==null?void 0:e.IMG)==null?void 0:t.value}" alt="Image" style="width: 100px; height: auto;"><br>`:"")+`${e==null?void 0:e.description.value}<br>
    </div>`}return f(async()=>{try{const s=await p.get(m);n.value=s.data}catch(s){console.error("Error fetching data:",s)}}),(s,e)=>(l(),d("div",null,[e[0]||(e[0]=O("h1",null,"Булеварди в София и тяхната памет",-1)),k(w,{center:[42.698334,23.319941]},{default:v(()=>[k(b),(l(!0),d(N,null,P(c.value,a=>{var t,i;return l(),E(g,{key:a,id:a,stroke:(i=(t=n.value)==null?void 0:t.results.bindings.find(r=>{var o;return((o=r.osmRelationId)==null?void 0:o.value)==a}))==null?void 0:i.stroke.value,"stroke-width":5,"popup-content":_(a)},null,8,["id","stroke","popup-content"])}),128))]),_:1})]))}}),V=I(S,[["__scopeId","data-v-aae3d469"]]);export{V as default};
