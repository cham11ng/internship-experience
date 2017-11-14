class Bird {
  constructor(context, x, y, height, width, angle, finalAngle, flySpeed, deltaTime, fallingConstant, flyHeightArea) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.flySpeed = flySpeed;
    this.fallingConstant = fallingConstant;
    this.flyHeightArea = flyHeightArea;
    this.angle = angle;
    this.finalAngle = finalAngle
    this.deltaTime = deltaTime;
    this.context = context;

    this.dead = false;
    this.verticleSpeed = 0;
  }

  fly() {
    this.verticleSpeed = this.flySpeed;
    this.angle = -20;
  }

  fall() {
    if (this.angle <= this.finalAngle) {
      this.angle += BIRD_ANGLE_INCREMENT;
    }

    if (this.y < (this.flyHeightArea - this.height)) {
      this.y += (this.verticleSpeed * this.deltaTime);
      this.verticleSpeed -= (this.fallingConstant * this.deltaTime);
    } else {
      this.dead = true;
    }
    this.draw();
  }

  draw() {
    let img = new Image();
    img.src = 'images/bird.png';
    this.context.save();
    this.rotate();
    this.context.drawImage(img, this.x, this.y, this.height, this.width);
    this.context.restore();
    return true;
  }

  rotate() {
    if (!(this.angle == 0 || this.angle == 360)) {
      // translate to rectangle center
      this.context.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
      this.context.rotate(this.angle * Math.PI / 180);
      // translate back
      this.context.translate(-(this.x + 0.5 * this.width), -(this.y + 0.5 * this.height));
    }
  }
};