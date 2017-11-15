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
  this.isCrashed = false;

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
    that.element.style.zIndex = 10;
    that.element.style.position = "absolute";
    that.element.style.height = carHeight + "px";
    that.element.style.width = carWidth + "px";

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
    if (!this.isCrashed && (this.x - this.dx) >= trackLeft) {
      this.x -= this.dx;
      setElementPosition();
      return true;
    }
    return false;
  };

  this.right = function() {
    if (!this.isCrashed && (this.x + this.dx) <= trackRight - this.width) {
      this.x += this.dx;
      setElementPosition();
      return true;
    }
    return false;
  };
}