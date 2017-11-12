function World() {
  this.element = '';
  this.totalAnts = 0;
  this.deadAnts = 0;
  this.backgroundInterval = function() {};

  var antValues = [];
  var antObjects = [];
  var that = this;
  var title = document.createElement('span');
  var button = document.createElement('div');
  var homeScreen = document.createElement('div');

  this.init = function(props) {
    this.element = props.element;
    this.totalAnts = props.totalAnts;

    setStyle();
    button.onclick = start();
  }

  var setStyle = function() {
    that.element.style.width = containerWidth + 'px';
    that.element.style.height = containerHeight + 'px';
    that.element.style.margin = '0 auto';
    that.element.style.position = 'relative';
    that.element.style.backgroundColor = '#80DEEA';

    homeScreen.appendChild(title);
    homeScreen.appendChild(button);
    that.element.appendChild(homeScreen);
    homeScreen.style.height = containerHeight - 300 + 'px';
    homeScreen.style.width = containerWidth - 20 + 'px';
    homeScreen.style.backgroundColor = '#0288D1';
    homeScreen.style.color = '#B3E5FC';
    homeScreen.style.padding = '150px 10px';
    homeScreen.style.textAlign = 'center';
    homeScreen.style.fontWeight = 'bold';

    title.style.fontSize = '50px';
    title.innerHTML = 'ANT SMASHER';

    button.style.fontSize = '30px';
    button.style.padding = '10px';
    button.style.margin = '40px auto';
    button.style.textAlign = 'center';
    button.style.width = '200px';
    button.style.backgroundColor = '#0D47A1';
    button.style.cursor = 'pointer';
    button.innerHTML = 'Play';
  }

  var start = function() {
    return function() {
      that.deadAnts = 0;
      antValues = [];
      that.element.innerHTML = '';
      homeScreen.remove();
      initialAntValues();
      createAnts();
      that.backgroundInterval = setInterval(function() {
        if (that.deadAnts == that.totalAnts) {
          title.innerHTML = "Congratulations! You've smashed all ants.";
          button.innerHTML = 'Play Again';
          that.element.appendChild(homeScreen);
          stop();
        }
        for (i = 0; i < antObjects.length; i++) {
          for (j = i + 1; j < antObjects.length; j++) {
            checkCollision(antObjects[i], antObjects[j]);
          }
          antObjects[i].updatePosition();
        }
      }, 50);
    };
  };

  var stop = function() {
    clearInterval(that.backgroundInterval);
  };

  var initialAntValues = function() {
    var i = 0;
    while (i < that.totalAnts) {
      antValues[i] = {
        x: Math.floor((Math.random() * (containerWidth - antWidth))),
        y: Math.floor((Math.random() * (containerHeight - antHeight))),
        dx: Math.floor((Math.random() * 5)),
        dy: Math.floor((Math.random() * 5)),
        dead: false,
        height: antHeight,
        width: antWidth,
        areaHeight: containerHeight,
        areaWidth: containerWidth,
      };

      if (i != 0 && checkInitalCollision(antValues[i])) {
        continue;
      }
      i++;
    }
  }

  var checkInitalCollision = function(newAntValue) {
    for (j = 0; j < antValues.length - 1; j++) {
      if (checkCollision(antValues[j], newAntValue)) {
        return true;
      }
    }
    return false;
  };

  var createAnts = function() {
    for (var i = 0; i < that.totalAnts; i++) {
      var antElement = document.createElement('div');
      that.element.appendChild(antElement);
      antValues[i].element = antElement;

      antObjects[i] = new Ant();
      antObjects[i].init(antValues[i]);
      antObjects[i].element.onclick = function(ant) {
        return function() {
          if (ant.dead === false) {
            ant.die();
            that.deadAnts += 1;
          }
        };
      }(antObjects[i]);
    }
  }

  var checkCollision = function(firstObject, secondObject) {
    var firstLeft = firstObject.x;
    var firstRight = firstObject.x + firstObject.width;
    var firstTop = firstObject.y;
    var firstBottom = firstObject.y + firstObject.height;

    var secondLeft = secondObject.x;
    var secondRight = secondObject.x + secondObject.width;
    var secondTop = secondObject.y;
    var secondBottom = secondObject.y + secondObject.height;

    if ((firstRight > secondLeft) && (firstLeft < secondRight) && (firstBottom > secondTop) && (firstTop < secondBottom)) {
      firstObject.xdirection *= -1;
      secondObject.xdirection *= -1;
      firstObject.ydirection *= -1;
      secondObject.ydirection *= -1;
      return true;
    }
    return false;
  }
}