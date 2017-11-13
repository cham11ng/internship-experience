class Bird {
  constructor(context, x, y, height, width, angle, retardation, flyHeightArea, flyHeight) {
    this.x = x;
    this.y = y;
    this.retardation = retardation;
    this.width = width;
    this.height = height;
    this.flyHeight = flyHeight;
    this.flyHeightArea = flyHeightArea;
    this.angle = angle;
    this.dead = false;
    this.context = context;
  }

  fly() {
    this.y -= this.flyHeight;
  }

  fall() {
    if (this.y < (this.flyHeightArea - this.height)) {
      this.y -= this.retardation;
    } else {
      this.dead = true;
    }
    this.draw();
  }

  draw() {
    let img = new Image();
    img.src = 'images/bird.png';
    this.context.save();
    if (!(this.angle == 0 || this.angle == 360)) {
      // translate to rectangle center
      this.context.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
      this.context.rotate(this.angle * Math.PI / 180);
      // translate back
      this.context.translate(-(this.x + 0.5 * this.width), -(this.y + 0.5 * this.height));
    }
    this.context.drawImage(img, this.x, this.y, this.height, this.width);
    this.context.restore();
    return true;
  }
};