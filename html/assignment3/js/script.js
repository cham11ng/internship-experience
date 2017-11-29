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
  for (var i = 0, sliderLength = projectSlider.children.length; i < sliderLength; i+=TOTAL_PROJECT_IN_ROW) {
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