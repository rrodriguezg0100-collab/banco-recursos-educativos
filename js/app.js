const grid=document.getElementById("resourceGrid");
const search=document.getElementById("searchInput");
const filters=document.getElementById("filters");
const empty=document.getElementById("emptyState");
let activeFilter="Todos";

function drawResources(){
  const term=search.value.trim().toLocaleLowerCase("es");
  const found=recursos.filter(r=>{
    const categoryOk=activeFilter==="Todos"||r.categoria===activeFilter;
    const text=`${r.titulo} ${r.categoria} ${r.tipo} ${r.descripcion}`.toLocaleLowerCase("es");
    return categoryOk&&text.includes(term);
  });
  grid.innerHTML=found.map(r=>`
    <article class="resource-card">
      <div class="resource-meta"><span class="resource-tag">${r.categoria}</span><span class="resource-type">${r.tipo}</span></div>
      <h3>${r.titulo}</h3><p>${r.descripcion}</p>
      <a class="resource-link" href="${r.enlace}" ${r.enlace!=="# "&&r.enlace!=="#"? 'target="_blank" rel="noopener noreferrer"':""}>Abrir recurso ↗</a>
    </article>`).join("");
  empty.hidden=found.length>0;
}
function setFilter(value){
  activeFilter=value;
  filters.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b.dataset.filter===value));
}
search.addEventListener("input",drawResources);
filters.addEventListener("click",e=>{
  const b=e.target.closest("[data-filter]");
  if(!b)return;
  setFilter(b.dataset.filter);
  drawResources();
});
document.querySelectorAll(".category-card[data-filter]").forEach(card=>{
  card.addEventListener("click",()=>{
    const value=card.dataset.filter;
    setFilter(value);
    drawResources();
  });
});
document.querySelectorAll(".nav-link[data-category]").forEach(link=>{
  link.addEventListener("click",()=>{
    const value=link.dataset.category;
    const match=[...filters.querySelectorAll("[data-filter]")].find(b=>b.dataset.filter===value);
    if(match){setFilter(value);drawResources();}
  });
});
document.getElementById("year").textContent=new Date().getFullYear();
drawResources();
