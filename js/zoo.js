(function(){
const IDS=[1,2,3,4,5,6,7,751,752,753,754,758,759,760,761,762,763,764,765,1501,1502,1503,1507,1508,1509,1510,1511,1512,2259,2260];
const HANDLE=((window.CHAPRI_CONFIG||{}).x||"CHAPRINFT_").replace(/^@/,"");
const INK="#140E0B";
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $=s=>document.querySelector(s);
const src=id=>"assets/nft/"+id+".webp";
const CFG=window.CHAPRI_CONFIG||{};
const SITE=CFG.site||"";

const cache={};
function load(id){if(!cache[id])cache[id]=new Promise(res=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>res(null);i.src=src(id)});return cache[id]}

let toastT;
function toast(msg){const t=$("#toast");if(!t)return;t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),3200)}

const fx=$("#confetti");let parts=[];
function confetti(){if(reduce||!fx)return;const c=fx.getContext("2d");fx.width=innerWidth;fx.height=innerHeight;const cols=["#FF5FA2","#B6F23A","#FFD83D","#5AA0DC","#ffffff","#140E0B"];
  for(let i=0;i<170;i++)parts.push({x:innerWidth/2,y:innerHeight*.4,vx:(Math.random()-.5)*16,vy:-Math.random()*14-4,s:6+Math.random()*8,c:cols[i%6],r:Math.random()*6,vr:(Math.random()-.5)*.4,life:0});
  if(parts.length>170)return;
  (function tick(){c.clearRect(0,0,fx.width,fx.height);parts.forEach(p=>{p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.life++;c.save();c.translate(p.x,p.y);c.rotate(p.r);c.fillStyle=p.c;c.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6);c.restore()});
    parts=parts.filter(p=>p.y<fx.height+40&&p.life<260);if(parts.length)requestAnimationFrame(tick);else c.clearRect(0,0,fx.width,fx.height)})();
}

