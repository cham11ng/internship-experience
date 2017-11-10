var containerHeight = 512;
var containerWidth = 512;
var trackLeft = 140;
var trackRight = 370;
var trackLane = 76;
var carHeight = 105;
var carWidth = 50;

function Car() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.height = 0;
  this.width = 0;
  this.areaHeight = 0;
  this.areaWidth = 0;
  this.acceleration = 0;
  this.element = "";

  var that = this;

  this.init = function(props) {
    this.x = props.x;
    this.y = props.y;
    this.dx = props.dx;
    this.height = props.height;
    this.width = props.width;
    this.areaHeight = props.areaHeight;
    this.areaWidth = props.areaWidth;
    this.element = props.element;
    this.acceleration = props.acceleration;

    setStyle();
    setElementPosition();
  };

  var setStyle = function() {
    that.element.style.height = carHeight + "px";
    that.element.style.width = carWidth + "px";
    that.element.style.position = "absolute";

    var carImage = document.createElement("img");
    carImage.src = "car.png";
    that.element.appendChild(carImage);
  }

  var setElementPosition = function() {
    that.element.style.left = that.x + "px";
    that.element.style.top = that.y + "px";
  };

  this.updatePosition = function() {
    if (this.y >= (this.areaHeight - this.height)) {
      this.ydirection = -1;
    } else if (this.y <= 0) {
      this.ydirection = 1;
    }

    this.y += this.acceleration * this.ydirection;
    setElementPosition();
  };

  this.left = function() {
    if ((this.x - this.dx) >= trackLeft) {
      this.x -= this.dx;
      setElementPosition();
    }
  };

  this.right = function() {
    if ((this.x + this.dx) <= trackRight - this.width) {
      this.x += this.dx;
      setElementPosition();
    }
  };
}

function World() {
  this.top = 0;
  this.player = 0;
  this.obstacle = 0;
  this.acceleration = 0;
  this.backgroundInterval = function() {};
  this.element = "";

  var that = this;

  this.init = function(props) {
    this.element = props.element;
    this.acceleration = props.acceleration;

    setStyle();
    moveBackground();
    initializePlayer();
  }

  var setStyle = function() {
    that.element.style.height = containerHeight + "px";
    that.element.style.width = containerWidth + "px";
    that.element.style.margin = "10px auto";
    that.element.style.position = "relative";
    that.element.style.cursor = "pointer";
    that.element.style.background = "url('road.png') repeat-y";
    that.element.style.backgroundPosition = "center top 0px";
  }

  var moveBackground = function() {
    that.backgroundInterval = setInterval(function() {
      that.top += that.acceleration;
      that.element.style.backgroundPosition = "center top " + that.top + "px";
    }, 50);
  };

  var stopBackground = function() {
    clearInterval(that.backgroundInterval);
  };

  var initializePlayer = function() {
    var carElement = document.createElement("div");
    that.element.appendChild(carElement);

    that.player = new Car();
    that.player.init({
      x: containerWidth / 2 - carWidth / 2,
      y: containerHeight - carHeight - 10,
      dx: trackLane,
      height: carHeight,
      width: carWidth,
      areaHeight: containerHeight,
      areaWidth: containerWidth,
      element: carElement
    });
  };

  this.accelerate = function() {
    this.acceleration += 1;
  };

  this.deaccelerate = function() {
    this.acceleration -= 1;
  };
}

var wrapper = document.getElementById("wrapper");
var worlds = [];
for (var i = 0; i < 1; i++) {
  var container = document.createElement("div");
  wrapper.appendChild(container);

  var world = new World();
  worlds[i] = world;
  world.init({
    element: container,
    top: 0,
    acceleration: 3
  });
}

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case 38:
      for (key in worlds) {
        worlds[key].accelerate();
      }
      break;

    case 40:
      for (key in worlds) {
        worlds[key].deaccelerate();
      }
      break;

    case 39:
      for (key in worlds) {
        worlds[key].player.right();
      }
      break;

    case 37:
      for (key in worlds) {
        worlds[key].player.left()
      }
      break;

    default:
      console.log("Invalid Move");
  }
};