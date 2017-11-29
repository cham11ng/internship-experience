var canvas = document.getElementById('animation');
var context = canvas.getContext('2d');

var ball = new Ball();
ball.init({
  x: 110,
  y: 50,
  dx: 1,
  dy: 1,
  distanceX: 100,
  distanceY: 100,
  ctx: context,
  radius: 1
});

var ball = [];
for (var i = 0; i < 15; i++) {
  ball[i] = [];
  for (var j = 0; j < 20; j++) {
    ball[i][j] = new Ball();
    ball[i][j].init({
      x: 110 + j * 15,
      y: 50 + i * 10 + j * 5,
      dx: 1,
      dy: 1,
      distanceX: 100,
      distanceY: 100,
      ctx: context,
      radius: 1
    });
  }
}

setInterval(function() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 20; j++) {
      ball[i][j].move();
    }
  }
}, 30);