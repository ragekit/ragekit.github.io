(function ragekit() {


  var cover = document.getElementsByClassName("cover")[0];
  var menuDiv = document.getElementsByClassName("menu")[0];

  var lis = menuDiv.getElementsByTagName("li");
  lis = Array.prototype.slice.call(lis, 0);
  lastWasScroll = false;

  var openedUp = false;
  var menuUl = menuDiv.getElementsByClassName("menuUl")[0];
  var ulContainer = menuDiv.getElementsByClassName("ulContainer")[0];
  var currentSelected = menuDiv.getElementsByClassName("innerSelected")[0];
  var menuOpened = false;
  var delay = .03;
  var timeAp = .03;
  var lightBoxDiv = document.getElementsByClassName("lightbox")[0];
  var home;
  var pojects, projectHeader, projectStartHeight;
  document.body.style.display = "block";
  var menuHeightClosed = menuDiv.clientHeight;
  var liHeight = 70;

  var s = document.getElementsByClassName("shadow")[0];
  var invertS = document.getElementsByClassName("invertShadow")[0];


  var siteHeader = document.getElementsByTagName("header")[0];

  if (document.getElementsByClassName("home").length > 0) {
    home = true;

  } else {
    home = false;
    projects = document.getElementsByClassName("project");
    projectHeader = projects[0].getElementsByClassName("project-header")[0];
    projectStartHeight = 0;

  }


  for (i = 0; i < lis.length; i++) {
    if (lis[i] == currentSelected) {
      lis.splice(i, 1);
    }
  }



  function resize() {


    if (!home) {
          ulContainer.style.height = window.innerHeight + "px";
    menuUl.style.height = (window.innerHeight - menuHeightClosed) + "px";
      projects[0].style.top = (window.innerHeight - menuHeightClosed -100) +
      "px";
      projects[0].style.position = "relative";
      menuDiv.style.width = document.body.clientWidth -100 + "px";
      var scrollValue = document.documentElement.scrollTop || document.body
      .scrollTop;
      if (scrollValue > parseInt(projects[0].style.top, 10) +100 || scrollValue <=
        0) {
        menuUl.style.overflowY = "scroll";
        //  menuUl.style.width = (window.innerWidth -15) + "px";
        menuUl.style.width = document.body.clientWidth -100+20+ "px";
        menuUl.style.paddingRight = "20px";

      } else {

        menuUl.style.overflowY = "hidden";
        menuUl.style.width = document.body.clientWidth -100+ "px";
        menuUl.style.paddingRight = 0;
        //  menuUl.style.width = (window.innerWidth) + "px";
      }
      if (scrollValue > parseInt(projects[0].style.top, 10)+100) {
        
        menuDiv.style.position = "fixed";
      } else {
        menuDiv.style.position = "absolute";

      }
    }
    if ((lis.length * liHeight) + menuHeightClosed > window.innerHeight) {
      if (menuOpened) {
        if (openedUp) {
          ulContainer.style.position = "relative";

          ulContainer.style.top = -window.innerHeight + "px";
          //menuUl.scrollTop =500000;
        }
      }
    }
    if(menuOpened) shadow();
    resizeMedia();
  }

  function resizeMedia() {
    for (i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      im.style.height = window.innerHeight - 150 + "px";
    }
  }

  function scroll() {

    if (!home) {
      var scrollValue = document.documentElement.scrollTop || document.body
      .scrollTop;

      if(cover !=null)
      {
        cover.style.marginTop = -(scrollValue / 2.5) + "px";

      }


      var leftScroll = document.documentElement.scrollLeft || document.body
      .scrollLeft

      if(cover != null)
      {
        cover.style.left = -leftScroll + 50 + "px";

      }


      if (scrollValue > parseInt(projects[0].style.top, 10)+100) {
        menuDiv.style.position = "fixed";
        menuDiv.style.left = -leftScroll +50 +"px";
        siteHeader.style.left = -leftScroll + "px";

      } else {
        menuDiv.style.position = "absolute";
        menuDiv.style.left = 0;
        siteHeader.style.left = -leftScroll + "px";


      }

      menuUl.style.overflowX = "hidden";

      if (scrollValue > parseInt(projects[0].style.top, 10) +100 || scrollValue <=
        0) {
        menuUl.style.overflowY = "scroll";
        //  menuUl.style.width = (window.innerWidth -15) + "px";
        menuUl.style.width = document.body.clientWidth -100+20+ "px";
        menuUl.style.paddingRight = "20px";

      } else {

        menuUl.style.overflowY = "hidden";
        menuUl.style.width = document.body.clientWidth -100+ "px";
        menuUl.style.paddingRight = 0;
        //  menuUl.style.width = (window.innerWidth) + "px";
      }


      if (menuOpened) {
        shadow();
        var menuPos = projects[0].getBoundingClientRect();

        if (openedUp) {
          if ((menuPos.top + menuHeightClosed / 2) < window.innerHeight / 2) {
            //changeorient down
            menuOut(function() {
              //openMenu(false)
            });
            console.log("menu was up change for down")
          }
        } else {
          if ((menuPos.top + menuHeightClosed / 2) > window.innerHeight / 2) {
            menuOut(function() {
              //openMenu(true)
            });
            console.log("menu was down change for up")
          }
        }
      }
    }
  }

  function menuScroll()
  {
    shadow();

    if(menuUl.scrollTop <= 0)
    {
      hideTopShadow();
    }else{
      showTopShadow();
    }
    if(menuUl.scrollTop >= menuUl.scrollHeight - menuUl.getBoundingClientRect().height)
    {
      hideBottomShadow();
    }else
    {
      showBottomShadow();
    }
  }

  function shadow() {
    var menuPos = projects[0].getBoundingClientRect();
    //console.log("position on screen " + positionOnScreen(menuUl).y);

    var totalScroll = document.body.scrollTop + menuUl.scrollTop;

    //if (menuUl.style.overflowY == "scroll") {
    // s.style.top = window.innerHeight - parseInt((menuPos.top > 100 ?
    //     menuPos.top :
    //     menuPos.top + menuUl.scrollTop)) - 50 +
    //   "px"; // - menuPos.top - 100 + "px";
    if(!openedUp)
    {
      s.style.bottom =(menuPos.top > 0 ? menuPos.top+100 : 100) + "px";
      invertS.style.top = 0 + "px";

    }else
    {
      s.style.bottom = 100 + "px";
    }

    if(openedUp)
    {
      invertS.style.top = (menuPos.top < (window.innerHeight - 100) ? window.innerHeight - 100 - menuPos.top : 0) + "px";

    }
    //console.log(menuPos.top < window.innerHeight);

    //invertS.style.top = (window.innerWidth-menuPos)

    //
  }

  function showShadow() {
  /*  console.log(menuUl.scrollHeight);
    if (menuUl.scrollHeight + 100 > window.innerHeight) {
      // TweenLite.to(s, .3, {
      //   opacity : 1,
      //   overwrite: "all"
      // })
      s.className = "shadow show";
      invertS.className ="invertShadow show";
    }
    shadow();*/
  }
  function hideTopShadow(){
    if(invertS.className.indexOf("show") > -1)
    {
      invertS.className = "invertShadow";

    }

  }

  function showTopShadow(){
  /*if(invertS.className.indexOf("show") == -1)
  {
  invertS.className = "invertShadow show";

}*/
}
function showBottomShadow(){
 /* if(s.className.indexOf("fatShow") == -1)
  {
      s.className = "shadow fatShow";
    }*/
  }

  function hideBottomShadow(){
    if(s.className.indexOf("fatShow")> -1)
    {
      s.className = "shadow";
    }
  }

  function hideShadow() {
    hideTopShadow();
    hideBottomShadow();  
  }

  function menuOver(e) {
    //opendown or up
    if (menuOpened) {
      menuOut();
      menuDiv.removeEventListener('mouseleave', function() {
        menuOut()
      }, false);
    } else {

      var menuPos = currentSelected.getBoundingClientRect();

      if ((menuPos.top + menuHeightClosed / 2) < window.innerHeight / 2) {
        openMenu(false);
      } else {
        openMenu(true);
      }
    }
  }

  function openMenu(up) {
    for (var i = 0; i < lis.length; i++) {
      if (lis[i] != currentSelected) {
        lis[i].getElementsByClassName("background")[0].style.display = "none";
        var ul = lis[i].parentNode;
        lis[i].style.position = "relative";

        lis[i].style.opacity = 0;


        if (up) {
          var index = lis.length - 1 - i;
          lis[index].style.zIndex = 1;
          //  ul.appendChild(lis[i]);
          lis[index].style.top = (menuHeightClosed) + "px";
          TweenLite.to(lis[index], timeAp, {
            opacity: 1,
            delay: delay * i,
            overwrite: "all"
          });
          TweenLite.to(lis[index], timeAp, {
            top: 0,
            delay: delay * i,
            onComplete: function(it,imgurl) {
             //lis[it].getElementsByClassName("background")[0].style.display = "block";
              if (it == lis.length - 1) {
                for (var j = 0; j < lis.length; j++) {
                  lis[j].getElementsByClassName("background")[0].style.display = null;
                };
                showTopShadow();
                shadow();
              }
            },
            onCompleteParams: [i]
          });

        } else {
          lis[i].style.zIndex = 1;
          //ul.appendChild(lis[i]);
          lis[i].style.top = (-menuHeightClosed) + "px";
          TweenLite.to(lis[i], timeAp, {
            opacity: 1,
            delay: delay * i,
            overwrite: "all"
          });

          TweenLite.to(lis[i], timeAp, {
            top: 0,
            delay: delay * i,
            onComplete: function(it,imgurl) {
              //lis[it].getElementsByClassName("background")[0].style.display = "block";
              if (it == lis.length - 1) {
                for (var j = 0; j < lis.length; j++) {
                  lis[j].getElementsByClassName("background")[0].style.display = null;
                };
                showBottomShadow();
                shadow();

              }
            },
            onCompleteParams: [i]
          });
        }
      }

    }

    ulContainer.style.display = "block";
    ulContainer.style.position = "relative";

    if (up) {

      ulContainer.style.top = (-menuUl.offsetHeight - menuHeightClosed) +
      "px";
      menuUl.scrollTop = 500000;
    } else {
      ulContainer.style.top = 0;
      menuUl.scrollTop = 0;
    }
    openedUp = up;
    menuOpened = true;
  }

  function menuOut(callback) {

    function cb() {
      menuOpened = false;
      ulContainer.style.display = "none";
      ulContainer.style.top = 0;
      if (callback) {
        callback();
      }
    }

    hideShadow();

    for (var i = 0; i < lis.length; i++) {
      lis[i].getElementsByClassName("background")[0].style.display = "none";
      if (lis[i] != currentSelected) {
        if (openedUp) {
          TweenLite.to(lis[i], timeAp, {
            opacity: 0,
            delay: delay * (i),
            overwrite: "all"
          });
          if (i == lis.length - 1) {
            TweenLite.to(lis[i], timeAp, {
              top: menuHeightClosed,
              delay: delay * (i),
              onComplete: cb
            });
          } else {
            TweenLite.to(lis[i], timeAp, {
              top: menuHeightClosed,
              delay: delay * (i)
            });
          }
        } else {
          console.log("in");
          TweenLite.to(lis[i], timeAp, {
            opacity: 0,
            delay: delay * (lis.length - 1 - i),
            overwrite: "all"
          });
          if (i == 0) {
            TweenLite.to(lis[i], timeAp, {
              top: -menuHeightClosed,
              delay: delay * (lis.length - 1 - i),
              onComplete: cb
            });
          } else {
            TweenLite.to(lis[i], timeAp, {
              top: -menuHeightClosed,
              delay: delay * (lis.length - 1 - i)
            });
          }
        }
      }
    }
  }

  function showLB(e) {

    //  var copy = e.target.cloneNode(true);

    //  lightBoxDiv.appendChild(copy);
    lightBoxDiv.style.display = "inline";
    lightBoxDiv.style.backgroundImage = e.target.style.backgroundImage;
  }

  function hideLB(e) {
    lightBoxDiv.innerHTML = "";
    lightBoxDiv.style.display = "none";
  }

    //Lightbox
    var media = document.getElementsByClassName("media");
     var imgs
    if(media.length >0)
    {
      imgs = media[0].getElementsByClassName(
        "image");
      for (i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', showLB, false);
      }
      lightBoxDiv.addEventListener('click', hideLB, false);
    }else
    {
      imgs = [];
    }
  

    projectStartHeight = projects[0].offsetHeight;


    menuDiv.style.position = "absolute";

    //NAV

    var prev = document.getElementsByClassName("prevArrow")[0];
    var next = document.getElementsByClassName("nextArrow")[0];

    //Load cover
    if(cover != null)
    {
      var imageObjects = cover.getElementsByTagName("img");

    if (imageObjects.length > 0) {
      var img = new Image();
      img.src = imageObjects[0].src;
      cover.removeChild(imageObjects[0]);
      /*if(img.complete || img.width+img.height > 0)
      {
        console.log("cover in cache");
        cover.style.backgroundImage = "url(" + img.src + ")";
        while (cover.firstChild) {
          cover.removeChild(cover.firstChild);
        }
      }else{*/

        img.onload = function() {
          cover.style.backgroundImage = "url(" + img.src + ")";
          cover.style.visibility = "hidden";
          TweenLite.to(cover, .3, {
            autoAlpha: 1
          });
          while (cover.firstChild) {
            cover.removeChild(cover.firstChild);
          }

        }
      //}

    }
    }
    

    var liBackground = menuUl.getElementsByTagName("img");
    liBackground = Array.prototype.slice.call(liBackground, 0);

    for (var i = 0; i < liBackground.length; i++){
      console.log(liBackground[i].src);
      var parent = liBackground[i].parentNode;
      var im = new Image();
      parent.style.display = "none";
      im.onload = (function(i) {
        parent.style.backgroundImage = "url(" + liBackground[i].src + ")";
        
        while (parent.firstChild) {
          console.log("in");
          parent.removeChild(parent.firstChild);
        }
        TweenLite.to(parent, .3, {
          autoAlpha: 1
        });
      })(i)
      
      im.src = liBackground[i].src;

    }

    //menu

    var actuallis = lis;

    for (var i = 0; i < actuallis.length; i++) {

      (function(i){
        actuallis[i].onmouseover = function(){
          console.log(i);
          actuallis[i].parentNode.style.backgroundImage = actuallis[i].getElementsByClassName("background")[0].style.backgroundImage;
        }
      })(i);
    };

    //KEYBOARD NAV

    document.addEventListener('keydown', function(e) {
      console.log(e.keyCode);
      if (e.keyCode == "27") {
        e.preventDefault();

        menuOut();
      }
      if (e.keyCode == "32") {
        e.preventDefault();

        menuOver();
      }

      if (e.keyCode == "37") {
        prev.click();
      }

      if (e.keyCode == "39") {
        next.click();
      }
    })
  //MENU

  document.addEventListener('mousemove', function() {
    if (lastWasScroll) {
      lastWasScroll = false;
    }
  }, false)
  currentSelected.addEventListener('click', function(e) {
    menuOver(e)
  }, false);


  // SCROLLEVENT
  function waitForPause(ms, callback) {
    var timer;

    return function() {
      var self = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        callback.apply(self, args);
      }, ms);
    };
  }
  function throttle(ms, callback) {
    var timer, lastCall=0;

    return function() {
      var now = new Date().getTime(),
      diff = now - lastCall;
      //console.log(diff, now, lastCall);
      if (diff >= ms) {
        //console.log("Call callback!");
        lastCall = now;
        callback.apply(this, arguments);
      }

    };
  }

  menuUl.onscroll = throttle(0,menuScroll);
  window.onscroll = throttle(0,scroll);
  window.onresize = resize;

  resize();


})()
