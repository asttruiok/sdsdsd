(function(){
const CFG=Object.assign({x:"CHAPRINFT_",post:"",s:""},window.CHAPRI_CONFIG||{});
const C=window.CHAPRI;
const IDS=C.IDS,src=C.src,reduce=C.reduce;
const $=s=>document.querySelector(s);
const store={get(){try{return JSON.parse(localStorage.getItem("chapri_wl")||"{}")}catch(e){return{}}},set(v){try{localStorage.setItem("chapri_wl",JSON.stringify(v))}catch(e){}}};

const words=["FREE MINT","BUY HIGH","SELL LOW","STILL DOWN","HOLD = DUMP","FREE MINT","SELL = PUMP","3,000 SUPPLY","ROBINHOOD CHAIN","REKT AGAIN","FREE MINT","GM (DOWN 90%)","WAGMI (NOT HIM)"];
document.querySelectorAll("[data-mq]").forEach(el=>{const k=+el.dataset.mq;const list=words.slice(k).concat(words.slice(0,k));const html=list.map(w=>"<span>"+w+"</span>").join("");el.innerHTML=html+html});

const bubbleLines=["gm. bought the top again.","I sold. it pumped.","I held. it dumped.","I took profit. profit took me.","stop loss hit by 1 cent. then moon.","I did nothing. still lost money.","free mint? finally something I cannot lose on.","new plan: do the opposite. also lost.","portfolio says gn.","I bought the dip. the dip bought me."];
const bub=$("#heroBubble"),hImg=$("#heroImg"),hPnl=$("#heroPnl");let bi=0;
const heroIds=[751,1,1501,758,2,1507,760,3,1510];
function heroNext(){bi=(bi+1)%bubbleLines.length;bub.classList.add("swap");hImg.classList.remove("squish");void hImg.offsetWidth;hImg.classList.add("squish");
  setTimeout(()=>{bub.textContent=bubbleLines[bi];hImg.src=src(heroIds[bi%heroIds.length]);hPnl.textContent="PnL: -"+(40+Math.floor(Math.random()*59))+"%";bub.classList.remove("swap")},260)}
if(bub&&hImg){let iv=setInterval(()=>{if(!document.hidden)heroNext()},3600);
  $("#heroTap").addEventListener("click",()=>{clearInterval(iv);heroNext();iv=setInterval(()=>{if(!document.hidden)heroNext()},3600)})}

const gal=$("#gal");
if(gal){const pick=IDS.slice().sort(()=>Math.random()-.5).slice(0,20);const R=C.LOSSES.slice().sort(()=>Math.random()-.5);
  pick.forEach((id,k)=>{const b=document.createElement("button");b.className="card";b.type="button";b.setAttribute("aria-label","Chapri #"+id+", tap to flip");
    b.innerHTML='<div class="face front"><img src="'+src(id)+'" alt="Chapri #'+id+'" loading="lazy"><span><b>CHAPRI</b><b>#'+id+'</b></span></div><div class="face back"><span class="tag pixel">#'+id+' tried</span><q>'+R[k%R.length][0]+' '+R[k%R.length][1]+'</q><span class="pixel">Tap to flip back</span></div>';
    b.addEventListener("click",()=>{b.style.transform="";b.classList.toggle("flip")});
    if(!reduce){b.addEventListener("pointermove",e=>{if(b.classList.contains("flip")||e.pointerType!=="mouse")return;const r=b.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;b.style.transform="rotateY("+(x*22)+"deg) rotateX("+(-y*22)+"deg) scale(1.04)"});
      b.addEventListener("pointerleave",()=>{if(!b.classList.contains("flip"))b.style.transform=""})}
    gal.appendChild(b)})}

const handle=CFG.x.replace(/^@/,"");
const postId=(CFG.post.match(/status\/(\d+)/)||[])[1]||"";
const prof="https://x.com/"+encodeURIComponent(handle);
if($("#panel")){
$("#followBtn").href="https://x.com/intent/follow?screen_name="+encodeURIComponent(handle);
if(postId){
  $("#likeBtn").href="https://x.com/intent/like?tweet_id="+postId;
  $("#rtBtn").href="https://x.com/intent/retweet?tweet_id="+postId;
  $("#cmBtn").href="https://x.com/intent/tweet?in_reply_to="+postId;
}else{
  ["#likeBtn","#rtBtn","#cmBtn"].forEach(s=>{$(s).href=prof});
  $("#lrSub").textContent="Open our pinned post on X. Like it and repost it. Both are required.";
}
$("#shareBtn").href=C.intent("I just joined the Chapri free mint whitelist. First move in years that was not a loss \u{1F404} @"+handle+" #Chapri");

let st=store.get();
const TOTAL=5;
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function render(){
  const step=st.done?6:(st.step||1);
  document.querySelectorAll(".task").forEach(t=>{const n=+t.dataset.step;t.classList.toggle("done",n<step);t.classList.toggle("active",n===step);t.classList.toggle("locked",n>step)});
  if(st.user)$("#userDone").textContent="Saved as @"+st.user+".";
  const lv=Math.min(step-1,TOTAL);$("#lvlBar").style.width=(lv/TOTAL*100)+"%";$("#lvlText").textContent="Chapri level "+lv+"/"+TOTAL;
  const fin=!!st.done;$("#tasks").hidden=fin;$("#success").hidden=!fin;
  if(fin)$("#summary").innerHTML="<b>X:</b> @"+esc(st.user)+"<br><b>Wallet:</b> "+esc(st.wallet);
}
function go(n){st.step=n;store.set(st);render();const el=document.querySelector('.task[data-step="'+n+'"]');if(el)el.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"})}

$("#followBtn").addEventListener("click",()=>{let s=6;const w=$("#followWait");w.textContent="Checking your follow... "+s;const iv=setInterval(()=>{s--;if(s>0){w.textContent="Checking your follow... "+s}else{clearInterval(iv);w.textContent="Looks good. Continue when you are done.";$("#followOk").disabled=false;st.clickedFollow=true;store.set(st)}},1000)});
if(st.clickedFollow)$("#followOk").disabled=false;
$("#followOk").addEventListener("click",()=>{st.follow=true;go(2)});

$("#userForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#xuser").value.trim().replace(/^@/,"");
  if(!/^[A-Za-z0-9_]{1,15}$/.test(v)){$("#userErr").textContent="Enter a real X username: letters, numbers or underscore, up to 15 characters.";return}
  if(v.toLowerCase()===handle.toLowerCase()){$("#userErr").textContent="That is our account. Enter your own username.";return}
  $("#userErr").textContent="";st.user=v;go(3)});

const lr={like:false,rt:false};
function lrUpdate(){const both=lr.like&&lr.rt;$("#lrCheck").disabled=!both;$("#lrOk").disabled=!(both&&$("#lrCheck").checked);if(both)$("#lrErr").textContent=""}
$("#likeBtn").addEventListener("click",()=>{setTimeout(()=>{lr.like=true;$("#likeBtn").textContent="Liked ✓";lrUpdate()},2500)});
$("#rtBtn").addEventListener("click",()=>{setTimeout(()=>{lr.rt=true;$("#rtBtn").textContent="Reposted ✓";lrUpdate()},2500)});
$("#lrCheck").addEventListener("change",lrUpdate);
$("#lrOk").addEventListener("click",()=>{if(!(lr.like&&lr.rt&&$("#lrCheck").checked)){$("#lrErr").textContent="Like and repost the post first.";return}st.likeRepost=true;go(4)});

let cmClicked=!!st.cmClicked;
$("#cmBtn").addEventListener("click",()=>{cmClicked=true;st.cmClicked=true;store.set(st)});
$("#cmForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#cmLink").value.trim();const err=$("#cmErr");
  const m=v.match(/^https?:\/\/(?:www\.|mobile\.)?(?:x|twitter)\.com\/([A-Za-z0-9_]{1,15})\/status\/(\d{8,25})(?:[\/?#].*)?$/i);
  if(!cmClicked){err.textContent="Tap Comment on X first and post your comment.";return}
  if(!m){err.textContent="That is not a valid comment link. It should look like https://x.com/yourname/status/123...";return}
  if(m[1].toLowerCase()!==String(st.user||"").toLowerCase()){err.textContent="This comment is not from @"+st.user+". Paste the link to your own comment.";return}
  if(postId&&m[2]===postId){err.textContent="That is the main post link. Paste the link to your comment.";return}
  err.textContent="";st.comment="https://x.com/"+m[1]+"/status/"+m[2];go(5)});

function endpoint(){try{return CFG.s?atob(CFG.s):""}catch(e){return""}}
$("#walletForm").addEventListener("submit",async e=>{e.preventDefault();const v=$("#wallet").value.trim();const err=$("#walletErr"),btn=$("#walletBtn");
  if(!/^0x[a-fA-F0-9]{40}$/.test(v)||/^0x0{40}$/.test(v)){err.textContent="Enter a valid EVM address: 0x followed by 40 letters or numbers.";return}
  if(!(st.follow&&st.user&&st.likeRepost&&st.comment)){err.textContent="Finish the tasks above first.";return}
  const url=endpoint();
  if(!url){err.textContent="Submissions are not open yet. Check @"+handle+" on X.";return}
  err.textContent="";btn.disabled=true;btn.textContent="Submitting...";
  const reset=()=>{btn.disabled=false;btn.textContent="Submit and join Chapri"};
  try{
    if(url){const r=await fetch(url,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({username:st.user,follow:"Yes",likeRepost:"Yes",comment:st.comment,wallet:v})});const j=await r.json();
      if(!j.ok){const map={USERNAME_TAKEN:"This X username is already on the whitelist.",WALLET_TAKEN:"This wallet is already on the whitelist.",LINK_TAKEN:"This comment link was already used.",BAD_INPUT:"Something in your details is not valid. Check and try again."};err.textContent=map[j.error]||"Could not submit. Try again in a moment.";reset();return}}
    st.wallet=v;st.done=true;store.set(st);render();C.confetti();$("#panel").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
  }catch(x){err.textContent="Network error. Check your connection and try again.";reset()}
});

render();
}

function scrollToId(id,smooth){if(id==="home"||id===""){window.scrollTo({top:0,behavior:smooth&&!reduce?"smooth":"auto"});return}
  const t=document.getElementById(id);if(t)t.scrollIntoView({behavior:smooth&&!reduce?"smooth":"auto"})}
document.addEventListener("click",e=>{const l=e.target.closest('a[href^="#"]');if(!l)return;e.preventDefault();scrollToId(l.getAttribute("href").slice(1),true)});
function cleanHash(){if(!location.hash)return;const h=location.hash.slice(1);
  if(h==="whitelist"&&!$("#panel")){location.replace("whitelist/");return}
  history.replaceState(null,"",location.pathname+location.search);if($("#home-view"))setTimeout(()=>scrollToId(h,false),60)}
cleanHash();window.addEventListener("hashchange",cleanHash);
})();
