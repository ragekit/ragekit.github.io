(function ragekit() {

  var projects = document.getElementsByClassName("project");
  var projectHeader = projects[0].getElementsByClassName("project-header")[0];
  var cover = document.getElementsByClassName("cover")[0];
  var projectStartHeight = 0;
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
  var lightBoxDiv = document.getElementsByClassName("lightbox")[0];

  for (i = 0; i < lis.length; i++) {
    if (lis[i] == currentSelected) {
      lis.splice(i, 1);
    }
  }

  console.log(lis.length);

  function resize() {
    // cover.style.height = window.innerHeight + "px";
    // cover.style.width = window.innerWidth + "px";
    //
    projects[0].style.top = (window.innerHeight - 150) +
      "px";
    projects[0].style.position = "relative";

    if(menuOpened){
      if (openedUp) {
        ulContainer.style.position="relative";

        ulContainer.style.top = (-menuDiv.offsetHeight+150) +"px";
        //menuUl.scrollTop =500000;
      }
    }

    ulContainer.style.height = window.innerHeight + "px";
    menuUl.style.height = (window.innerHeight-150) + "px";

    // projects[0].style.height = (window.innerHeight > projectStartHeight + 100 ?
    //   window.innerHeight : projectStartHeight + 100) + "px";
    console.log(projects[0].style.height);
    console.log(window.innerHeight);



    projects[0].style.width = (window.innerWidth - 100) + "px";
    menuUl.style.width = (window.innerWidth - 100 + 15) + "px";

    menuDiv.style.width = (window.innerWidth - 100) + "px";
  }

  function scroll() {

    var scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollValue > parseInt(projects[0].style.top, 10)) {

      menuDiv.style.position = "fixed";
    } else {
      menuDiv.style.position = "absolute";

    }



    if(menuOpened){
      if (scrollValue > parseInt(projects[0].style.top, 10) || scrollValue <=0)
      {
        menuUl.style.overflowY="scroll";
      }else
        {
          menuUl.style.overflowY="hidden";

        }

      var menuPos = projects[0].getBoundingClientRect();

      if(openedUp)
        {
          if ((menuPos.top + 75) < window.innerHeight / 2) {
            //changeorient down
            menuOut(function(){openMenu(false)});
            console.log("menu was up change for down")
          }
        }
      else
        {
          if ((menuPos.top + 75) > window.innerHeight / 2) {
            menuOut(function(){openMenu(true)});
            console.log("menu was down change for up")
          }
        }

    }
  }

  function menuOver(e) {
    //opendown or up
    if (menuOpened) {
      menuOut();
      menuDiv.removeEventListener('mouseleave', function(){menuOut()}, false);
    }else{
      var menuPos = projects[0].getBoundingClientRect();
      if ((menuPos.top + 75) < window.innerHeight / 2) {
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

    if (up) {
      ulContainer.style.position="relative";

      ulContainer.style.top = (-menuDiv.offsetHeight + 150) +"px";
      menuUl.scrollTop =500000;
    }
    openedUp = up;
    menuOpened = true;

    scroll();

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

  function showLB(e) {

    //  var copy = e.target.cloneNode(true);

    //  lightBoxDiv.appendChild(copy);
    lightBoxDiv.style.display = "inline";
    lightBoxDiv.style.backgroundImage = "url('" + e.target.getAttribute("src") +
      "')"


  }

  function hideLB(e) {
    lightBoxDiv.innerHTML = "";
    lightBoxDiv.style.display = "none";
  }


  var imgs = document.getElementsByClassName("mainText")[0].getElementsByTagName(
    "img");
  for (i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', showLB, false);
  }
  lightBoxDiv.addEventListener('click', hideLB, false);
  document.addEventListener('mousemove', function() {
    if (lastWasScroll)
      lastWasScroll = false;
  }, false)
  currentSelected.addEventListener('click', function(e) {
    menuOver(e)
  }, false);

  window.onresize = resize;
  projectStartHeight = projects[0].offsetHeight;
  resize();

  menuDiv.style.position = "absolute";
  window.onscroll = scroll;


  var prev = document.getElementsByClassName("prevArrow")[0];
  var next = document.getElementsByClassName("nextArrow")[0];

  document.addEventListener('keydown',function(e){
    console.log(e.keyCode);
    if(e.keyCode =="27"){
      e.preventDefault();

      menuOut();
    }
    if(e.keyCode == "32")
      {
        e.preventDefault();

        menuOver();
      }

      if(e.keyCode == "37"){
          prev.click();
      }

      if(e.keyCode =="39"){
          next.click();
      }
  })

})()
