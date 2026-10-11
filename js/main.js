(()=>{
const $=s=>document.querySelector(s),J=u=>fetch(u).then(r=>r.json()).catch(()=>null);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const EXT=['png','jpg','jpeg','webp','svg'];
// Auto image loader: assets/images/<folder>/<id>.<ext>
const findImg=(f,id)=>new Promise(res=>{let i=0;(function t(){if(i>=EXT.length)return res(null);const u=`assets/images/${f}/${id}.${EXT[i++]}`,m=new Image();m.onload=()=>res(u);m.onerror=t;m.src=u})()});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
(async()=>{
const [P,C,X,S]=await Promise.all([J('data/projects.json'),J('data/certifications.json'),J('data/experience.json'),J('data/skills.json')]);
if(S){$('#skillGrid').innerHTML=Object.entries(S).map(([k,v])=>`<div class="sk rv"><h3>${esc(k)}</h3><div class="chips">${v.map((s,i)=>`<span style="--i:${i}">${esc(s)}</span>`).join('')}</div></div>`).join('');
const t=[...new Set(Object.values(S).flat())];$('#mq').innerHTML=[...t,...t].map(x=>`<span>${esc(x)}</span>`).join('')}
if(X){$('#expList').innerHTML=X.map((x,i)=>`<article class="tl rv"><div class="n">0${i+1}</div><div><h3>${esc(x.role)}</h3><p class="co">${esc(x.company)}</p><ul>${x.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><span class="im" data-id="${x.id}"></span></div><small>${esc(x.period)}</small></article>`).join('');
document.querySelectorAll('.im').forEach(e=>findImg('internships',e.dataset.id).then(u=>{if(u)e.outerHTML=`<img src="${u}" alt="${esc(e.dataset.id)}" loading="lazy">`;else e.remove()}))}
if(P)$('#projList').innerHTML=P.map(p=>`<article class="card rv"><div class="img" data-f="projects" data-id="${p.id}" data-a="${esc(p.title)}">${esc(p.title.slice(0,2))}</div><div class="body"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="chips">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="row">${p.github?`<a class="btn" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub</a>`:''}${p.demo?`<a class="btn primary" href="${esc(p.demo)}" target="_blank" rel="noopener">Demo</a>`:''}</div></div></article>`).join('');
if(C)$('#certList').innerHTML=C.map(c=>`<article class="card rv"><div class="img cert" data-f="certificates" data-id="${c.id}" data-a="${esc(c.title)}">★</div><div class="body"><h3>${esc(c.title)}</h3><p>${esc(c.issuer||'')}</p></div></article>`).join('');
document.querySelectorAll('.card .img').forEach(async e=>{const u=await findImg(e.dataset.f,e.dataset.id);if(u)e.innerHTML=`<img src="${u}" alt="${esc(e.dataset.a)}" loading="lazy">`});
const st=[['Projects',P?.length||0],['Certificates',C?.length||0],['Internships',X?.length||0],['Technologies',S?new Set(Object.values(S).flat()).size:0]];
$('#statList').innerHTML=st.map(([l,n])=>`<div class="stat rv"><b data-n="${n}">0</b>${l}</div>`).join('');
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const b=e.target.querySelector('b'),n=+b.dataset.n,t0=performance.now();(function f(t){const k=Math.min((t-t0)/1200,1);b.textContent=Math.round(n*k);if(k<1)requestAnimationFrame(f)})(t0);co.unobserve(e.target)}),{threshold:.6});
document.querySelectorAll('.stat').forEach(e=>co.observe(e));
})();
// Typing
const W=['full-stack web apps','REST APIs and backends','cloud-ready software','AI agents and RAG systems'];let w=0,c=0,d=false;const tp=$('#typed');
(function k(){const s=W[w];c+=d?-1:1;tp.textContent=s.slice(0,c);let t=d?35:70;if(!d&&c===s.length){d=true;t=1400}else if(d&&!c){d=false;w=(w+1)%W.length;t=300}setTimeout(k,t)})();
// Floating chips
['React','Java','Django','AWS','Python','Gemini'].forEach((t,i)=>{const s=document.createElement('span');s.className='fl';s.textContent=t;s.style.cssText=`--t:${12+i*13}%;--r:${(i%3)*9+2}%;animation-delay:${-i}s`;$('#floaters').append(s)});
// Lightbox
document.addEventListener("click",e=>{const i=e.target.closest(".card .img img,.tl img");if(!i)return;const o=document.createElement("div");o.className="lb";o.innerHTML=`<img src="${i.src}" alt="${i.alt}">`;o.onclick=()=>o.remove();document.body.append(o)});addEventListener("keydown",e=>e.key==="Escape"&&document.querySelector(".lb")?.remove());
// Mobile menu
const b=$('#menu'),l=$('#links');b.onclick=()=>{const o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)};
l.onclick=e=>{if(e.target.tagName==='A'){l.classList.remove('open');b.setAttribute('aria-expanded',false)}};
// Cursor glow + card spotlight (pointer devices)
if(matchMedia('(hover:hover)').matches)document.addEventListener('pointermove',e=>{$('#glow').style.transform=`translate(${e.clientX}px,${e.clientY}px)`;const c=e.target.closest('.box,.card,.sk');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
// GitHub
(async()=>{const u='LeelaPrasath008',p=await J(`https://api.github.com/users/${u}`),r=await J(`https://api.github.com/users/${u}/repos?sort=updated&per_page=100`);
if(!p||p.message){$('#ghMeta').textContent='GitHub data is unavailable right now. Visit the profile directly.';return}
$('#ghAvatar').src=p.avatar_url;$('#ghAvatar').hidden=false;$('#ghName').textContent=p.name||'@'+u;$('#ghMeta').textContent=`${p.public_repos} public repositories · ${p.followers} followers`;
if(Array.isArray(r)){const L={};r.forEach(x=>x.language&&(L[x.language]=(L[x.language]||0)+1));
$('#ghLangs').innerHTML=Object.entries(L).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<span>${esc(k)} (${v})</span>`).join('');
$('#ghRepos').innerHTML=r.filter(x=>!x.fork).slice(0,6).map(x=>`<a class="card" href="${x.html_url}" target="_blank" rel="noopener"><h3>${esc(x.name)}</h3><p>${esc(x.description||'')}</p><small class="mut">${esc(x.language||'')}</small></a>`).join('')}})();
// Contact (opens visitor's mail app)
$('#form').addEventListener('submit',e=>{e.preventDefault();const f=e.target;location.href=`mailto:rubendhiran2014@gmail.com?subject=${encodeURIComponent('Portfolio message from '+f.n.value)}&body=${encodeURIComponent(f.m.value+'\n\n'+f.n.value+' ('+f.e.value+')')}`;$('#formMsg').textContent='Opening your email app to send the message.'});
$('#yr').textContent=new Date().getFullYear();
addEventListener('scroll',()=>{const h=document.documentElement;$('#bar').style.width=h.scrollTop/(h.scrollHeight-h.clientHeight)*100+'%'},{passive:true});
})();
