import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import GallaryApiService from './js/api';
import { appendGallaryMarkup } from './js/markup';
import 'simplelightbox/dist/simple-lightbox.min.css';

export { gallarySection, clearGallary, btnLoadMore };

// const axios = require('axios').default;
const form = document.querySelector('#search-form');
const inputTextField = document.querySelector('input');
const btnFormSubmit = document.querySelector('button[type=submit]');
const btnLoadMore = document.querySelector('.load-more');
const gallarySection = document.querySelector('.gallary-sections');
const loader = document.querySelector('.loader');

const gallaryApiService = new GallaryApiService();

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(form);
console.log(inputTextField);
console.log(btnFormSubmit);
console.log(btnLoadMore);

form.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLaodMore);

function onSearch(event) {
  event.preventDefault();

  gallaryApiService.query = event.currentTarget.elements.searchQuery.value;
  if (gallaryApiService.query === '') {
    return Notiflix.Report.warning(
      'Warning',
      'Please fill in the search field'
    );
  }
  gallaryApiService.resetPage();
  gallaryApiService.fetchArticles().then(data => {
    lightbox.refresh();
  });

  clearGallary();
}

function onLaodMore() {
  loader.classList.remove('hide');
  gallaryApiService.fetchArticles().then(data => {
    loader.classList.add('hide');

lightbox.refresh();
    
  });
}

function clearGallary() {
  gallarySection.innerHTML = '';
  inputTextField.value = '';
}
