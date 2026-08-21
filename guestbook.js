/* SANBAR guestbook — localStorage only. No backend. Honk is the signature. */
(function(){
  var KEY = "sanbar-gb-v1";

  var CANNED = [
    {cls:"cust", who:"verified customer", when:"04/01/1998 2:14am", msg:"I did not request this."},
    {cls:"spam", who:"XXXHOTCLOWNSXXX", when:"??/??/1998 3:33am", msg:"HOT LOCAL CLOWNS IN YOUR AREA want to juggle YOUR objects. Visit www.honkrx.biz for NITE TIME enhancement. This is not a request. This is a dispatch."},
    {cls:"cust", who:"verified customer", when:"11/22/1999 11:02pm", msg:"He was here in under 30 minutes. I never gave him my address."},
    {cls:"spam", who:"WorkFromHomeBalloonz", when:"01/01/2000 12:00am", msg:"MAKE $5000 A WEEK turning dogs into snakes from your garage. No experience. The goat trains you. Click here. (there is no link. that is part of the offer.)"},
    {cls:"cust", who:"verified customer", when:"02/14/2003 6:06pm", msg:"Five stars. The goat is fine."},
    {cls:"spam", who:"VISITOR #1000000", when:"06/06/2006 6:06am", msg:"CONGRATULATION you are the 1,000,000th visitor. Claim your FREE BALLOON by faxing your social security number to HONK-4-U. (do not do this. this is spam. the balloon is still not free.)"},
    {cls:"cust", who:"verified customer", when:"06/06/2006 6:07am", msg:"Please stop."},
    {cls:"cust", who:"verified customer", when:"08/19/2019 4:40pm", msg:"A clown sat down in the studio audience in Glendale. The balloons were already in the rafters. I work in craft services. Nobody called dispatch."},
    {cls:"spam", who:"CheapHonkerPills", when:"09/09/2020 4:20am", msg:"CHEAP VIAGRA CIALIS HONKER PILLS. Buy 2 greasepaint get 1 silent approach FREE. www.totally-real-pharmacy.biz accepts cash only, same as the clown."},
    {cls:"cust", who:"verified customer", when:"03/03/2024 1:12pm", msg:"I opened Screan to buy a game. The clown was already in the cart. Recommended title. I did not add him."},
    {cls:"cust", who:"verified customer", when:"01/01/2026 12:01am", msg:"Please remove my house from your service area. I have asked three times. The fourth time he brought the goat."},
    {cls:"spam", who:"webmaster", when:"always", msg:"(this guestbook is currently 100% spam) (this message is also spam) (the Sign button will not fix this)"}
  ];

  function extras(){
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
    catch(e){ return []; }
  }

  function saveExtra(row){
    var xs = extras();
    xs.push(row);
    localStorage.setItem(KEY, JSON.stringify(xs));
  }

  function esc(s){
    return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function rowHtml(r){
    return "<tr class=\""+esc(r.cls||"you")+"\"><td><div class=\"who\">"+esc(r.who)+"</div><div class=\"when\">"+esc(r.when)+"</div></td><td>"+esc(r.msg)+"</td></tr>";
  }

  function allRows(){
    return CANNED.concat(extras());
  }

  function render(el, limit){
    if(!el) return;
    var rows = allRows();
    if(limit && rows.length > limit){
      rows = rows.slice(rows.length - limit);
    }
    el.innerHTML = rows.map(rowHtml).join("");
  }

  function stampNow(){
    var d = new Date();
    try { return d.toLocaleString(); }
    catch(e){ return d.toString(); }
  }

  function honkLine(){
    var d = new Date();
    var t;
    try { t = d.toLocaleTimeString(); }
    catch(e){ t = d.toTimeString(); }
    return "honked at " + t;
  }

  function sign(){
    var d = new Date();
    saveExtra({
      cls:"you",
      who:"Anonymous Honker",
      when: stampNow(),
      msg: honkLine()
    });
    document.querySelectorAll("[data-gb]").forEach(function(el){
      var lim = el.getAttribute("data-gb-limit");
      render(el, lim ? parseInt(lim,10) : 0);
    });
    var n = document.getElementById("gb-count");
    if(n) n.textContent = String(allRows().length);
  }

  function boot(){
    document.querySelectorAll("[data-gb]").forEach(function(el){
      var lim = el.getAttribute("data-gb-limit");
      render(el, lim ? parseInt(lim,10) : 0);
    });
    var n = document.getElementById("gb-count");
    if(n) n.textContent = String(allRows().length);
    var btns = document.querySelectorAll("[data-gb-sign]");
    for(var i=0;i<btns.length;i++){
      btns[i].addEventListener("click", function(e){
        e.preventDefault();
        sign();
      });
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", boot);
  }else{
    boot();
  }
})();