const N=200;
function kit(g,st){
  const P=(x,y)=>[(0.47+st.x+x*st.s)*N,(0.17+st.y+y*st.s)*N];
  const K=v=>v*st.s*N;
  const lw=Math.max(2,K(0.014));
  g.lineJoin="round";g.lineCap="round";
  return{
    poly(pts,fill,ol=true){g.beginPath();pts.forEach((p,i)=>{const q=P(p[0],p[1]);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();if(fill){g.fillStyle=fill;g.fill()}if(ol){g.strokeStyle=INK;g.lineWidth=lw;g.stroke()}},
    ell(x,y,rx,ry,fill,rot=0,ol=true){const q=P(x,y);g.beginPath();g.ellipse(q[0],q[1],K(rx),K(ry),rot,0,Math.PI*2);if(fill){g.fillStyle=fill;g.fill()}if(ol){g.strokeStyle=INK;g.lineWidth=lw;g.stroke()}},
    line(pts,color,w){g.beginPath();pts.forEach((p,i)=>{const q=P(p[0],p[1]);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.strokeStyle=color;g.lineWidth=Math.max(1.5,K(w));g.stroke()},
    fatline(pts,color,w){this.line(pts,INK,w+0.018);this.line(pts,color,w)}
  };
}
const mirror=pts=>pts.map(p=>[0.02-p[0],p[1]]);
const squash=(pts,f)=>pts.map(p=>[p[0],p[1]<0?p[1]*f:p[1]]);

const ANIMALS={
  cow:{name:"Cow",ico:"\u{1F404}",sound:"MOO",draw(h){
    const L=[[-0.09,0.02],[-0.13,-0.02],[-0.17,-0.07],[-0.2,-0.14],[-0.16,-0.11],[-0.12,-0.06],[-0.06,-0.01]];
    h.poly(L,"#F5ECD0");h.poly(mirror(L),"#F5ECD0");
    h.ell(-0.21,0.1,0.075,0.032,"#EAD9C6",-0.35);h.ell(-0.215,0.1,0.045,0.016,"#F7A8B8",-0.35,false);
    h.ell(0.23,0.08,0.075,0.032,"#EAD9C6",0.35);h.ell(0.235,0.08,0.045,0.016,"#F7A8B8",0.35,false);
    [[-0.2,0.77,0.06,0.035],[0.2,0.8,0.07,0.04],[0.33,0.72,0.045,0.03],[-0.34,0.83,0.05,0.03],[0.06,0.86,0.05,0.03]].forEach(s=>h.ell(s[0],s[1],s[2],s[3],INK,0,false));
    h.poly([[-0.14,0.66],[0.2,0.66],[0.2,0.695],[-0.14,0.695]],"#8D5A2B");
    h.poly([[0.02,0.69],[0.09,0.69],[0.115,0.785],[-0.005,0.785]],"#F1C40F");h.ell(0.055,0.79,0.018,0.014,INK,0,false);
    h.fatline([[-0.105,0.445],[-0.12,0.475],[-0.095,0.5],[-0.065,0.485],[-0.06,0.455]],"#F1C40F",0.012);
  }},
  goat:{name:"Goat",ico:"\u{1F410}",sound:"BAA",draw(h){
    const L=[[-0.07,0.01],[-0.11,-0.06],[-0.09,-0.13],[-0.02,-0.15],[0.0,-0.11],[-0.04,-0.1],[-0.055,-0.05],[-0.03,0.0]];
    h.poly(L,"#B9B2A6");h.poly(L.map(p=>[p[0]+0.15,p[1]-0.01]),"#B9B2A6");
    h.ell(-0.2,0.14,0.08,0.028,"#F4F1EA",0.55);h.ell(0.22,0.12,0.08,0.028,"#F4F1EA",-0.55);
    h.poly([[-0.11,0.6],[0.02,0.6],[-0.02,0.73],[-0.05,0.78],[-0.08,0.72]],"#F4F1EA");
  }},
  chicken:{name:"Chicken",ico:"\u{1F414}",sound:"BAWK",draw(h){
    h.ell(-0.05,-0.02,0.04,0.04,"#E53935");h.ell(0.0,-0.055,0.045,0.045,"#E53935");h.ell(0.055,-0.03,0.04,0.04,"#E53935");
    h.poly([[-0.09,0.0],[0.1,0.0],[0.08,0.03],[-0.07,0.03]],"#E53935",false);
    h.ell(-0.075,0.63,0.028,0.045,"#E53935");
    h.poly([[-0.03,0.5],[-0.21,0.555],[-0.03,0.6]],"#FFC107");h.line([[-0.04,0.55],[-0.19,0.555]],INK,0.01);
  }},
  duck:{name:"Duck",ico:"\u{1F986}",sound:"QUACK",draw(h){
    h.poly([[-0.01,0.495],[-0.16,0.485],[-0.23,0.51],[-0.235,0.555],[-0.17,0.59],[-0.01,0.595]],"#FF9800");
    h.line([[-0.02,0.545],[-0.2,0.54]],INK,0.01);h.ell(-0.18,0.505,0.01,0.007,INK,0,false);
    h.ell(0.0,0.02,0.02,0.05,"#FFFFFF",0.3);
  }},
  cat:{name:"Cat",ico:"\u{1F431}",sound:"MEOW",draw(h){
    h.poly([[-0.17,0.05],[-0.16,-0.11],[-0.05,-0.01]],"#F39C34");h.poly([[-0.145,0.02],[-0.14,-0.065],[-0.085,-0.01]],"#FF9EB8",false);
    h.poly([[0.06,-0.02],[0.17,-0.12],[0.18,0.03]],"#F39C34");h.poly([[0.09,-0.02],[0.155,-0.075],[0.16,0.0]],"#FF9EB8",false);
    h.poly([[-0.125,0.445],[-0.07,0.445],[-0.097,0.49]],"#FF6FA8");
    [[-0.3,0.47],[-0.31,0.53],[-0.29,0.59]].forEach(e=>h.line([[-0.15,0.53],e],INK,0.009));
    [[0.15,0.47],[0.16,0.53],[0.15,0.59]].forEach(e=>h.line([[0.01,0.53],e],INK,0.009));
  }},
  dog:{name:"Dog",ico:"\u{1F436}",sound:"WOOF",draw(h){
    h.poly([[-0.12,0.0],[-0.2,0.02],[-0.25,0.2],[-0.21,0.31],[-0.15,0.23],[-0.13,0.08]],"#8D5A2B");
    h.poly([[0.12,0.0],[0.2,0.03],[0.25,0.2],[0.21,0.31],[0.15,0.21],[0.13,0.08]],"#8D5A2B");
    h.ell(-0.1,0.46,0.048,0.032,INK);h.ell(-0.115,0.45,0.013,0.008,"#FFFFFF",0,false);
    h.poly([[-0.085,0.55],[-0.02,0.55],[-0.02,0.65],[-0.05,0.69],[-0.085,0.65]],"#FF6B9D");h.line([[-0.052,0.56],[-0.052,0.64]],INK,0.008);
  }},
  pig:{name:"Pig",ico:"\u{1F437}",sound:"OINK",draw(h){
    h.poly([[-0.16,0.05],[-0.21,-0.09],[-0.07,-0.01]],"#FFA3C4");h.poly([[0.07,-0.02],[0.2,-0.1],[0.18,0.04]],"#FFA3C4");
    h.ell(-0.1,0.465,0.065,0.048,"#FFA3C4");h.ell(-0.122,0.465,0.012,0.02,"#8A3A5A",0,false);h.ell(-0.078,0.465,0.012,0.02,"#8A3A5A",0,false);
    h.line([[0.28,0.72],[0.31,0.69],[0.34,0.72],[0.31,0.75],[0.3,0.72]],"#FFA3C4",0.018);
  }},
  bunny:{name:"Bunny",ico:"\u{1F430}",sound:"NOM",draw(h){
    const L=[[-0.08,0.0],[-0.13,-0.12],[-0.145,-0.29],[-0.105,-0.33],[-0.06,-0.27],[-0.04,-0.1],[-0.03,-0.01]];
    const Li=[[-0.08,-0.03],[-0.115,-0.13],[-0.12,-0.27],[-0.1,-0.29],[-0.075,-0.25],[-0.06,-0.1]];
    const A=squash(L,.6),B=squash(Li,.6);h.poly(A,"#FAFAFA");h.poly(B,"#FFB3C8",false);
    h.poly(A.map(p=>[p[0]+0.16,p[1]-0.01]),"#FAFAFA");h.poly(B.map(p=>[p[0]+0.16,p[1]-0.01]),"#FFB3C8",false);
    h.poly([[-0.085,0.555],[-0.03,0.555],[-0.03,0.62],[-0.085,0.62]],"#FFFFFF");h.line([[-0.057,0.56],[-0.057,0.615]],INK,0.008);
  }},
  donkey:{name:"Donkey",ico:"\u{1F434}",sound:"HEE HAW",draw(h){
    h.poly(squash([[-0.1,0.02],[-0.19,-0.13],[-0.27,-0.27],[-0.2,-0.23],[-0.12,-0.12],[-0.05,-0.01]],.6),"#9E9E9E");
    h.poly(squash([[0.08,-0.01],[0.18,-0.16],[0.27,-0.28],[0.24,-0.19],[0.17,-0.08],[0.14,0.03]],.6),"#9E9E9E");
    h.poly(squash([[-0.24,-0.25],[-0.27,-0.27],[-0.22,-0.22]],.6),INK,false);h.poly(squash([[0.25,-0.25],[0.27,-0.28],[0.26,-0.22]],.6),INK,false);
    h.poly([[-0.11,0.55],[-0.01,0.55],[-0.01,0.615],[-0.11,0.615]],"#FFFDF2");h.line([[-0.06,0.555],[-0.06,0.61]],INK,0.008);
  }},
  lion:{name:"Lion",ico:"\u{1F981}",sound:"RAWR",draw(h,g,st){
    const pts=[];const n=22;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const r=i%2?0.86:1;pts.push([Math.sin(a)*0.33*r,0.3-Math.cos(a)*0.44*r])}
    const P=(x,y)=>[(0.47+st.x+x*st.s)*N,(0.17+st.y+y*st.s)*N];
    g.beginPath();pts.forEach((p,i)=>{const q=P(p[0],p[1]);i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1])});g.closePath();
    const c=P(0,0.31);g.ellipse(c[0],c[1],0.19*st.s*N,0.34*st.s*N,0,0,Math.PI*2,true);
    g.fillStyle="#E67E22";g.fill("evenodd");g.strokeStyle=INK;g.lineWidth=Math.max(2,0.014*st.s*N);g.stroke();
    h.poly([[-0.125,0.44],[-0.07,0.44],[-0.097,0.485]],"#4E2A12");
  }},
  frog:{name:"Frog",ico:"\u{1F438}",sound:"RIBBIT",draw(h){
    h.ell(-0.08,-0.03,0.075,0.07,"#7ED957");h.ell(0.09,-0.045,0.075,0.07,"#7ED957");
    h.ell(-0.08,-0.035,0.045,0.042,"#FFFFFF");h.ell(0.09,-0.05,0.045,0.042,"#FFFFFF");
    h.ell(-0.09,-0.03,0.02,0.022,INK,0,false);h.ell(0.08,-0.045,0.02,0.022,INK,0,false);
    h.fatline([[-0.07,0.555],[-0.16,0.53],[-0.26,0.52],[-0.34,0.47]],"#FF4D6D",0.022);
    h.ell(-0.36,0.45,0.022,0.02,INK,0,false);h.ell(-0.375,0.43,0.02,0.012,"#DDEEFF",0.5);
  }},
  unicorn:{name:"Unicorn",ico:"\u{1F984}",sound:"NEIGH",draw(h){
    [["#FF6FA8",0.0],["#FFD83D",0.035],["#5AA0DC",0.07]].forEach(r=>h.poly([[0.1+r[1],-0.02],[0.14+r[1],-0.02],[0.2+r[1],0.2],[0.18+r[1],0.36],[0.15+r[1],0.22]],r[0]));
    h.poly([[-0.12,0.04],[-0.1,-0.06],[-0.05,0.0]],"#FAFAFA");
    h.poly([[-0.035,0.03],[0.0,-0.17],[0.035,0.03]],"#FFD54F");
    [[-0.028,0.0,0.028,-0.02],[-0.02,-0.045,0.02,-0.065],[-0.013,-0.09,0.013,-0.11]].forEach(s=>h.line([[s[0],s[1]],[s[2],s[3]]],INK,0.008));
  }}
};

function crisp(g){const d=g.getImageData(0,0,N,N);const a=d.data;for(let i=3;i<a.length;i+=4)a[i]=a[i]>110?255:0;g.putImageData(d,0,0)}

function grassLayer(g,st,n){
  const h=kit(g,st);
  for(let i=0;i<n;i++){const ang=-0.35+i*0.09;const len=0.09+(i%3)*0.025;const x0=-0.05,y0=0.545;
    const x1=x0-Math.cos(ang)*len,y1=y0+Math.sin(ang)*len;h.fatline([[x0,y0],[x1,y1]],i%2?"#3FAE3A":"#58C94F",0.014)}
}

function draw(cv,o){
  return load(o.id).then(img=>{
    const W=cv.width,c=cv.getContext("2d");c.clearRect(0,0,W,W);
    if(img)c.drawImage(img,0,0,W,W);else{c.fillStyle="#5AA0DC";c.fillRect(0,0,W,W)}
    const st=o.st||{x:0,y:0,s:1};
    if(o.animal||o.grass){
      const off=document.createElement("canvas");off.width=off.height=N;const g=off.getContext("2d");
      if(o.grass)grassLayer(g,st,o.grass);
      if(o.animal){const a=ANIMALS[o.animal];a.draw(kit(g,st),g,st)}
      crisp(g);c.imageSmoothingEnabled=false;c.drawImage(off,0,0,W,W);c.imageSmoothingEnabled=true;
    }
    if(o.cap){let size=84;c.font=size+'px "Bagel Fat One", Impact, sans-serif';while(c.measureText(o.cap).width>W*.9&&size>40){size-=6;c.font=size+'px "Bagel Fat One", Impact, sans-serif'}
      c.textAlign="center";c.textBaseline="top";c.lineJoin="round";c.lineWidth=size*.16;c.strokeStyle=INK;c.strokeText(o.cap,W/2,W*.03);c.fillStyle="#fff";c.fillText(o.cap,W/2,W*.03)}
    if(o.mark){const t="@"+HANDLE;c.font='15px "Press Start 2P", monospace';const tw=c.measureText(t).width;const bw=tw+28,bh=40,x=W-bw-18,y=W-bh-18;
      c.fillStyle=INK;c.beginPath();if(c.roundRect)c.roundRect(x,y,bw,bh,10);else c.rect(x,y,bw,bh);c.fill();c.fillStyle="#FFD83D";c.textAlign="left";c.textBaseline="middle";c.fillText(t,x+14,y+bh/2+1)}
  });
}

function fileFrom(cv,name){const url=cv.toDataURL("image/png");const bin=atob(url.split(",")[1]);const u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  return{url,file:(typeof File==="function")?new File([u],name,{type:"image/png"}):null}}
function download(cv,name){const f=fileFrom(cv,name);const a=document.createElement("a");a.href=f.url;a.download=name;document.body.appendChild(a);a.click();a.remove();return f}
function intent(text){return"https://x.com/intent/tweet?text="+encodeURIComponent(text+(SITE?" "+SITE:""))}
function openLink(href){const a=document.createElement("a");a.href=href;a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove()}
function share(cv,name,text){
  const f=fileFrom(cv,name);
  if(f.file&&navigator.canShare&&navigator.canShare({files:[f.file]})){navigator.share({files:[f.file],text:text+(SITE?" "+SITE:"")}).catch(()=>{});return}
  const a=document.createElement("a");a.href=f.url;a.download=name;document.body.appendChild(a);a.click();a.remove();
  toast("Image saved. Attach it to your post on X.");openLink(intent(text));
}

const tuftSVG='<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true"><rect x="2" y="7" width="2" height="7" fill="#3FAE3A"/><rect x="1" y="5" width="2" height="3" fill="#58C94F"/><rect x="5" y="4" width="2" height="10" fill="#58C94F"/><rect x="6" y="2" width="1" height="3" fill="#7EE36F"/><rect x="8" y="6" width="2" height="8" fill="#3FAE3A"/><rect x="9" y="3" width="2" height="4" fill="#58C94F"/><rect x="11" y="8" width="2" height="6" fill="#58C94F"/><rect x="12" y="5" width="2" height="4" fill="#7EE36F"/><rect x="1" y="13" width="14" height="2" fill="#6D4C2F"/></svg>';

function feed(){
  const cv=$("#feedCanvas");if(!cv)return;
  const card=$("#feedCard"),tray=$("#tray"),cnt=$("#grassCount"),bar=$("#grassBar"),react=$("#react"),done=$("#feedDone");
  const lines=["First bite. He paid 3 dollars gas for it.","Second bite. Grass price just doubled.","He tried to sell the grass. No buyers.","He staked the grass. It wilted.","Halfway. He is down 50% on grass.","He bought more grass to average down.","Something is growing on his head. It is not profit.","He said moo. The market dumped.","One more bite. No going back.","He is a cow now. Even that was a loss."];
  let st={id:IDS[Math.floor(Math.random()*IDS.length)],n:0,busy:false};
  const paint=()=>draw(cv,{id:st.id,grass:st.n>=10?0:st.n,animal:st.n>=10?"cow":null,cap:st.n>=10?"MOO":"",mark:st.n>=10});
  paint();
  for(let i=0;i<5;i++){const b=document.createElement("button");b.type="button";b.className="tuft";b.setAttribute("aria-label","Throw grass");b.innerHTML=tuftSVG;b.addEventListener("click",()=>throwGrass(b));tray.appendChild(b)}
  function throwGrass(b){
    if(st.n>=10||st.busy)return;st.busy=true;
    const r=b.getBoundingClientRect(),c=cv.getBoundingClientRect();
    const fl=document.createElement("div");fl.className="flying";fl.innerHTML=tuftSVG;fl.style.left=(r.left+r.width/2-28)+"px";fl.style.top=(r.top+r.height/2-28)+"px";document.body.appendChild(fl);
    const tx=c.left+c.width*.41-(r.left+r.width/2),ty=c.top+c.height*.71-(r.top+r.height/2);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{fl.style.transform="translate("+tx+"px,"+ty+"px) rotate(-200deg) scale(.45)";fl.style.opacity=".2"}));
    setTimeout(()=>{fl.remove();st.n++;st.busy=false;cnt.textContent=st.n;bar.style.width=(st.n*10)+"%";react.textContent=lines[st.n-1];
      card.classList.remove("chew","morph");void card.offsetWidth;
      if(st.n>=10){card.classList.add("morph");setTimeout(paint,500);done.hidden=false;confetti()}else{card.classList.add("chew");paint()}
    },reduce?40:560);
  }
  $("#feedDl").addEventListener("click",()=>{download(cv,"chapri-cow.png");toast("Cow saved.")});
  $("#feedShare").addEventListener("click",()=>share(cv,"chapri-cow.png","I fed a Chapri 10 grass. He turned into a cow and still lost money \u{1F404}\u{1F4C9} @"+HANDLE+" #Chapri"));
  $("#feedAgain").addEventListener("click",()=>{let n;do{n=IDS[Math.floor(Math.random()*IDS.length)]}while(n===st.id);st={id:n,n:0,busy:false};cnt.textContent="0";bar.style.width="0";react.textContent="A new Chapri. Same losing streak.";done.hidden=true;paint()});
}

