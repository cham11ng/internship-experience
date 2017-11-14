class World {
  constructor(canvas, x, dx) {
    this.x = x;
    this.dx = dx;
    this.canvas = canvas;

    this.context = this.canvas.getContext('2d');
    this.bird = new Bird(
      this.context, 
      BIRD_X_POSITION, 
      BIRD_Y_POSITION, 
      BIRD_HEIGHT, 
      BIRD_WIDTH, 
      BIRD_START_ANGLE,
      BIRD_FINAL_ANGLE, 
      BIRD_FLY_SPEED,
      BIRD_DELTA_TIME,
      BIRD_FALLING_CONSTANT,
      BIRD_FLY_HEIGHT_AREA
    );

    this.img = new Image();
    this.img.src = 'images/background.jpg';

    this.img.onload = () => {
      this.worldInterval = setInterval(this.start(this.img), SPEED);
      return this.worldInterval;
    }
  }

  start(img) {
    return () => {
      this.context.clearRect(0, 0, img.height, img.width); // clear the canvas

      // reset, start from beginning
      if (this.x < (-this.img.width)) {
        this.x = 0;
      }

      // surplus image
      if (this.x < 0) {
        this.context.drawImage(this.img, this.img.width + this.x, 0, this.img.width, this.img.height);
      }

      // image width is larger than CANVAS_WIDTH
      if (this.img.width < CANVAS_WIDTH) {
        this.context.drawImage(this.img, this.img.width * 2 + this.x, 0, this.img.width, this.img.height);
      }

      // draw image
      this.context.drawImage(this.img, this.x, 0, this.img.width, this.img.height);
      this.x -= this.dx;
      this.bird.fall();
      
      if (this.bird.dead === true) {
        this.stop();
      }
    }
  }

  stop() {
    clearInterval(this.worldInterval);
  }
}