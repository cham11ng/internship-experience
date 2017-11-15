function World() {
  this.top = 0;
  this.player = 0;
  this.obstacles = [];
  this.acceleration = 0;
  this.backgroundInterval = function() {};
  this.element = '';
  this.bullet = '';
  this.scoreElement = '';
  this.missedElement = '';
  this.obstacleDuration = 0;
  this.totalMissedCar = 0;
  this.totalDestroyedCar = 0;

  var that = this;

  this.init = function(props) {
    this.element = props.element;
    this.acceleration = props.acceleration;

    setStyle();
    this.scoreElement = score();
    this.missedElement = missed();
    initializePlayer();
    that.obstacles[0] = createObstacles();
    this.bullet = createFireObject();
    run();
  }

  var setStyle = function() {
    that.element.style.height = containerHeight + 'px';
    that.element.style.width = containerWidth + 'px';
    that.element.style.margin = '10px auto';
    that.element.style.overflow = 'hidden';
    that.element.style.position = 'relative';
    that.element.style.cursor = 'pointer';
    that.element.style.background = "url('road.png') repeat-y";
    that.element.style.backgroundPosition = 'center top 0px';
  }

  var score = function() {
    var score = document.createElement('div');
    that.element.appendChild(score);
    score.style.padding = '10px';
    score.style.fontSize = '25px';
    score.style.display = 'inline-block';
    score.style.color = 'white';
    score.style.fontWeight = 'bold';
    score.innerHTML = 'SCORE 0';
    return score;
  }

  var missed = function() {
    var missed = document.createElement('div');
    that.element.appendChild(missed);
    missed.style.padding = '10px';
    missed.style.fontSize = '25px';
    missed.style.color = 'white';
    missed.style.fontWeight = 'bold';
    missed.style.display = 'inline-block';
    missed.style.float = 'right';
    missed.innerHTML = 'MISSED 0';
    return missed;
  }

  var run = function() {
    that.backgroundInterval = setInterval(function() {
      if (that.player.isCrashed) {
        stop();
      } else {
        var totalObstacle = that.obstacles.length;
        var spliceIndexes = [];
        that.top += that.acceleration;
        that.element.style.backgroundPosition = 'center top ' + that.top + 'px';

        if (that.bullet.y < -that.bullet.height) {
          that.bullet.isTriggered = false;
        }

        if (that.bullet.isTriggered) {
          that.bullet.updatePosition(that.acceleration);
        }

        for (var i = 0; i < totalObstacle; i++) {
          if (that.obstacles[i].y < that.obstacles[i].areaHeight) {
            that.obstacles[i].updatePosition(that.acceleration);
          } else {
            spliceIndexes.push(i);
            that.missedElement.innerHTML = 'MISSED ' + (++that.totalMissedCar);
          }

          if (checkCollision(that.player, that.obstacles[i])) {
            that.player.isCrashed = true;
          } else if (checkCollision(that.bullet, that.obstacles[i])) {
            spliceIndexes.push(i);
            that.bullet.isTriggered = false;
            that.bullet.x = that.player.x;
            that.bullet.yPositionReset();
            that.scoreElement.innerHTML = 'SCORE ' + (++that.totalDestroyedCar);
          }
        }

        that.obstacleDuration += SPEED;
        if (that.obstacleDuration > (OBSTACLE_DURATION - that.acceleration * ACCELERATION_CONSTANT)) {
          that.obstacles[i] = createObstacles();
          that.obstacleDuration = 0;
        }

        for (var i = 0; i < spliceIndexes.length; i++) {
          if (that.obstacles.hasOwnProperty(spliceIndexes[i])) {
            that.obstacles[spliceIndexes[i]].element.remove();
            that.obstacles.splice(spliceIndexes[i], 1);
          }
        }
      }
    }, SPEED);
  };

  var stop = function() {
    clearInterval(that.backgroundInterval);
  };

  var initializePlayer = function() {
    var carElement = document.createElement('div');
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
    var obstacleELement = document.createElement('div');
    var obstacle = new Obstacle();

    that.element.appendChild(obstacleELement);
    obstacle.init({
      y: -carHeight,
      acceleration: 1,
      height: carHeight,
      width: carWidth,
      areaHeight: containerHeight,
      areaWidth: containerWidth,
      element: obstacleELement
    });
    return obstacle;
  }

  var createFireObject = function() {
    var fireElement = document.createElement('div');
    var bullet = new Bullet();

    that.element.appendChild(fireElement);
    bullet.init({
      x: that.player.x,
      dx: trackLane,
      acceleration: 4,
      height: carHeight,
      width: carWidth,
      areaHeight: containerHeight,
      areaWidth: containerWidth,
      element: fireElement
    });
    return bullet;
  }

  this.accelerate = function() {
    if (this.acceleration <= MAX_ACCELERATION) {
      this.acceleration += 1;
    }
  };

  this.deaccelerate = function() {
    if (this.acceleration > MIN_ACCELERATION) {
      this.acceleration -= 1;
    }
  };

  this.fire = function() {
    if (!that.bullet.isTriggered) {
      this.bullet.x = this.player.x;
      this.bullet.yPositionReset();
      that.bullet.isTriggered = true;
    }
  }

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

  this.left = function() {
    if (this.player.left() && !this.bullet.isTriggered) {
      this.bullet.left();
    }
  }

  this.right = function() {
    if (this.player.right() && !this.bullet.isTriggered) {
      this.bullet.right();
    }
  }
}