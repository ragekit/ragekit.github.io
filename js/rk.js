(function rk() {
  var canvas = document.getElementsByClassName("logo")[0];
  canvas.width = 100;
  canvas.height = 100;
  var ctx = canvas.getContext("2d");
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  var rkIndexes = [0, 2, 1, 3, 3, 5, 4, 8, 4, 6];

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }


  Point.prototype.isEqual = function(p) {
    if (this.x == p.x && this.y == p.y) return true;
    return false
  }

  function Line(a, b) {
    this.alpha = 255;
    this.a = a;
    this.b = b;
  }

  Line.prototype.isEqual = function(l) {
    if (this.a.isEqual(l.a) && this.b.isEqual(l.b)) return true;
    return false;
  }

  Line.prototype.coeff = function() {
    if (this.a.y == this.b.y) return 0;
    if (this.a.x == this.b.x) return 10000;
    return (this.a.y - this.b.y) / (this.a.x - this.b.x);
  }

  Line.prototype.orig = function() {
    var c = this.coeff();
    if (c == 0) return this.a.y;
    if (c == 10000) return 10000;

    return this.a.y - c * this.a.x;

  }

function existIn(al, l)
{
  for(i =0;i<al.length;i++)
  {
    l2 = al[i];
    if(l2.isEqual(l)) return true;
  }
  return false;
}

function overlapWithLineIn(al, l)
{
  for(i =0;i<al.length;i++)
  {
    l2 = al[i];
    if(l2.coeff() == l.coeff() && l.orig() == l2.orig()) return true;
  }
  return false;
}




  function Grid(sizeX, sizeY, nbX, nbY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.nbX = nbX;
    this.nbY = nbY;
    this.lineWidth = 6;

    this.offset = 10;

    this.points = [];
    this.color = "#333";
    this.links = [];
    for (i = 0; i < this.nbX; i++) {
      for (j = 0; j < this.nbY; j++) {
        this.points.push(new Point(i, j));
      }

    }
    console.log(this.points);
  }

  Grid.prototype.randomPoint = function() {
    return this.points[Math.floor(Math.random() * this.points.length)];
  }

  Grid.prototype.randomLine = function() {

    var indexCopies = [];
    for(i = 0;i<this.points.length;i++){ indexCopies[i] = i;}

    var firstIndex = indexCopies.splice(Math.floor(Math.random() * indexCopies.length),1);
    var secondIndex = indexCopies.splice(Math.floor(Math.random() * indexCopies.length),1);

    var first = this.points[firstIndex];
    var second = this.points[secondIndex];

    return new Line(first, second);
  }

  Grid.prototype.link = function(indexA, indexB) {
    this.links.push(new Line(this.points[indexA], this.points[indexB]));
  }


  Grid.prototype.drawRk = function() {
    this.links = [];
    for (i = 0; i < rkIndexes.length - 1; i += 2) {
      this.link(rkIndexes[i], rkIndexes[i + 1])
    }
  }

  Grid.prototype.generate = function() {
    //this.links = [];
    var ret = [];

    for (var i = 0; i < 5; i++) {
        var l = this.randomLine();
          while(existIn(ret, l) || overlapWithLineIn(ret, l))
          {
            l = this.randomLine();
          }
        //this.links.push(l);
        ret.push(l);
    }
    return ret;
  }

  Grid.prototype.drawline = function(l) {
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(l.a.x * this.sizeX + this.offset, l.a.y * this.sizeY + this.offset);
    ctx.lineTo(l.b.x * this.sizeX + this.offset, l.b.y * this.sizeY + this.offset);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = "rgba(0, 0, 0, "+l.alpha+")";

    ctx.stroke();

  }

  Grid.prototype.showBlink = function(){
      for(var i=0;i<this.links.length;i++)
        {
          this.showLink(i);
        }
  }

  Grid.prototype.showLink = function(i,cb){
    var del =0;
    this.links[i].alpha = 0;
    TweenLite.to(this.links[i],.1,{alpha:.5,delay:del});
    TweenLite.to(this.links[i],.1,{alpha:.0,delay:del+.1});
    TweenLite.to(this.links[i],.1,{alpha:1,delay:del +.2,onComplete:cb});
  }

  Grid.prototype.hideLink = function(i,cb){
    var del =Math.random()*.6;
    this.links[i].alpha = 1;
    TweenLite.to(this.links[i],.1,{alpha:.5,delay:del});
    TweenLite.to(this.links[i],.1,{alpha:1,delay:del+.1});
    TweenLite.to(this.links[i],.1,{alpha:0,delay:del +.2,onComplete:cb});
  }

  Grid.prototype.changePattern = function(){
    var newPat = this.generate();
    for(var i=0;i<newPat.length;i++)
      {
        this.hideLink(i,(function(i){
          return function(){
            this.links[i] = newPat[i];
            this.showLink(i);
          }.bind(this);
        }.bind(this))(i));
      }
  }

  Grid.prototype.drawLinks = function() {
    for (var i = 0; i < this.links.length; i++) {
      this.drawline(this.links[i]);
    }
  }


  var grid = new Grid(20, 20, 3, 3);
  grid.drawRk();
  //grid.generate();
  //grid.drawLinks();

//grid.showBlink();

  var start = 0;

  function update(timestamp) {
    canvas.width = canvas.width;
    grid.drawLinks();

    if(timestamp - start > 12000)
    {
      start = timestamp;
      grid.changePattern();
    }


    //console.log(grid.links[0].alpha);

  }

  (function animloop(timestamp) {
    requestAnimationFrame(animloop);
    update(timestamp);
  })();



})()
