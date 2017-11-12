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
  this.element = '';

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
  }

  var setElementPosition = function() {
    that.element.style.left = that.x + 'px';
    that.element.style.top = that.y + 'px';
  }

  this.updatePosition = function() {
    if (this.x >= (this.areaWidth - this.width)) {
      this.xdirection = -1;
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
    this.element.firstElementChild.src = 'ant-smash.png';
    this.dx = 0;
    this.dy = 0;
    return this.element;
  }
}

var containerHeight = 500;
var containerWidth = 800;
var antHeight = 50;
var antWidth = 50

var wrapper = document.getElementById('wrapper');
var container = document.createElement('div');
wrapper.appendChild(container);
container.style.height = containerHeight + 'px';
container.style.width = containerWidth + 'px';
container.style.margin = '0 auto';
container.style.position = 'relative';
container.style.cursor = 'pointer';
container.style.backgroundColor = 'silver';

function antCreate() {
  var antElement = document.createElement('div');
  antElement.style.position = 'absolute';

  var antImage = document.createElement('img');
  antImage.src = 'ant.png';
  antImage.style.height = antHeight + 'px';
  antImage.style.width = antWidth + 'px';
  antElement.appendChild(antImage);
  return antElement;
}

var antObjects = [];
for (var i = 0; i < 5; i++) {
  var antElement = antCreate();
  container.appendChild(antElement);
  var ant = new Ant();
  antObjects[i] = ant;

  ant.init({
    x: Math.floor((Math.random() * (containerWidth - antWidth))),
    y: Math.floor((Math.random() * (containerHeight - antHeight))),
    dx: Math.floor(Math.random() * 5),
    dy: Math.floor(Math.random() * 5),
    height: antHeight,
    width: antWidth,
    areaHeight: containerHeight,
    areaWidth: containerWidth,
    element: antElement
  });

  antElement.onclick = function(ant) {
    return function() {
      ant.die();
    };
  }(ant);
}

setInterval(function() {
  for (ant in antObjects) {
    antObjects[ant].updatePosition();
  }
}, 20);