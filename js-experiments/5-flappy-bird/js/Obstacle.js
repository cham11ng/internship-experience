class Obstacle {
  constructor(context, x, y, height, width, gap, dx) {
    this.x = x;
    this.y = y + OBSTACLE_TOP_HEIGHT;
    this.height = gap;
    this.width = width;
    this.yPosition = y;
    this.areaHeight = height;
    this.dx = dx;
    this.context = context;

    this.img = new Image();
    this.img.src = 'images/obstacle.png';
  }

  move() {
    this.x -= this.dx;
    this.draw();
  }

  draw() {
    this.context.drawImage(this.img, this.x, this.yPosition, this.width, this.areaHeight);
    return true;
  }
}