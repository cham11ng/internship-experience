class Bird {
  constructor(context, x, y, height, width, angle, finalAngle, flyHeight, deltaTime, fallingConstant, flyHeightArea) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.flyHeight = flyHeight;
    this.fallingConstant = fallingConstant;
    this.flyHeightArea = flyHeightArea;
    this.angle = angle;
    this.finalAngle = finalAngle;
    this.deltaTime = deltaTime;
    this.context = context;

    this.img = new Image();
    this.img.src = 'images/bird.png';

    this.isDead = false;
    this.verticleDisplacement = 0;
  }

  fly() {
    this.verticleDisplacement = this.flyHeight;
    this.angle = -20;
  }

  fall() {
    if (this.angle <= this.finalAngle) {
      this.angle += BIRD_ANGLE_INCREMENT;
    }

    if (this.y < (this.flyHeightArea - this.height)) {
      this.y += (this.verticleDisplacement * this.deltaTime);
      this.verticleDisplacement += (this.fallingConstant * this.deltaTime);
    } else {
      this.isDead = true;
    }
    this.draw();
  }

  draw() {
    this.context.save();
    this.rotate();
    this.context.drawImage(this.img, this.x, this.y, this.width, this.height);
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