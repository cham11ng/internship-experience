let search = document.getElementById('search');
let searchBar = document.getElementById('searchBar');

search.onclick = (event) => {
  if (searchBar.style.display === '') {
    event.preventDefault();
  }
  searchBar.style.display = 'inline-block';
  search.style.paddingLeft = '0.3125em';
}

