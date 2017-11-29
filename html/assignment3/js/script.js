var search = document.getElementById('search');
var searchBar = document.getElementById('searchBar');

search.onclick = function(event) {
  if (searchBar.style.display === '') {
    event.preventDefault();
  }
  searchBar.style.display = 'inline-block';
  search.style.paddingLeft = '0.3125em';
};

var projectNext = document.getElementById('projectNext');
var projectSlider = document.getElementById('projectSlider');
var projectPrevious = document.getElementById('projectPrevious');
var opacityInterval = function() {};
var projectSliderPosition = 1;
var projectCanSlide = false;
var FADE_DELTA_DURATION = 20;
var TOTAL_PROJECT_IN_ROW = 4;
slideProject(projectSliderPosition);

function slideProject(position) {
  for (var i = 0, sliderLength = projectSlider.children.length; i < sliderLength; i += TOTAL_PROJECT_IN_ROW) {
    var opacity = 0;
    if (position === (i / TOTAL_PROJECT_IN_ROW + 1)) {
      opacityInterval = setInterval(fadeIn(i, opacity), FADE_DELTA_DURATION);
    } else {
      setTimeout(fadeOut(i), FADE_DELTA_DURATION);
    }
  }
  setProjectSliderMargin();
}

function fadeIn(i, opacity) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.display = 'list-item';
      projectSlider.children[i].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.display = 'list-item';
      projectSlider.children[i + 1].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.display = 'list-item';
      projectSlider.children[i + 2].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.display = 'list-item';
      projectSlider.children[i + 3].style.opacity = opacity;
    }
    opacity += 1 / 20;
    if (Math.floor(opacity) > 1) {
      clearInterval(opacityInterval);
      projectCanSlide = true;
    }
  }
}

function fadeOut(i) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.opacity = '0';
      projectSlider.children[i].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.opacity = '0';
      projectSlider.children[i + 1].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.opacity = '0';
      projectSlider.children[i + 2].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.opacity = '0';
      projectSlider.children[i + 3].style.display = 'none';
    }
  }
}

function setProjectSliderMargin() {
  projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW].style.marginLeft = '0%';
  if (projectSlider.children.hasOwnProperty((projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW + 3)) {
    projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW + 3].style.marginRight = '0%';
  }
}

