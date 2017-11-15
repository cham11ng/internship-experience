var wrapper = document.getElementById("wrapper");
var worlds = [];
for (var i = 0; i < 1; i++) {
  var container = document.createElement("div");
  wrapper.appendChild(container);

  var world = new World();
  worlds[i] = world;
  world.init({
    element: container,
    top: 0,
    acceleration: 3
  });
}

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case UP_KEY:
      for (key in worlds) {
        worlds[key].accelerate();
      }
      break;

    case DOWN_KEY:
      for (key in worlds) {
        worlds[key].deaccelerate();
      }
      break;

    case RIGHT_KEY:
      for (key in worlds) {
        worlds[key].right();
      }
      break;

    case LEFT_KEY:
      for (key in worlds) {
        worlds[key].left();
      }
      break;

    case FIRE_KEY:
      for (key in worlds) {
        worlds[key].fire();
      }
      break;

    default:
      console.log("Invalid Move");
  }
};