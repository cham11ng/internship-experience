function World() {
  this.top = 0;
  this.player = 0;
  this.obstacles = [];
  this.acceleration = 0;
  this.backgroundInterval = function() {};
  this.element = "";

  var that = this;

  this.init = function(props) {
    this.element = props.element;
    this.acceleration = props.acceleration;

    setStyle();
    initializePlayer();
    that.obstacles[0] = createObstacles();
    run();
  }

  var setStyle = function() {
    that.element.style.height = containerHeight + "px";
    that.element.style.width = containerWidth + "px";
    that.element.style.margin = "10px auto";
    that.element.style.overflow = "hidden";
    that.element.style.position = "relative";
    that.element.style.cursor = "pointer";
    that.element.style.background = "url('road.png') repeat-y";
    that.element.style.backgroundPosition = "center top 0px";
  }

  var run = function() {
    that.backgroundInterval = setInterval(function() {
      if (that.player.isCrashed) {
        stop();
      } else {
        that.top += that.acceleration;
        that.element.style.backgroundPosition = "center top " + that.top + "px";
        var totalObstacles = that.obstacles.length;
        var spliceIndex = 0;
        for (var i = 0; i < totalObstacles; i++) {
          that.obstacles[i].y < that.obstacles[i].areaHeight ? that.obstacles[i].updatePosition(that.acceleration) : spliceIndex = i;
          if (checkCollision(that.player, that.obstacles[i])) {
            that.player.isCrashed = true;
          }
        }

        if (that.obstacles[i - 1].y > that.obstacles[i - 1].height * 3 / 2) {
          that.obstacles[i] = createObstacles();
        }

        if (spliceIndex) {
          that.obstacles[spliceIndex].element.remove();
          that.obstacles.splice(spliceIndex, 1);
        }
      }
    }, SPEED);
  };

  var stop = function() {
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

  var createObstacles = function() {
    var obstacleELement = document.createElement("div");
    var obstacle = new Obstacle();

    that.element.appendChild(obstacleELement);
    obstacle.init({
      y: 0,
      acceleration: 1,
      height: carHeight,
      width: carWidth,
      areaHeight: containerHeight,
      areaWidth: containerWidth,
      element: obstacleELement
    });
    return obstacle;
  }

  this.accelerate = function() {
    this.acceleration += 1;
  };

  this.deaccelerate = function() {
    this.acceleration -= 1;
  };

  var checkCollision = function(player, obstacle) {
    var playerLeft = player.x;
    var playerRight = player.x + player.width;
    var playerTop = player.y;
    var playerBottom = player.y + player.height;

    var obstacleLeft = obstacle.x;
    var obstacleRight = obstacle.x + obstacle.width;
    var obstacleTop = obstacle.y;
    var obstacleBottom = obstacle.y + obstacle.height;

    if ((playerRight > obstacleLeft) && (playerLeft < obstacleRight) && (playerBottom > obstacleTop) && (playerTop < obstacleBottom)) {
      return true;
    }

    return false;
  }
}