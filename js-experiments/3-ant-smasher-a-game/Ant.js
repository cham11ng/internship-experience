function Ant() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.dead = false;
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
    setStyles();
    setElementPosition();
  }

  var setStyles = function() {
    that.element.style.position = "absolute";

    var antImage = document.createElement("img");
    antImage.src = "../2-ant-smasher/ant.png";
    antImage.style.height = antHeight + "px";
    antImage.style.width = antWidth + "px";
    antImage.style.cursor = "pointer";
    that.element.appendChild(antImage);
  };

  var setElementPosition = function() {
    that.element.style.left = that.x + "px";
    that.element.style.top = that.y + "px";
  };

  this.updatePosition = function() {
    if (this.x >= (this.areaWidth - this.width)) {
      this.xdirection = -1;
    } else if (this.x <= 0) {
      this.xdirection = 1;
    };

    if (this.y >= (this.areaHeight - this.height)) {
      this.ydirection = -1;
    } else if (this.y <= 0) {
      this.ydirection = 1;
    }

    that.x += that.dx * this.xdirection;
    that.y += that.dy * this.ydirection;
    setElementPosition();
  };

  this.die = function() {
    this.element.firstElementChild.src = "../2-ant-smasher/ant-smash.png";
    this.dx = 0;
    this.dy = 0;
    this.dead = true;
  };
}