(function ragekit() {

  var menuDiv = document.getElementsByClassName("menu")[0];
  var mainMenu = document.getElementsByClassName("mainMenu")[0];

  var lis = menuDiv.getElementsByTagName("li");
  lis = Array.prototype.slice.call(lis, 0);
  lastWasScroll = false;


  var openedUp = false;
  var menuUl =  menuDiv.getElementsByClassName("menuUl")[0];
  var ulContainer =  menuDiv.getElementsByClassName("ulContainer")[0];
  var currentSelected = menuDiv.getElementsByClassName("innerSelected")[0];
  var menuOpened = false;
  var delay = .03;
  var timeAp = .03;

  for (i = 0; i < lis.length; i++) {
    if (lis[i] == currentSelected) {
      lis.splice(i, 1);
    }
  }

  function resize() {
      // cover.style.height = window.innerHeight + "px";
      // cover.style.width = window.innerWidth + "px";
      //
      ulContainer.style.height = window.innerHeight + "px";
      menuUl.style.height = (window.innerHeight-150) + "px";
      menuUl.style.width = (window.innerWidth + 15) + "px";
  }

  function menuOver(e) {
    //opendown or up
    if (menuOpened) {
      menuOut();
    }else{

    openMenu(false);
  }
  }

  function openMenu(up) {
    for (var i = 0; i < lis.length; i++) {
      if (lis[i] != currentSelected) {
        var ul = lis[i].parentNode;
        lis[i].style.position = "relative";

        lis[i].style.opacity = 0;


        if (up) {

          if(i>0){
            ul.insertBefore(lis[i], lis[i-1]);
          }
        else
          {
            ul.appendChild(lis[i]);
          }
          lis[i].style.top = (150) + "px";
          lis[i].style.zIndex = +1;
          TweenLite.to(lis[i], timeAp, {
            opacity: 1,
            delay: delay * (i),
            overwrite: "all"
          });
          TweenLite.to(lis[i], timeAp, {
            top: 0,
            delay: delay * (i)
          });
        } else {
          lis[i].style.zIndex = 1;
          ul.appendChild(lis[i]);
          lis[i].style.top = (-150) + "px";
          TweenLite.to(lis[i], timeAp, {
            opacity: 1,
            delay: delay * i,
            overwrite: "all"
          });
          TweenLite.to(lis[i], timeAp, {
            top: 0,
            delay: delay * i
          });
        }
      }
    }

    ulContainer.style.display ="block";

    openedUp = up;
    menuOpened = true;
  }

  function menuOut(callback) {

    console.log(lis.length);
    function cb() {
      menuOpened = false;
      ulContainer.style.display = "none";
      ulContainer.style.top =0;
      console.log(callback);
      if(callback)
        {
          callback();
        }

    }

    for (var i = 0; i < lis.length; i++) {
      if (lis[i] != currentSelected) {
        if (openedUp) {
          TweenLite.to(lis[i], timeAp, {
            opacity: 0,
            delay: delay * (lis.length - 1-i),
            overwrite: "all"
          });
          if (i == 0) {
            TweenLite.to(lis[i], timeAp, {
              top: 150,
              delay: delay * (lis.length - 1-i),
              onComplete: cb
            });
          } else {
            TweenLite.to(lis[i], timeAp, {
              top: 150,
              delay: delay * (lis.length - 1-i)
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
              top: -150,
              delay: delay * (lis.length - 1 - i),
              onComplete: cb
            });
          } else {
            TweenLite.to(lis[i], timeAp, {
              top: -150,
              delay: delay * (lis.length - 1 - i)
            });
          }
        }
      }
    }
  }

  currentSelected.addEventListener('click', function(e) {
    menuOver(e)
  }, false);

resize();

})()
