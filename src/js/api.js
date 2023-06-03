import { gallarySection, clearGallary, btnLoadMore } from '../index.js';
import { appendGallaryMarkup } from './markup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { checkFetch } from "./chechFetch.js"


const axios = require('axios').default;
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles(searchQuery) {
    const options = {
      key: '36855700-0761bb165bd5f28ed0a2548b9',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: 1,
      per_page: 40,
    };

    const URL = `https://pixabay.com/api/?key=${options.key}&q=${this.searchQuery}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}&per_page=${options.per_page}&page=${this.page}`;

  let response = await axios.get(URL, options);
    if (response.status !== 200) {
    throw new Error(response);
    
  } else {
    const data = response;
    console.log(data.data.hits);
    console.log(response);
        this.incrimentPage();
        console.log('response');
        const hitsFetch = data.data.hits;
        // console.log(limit);
        // console.log(data.data.totalHits);
      const limit = (this.page - 1) * 40;
      const totalHitsFetch = data.data.totalHits;
  checkFetch(limit, totalHitsFetch);
        gallarySection.insertAdjacentHTML(
          'beforeend',
          appendGallaryMarkup(hitsFetch)
        );
        lightbox;


        return hitsFetch;
      }
  }

  
  resetPage() {
    this.page = 1;
  }
  incrimentPage() {
    this.page += 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

Notiflix.Notify.init({ position: 'right-bottom' });

