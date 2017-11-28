let search = document.getElementById('search');
let searchBar = document.getElementById('searchBar');

search.onclick = (event) => {
  if (searchBar.style.display === '') {
    event.preventDefault();
  }
  searchBar.style.display = 'inline-block';
  search.style.paddingLeft = '0.3125em';
};

let projectSlider = document.getElementById('projectSlider');
let projectPrevious = document.getElementById('projectPrevious');
let projectNext = document.getElementById('projectNext');
let projectSliderPosition = 1;
const TOTAL_PROJECT_IN_ROW = 4;
slideProject(projectSliderPosition);

function slideProject(position) {
  for (let i = 0, sliderLength = projectSlider.children.length; i < sliderLength; i+=TOTAL_PROJECT_IN_ROW) {
    if (position === (i / TOTAL_PROJECT_IN_ROW + 1)) {
      projectSlider.children[i].style.display = 'list-item';
      if (projectSlider.children.hasOwnProperty(i + 1)) {
        projectSlider.children[i + 1].style.display = 'list-item';
      }
      if (projectSlider.children.hasOwnProperty(i + 2)) {
        projectSlider.children[i + 2].style.display = 'list-item';
      }
      if (projectSlider.children.hasOwnProperty(i + 3)) {
        projectSlider.children[i + 3].style.display = 'list-item';
      }
    } else {
      projectSlider.children[i].style.display = 'none';
      if (projectSlider.children.hasOwnProperty(i + 1)) {
        projectSlider.children[i + 1].style.display = 'none';
      }
      if (projectSlider.children.hasOwnProperty(i + 2)) {
        projectSlider.children[i + 2].style.display = 'none';
      }
      if (projectSlider.children.hasOwnProperty(i + 3)) {
        projectSlider.children[i + 3].style.display = 'none';
      }
    }
  }
  setProjectSliderMargin();
}

function setProjectSliderMargin() {
  projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW].style.marginLeft = '0%';
  if (projectSlider.children.hasOwnProperty((projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW + 3)) {
    projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW + 3].style.marginRight = '0%';
  }
}

projectPrevious.onclick = () => {
  if ((projectSliderPosition - 1) * TOTAL_PROJECT_IN_ROW > 0) {
    slideProject(--projectSliderPosition);
  }
}

projectNext.onclick = () => {
  if ((projectSliderPosition + 1) <= Math.ceil(projectSlider.children.length / TOTAL_PROJECT_IN_ROW)) {
    slideProject(++projectSliderPosition);
  }
}