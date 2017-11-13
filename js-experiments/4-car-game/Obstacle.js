function Obstacle() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.height = 0;
  this.width = 0;
  this.areaHeight = 0;
  this.areaWidth = 0;
  this.acceleration = 0;
  this.element = "";

  var images = [
    "cow.png",
    "obstacle.png",
    "rock.png"
  ];

  var that = this;

  this.init = function(props) {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.x = (containerWidth / 2 - carWidth / 2) + plusOrMinus * Math.floor(Math.random() * 2) * trackLane;
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
    that.element.style.position = "absolute";

    var obstacleImg = document.createElement("img");
    obstacleImg.style.height = carHeight + "px";
    obstacleImg.style.width = carWidth + "px";
    obstacleImg.src = images[Math.floor(Math.random() * 3)];
    that.element.appendChild(obstacleImg);
  }

  var setElementPosition = function() {
    that.element.style.left = that.x + "px";
    that.element.style.top = that.y + "px";
  };

  this.updatePosition = function(relativeVelocity) {
    this.y += relativeVelocity + this.acceleration;
    setElementPosition();
  };
}