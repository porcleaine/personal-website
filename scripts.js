var pages=['home','about','portfolio','contact'];
function go(h){
  if(pages.indexOf(h)<0)h='home';
  pages.forEach(function(p){document.getElementById(p).classList.toggle('on',p===h)});
  document.querySelectorAll('nav a').forEach(function(a){a.classList.toggle('cur',a.getAttribute('href')==='#'+h)});
  window.scrollTo(0,0);
}
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var h=a.getAttribute('href').slice(1);go(h);try{history.replaceState(null,'','#'+h)}catch(x){}})});
go((location.hash||'#home').slice(1));
document.getElementById('popx').onclick=function(){document.getElementById('pop').hidden=true};

// fake live chat n live overlay
var v=1204,f=9998;
setInterval(function(){v=Math.max(900,v+Math.round((Math.random()-.45)*40));document.getElementById('viewers').textContent='👁 '+v.toLocaleString()+' watching'},2500);
setInterval(function(){f++;document.getElementById('fol').textContent='♡ '+f.toLocaleString()+' followers'},4200);
var names=['porcelain','porcelainsdoll','porcelain_dev','totallynotporcelain','doll.porcelain','porcleaine'],
    msgs=['omg we go to the same college','first!!','pls play game rn','hiii','love the colors','just followed ♡','can i commission u?','hi from far away'],ch=document.getElementById('chat');
function chat(){var d=document.createElement('div');d.innerHTML='<b></b> <span></span>';d.firstChild.textContent=names[Math.floor(Math.random()*names.length)]+':';d.lastChild.textContent=msgs[Math.floor(Math.random()*msgs.length)];ch.appendChild(d);while(ch.children.length>6)ch.removeChild(ch.firstChild)}
for(var i=0;i<4;i++)chat();setInterval(chat,2600);

// tamagotchi sect
var S={f:70,m:70,l:70},lock=0,lockT;
try{var sv=JSON.parse(localStorage.getItem('needy'));if(sv&&typeof sv.f==='number')S=sv}catch(e){}
var base=['...######...','..########..','.##########.','.##########.','############','############','############','.##########.','.##.####.##.','..##....##..'];
var FACES={
 normal:{o:[[4,3],[4,8],[6,5],[6,6]]},
 happy:{o:[[4,2],[3,3],[4,4],[4,7],[3,8],[4,9],[6,4],[7,5],[7,6],[6,7]],b:[[5,1],[5,10]]},
 sad:{o:[[4,3],[4,8],[6,5],[6,6],[7,4],[7,7]],t:[[5,3]]},
 eat:{o:[[4,3],[4,8],[6,5],[6,6],[7,5],[7,6]],b:[[5,1],[5,10]]}
};
var COL={'#':'#ffa8d0',o:'#7a3d5c',b:'#ff7fb5',t:'#7fd0f5'};
function draw(name){
  var g=base.map(function(r){return r.split('')}),F=FACES[name];
  ['o','b','t'].forEach(function(k){(F[k]||[]).forEach(function(p){g[p[0]][p[1]]=k})});
  var s='';g.forEach(function(r,y){r.forEach(function(c,x){if(COL[c])s+='<rect x="'+x+'" y="'+y+'" width="1" height="1" fill="'+COL[c]+'"/>'})});
  document.getElementById('pet').innerHTML=s;
}
function hearts(n){var k=Math.ceil(n/20);return '♥'.repeat(k)+'♡'.repeat(5-k)}
var say=document.getElementById('say'),lcd=document.getElementById('lcd');
function render(msg){
  var low=Math.min(S.f,S.m,S.l),mood=lock?lock:(low<30?'sad':((S.f+S.m+S.l)/3>75?'happy':'normal'));
  draw(mood);
  document.getElementById('stats').innerHTML='<span>food</span><span>'+hearts(S.f)+'</span><span>fun</span><span>'+hearts(S.m)+'</span><span>love</span><span>'+hearts(S.l)+'</span>';
  if(msg)say.textContent=msg;
  else if(!lock){say.textContent=low<30?(S.f===low?'i’m so hungry… feed me?':S.m===low?'play with me!! pls':'do u still love me…'):mood==='happy'?'u’re the hashtag best ♡':'hiiiiiiii!'}
  lcd.classList.toggle('eat',lock==='eat');
  try{localStorage.setItem('needy',JSON.stringify(S))}catch(e){}
}
function clamp(n){return Math.max(0,Math.min(100,n))}
function act(k,face,msg){
  if(k==='f')S.f=clamp(S.f+28);if(k==='m'){S.m=clamp(S.m+28);S.f=clamp(S.f-5)}if(k==='l')S.l=clamp(S.l+25);
  lock=face;clearTimeout(lockT);render(msg);lockT=setTimeout(function(){lock=0;render()},1400);
}
document.getElementById('bFeed').onclick=function(){act('f','eat','nom nom nom')};
document.getElementById('bPlay').onclick=function(){act('m','happy','yay!! again!!')};
document.getElementById('bPet').onclick=function(){act('l','happy','hehe ♡ more pls')};
setInterval(function(){S.f=clamp(S.f-1.5);S.m=clamp(S.m-1.2);S.l=clamp(S.l-1);if(!lock)render()},3000);
render();