function zoo(){
  const cv=$("#zooCanvas");if(!cv)return;
  const card=$("#zooCard"),thumbs=$("#thumbs"),an=$("#animals"),size=$("#zSize"),cap=$("#zCap");
  const z={id:751,animal:"cow",st:{x:0,y:0,s:1},cap:"MOO"};
  const paint=mark=>draw(cv,{id:z.id,animal:z.animal,st:z.st,cap:z.cap,mark:!!mark});
  IDS.forEach(id=>{const b=document.createElement("button");b.type="button";b.className="thumb";b.setAttribute("aria-pressed",id===z.id);b.setAttribute("aria-label","Chapri #"+id);
    b.innerHTML='<img src="'+src(id)+'" alt="" loading="lazy">';b.addEventListener("click",()=>{z.id=id;sel(thumbs,b);paint()});thumbs.appendChild(b)});
  Object.keys(ANIMALS).forEach(k=>{const a=ANIMALS[k];const b=document.createElement("button");b.type="button";b.className="animal";b.setAttribute("aria-pressed",k===z.animal);
    b.innerHTML='<span class="ico" aria-hidden="true">'+a.ico+'</span><span>'+a.name+'</span>';
    b.addEventListener("click",()=>{z.animal=k;z.cap=a.sound;cap.value=a.sound;sel(an,b);pop();paint()});an.appendChild(b)});
  function sel(box,b){box.querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",x===b))}
  function pop(){if(reduce)return;card.classList.remove("pop");void card.offsetWidth;card.classList.add("pop")}
  size.addEventListener("input",()=>{z.st.s=size.value/100;paint()});
  cap.addEventListener("input",()=>{z.cap=cap.value.toUpperCase();paint()});
  let drag=null;
  cv.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY};cv.setPointerCapture(e.pointerId);card.style.transform=""});
  cv.addEventListener("pointermove",e=>{const r=cv.getBoundingClientRect();
    if(drag){z.st.x+=(e.clientX-drag.x)/r.width;z.st.y+=(e.clientY-drag.y)/r.height;drag={x:e.clientX,y:e.clientY};paint();return}
    if(!reduce&&e.pointerType==="mouse"){const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform="rotateY("+(x*10)+"deg) rotateX("+(-y*10)+"deg)"}});
  const end=()=>{drag=null};cv.addEventListener("pointerup",end);cv.addEventListener("pointercancel",end);
  card.addEventListener("pointerleave",()=>{card.style.transform=""});
  $("#zReset").addEventListener("click",()=>{z.st.x=0;z.st.y=0;z.st.s=1;size.value=100;paint()});
  $("#zRandom").addEventListener("click",()=>{z.id=IDS[Math.floor(Math.random()*IDS.length)];const ks=Object.keys(ANIMALS);z.animal=ks[Math.floor(Math.random()*ks.length)];z.cap=ANIMALS[z.animal].sound;cap.value=z.cap;
    sel(thumbs,[...thumbs.children][IDS.indexOf(z.id)]);sel(an,[...an.children][ks.indexOf(z.animal)]);[...thumbs.children][IDS.indexOf(z.id)].scrollIntoView({block:"nearest",inline:"center"});pop();paint()});
  const fname=()=>"chapri-"+ANIMALS[z.animal].name.toLowerCase()+"-"+z.id+".png";
  $("#zDl").addEventListener("click",()=>{paint(true).then(()=>{download(cv,fname());toast("Saved. Go post it.");paint()})});
  $("#zShare").addEventListener("click",()=>{paint(true).then(()=>{share(cv,fname(),"My Chapri is now a "+ANIMALS[z.animal].name.toLowerCase()+" "+ANIMALS[z.animal].ico+" @"+HANDLE+" #Chapri");paint()})});
  paint();
  if(document.fonts&&document.fonts.load)Promise.all([document.fonts.load('100px "Bagel Fat One"'),document.fonts.load('15px "Press Start 2P"')]).then(()=>{paint()}).catch(()=>{});
}

