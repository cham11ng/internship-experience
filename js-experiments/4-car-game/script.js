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
    case 38:
      for (key in worlds) {
        worlds[key].accelerate();
      }
      break;

    case 40:
      for (key in worlds) {
        worlds[key].deaccelerate();
      }
      break;

    case 39:
      for (key in worlds) {
        worlds[key].player.right();
      }
      break;

    case 37:
      for (key in worlds) {
        worlds[key].player.left()
      }
      break;

    default:
      console.log("Invalid Move");
  }
};