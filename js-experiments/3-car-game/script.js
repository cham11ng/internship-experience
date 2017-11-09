var containerHeight = 500;
var containerWidth = 700;
var carHeight = 105;
var carWidth = 50;

var wrapper = document.getElementById("wrapper");
var container = document.createElement("div");
wrapper.appendChild(container);
container.style.height = containerHeight + "px";
container.style.width = containerWidth + "px";
container.style.margin = "0 auto";
container.style.position = "relative";
container.style.cursor = "pointer";
container.style.background = "url('technology.jpg') repeat-y";
container.style.backgroundPosition = "center top 0px";

var from = 1;
var transitionInterval = setInterval(function() {
    from += 3;
    container.style.backgroundPosition = "center top " + from + "px";
}, 20);

function Car() {
    var dx = 0;
    this.x = 0;
    this.y = 0;
    this.xdirection = 1;
    this.ydirection = 1;
    this.dy = 0;
    this.height = 0;
    this.width = 0;
    this.areaHeight = 0;
    this.areaWidth = 0;
    this.element = "";

    var that = this;

    var setElementPosition = function() {
        that.element.style.left = that.x + "px";
        that.element.style.top = that.y + "px";
    }

    this.init = function(props) {
        this.x = props.x;
        this.y = props.y;
        this.height = props.height;
        this.width = props.width;
        this.areaHeight = props.areaHeight;
        this.areaWidth = props.areaWidth;
        this.element = props.element;
        this.dy = props.dy;

        dx = this.areaWidth / 3;
        console.log(this);
        setElementPosition();
    }

    this.updatePosition = function() {
        if (this.y >= (this.areaHeight - this.height)) {
            this.ydirection = -1;
        } else if (this.y <= 0) {
            this.ydirection = 1;
        }

        this.y += this.dy*this.ydirection;
        setElementPosition();
    }

    this.left = function() {
        if (this.x-dx >= 0) {
            this.x -= dx;
            setElementPosition();
        }
    }

    this.right = function() {
        if (this.x+dx <= this.areaWidth) {
            this.x += dx;
            setElementPosition();
        }
    }
}

function carCreate() {
    var carElement = document.createElement("div");
    carElement.style.position = "absolute";

    var carImage = document.createElement("img");
    carImage.src = "car.png";
    carImage.style.height = carHeight + "px";
    carImage.style.width = carWidth + "px";
    carElement.appendChild(carImage);
    return carElement;
}

var car = new Car();
var carElement = carCreate();
container.appendChild(carElement);

car.init({
    x: containerWidth / 2 - carWidth / 2,
    y: containerHeight - carHeight,
    height: carHeight,
    width: carWidth,
    areaHeight: containerHeight,
    areaWidth: containerWidth,
    element: carElement
});

document.onkeydown = function(event) {
    switch(event.keyCode) {

        case 39:
            car.right();
            break;

        case 37:
            car.left();
            break;

        default:
            console.log("Invalid Move");
    }
};

var obstacle = new Car();
var obstacleELement = carCreate();
container.appendChild(obstacleELement);

obstacle.init({
    x: containerWidth / 2 - carWidth / 2,
    y: 0,
    dy: 10,
    height: carHeight,
    width: carWidth,
    areaHeight: containerHeight,
    areaWidth: containerWidth,
    element: obstacleELement
});

var obstacleInterval = setInterval(function() {
    obstacle.updatePosition();
}, 60);
