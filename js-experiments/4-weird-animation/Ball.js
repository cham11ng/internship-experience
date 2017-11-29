function Ball() {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.distanceX = 0;
  this.distanceY = 0;
  this.xDirection = 1;
  this.yDirection = 1;
  this.ctx = 0;
  this.color = '#e9669f';
  this.radius = 0;

  var newX = 0;
  var newY = 0;

  this.init = function(props) {
    newX = this.x = props.x;
    newY = this.y = props.y;
    this.dx = props.dx;
    this.dy = props.dy;
    this.distanceX = props.distanceX;
    this.distanceY = props.distanceY;
    this.ctx = props.ctx;
    this.radius = props.radius;
    this.draw();
  }

  this.draw = function() {
    this.ctx.beginPath();
    this.ctx.arc(newX, newY, this.radius, 0, Math.PI * 2, true);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  this.move = function() {
    newY += this.dy * this.yDirection;
    if ((newY - this.y) == this.distanceY || (newY - this.y) == 0) {
      this.yDirection *= -1;
    }
    this.radius = (this.yDirection > 0) 
    ? this.radius + 6 / this.distanceY 
    : this.radius - 6 / this.distanceY;
    this.draw();
  }
};