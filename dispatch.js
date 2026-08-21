/* SANBAR desk scripts — webring + I Agree that unchecks */
(function(){
  var SITES = [
    "http://tylerlofftus.com/",
    "http://shawkatsanbar.com/",
    "http://mikiazohrabian.com/"
  ];

  function pickRing(){
    return SITES[Math.floor(Math.random() * SITES.length)];
  }

  function wireRandom(){
    var nodes = document.querySelectorAll(".ring-rand");
    for(var i=0;i<nodes.length;i++){
      nodes[i].addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = pickRing();
      });
    }
  }

  function uncheckAgree(box){
    setTimeout(function(){ box.checked = false; }, 90);
  }

  function wireAgree(){
    var boxes = document.querySelectorAll(".honk-agree");
    for(var i=0;i<boxes.length;i++){
      boxes[i].addEventListener("click", function(){
        var self = this;
        if(self.checked) uncheckAgree(self);
      });
    }
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){ wireRandom(); wireAgree(); });
  }else{
    wireRandom(); wireAgree();
  }
})();