projectPrevious.onclick = function() {
  if (projectCanSlide && ((projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW > 0)) {
    projectCanSlide = false;
    slideProject(--projectSliderPosition);
  }
}

projectNext.onclick = function() {
  if (projectCanSlide && ((projectSliderPosition + 1) <= Math.ceil(projectSlider.children.length / TOTAL_PROJECT_IN_ROW))) {
    projectCanSlide = false;
    slideProject(++projectSliderPosition);
  }
}

var titleSliderPosition = 1;
var mainCanSlide = true;
var sliders = document.getElementById('sliders');
var mainTitle = document.getElementById('mainTitle');
var titleSliderNext = document.getElementById('titleSliderNext');
var titleSliderPrevious = document.getElementById('titleSliderPrevious');
var mainSliderArray = [
  {
    title: 'Donec faucibus ultricies congue',
    images: ['a.png', 'b.png', 'c.png']
  },
  {
    title: 'Lorem ipsum dolor sit amet',
    images: ['b.png', 'a.png']
  },
  {
    title: 'Dignissimos id ipsa architecto labore',
    images: ['c.png', 'b.png', 'a.png', 'c.png']
  }
];

generateArray(mainSliderArray);

function generateArray(givenArray) {
  for (var i = 0, length = givenArray.length; i < length; i++) {
    mainTitle.appendChild(createList(givenArray[i].title, i === 0, false));
    sliders.appendChild(generateSliders(givenArray[i], i === 0, i));
  }
}

function generateSliders(givenObject, isActive, index) {
  var imagePosition = 1;
  var images = [], pointers = [];
  var listWidth = 0;
  var nav = document.createElement('ul');
  var list = document.createElement('ul');
  var leftIcon = document.createElement('i');
  var rightIcon = document.createElement('i');
  var mainSlider = document.createElement('div');
  var sliderBody = document.createElement('div');
  var leftControl = document.createElement('div');
  var rightControl = document.createElement('div');
  var slideControl = document.createElement('div');
  
  slideControl.setAttribute('class', 'slide-control clearfix');

  leftIcon.setAttribute('class', 'icon-double-angle-left');
  leftControl.setAttribute('class', 'left-control');
  leftControl.appendChild(leftIcon);
  slideControl.appendChild(leftControl);

  rightIcon.setAttribute('class', 'icon-double-angle-right');
  rightControl.setAttribute('class', 'right-control');
  rightControl.appendChild(rightIcon);
  slideControl.appendChild(rightControl);

  mainSlider.setAttribute('class', isActive ? 'main-slider active' : 'main-slider');

  list.setAttribute('class', 'list');
  nav.setAttribute('class', 'nav');
  sliderBody.setAttribute('class', 'slider-body');

  for (var i = 0, length = givenObject.images.length; i < length; i++) {
    var img = new Image();
    var navList = createList(document.createElement('span'), i === 0, true);
    img.src = 'images/' + givenObject.images[i];
    img.alt = 'Images';
    img.onload = changeListWidth(list);
    list.appendChild(createList(img, false, true));
    nav.appendChild(navList);
    navList.onclick = navClick(i + 1);
  }

  function changeListWidth(target) {
    return function() {
      listWidth += this.naturalWidth;
      target.style.width = listWidth + 'px';
    }
  }

  function navClick(position) {
    return function() {
      changeImageSlider(imagePosition, position, list, nav);
      imagePosition = position;
    };
  }

  sliderBody.appendChild(list);
  sliderBody.appendChild(slideControl);
  sliderBody.appendChild(nav);

  mainSlider.appendChild(sliderBody);

  leftControl.onclick = function() {
    if (mainCanSlide && (imagePosition - 1) > 0) {
      mainCanSlide = false;
      changeImageSlider(imagePosition, --imagePosition, list, nav);
    }
  };

  rightControl.onclick = function() {
    if (mainCanSlide && (imagePosition + 1) <= list.children.length) {
      mainCanSlide = false;
      changeImageSlider(imagePosition, ++imagePosition, list, nav);
    }
  }

  return mainSlider;
}

function changeImageSlider(previousPosition, nextPosition, images, navs) {
  for (var i = 0, length = navs.children.length; i < length; i++) {
    if (i + 1 === nextPosition) {
      navs.children[i].setAttribute('class', 'active');
    } else {
      navs.children[i].removeAttribute('class');
    }
  }
  applyTransition(images, previousPosition, nextPosition);
}

function marginLeftValue(index, width) {
  return (index - 1) * (- width);
}

function applyTransition(target, previous, current) {
  var width = target.children[0].children[0].width;
  var from = marginLeftValue(previous, width);
  var to = marginLeftValue(current, width);
  var offset = Math.abs((from - to) / 30);

  var transitionInterval = setInterval(function() {
    if (from == to) {
      clearInterval(transitionInterval);
      mainCanSlide = true;
    }
    target.style.marginLeft = from + 'px';
    if (from < to) {
      from += offset;
    } else {
      from -= offset;
    }
  }, 15);
}

function createList(value, isActive, append) {
  var list = document.createElement('li');
  if (isActive) {
    list.setAttribute('class', 'active');
  }
  (append) ? list.appendChild(value) : list.innerHTML = value;

  return list;
}

function changeTitleSlider(position) {
  for (var i = 0, length = mainTitle.children.length; i < length; i++) {
    if (i + 1 === position) {
      mainTitle.children[i].setAttribute('class', 'active');
      sliders.children[i].setAttribute('class', 'main-slider active');
    } else {
      mainTitle.children[i].removeAttribute('class');
      sliders.children[i].setAttribute('class', 'main-slider');
    }
  }
}

titleSliderPrevious.onclick = function() {
  if ((titleSliderPosition - 1) > 0) {
    changeTitleSlider(--titleSliderPosition);
  }
}

titleSliderNext.onclick = function() {
  if ((titleSliderPosition + 1) <= mainSliderArray.length) {
    changeTitleSlider(++titleSliderPosition);
  }
}