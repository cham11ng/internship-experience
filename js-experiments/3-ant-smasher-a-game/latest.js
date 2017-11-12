var wrapper = document.getElementById("wrapper");
var world = new World();

var container = document.createElement("div");
wrapper.appendChild(container);

world.init({
  totalAnts: 5,
  element: container
});