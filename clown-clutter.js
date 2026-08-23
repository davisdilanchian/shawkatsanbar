/* GEOCITIES CLOWN CLUTTER — random GIF file + position each load.
   Density stays near the post-cut homepage: a bottom strip, a handful
   of edge-parked GIFs, and one mover of each type. Clicks pass through. */
(function(){
  var POOL = [
    "assets/gifs/ani-clown.gif",
    "assets/gifs/ani-clown2.gif",
    "assets/gifs/balloon-confetti.gif",
    "assets/gifs/balloon-float.gif",
    "assets/gifs/carousel-spin.gif",
    "assets/gifs/carousel.gif",
    "assets/gifs/circus-acrobat.gif",
    "assets/gifs/circus-bear.gif",
    "assets/gifs/circus-kids.gif",
    "assets/gifs/clown-anim.gif",
    "assets/gifs/clown-big.gif",
    "assets/gifs/clown-home.gif",
    "assets/gifs/clown-juggle-sm.gif",
    "assets/gifs/clown-juggling.gif",
    "assets/gifs/clown-tiny.gif",
    "assets/gifs/crazy-clown.gif",
    "assets/gifs/jester.gif",
    "assets/gifs/juggling-bear.gif",
    "assets/gifs/karnival-calliope.gif",
    "assets/gifs/karnival-clown.gif",
    "assets/gifs/karnival-ferris.gif",
    "assets/gifs/karnival-juggler.gif"
  ];

  /* black-bg 90s clips that look right screened over navy */
  var KNOCK = {
    "ani-clown.gif":1,
    "ani-clown2.gif":1,
    "crazy-clown.gif":1,
    "jester.gif":1
  };

  var TILE = [
    "assets/gifs/karnival-clown.gif",
    "assets/gifs/karnival-juggler.gif",
    "assets/gifs/karnival-ferris.gif",
    "assets/gifs/karnival-calliope.gif"
  ];

  /* Edge-ish parking spots so headings / nav / desk copy stay readable.
     Values are percent ranges [min,max] for top and left. */
  var ZONES = [
    {t:[3,16],  l:[0,8]},
    {t:[3,16],  l:[88,96]},
    {t:[74,88], l:[0,10]},
    {t:[74,88], l:[86,96]},
    {t:[30,58], l:[0,5]},
    {t:[30,58], l:[91,97]},
    {t:[10,20], l:[12,22]},
    {t:[10,20], l:[76,86]}
  ];

  var MOVERS_HOME = ["gc-marquee","gc-bounce","gc-wander","gc-spin","gc-float"];
  var MOVERS_INNER = ["gc-wander","gc-float","gc-bounce","gc-spin"];

  function rand(n){ return Math.floor(Math.random()*n); }
  function between(a,b){ return a + Math.random()*(b-a); }
  function pct(a,b){ return between(a,b).toFixed(1) + "%"; }
  function shuffle(a){
    for(var i=a.length-1;i>0;i--){
      var j=rand(i+1), t=a[i]; a[i]=a[j]; a[j]=t;
    }
    return a;
  }
  function fileOf(src){ return src.split("/").pop(); }
  function knock(src){ return KNOCK[fileOf(src)] ? " gc-knock" : ""; }

  function isHome(){
    var p = (location.pathname || "/").replace(/\/+$/, "") || "/";
    return p === "/" || /\/index\.html$/i.test(p);
  }

  function take(deck){
    if(!deck.length) deck.push.apply(deck, shuffle(POOL.slice()));
    return deck.shift();
  }

  function mk(src, extra){
    var el = document.createElement("img");
    el.className = "gc " + extra + knock(src);
    el.src = src;
    el.alt = "";
    return el;
  }

  function parkScatter(el, zone){
    el.style.top = pct(zone.t[0], zone.t[1]);
    el.style.left = pct(zone.l[0], zone.l[1]);
    el.style.width = (58 + rand(46)) + "px";
  }

  function parkMover(el, kind){
    el.style.width = (50 + rand(40)) + "px";
    if(kind === "gc-marquee"){
      el.style.top = (70 + rand(90)) + "px";
      el.style.left = "0";
    }else if(kind === "gc-bounce"){
      el.style.top = (120 + rand(240)) + "px";
      if(Math.random() < 0.5){
        el.style.left = "auto";
        el.style.right = (3 + rand(16)) + "px";
      }else{
        el.style.left = (3 + rand(16)) + "px";
      }
    }else if(kind === "gc-wander"){
      el.style.top = (6 + rand(48)) + "%";
      el.style.left = (3 + rand(72)) + "%";
    }else if(kind === "gc-spin"){
      el.style.top = (18 + rand(52)) + "%";
      el.style.left = (10 + rand(72)) + "%";
      el.style.marginLeft = "0";
    }else if(kind === "gc-float"){
      el.style.top = (18 + rand(58)) + "%";
      el.style.left = (6 + rand(78)) + "%";
    }
  }

  function boot(){
    var root = document.getElementById("clown-clutter");
    if(!root) return;
    root.innerHTML = "";

    var deck = shuffle(POOL.slice());
    var home = isHome();

    var tiles = shuffle(TILE.slice());
    var bar = document.createElement("div");
    bar.className = "gc-tilebar";
    bar.style.backgroundImage = "url(\""+tiles[0]+"\"),url(\""+tiles[1]+"\"),url(\""+tiles[2]+"\")";
    root.appendChild(bar);

    var nScatter = home ? 4 : (2 + rand(2));
    var zones = shuffle(ZONES.slice());
    var i;
    for(i=0;i<nScatter && i<zones.length;i++){
      var s = mk(take(deck), "gc-scatter");
      parkScatter(s, zones[i]);
      root.appendChild(s);
    }

    var movers = home ? MOVERS_HOME.slice() : shuffle(MOVERS_INNER.slice()).slice(0, 2);
    for(i=0;i<movers.length;i++){
      var kind = movers[i];
      var m = mk(take(deck), kind);
      parkMover(m, kind);
      root.appendChild(m);
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  }else{
    boot();
  }
})();