const LOSSES=[
["He bought the dip.","It kept dipping for 3 months."],
["He sold at the bottom.","It pumped 400% the next day."],
["He held for 4 years.","Down 92%. Diamond hands, empty wallet."],
["He took profit.","Profit took him. He rebought higher."],
["He set a stop loss.","Hit by 1 cent. Then it mooned."],
["He went long.","Liquidated in 4 minutes."],
["He went short.","Green candles for a week."],
["He hedged both sides.","Both sides lost."],
["He did nothing.","Still lost money. Somehow."],
["He paid gas to cancel.","Cancel failed. Paid gas again."],
["He bridged his funds.","The bridge got bridged."],
["He bought a stablecoin.","It stopped being stable."],
["He farmed an airdrop for 6 months.","Got 3 dollars. Gas was 40."],
["He did his own research.","His research was also wrong."],
["He went to sleep.","Missed the pump. Woke up for the dump."],
["He bought his friend's token.","Lost the money and the friend."],
["He used 1x leverage.","Still got liquidated."],
["He switched to cash.","Inflation ate it."],
["He copied a whale.","The whale was exiting."],
["He finally sold his bags.","They went up the second he sold."],
["He opened the chart.","That was the mistake."],
["He tried to touch grass.","The grass was a rug."],
["He bought the top.","Then bought more at the new top."],
["He waited for confirmation.","Confirmed: rekt."]
];
function loss(){
  const btn=$("#lossBtn");if(!btn)return;
  const card=$("#lossCard"),im=$("#lossImg"),mv=$("#lossMove"),rs=$("#lossResult"),pnl=$("#pnl"),sh=$("#lossShare"),tot=$("#lossTotal");
  let last=-1,typer,count=0;
  btn.addEventListener("click",()=>{
    let k;do{k=Math.floor(Math.random()*LOSSES.length)}while(k===last);last=k;count++;
    card.classList.remove("spin");void card.offsetWidth;card.classList.add("spin","hot");
    setTimeout(()=>{im.src=src(IDS[Math.floor(Math.random()*IDS.length)])},reduce?0:380);
    const p=-(37+Math.floor(Math.random()*62));pnl.textContent=p+"%";tot.textContent=count;
    const m=LOSSES[k][0],r=LOSSES[k][1];clearInterval(typer);mv.textContent=m;rs.textContent="";let i=0;
    if(reduce){rs.textContent=r}else typer=setInterval(()=>{i++;rs.textContent=r.slice(0,i);if(i>=r.length)clearInterval(typer)},24);
    sh.href=intent("\u{1F4C9} Chapri move: "+m+"\nResult: "+r+"\nPnL: "+p+"%\n\n@"+HANDLE+" #Chapri");
    btn.textContent="Try again (lose again)";
  });
}

window.CHAPRI={IDS,HANDLE,src,load,toast,confetti,intent,reduce,LOSSES};
feed();zoo();loss();
})();
