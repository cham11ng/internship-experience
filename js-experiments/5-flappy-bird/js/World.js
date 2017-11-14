class World {
  constructor(canvas, x, dx) {
    this.x = x;
    this.dx = dx;
    this.canvas = canvas;

    this.score = 0;
    this.best = 0;
    this.bird = '';
    this.obstacles = [];
    this.visibleObstacleIndex = 0;
    this.background = new Image();
    this.context = this.canvas.getContext('2d');
  }

  start() {
    this.bird = this.createBird();
    this.obstacles[0] = this.createObstacle();

    this.background.src = 'images/background.jpg';
    this.background.onload = () => {
      this.intervalManager(true);
    }
  }

  draw() {
    return () => {
      if (this.bird.isDead) {
        this.context.font = 'bold 30px serif';
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.fillText(`${START_KEY_NAME} to continue and ${JUMP_KEY_NAME} to jump`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
        this.stop();
      } else {
        let totalObstacle = this.obstacles.length;
        this.moveBackground();

        // add new obstacle after certain gap
        if (totalObstacle && (CANVAS_WIDTH - this.obstacles[totalObstacle - 1].x - this.obstacles[totalObstacle - 1].width * 2) > OBSTACLE_GAP) {
          this.obstacles[totalObstacle++] = this.createObstacle();
        }

        // move only visible obstacle
        for (var i = this.visibleObstacleIndex; i < totalObstacle; i++) {
          this.obstacles[i].x + this.obstacles[i].width > 0 ? this.obstacles[i].move() : this.visibleObstacleIndex = i;
        }

        // check collision.
        this.bird.isDead = this.checkCollision(this.bird, this.obstacles[this.score]);

        // increment score and set best score
        if (this.bird.x > this.obstacles[this.score].x + this.obstacles[this.score].width) {
          this.best = (++this.score < this.best) ? this.best : this.score;
        }

        this.bird.fall();
        this.displayScore();
      }
    }
  }

  restart() {
    this.obstacles = [];
    this.score = 0;
    this.bird.isDead = false;
    this.bird.x = BIRD_X_POSITION;
    this.bird.y = BIRD_Y_POSITION;
    this.bird.angle = 0;
    this.bird.verticleDisplacement = 0;
    this.obstacles[0] = this.createObstacle();
    this.visibleObstacleIndex = 0;
    this.intervalManager(true);
  }

  stop() {
    this.intervalManager(false);
  }

  intervalManager(flag) {
    if (flag) {
      this.worldInterval = setInterval(this.draw(), SPEED);
    } else {
      clearInterval(this.worldInterval);
    }
  }

  displayScore() {
    this.context.font = 'bold 48px serif';
    this.context.textAlign = 'left';
    this.context.fillStyle = 'white';
    this.context.fillText(this.score, 10, 40);
    this.context.font = 'bold 30px serif';
    this.context.fillText('BEST', 10, 70);
    this.context.fillText(this.best, 10, 95);
  }

  checkCollision(bird, obstacle) {
    var birdLeft = bird.x;
    var birdRight = bird.x + bird.width;
    var birdTop = bird.y;
    var birdBottom = bird.y + bird.height;

    var obstacleLeft = obstacle.x;
    var obstacleRight = obstacle.x + obstacle.width;
    var obstacleTop = obstacle.y;
    var obstacleBottom = obstacle.y + obstacle.height;

    if (birdRight > obstacleLeft && birdLeft < obstacleRight && ((birdTop + OBSTACLE_HEIGHT_FIX) < obstacleTop || (birdBottom - OBSTACLE_HEIGHT_FIX) > obstacleBottom)) {
      return true;
    }
    return false;
  }

  moveBackground() {
    this.context.clearRect(0, 0, this.background.height, this.background.width); // clear the canvas

    // reset, start from beginning
    if (this.x < (-this.background.width)) {
      this.x = 0;
    }

    // surplus image
    if (this.x < 0) {
      this.context.drawImage(this.background, this.background.width + this.x, 0, this.background.width, this.background.height);
    }

    // image width is larger than CANVAS_WIDTH
    if (this.background.width < CANVAS_WIDTH) {
      this.context.drawImage(this.background, this.background.width * 2 + this.x, 0, this.background.width, this.background.height);
    }

    // draw image
    this.context.drawImage(this.background, this.x, 0, this.background.width, this.background.height);
    this.x -= this.dx;
  }

  createBird() {
    return new Bird(
      this.context,
      BIRD_X_POSITION,
      BIRD_Y_POSITION,
      BIRD_HEIGHT,
      BIRD_WIDTH,
      BIRD_START_ANGLE,
      BIRD_FINAL_ANGLE,
      BIRD_FLY_HEIGHT,
      BIRD_DELTA_TIME,
      BIRD_FALLING_CONSTANT,
      BIRD_FLY_HEIGHT_AREA
    );
  }

  createObstacle() {
    return new Obstacle(
      this.context,
      OBSTACLE_X_POSITION,
      this.getRandomValue(OBSTACLE_MIN_Y, OBSTACLE_MAX_Y),
      OBSTACLE_HEIGHT,
      OBSTACLE_WIDTH,
      OBSTACLE_BETWEEN_GAP,
      OBSTACLE_DISPLACEMENT
    );
  }

  getRandomValue(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}