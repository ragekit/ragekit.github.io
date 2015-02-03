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

  var s = document.createElement("div");
  s.className += " shadow";

  var invertS = document.createElement("div");
  invertS.className += " invertShadow";
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
      // cover.style.height = window.innerHeight + "px";
      // cover.style.width = window.innerWidth + "px";
      //
      projects[0].style.top = (window.innerHeight - menuHeightClosed) +
        "px";
      projects[0].style.position = "relative";

      //ya un truc minwidth 1280px
      ulContainer.style.width = (window.innerWidth > 1280 ? window.innerWidth :
        1280) + "px";
      menuUl.style.width = ((window.innerWidth > 1280 ? window.innerWidth :
        1280) + 15) + "px";
      for (var i = 0; i < lis.length; i++) {
        lis[i].style.width = ((window.innerWidth > 1280 ? window.innerWidth :
          1280)) + "px";
      }


      var scrollValue = document.documentElement.scrollTop || document.body
        .scrollTop;
      if (scrollValue > parseInt(projects[0].style.top, 10)) {

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

      showScrollBars();

    } else {
      //hideScrollBars();
      showScrollBars();

    }

    resizeMedia();
  }

  function resizeMedia() {
    for (i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      im.style.height = window.innerHeight - 150 + "px";
    }
  }

  function hideScrollBars() {
    ulContainer.style.height = "auto";
    menuUl.style.height = "auto";
    ulContainer.style.position = "relative";
    if (openedUp) {
      ulContainer.style.top = (-menuUl.offsetHeight - menuHeightClosed) +
        "px ";
    }
  }

  function showScrollBars() {
    ulContainer.style.height = window.innerHeight + "px";
    menuUl.style.height = (window.innerHeight - menuHeightClosed) + "px";

  }

  function scroll() {

    console.log("scroll");
    if (!home) {
      var scrollValue = document.documentElement.scrollTop || document.body
        .scrollTop;
      cover.style.marginTop = -(scrollValue / 2.5) + "px";


      var leftScroll = document.documentElement.scrollLeft || document.body
        .scrollLeft

      if (scrollValue > parseInt(projects[0].style.top, 10)) {



        menuDiv.style.position = "fixed";

        menuDiv.style.left = -leftScroll + "px";
        siteHeader.style.left = -leftScroll + "px";

      } else {
        menuDiv.style.position = "absolute";
        menuDiv.style.left = 0 + "px";
        siteHeader.style.left = -leftScroll + "px";


      }

      menuUl.style.overflowX = "hidden";
      if (scrollValue > parseInt(projects[0].style.top, 10) || scrollValue <=
        0) {
        menuUl.style.overflowY = "scroll";
        //  menuUl.style.width = (window.innerWidth -15) + "px";

      } else {

        menuUl.style.overflowY = "hidden";
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
    console.log("menuscroll");
    if(!openedUp)
    {
      if(((menuUl.scrollHeight - parseInt(menuUl.style.height)) - menuUl.scrollTop) == 0)
        {
          hideShadow();
        }else{
          showShadow();
      }
    }else
    {
       if(menuUl.scrollTop == 0)
        {
          hideShadow();
        }else{
          showShadow();
      }
    }
  }

  function shadow() {
/*
    var menuPos = menuUl.children[0].getBoundingClientRect();

    //console.log("position on screen " + positionOnScreen(menuUl).y);

    var totalScroll = document.body.scrollTop + menuUl.scrollTop;

    //if (menuUl.style.overflowY == "scroll") {
    console.log(menuPos.top)
    s.style.top = window.innerHeight - parseInt((menuPos.top > 100 ?
        menuPos.top :
        menuPos.top + menuUl.scrollTop)) - 50 +
      "px"; // - menuPos.top - 100 + "px";


      invertS.style.top = 0;
    //*/
  }

  function showShadow() {
  /*  console.log(menuUl.scrollHeight);
    if(s.parentNode || invertS.parentNode) return;
    if(openedUp == false)
    {
       if (menuUl.scrollHeight + 100 > window.innerHeight) {
        //s = document.createElement("div");
        //s.className += " shadow";
        s.style.opacity =0;
          menuUl.appendChild(s);
          TweenLite.to(s, .3, {
            opacity : 1,
            overwrite: "all"
          })
         shadow();
      }
    }else
    {
      if (menuUl.scrollHeight + 100 > window.innerHeight) {
        //s = document.createElement("div");
        //s.className += " shadow";
        invertS.style.opacity = 0;
          menuUl.insertBefore(invertS,menuUl.children[0]);
          TweenLite.to(invertS, .3, {
            opacity : 1,
            overwrite: "all"
          })
         shadow();
      }
    }
   */
  }

  function hideShadow() {
  /*  if(s.parentNode)
    {
     TweenLite.to(s, .3, {
            opacity : 0,
            onComplete : function(){
              s.parentNode.removeChild(s);
            },
            overwrite: "all"
      })
    }
    if(invertS.parentNode)
    {
      TweenLite.to(invertS, .3, {
            opacity : 0,
            onComplete : function(){
              invertS.parentNode.removeChild(s);
            },
            overwrite: "all"
      })
    }*/
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
            onComplete: function(it) {
              if (it == lis.length - 1) {
                showShadow();

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
            onComplete: function(it) {
              if (it == lis.length - 1) {
                showShadow();

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
      console.log(callback);
      if (callback) {
        callback();
      }

    }

    hideShadow();

    for (var i = 0; i < lis.length; i++) {
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

  if (!home) {

    //Lightbox

    var imgs = document.getElementsByClassName("media")[0].getElementsByClassName(
      "image");
    for (i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('click', showLB, false);
    }
    lightBoxDiv.addEventListener('click', hideLB, false);

    projectStartHeight = projects[0].offsetHeight;


    menuDiv.style.position = "absolute";

    //NAV

    var prev = document.getElementsByClassName("prevArrow")[0];
    var next = document.getElementsByClassName("nextArrow")[0];

    //Load cover

    var imageObjects = cover.getElementsByTagName("img");

    if (imageObjects.length > 0) {
      var img = new Image();
      img.src = imageObjects[0].src;
      cover.removeChild(imageObjects[0]);
      img.onload = function() {
        cover.style.backgroundImage = "url(" + img.src + ")";
        cover.style.visibility = "hidden";
        TweenLite.to(cover, 1, {
          autoAlpha: 1
        });
        while (cover.firstChild) {
          cover.removeChild(cover.firstChild);
        }
      }
    }


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
  } else {
    //LOAD HOME COVER
    var homeCoverImage = document.getElementById("homeCoverImage");
    if (homeCoverImage) {
      var homeCover = document.getElementById("homeCover");
      var img = new Image();
      img.src = homeCoverImage.src;
      while (homeCover.firstChild) {
        homeCover.removeChild(homeCover.firstChild);
      }
      img.onload = function() {
        homeCover.style.backgroundImage = "url(" + img.src + ")";
        homeCover.style.visibility = "hidden";
        TweenLite.to(homeCover, 1, {
          autoAlpha: .05
        });
      }
    }

  }

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
        console.log(diff, now, lastCall);
        if (diff >= ms) {
            console.log("Call callback!");
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
