function Ant() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.height = 0;
  this.width = 0;
  this.xdirection = 1;
  this.ydirection = 1;
  this.areaHeight = 0;
  this.areaWidth = 0;
  this.element = "";

  var that = this;

  this.init = function(props) {
    this.x = props.x;
    this.y = props.y;
    this.dx = props.dx;
    this.dy = props.dy;
    this.height = props.height;
    this.width = props.width;
    this.areaHeight = props.areaHeight;
    this.areaWidth = props.areaWidth;
    this.element = props.element;
    setElementPosition();
  }

  var setElementPosition = function() {
    that.element.style.left = that.x + "px";
    that.element.style.top = that.y + "px";
  }

  this.updatePosition = function() {
    if (this.x >= (this.areaWidth - this.width)) {
      this.xdirection = -2;
    } else if (this.x <= 0) {
      this.xdirection = 1;
    }

    if (this.y >= (this.areaHeight - this.height)) {
      this.ydirection = -1;
    } else if (this.y <= 0) {
      this.ydirection = 1;
    }

    that.x += that.dx * this.xdirection;
    that.y += that.dy * this.ydirection;
    setElementPosition();
  }

  this.die = function() {
    this.element.firstElementChild.src = "../2-ant-smasher/ant-smash.png";
    this.dx = 0;
    this.dy = 0;
    return this.element;
  }
}

var containerHeight = 500;
var containerWidth = 800;
var antHeight = 40;
var antWidth = 40;

var wrapper = document.getElementById("wrapper");
var container = document.createElement("div");
wrapper.appendChild(container);
container.style.height = containerHeight + "px";
container.style.width = containerWidth + "px";
container.style.margin = "0 auto";
container.style.position = "relative";
container.style.backgroundColor = "silver";

var homeScreen = document.createElement("div");
container.appendChild(homeScreen);
homeScreen.style.height = containerHeight-100 + "px";
homeScreen.style.width = containerWidth-20 + "px";
homeScreen.style.backgroundColor = "#0288D1";
homeScreen.style.zIndex = 30;
homeScreen.style.color = "#B3E5FC";
homeScreen.style.padding = "50px 10px";
homeScreen.style.textAlign = "center";
homeScreen.style.fontWeight = "bold";

var title = document.createElement("span");
var button = document.createElement("div");
homeScreen.appendChild(title);
homeScreen.appendChild(button);
title.style.fontSize = "50px";
button.style.fontSize = "30px";
button.style.padding = "10px";
button.style.margin = "40px auto";
button.style.textAlign = "center";
button.style.width = "200px";
button.style.backgroundColor = "#0D47A1";
title.innerHTML = "ANT SMASHER";
button.innerHTML = "Play";

function antCreate() {
  var antElement = document.createElement("div");
  antElement.style.position = "absolute";
  antElement.style.zIndex = 20;

  var antImage = document.createElement("img");
  antImage.src = "../2-ant-smasher/ant.png";
  antImage.style.height = antHeight + "px";
  antImage.style.width = antWidth + "px";
  antImage.style.cursor = "pointer";
  antElement.appendChild(antImage);
  return antElement;
}

var backupAntObjects = antObjects = [];
for (var i = 0; i < 5; i++) {
  var antElement = antCreate();
  container.appendChild(antElement);
  var ant = new Ant();
  backupAntObjects[i] = antObjects[i] = ant;

  ant.init({
    x: Math.floor((Math.random() * (containerWidth - antWidth))),
    y: Math.floor((Math.random() * (containerHeight - antHeight))),
    dx: Math.floor((Math.random() * 3)),
    dy: Math.floor((Math.random() * 3)),
    height: antHeight,
    width: antWidth,
    areaHeight: containerHeight,
    areaWidth: containerWidth,
    element: antElement
  });

  antElement.onclick = function(ant) {
    return function() {
      ant.die();
      backupAntObjects = backupAntObjects.splice(1, i);
      console.log(backupAntObjects.length);
      if (!backupAntObjects.length) {
        title.innerHTML = "Congratulations! You've smashed all ants.";
        button.innerHTML = "Play Again";
      }
    };
  }(ant);
}

setInterval(function() {
  for (i = 0; i < antObjects.length; i++) {
    for (j = i + 1; j < antObjects.length; j++) {
      checkCollision(antObjects[i], antObjects[j]);
    }
    antObjects[i].updatePosition();
  }
}, 20);

function checkCollision(firstObject, secondObject) {
  var firstLeft = firstObject.x;
  var firstRight = firstObject.x + firstObject.width;
  var firstTop = firstObject.y;
  var firstBottom = firstObject.y + firstObject.height;

  var secondLeft = secondObject.x;
  var secondRight = secondObject.x + secondObject.width;
  var secondTop = secondObject.y;
  var secondBottom = secondObject.y + secondObject.height;

  if ((firstRight > secondLeft) && (firstLeft < secondRight) && (firstBottom > secondTop) && (firstTop < secondBottom)) {
    firstObject.xdirection *= -1;
    secondObject.xdirection *= -1;
    firstObject.ydirection *= -1;
    secondObject.ydirection *= -1;
  }
}