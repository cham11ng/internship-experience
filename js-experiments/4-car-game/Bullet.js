function Bullet() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.height = 0;
  this.width = 0;
  this.areaHeight = 0;
  this.areaWidth = 0;
  this.acceleration = 0;
  this.element = '';
  this.isTriggered = false;

  var that = this;

  this.init = function(props) {
    this.x = props.x;
    this.dx = props.dx;
    this.height = props.height;
    this.width = props.width;
    this.areaHeight = props.areaHeight;
    this.areaWidth = props.areaWidth;
    this.element = props.element;
    this.acceleration = props.acceleration;
    this.yPositionReset(props);

    setStyle();
  };

  this.yPositionReset = function() {
    this.y = this.areaHeight - this.height;
    setElementPosition();
  }

  var setStyle = function() {
    that.element.style.zIndex = 5;
    that.element.style.position = 'absolute';

    var obstacleImg = document.createElement('img');
    obstacleImg.style.height = carHeight + 'px';
    obstacleImg.style.width = carWidth + 'px';
    obstacleImg.src = 'bullet.png';
    that.element.appendChild(obstacleImg);
  }

  var setElementPosition = function() {
    that.element.style.left = that.x + 'px';
    that.element.style.top = that.y + 'px';
  };

  this.updatePosition = function(relativeVelocity) {
    this.y -= relativeVelocity + this.acceleration;
    setElementPosition();
  };

  this.left = function() {
    if ((this.x - this.dx) >= trackLeft) {
      this.x -= this.dx;
      setElementPosition();
      return true;
    }
    return false;
  };

  this.right = function() {
    if ((this.x + this.dx) <= trackRight - this.width) {
      this.x += this.dx;
      setElementPosition();
      return true;
    }
    return false;
  };
}